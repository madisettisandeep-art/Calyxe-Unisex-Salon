import os
import re
import json
import time
import urllib.request
from playwright.sync_api import sync_playwright

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "gallery", "instagram")
os.makedirs(OUTPUT_DIR, exist_ok=True)

image_urls = set()
post_urls = set()

def handle_response(response):
    url = response.url
    # Capture direct Instagram CDN images
    if "cdninstagram.com" in url and any(ext in url for ext in [".jpg", ".jpeg", ".webp", ".png"]):
        if "150x150" not in url and "s150x150" not in url and "rsrc.php" not in url:
            image_urls.add(url)
    
    # Capture GraphQL / API responses
    if "graphql" in url or "api/v1" in url:
        try:
            content_type = response.headers.get("content-type", "")
            if "json" in content_type:
                data = response.json()
                data_str = json.dumps(data)
                # find all display_url or image candidates
                found = re.findall(r'https://[^\s"\'\\]*cdninstagram\.com[^\s"\'\\]*', data_str)
                for u in found:
                    clean = u.replace("\\u0026", "&")
                    if any(ext in clean for ext in [".jpg", ".jpeg", ".webp", ".png"]):
                        if "150x150" not in clean and "rsrc.php" not in clean:
                            image_urls.add(clean)
        except Exception:
            pass

def run():
    print("Starting Playwright script...")
    with sync_playwright() as p:
        # Launch browser with realistic viewport and user agent
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
            viewport={"width": 1280, "height": 900},
            locale="en-US"
        )
        
        page = context.new_page()
        page.on("response", handle_response)
        
        print("Navigating to https://www.instagram.com/calyxe_unisex_salon/ ...")
        page.goto("https://www.instagram.com/calyxe_unisex_salon/", wait_until="networkidle", timeout=60000)
        
        time.sleep(3)
        print("Page title:", page.title())
        
        # Check if login modal or close button is present
        try:
            close_buttons = page.query_selector_all('[aria-label="Close"], [role="button"]:has-text("Close"), svg[aria-label="Close"]')
            for btn in close_buttons:
                print("Found close button, clicking...")
                btn.click()
                time.sleep(1)
        except Exception as e:
            print("Close button check exception:", e)
        
        # Get all links for posts
        links = page.evaluate("""() => {
            const anchors = Array.from(document.querySelectorAll('a[href*="/p/"], a[href*="/reel/"]'));
            return anchors.map(a => a.href);
        }""")
        for l in links:
            post_urls.add(l)
        print(f"Initially found {len(post_urls)} post/reel links")
        
        # Get all img elements on page
        img_srcs = page.evaluate("""() => {
            const imgs = Array.from(document.querySelectorAll('img'));
            return imgs.map(img => ({
                src: img.src,
                srcset: img.srcset,
                alt: img.alt
            }));
        }""")
        print(f"Found {len(img_srcs)} <img> tags on page")
        for item in img_srcs:
            src = item.get("src")
            if src and "cdninstagram.com" in src and "rsrc.php" not in src:
                image_urls.add(src)
            srcset = item.get("srcset")
            if srcset:
                parts = [p.strip().split(" ")[0] for p in srcset.split(",") if p.strip()]
                for p in parts:
                    if "cdninstagram.com" in p and "rsrc.php" not in p:
                        image_urls.add(p)
        
        # Try scrolling down to trigger loading
        for s in range(5):
            print(f"Scrolling step {s+1}/5...")
            page.evaluate("window.scrollBy(0, 1000)")
            time.sleep(2)
            
            # check for new links
            new_links = page.evaluate("""() => {
                const anchors = Array.from(document.querySelectorAll('a[href*="/p/"], a[href*="/reel/"]'));
                return anchors.map(a => a.href);
            }""")
            for l in new_links:
                post_urls.add(l)
                
            new_imgs = page.evaluate("""() => {
                const imgs = Array.from(document.querySelectorAll('img'));
                return imgs.map(img => img.src);
            }""")
            for src in new_imgs:
                if src and "cdninstagram.com" in src and "rsrc.php" not in src:
                    image_urls.add(src)

        # Save screenshot for verification
        screenshot_path = os.path.join(os.path.dirname(__file__), "instagram_page.png")
        page.screenshot(path=screenshot_path)
        print("Screenshot saved to", screenshot_path)

        browser.close()
        
    print(f"\n--- RESULTS SUMMARY ---")
    print(f"Total post URLs: {len(post_urls)}")
    for p in post_urls:
        print("Post:", p)
        
    print(f"\nTotal image URLs gathered: {len(image_urls)}")
    for img in list(image_urls)[:10]:
        print("Image:", img[:120])
        
    # Save results to a json file
    results = {
        "posts": list(post_urls),
        "images": list(image_urls)
    }
    with open(os.path.join(os.path.dirname(__file__), "insta_results.json"), "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2)

if __name__ == "__main__":
    run()
