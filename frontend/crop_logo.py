import sys
from PIL import Image, ImageChops

def crop_shield():
    # Attempting to crop just the shield portion from the image
    # Load Logo 1
    im = Image.open('public/images/Wave of Bengal Logo.png').convert("RGBA")
    
    # We need to find the bounding box of the non-transparent pixels
    # And then crop only the upper part where the shield is.
    bg = Image.new('RGBA', im.size, (0,0,0,0))
    diff = ImageChops.difference(im, bg)
    bbox = diff.getbbox()
    
    if bbox:
        # crop to bbox
        cropped = im.crop(bbox)
        # Assuming the shield is in the top 60% of the cropped image
        # and text is at the bottom, we can try cropping out the bottom text.
        width, height = cropped.size
        
        # Let's write another script that checks pixel columns to dynamically find the gap
        # between shield and text.
