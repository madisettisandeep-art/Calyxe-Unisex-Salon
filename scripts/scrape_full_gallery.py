import os
import re
import json
import time
import requests
from playwright.sync_api import sync_playwright
from PIL import Image

OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "public", "gallery", "instagram"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

def download_image(url, filename):
    filepath = os.path.join(OUTPUT_DIR, filename)
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Referer": "https://www.instagram.com/"
    }
    try:
        resp = requests.get(url, headers=headers, timeout=20)
        if resp.status_code == 200:
            with open(filepath, "wb") as f:
                f.write(resp.content)
            # Verify and get size
            with Image.open(filepath) as img:
                w, h = img.size
                fmt = img.format
            print(f"  [SAVED] {filename} ({w}x{h} {fmt}, {len(resp.content)//1024} KB)")
            return True, filepath, w, h
        else:
            print(f"  [FAIL] {filename} HTTP {resp.status_code}")
            return False, None, 0, 0
    except Exception as e:
        print(f"  [ERROR] {filename}: {e}")
        return False, None, 0, 0

def run():
    print("=== STARTING CALYXE INSTAGRAM EXTRACTOR ===")
    all_post_links = set()
    collected_images = {} # url -> details

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
            viewport={"width": 1440, "height": 900},
            locale="en-US"
        )
        page = context.new_page()

        # Intercept CDN image requests
        def on_response(response):
            url = response.url
            if "cdninstagram.com" in url and any(ext in url for ext in [".jpg", ".jpeg", ".webp", ".png", ".heic"]):
                if "150x150" not in url and "s150x150" not in url and "rsrc.php" not in url:
                    collected_images[url] = {"url": url, "status": response.status}

        page.on("response", on_response)

        print("\n1. Navigating to profile...")
        page.goto("https://www.instagram.com/calyxe_unisex_salon/", wait_until="networkidle", timeout=60000)
        time.sleep(2)

        # Try to close any initial modal
        try:
            for selector in ['svg[aria-label="Close"]', '[aria-label="Close"]', 'button:has-text("Close")']:
                close_btn = page.query_selector(selector)
                if close_btn:
                    close_btn.click()
                    time.sleep(1)
        except Exception:
            pass

        # Collect initial post links
        def extract_page_links():
            return page.evaluate("""() => {
                const links = Array.from(document.querySelectorAll('a[href*="/p/"], a[href*="/reel/"]'));
                return links.map(a => a.href);
            }""")

        for l in extract_page_links():
            all_post_links.add(l)

        print(f"Found {len(all_post_links)} links on initial load.")

        # Try clicking "Show more posts from calyxe_unisex_salon"
        try:
            show_more = page.query_selector("button:has-text('Show more posts'), text='Show more posts from calyxe_unisex_salon'")
            if show_more:
                print("Clicking 'Show more posts' button...")
                show_more.click()
                time.sleep(3)
                for l in extract_page_links():
                    all_post_links.add(l)
                print(f"Links after clicking Show More: {len(all_post_links)}")
        except Exception as e:
            print("Show more click exception:", e)

        # Scroll multiple times
        for i in range(8):
            page.evaluate("window.scrollBy(0, 800)")
            time.sleep(1.5)
            for l in extract_page_links():
                all_post_links.add(l)

        print(f"\nTotal unique post/reel URLs found: {len(all_post_links)}")
        sorted_links = sorted(list(all_post_links))
        for idx, pl in enumerate(sorted_links):
            print(f"  [{idx+1}] {pl}")

        # Now visit each individual post to extract the maximum quality image(s)
        downloaded_records = []
        
        for idx, post_url in enumerate(sorted_links):
            shortcode_match = re.search(r'/(?:p|reel)/([A-Za-z0-9_-]+)', post_url)
            shortcode = shortcode_match.group(1) if shortcode_match else f"item_{idx+1}"
            print(f"\nProcessing Post {idx+1}/{len(sorted_links)}: {post_url} ({shortcode})")

            post_images = []
            
            def on_post_response(resp):
                u = resp.url
                if "cdninstagram.com" in u and any(ext in u for ext in [".jpg", ".jpeg", ".webp", ".png", ".heic"]):
                    if "150x150" not in u and "s150x150" not in u and "rsrc.php" not in u:
                        post_images.append(u)

            # We can create a temporary listener or inspect DOM
            post_page = context.new_page()
            post_page.on("response", on_post_response)
            
            try:
                post_page.goto(post_url, wait_until="networkidle", timeout=30000)
                time.sleep(2)

                # Close login modal on post page if it blocks view
                try:
                    for selector in ['svg[aria-label="Close"]', '[aria-label="Close"]']:
                        cb = post_page.query_selector(selector)
                        if cb:
                            cb.click()
                            time.sleep(0.5)
                except Exception:
                    pass

                # Extract images from DOM
                dom_images = post_page.evaluate("""() => {
                    const imgs = Array.from(document.querySelectorAll('article img, [role="dialog"] img, main img'));
                    return imgs.map(img => ({
                        src: img.src,
                        srcset: img.srcset,
                        alt: img.alt
                    }));
                }""")
                
                # Check for carousel next button
                carousel_step = 0
                while carousel_step < 10:
                    next_btn = post_page.query_selector('button[aria-label="Next"], button:has(svg[aria-label="Next"])')
                    if next_btn and next_btn.is_visible():
                        try:
                            next_btn.click()
                            time.sleep(1)
                            carousel_step += 1
                            # Re-check images
                            extra_imgs = post_page.evaluate("""() => {
                                const imgs = Array.from(document.querySelectorAll('article img, [role="dialog"] img, main img'));
                                return imgs.map(img => ({
                                    src: img.src,
                                    srcset: img.srcset,
                                    alt: img.alt
                                }));
                            }""")
                            dom_images.extend(extra_imgs)
                        except Exception:
                            break
                    else:
                        break

                # Gather all image URLs for this post
                candidate_urls = []
                for item in dom_images:
                    src = item.get("src")
                    if src and "cdninstagram.com" in src and "rsrc.php" not in src and "150x150" not in src:
                        candidate_urls.append(src)
                    srcset = item.get("srcset")
                    if srcset:
                        # pick largest resolution from srcset
                        entries = [p.strip().split(" ") for p in srcset.split(",") if p.strip()]
                        for entry in entries:
                            if len(entry) > 0 and "cdninstagram.com" in entry[0] and "rsrc.php" not in entry[0]:
                                candidate_urls.append(entry[0])

                # Also add captured response images
                candidate_urls.extend(post_images)

                # Deduplicate candidates while keeping order
                unique_urls = []
                seen_bases = set()
                for cu in candidate_urls:
                    # Clean URL query for identity check
                    clean_id = cu.split("?")[0].split("/")[-1]
                    if clean_id not in seen_bases:
                        seen_bases.add(clean_id)
                        unique_urls.append(cu)

                print(f"  Found {len(unique_urls)} distinct image(s) for this post.")

                # Download each image
                for img_idx, img_url in enumerate(unique_urls):
                    filename = f"calyxe_{shortcode}_{img_idx+1:02d}.jpg"
                    success, fpath, w, h = download_image(img_url, filename)
                    if success:
                        downloaded_records.append({
                            "shortcode": shortcode,
                            "post_url": post_url,
                            "filename": filename,
                            "path": fpath,
                            "width": w,
                            "height": h,
                            "url": img_url
                        })

            except Exception as pe:
                print(f"  Error processing post {post_url}: {pe}")
            finally:
                post_page.close()

        # Also download any remaining images collected from the main profile grid that haven't been downloaded yet
        print("\nChecking remaining profile grid images...")
        grid_idx = 0
        for img_url in collected_images.keys():
            clean_id = img_url.split("?")[0].split("/")[-1]
            # check if already downloaded
            already_done = any(clean_id in r["url"] for r in downloaded_records)
            if not already_done:
                grid_idx += 1
                fname = f"calyxe_grid_{grid_idx:02d}.jpg"
                success, fpath, w, h = download_image(img_url, fname)
                if success:
                    downloaded_records.append({
                        "shortcode": "grid",
                        "post_url": "https://www.instagram.com/calyxe_unisex_salon/",
                        "filename": fname,
                        "path": fpath,
                        "width": w,
                        "height": h,
                        "url": img_url
                    })

        browser.close()

    # Summary
    print(f"\n==========================================")
    print(f"COMPLETED EXTRACTION: {len(downloaded_records)} high quality images downloaded.")
    print(f"Destination: {OUTPUT_DIR}")
    print(f"==========================================")

    manifest_path = os.path.join(OUTPUT_DIR, "manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(downloaded_records, f, indent=2)
    print(f"Manifest written to {manifest_path}")

if __name__ == "__main__":
    run()
