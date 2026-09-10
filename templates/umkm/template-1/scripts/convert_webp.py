import os
import io
import sys
from PIL import Image

TARGET_KB = 100.0  # Max target size ~100KB

def optimize_image_to_webp(input_path, output_path=None, target_kb=TARGET_KB):
    if output_path is None:
        base, _ = os.path.splitext(input_path)
        output_path = base + '.webp'
    
    orig_size_kb = os.path.getsize(input_path) / 1024.0
    
    with Image.open(input_path) as im:
        orig_w, orig_h = im.size
        orig_mode = im.mode
        
        # Preserve transparency
        if orig_mode not in ('RGB', 'RGBA'):
            if 'A' in orig_mode or 'transparency' in im.info:
                im = im.convert('RGBA')
            else:
                im = im.convert('RGB')
        
        # Try max dimension limits: 1200, 1000, 800
        best_data = None
        best_size_kb = 0
        best_w, best_h = orig_w, orig_h
        best_q = 85
        
        max_dims = [min(orig_w, 1280), 1000, 800, 640]
        
        for md in max_dims:
            scale = min(1.0, md / max(orig_w, orig_h))
            cur_w = max(1, int(orig_w * scale))
            cur_h = max(1, int(orig_h * scale))
            
            if scale < 0.99:
                curr_im = im.resize((cur_w, cur_h), Image.Resampling.BILINEAR)
            else:
                curr_im = im
                
            # Binary search quality between 50 and 95
            low_q, high_q = 50, 95
            found_data = None
            found_size = 0
            found_q = low_q
            
            for _ in range(5):
                mid_q = (low_q + high_q) // 2
                buf = io.BytesIO()
                curr_im.save(buf, format='WEBP', quality=mid_q, method=4)
                size_kb = buf.tell() / 1024.0
                
                if size_kb <= target_kb:
                    found_data = buf.getvalue()
                    found_size = size_kb
                    found_q = mid_q
                    low_q = mid_q + 1  # try higher quality
                else:
                    high_q = mid_q - 1  # try lower quality
                    
            if found_data is not None and found_size <= target_kb:
                best_data = found_data
                best_size_kb = found_size
                best_w, best_h = cur_w, cur_h
                best_q = found_q
                if best_size_kb >= target_kb * 0.7:  # Close enough to ~100KB target
                    break

        if best_data is None:
            # Fallback
            buf = io.BytesIO()
            im.resize((800, int(orig_h * 800 / orig_w))).save(buf, format='WEBP', quality=65, method=4)
            best_data = buf.getvalue()
            best_size_kb = buf.tell() / 1024.0
            best_q = 65

        with open(output_path, 'wb') as f:
            f.write(best_data)
            
        reduction = (1 - (best_size_kb / orig_size_kb)) * 100 if orig_size_kb > 0 else 0
        return {
            'input': input_path,
            'output': output_path,
            'orig_kb': orig_size_kb,
            'webp_kb': best_size_kb,
            'dims': (best_w, best_h),
            'q': best_q,
            'reduction': reduction
        }

def main():
    root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'public'))
    print(f"Scanning images in: {root}", flush=True)
    
    photo_paths = [
        # Drinks
        os.path.join(root, 'assets', 'teh_in_6_minuman_clean', '01_original_tea.png'),
        os.path.join(root, 'assets', 'teh_in_6_minuman_clean', '02_matcha_latte.png'),
        os.path.join(root, 'assets', 'teh_in_6_minuman_clean', '03_milk_tea.png'),
        os.path.join(root, 'assets', 'teh_in_6_minuman_clean', '04_lemon_tea.png'),
        os.path.join(root, 'assets', 'teh_in_6_minuman_clean', '05_strawberry_tea.png'),
        os.path.join(root, 'assets', 'teh_in_6_minuman_clean', '06_peach_tea.png'),
        # Hero & Section Photos
        os.path.join(root, 'assets', 'individual', '01_teh_in_minuman_tatakan_buah.png'),
        os.path.join(root, 'assets', 'about brand.png'),
        os.path.join(root, 'assets', 'individual', 'keunggulan_hands_tea.jpg'),
        os.path.join(root, 'assets', 'background keunggulan.png'),
        os.path.join(root, 'assets', 'background.png'),
        os.path.join(root, 'assets', 'layer 2.png'),
        os.path.join(root, 'assets', 'layer 3.png'),
        os.path.join(root, 'footer layer 1.png'),
        os.path.join(root, 'footer layer 2.png'),
        os.path.join(root, 'assets', 'individual', '02_logo_teh_in.png'),
        os.path.join(root, 'assets', 'individual', 'daun_about.png'),
        os.path.join(root, 'assets', 'individual', '08_badge_racikan_asli_perasan_lemon.png'),
    ]
    
    results = []
    for p in photo_paths:
        if os.path.exists(p):
            res = optimize_image_to_webp(p)
            results.append(res)
            print(f"DONE: {os.path.basename(p)} ({round(res['orig_kb'],1)} KB) -> {os.path.basename(res['output'])} ({round(res['webp_kb'],1)} KB) [q={res['q']}, dims={res['dims']}]", flush=True)
        else:
            print(f"SKIP (not found): {p}", flush=True)
            
    print("\nSummary:", flush=True)
    total_orig = sum(r['orig_kb'] for r in results)
    total_webp = sum(r['webp_kb'] for r in results)
    print(f"Total Original: {total_orig/1024:.2f} MB", flush=True)
    print(f"Total WebP:     {total_webp/1024:.2f} MB ({total_webp:.1f} KB)", flush=True)
    print(f"Overall Space Saved: {((1 - total_webp/total_orig)*100):.1f}%", flush=True)

if __name__ == '__main__':
    main()
