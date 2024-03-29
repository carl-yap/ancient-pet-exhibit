import imageio.v2 as imageio

image = './puzzle/gallery/doggo_1_img3.png'
img = imageio.imread(image)
height, width, _ = img.shape
square_size = min(width, height) // 3

# counter for filenames
counter = 1

for y in range(3):
    for x in range(3):
        # coordinates for cropping
        left = x * square_size
        upper = y * square_size
        right = left + square_size
        lower = upper + square_size
       
        square = img[upper:lower, left:right]
        
        filename = './assets/puzzles/doggo_1/piece' + str(counter) + '.jpg'
        
    
        imageio.imwrite(filename, square) # save image
        counter += 1