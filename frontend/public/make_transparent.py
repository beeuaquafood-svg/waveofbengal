import sys
from PIL import Image

def convert_to_transparent(image_path):
    # Open image and convert to RGBA
    img = Image.open(image_path).convert("RGBA")
    datas = img.getdata()
    
    new_data = []
    
    # Analyze the image first to find "background color" dynamically
    # The logo text/crest is gold, so r>150, g>120, b<150 roughly.
    # Background is dark grey/black.
    for item in datas:
        # Get brightness (average of RGB)
        avg = (item[0] + item[1] + item[2]) / 3
        
        # If it's a dark color (like dark grey or black), make it completely transparent
        if item[0] < 80 and item[1] < 80 and item[2] < 80:
            # Dark pixel -> Transparent
            new_data.append((0, 0, 0, 0))
        else:
            # We keep the gold pixel
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(image_path, "PNG")

if __name__ == "__main__":
    convert_to_transparent(sys.argv[1])
