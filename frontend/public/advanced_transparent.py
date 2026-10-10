import sys
import math
from PIL import Image

def convert_to_advanced_transparent(image_path):
    img = Image.open(image_path).convert("RGBA")
    datas = img.getdata()
    
    new_data = []
    
    # We want to extract the gold logo from the black/dark-grey background.
    # The background is assumed to be very dark.
    # We will use the brightness (luminance) of each pixel to define its alpha channel.
    for item in datas:
        r, g, b, a = item
        
        # Calculate perceived luminance
        luminance = (0.299 * r + 0.587 * g + 0.114 * b)
        
        if luminance < 50:
            # Strictly zero out the dark background and any compression noise
            new_data.append((0, 0, 0, 0))
        else:
            # For the gold pixels, we want them fully solid (alpha 255)
            # For intermediate pixels (anti-aliasing fringes), we scale the alpha
            # 50 -> 0 alpha, 100 -> 255 alpha
            alpha = int(min(255, max(0, (luminance - 50) * (255.0 / 50.0))))
            
            # As for the color, we want to restore pure gold, avoiding the grayish anti-aliasing.
            # But just keeping the original color and adjusting the alpha is usually enough.
            new_data.append((r, g, b, alpha))
            
    img.putdata(new_data)
    img.save(image_path, "PNG")

if __name__ == "__main__":
    convert_to_advanced_transparent(sys.argv[1])
