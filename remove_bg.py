from PIL import Image
import sys

def remove_white_background(image_path, output_path, threshold=240):
    try:
        img = Image.open(image_path)
        img = img.convert("RGBA")
        datas = img.getdata()
        
        newData = []
        for item in datas:
            # Check if the pixel is white or very close to white
            if item[0] >= threshold and item[1] >= threshold and item[2] >= threshold:
                newData.append((255, 255, 255, 0)) # Fully transparent
            else:
                newData.append(item)
                
        img.putdata(newData)
        img.save(output_path, "PNG")
        print(f"Successfully processed {image_path}")
    except Exception as e:
        print(f"Error processing image: {e}")
        sys.exit(1)

if __name__ == "__main__":
    logo_path = r"c:\Users\Kap Ajayi\Desktop\potec\public\logo.png"
    remove_white_background(logo_path, logo_path)
