import sys
try:
    from PIL import Image
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'Pillow'])
    from PIL import Image

def make_bg_black(image_path):
    img = Image.open(image_path).convert("RGB")
    datas = img.getdata()
    
    # Estimate background from the absolute top-left pixel (which is just the background)
    bg = datas[0]
    
    new_data = []
    for item in datas:
        # Subtract background to make background exactly (0,0,0) so mix-blend-screen perfectly hides it
        # We scale the remaining values slightly so the gold stays bright.
        r = max(0, item[0] - bg[0])
        g = max(0, item[1] - bg[1])
        b = max(0, item[2] - bg[2])
        new_data.append((r, g, b))
        
    img.putdata(new_data)
    img.save(image_path, "PNG")
    print(f"Success! Subtracted background base '{bg}' making it pure black.")

if __name__ == "__main__":
    make_bg_black(sys.argv[1])
