document.addEventListener('DOMContentLoaded', function () {
    const squares = document.querySelectorAll('.square');
    let selectedSquare = null;


    // shuffle the images
    const imageSources = [];

    for (let i = 0; i < squares.length; i++) {
        imageSources.push(`/image${i + 1}.jpg`);
    }

    for (let i = 0; i < imageSources.length - 1; i++) {
        const j = Math.floor(Math.random() * (imageSources.length - i) + i);
        const temp = imageSources[i];
        imageSources[i] = imageSources[j];
        imageSources[j] = temp;
    }

    squares.forEach((square, i) => {
        square.innerHTML = `<img src="${imageSources[i]}" alt="Image ${i + 1}">`;
    });
    

    // add click event listener to each square
    squares.forEach(square => {
        square.addEventListener('click', function () {
            if (selectedSquare === null) {
                selectedSquare = this;
                this.classList.add('selected');
            } else {
                const index1 = parseInt(selectedSquare.dataset.index);
                const index2 = parseInt(this.dataset.index);
                swapSquares(index1, index2);
                selectedSquare.classList.remove('selected');
                selectedSquare = null;

                // check if puzzle is solved
                if (isPuzzleSolved()) {
                    // i added a delay cuz sometimes it shows the alert message first before the last image is moved to its correct place
                    setTimeout(() => {
                        alert('Congratulations! You solved the puzzle!');
                    }, 200);
                }
            }
        });
    });

    function swapSquares(index1, index2) {
        const temp = squares[index1].innerHTML;
        squares[index1].innerHTML = squares[index2].innerHTML;
        squares[index2].innerHTML = temp;
    }

    function isPuzzleSolved() {
        const squaresArray = Array.from(squares);
        console.log(squaresArray);
        for (let i = 0; i < squaresArray.length; i++) {
            const imgSrc = squaresArray[i].querySelector('img').getAttribute('src');
            console.log(`Square ${i + 1} image source: ${imgSrc}`);
            const expectedSrc = `/image${i + 1}.jpg`; // assumign images are naemd image1.jpg, image2.jpg, etc.
            console.log(imgSrc)
            console.log(expectedSrc)
            if (imgSrc !== expectedSrc) {
                return false;
            }
        }
        return true;
    }
    
    
});
