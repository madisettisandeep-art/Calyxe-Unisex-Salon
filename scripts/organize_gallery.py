import os
import hashlib
import json
from PIL import Image

dirpath = os.path.abspath(r'c:\Calyxe Unisex Salon\public\gallery\instagram')
files = sorted([f for f in os.listdir(dirpath) if f.endswith('.jpg')])

hashes = {}
unique_files = []

for f in files:
    p = os.path.join(dirpath, f)
    with open(p, 'rb') as fp:
        h = hashlib.md5(fp.read()).hexdigest()
    if h not in hashes:
        hashes[h] = f
        with Image.open(p) as img:
            w, h_px = img.size
            fmt = img.format
        sz_kb = os.path.getsize(p) // 1024
        unique_files.append({
            'original_file': f,
            'hash': h,
            'width': w,
            'height': h_px,
            'format': fmt,
            'size_kb': sz_kb
        })
    else:
        # duplicate
        os.remove(p)

print(f"Remaining unique files: {len(unique_files)}")
for idx, item in enumerate(unique_files):
    old_p = os.path.join(dirpath, item['original_file'])
    new_name = f"calyxe_img_{idx+1:02d}.jpg"
    new_p = os.path.join(dirpath, new_name)
    if old_p != new_p:
        os.rename(old_p, new_p)
    item['cleaned_name'] = new_name
    w, h = item['width'], item['height']
    sz = item['size_kb']
    print(f"  {new_name}: {w}x{h} ({sz} KB)")

with open(os.path.join(dirpath, 'gallery_index.json'), 'w', encoding='utf-8') as f:
    json.dump(unique_files, f, indent=2)

print("Gallery index saved to gallery_index.json")
