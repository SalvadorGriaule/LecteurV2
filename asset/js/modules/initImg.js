const initImg = () => {
    
    const square = (number) => {
        fixedImage.width = moveImage.width = number;
        fixedImage.height = moveImage.height = number;
    }
    
    //console.dir(carousel);
    const fixedImage = document.createElement("img");
    fixedImage.classList.add("fixedImage");
    fixedImage.src = `./asset/img/cover/${dataSlider[currentImg].urlImg}`;
    carousel.append(fixedImage);

    const moveImage = document.createElement("img");
    moveImage.classList.add("moveImage");
    moveImage.src = `./asset/img/cover/${dataSlider[currentImg].urlImg}`;
    carousel.append(moveImage);
    if (window.innerWidth >= 720) {
        square(220);
    } else {
        square(300)
    }

    const resize = () => {
        console.log(window.innerWidth);
        if (window.innerWidth >= 720) {
            square(220);
        } else {
            square(300)
        }
    }

    window.onresize = resize;
}

export { initImg }  