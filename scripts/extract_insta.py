import urllib.request
import urllib.parse
import json
import re
import requests

def search_ddg():
    query = 'site:instagram.com "calyxe_unisex_salon"'
    url = 'https://html.duckduckgo.com/html/?q=' + urllib.parse.quote(query)
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0'}
    try:
        r = requests.get(url, headers=headers, timeout=10)
        print("DDG Status:", r.status_code)
        matches = re.findall(r'instagram\.com/(?:p|reel)/([A-Za-z0-9_-]+)', r.text)
        print("DDG post codes:", set(matches))
        return set(matches)
    except Exception as e:
        print("DDG search failed:", e)
        return set()

def search_bing():
    query = 'site:instagram.com "calyxe_unisex_salon"'
    url = 'https://www.bing.com/search?q=' + urllib.parse.quote(query)
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}
    try:
        r = requests.get(url, headers=headers, timeout=10)
        print("Bing Status:", r.status_code)
        matches = re.findall(r'instagram\.com/(?:p|reel)/([A-Za-z0-9_-]+)', r.text)
        print("Bing post codes:", set(matches))
        return set(matches)
    except Exception as e:
        print("Bing search failed:", e)
        return set()

def search_google():
    query = 'site:instagram.com/calyxe_unisex_salon'
    url = 'https://www.google.com/search?q=' + urllib.parse.quote(query)
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}
    try:
        r = requests.get(url, headers=headers, timeout=10)
        print("Google Status:", r.status_code)
        matches = re.findall(r'instagram\.com/(?:p|reel)/([A-Za-z0-9_-]+)', r.text)
        print("Google post codes:", set(matches))
        return set(matches)
    except Exception as e:
        print("Google search failed:", e)
        return set()

if __name__ == '__main__':
    all_codes = set()
    all_codes.update(search_ddg())
    all_codes.update(search_bing())
    all_codes.update(search_google())
    print("Total Unique Shortcodes found:", len(all_codes), all_codes)
