import { createPDiv } from "./playlist.js";

const img2Square = (number,...target) => {
    target[target.length - 1].width = number
    target[target.length - 1].height = number
    if(target.length > 1) return img2Square(number,target.slice(0,target.length-1))
}

const initImg = () => {

    const breakPointImg = () => {
        let trackImg = document.querySelectorAll(".track img");
        if (window.innerWidth >= 1080 && !document.getElementById("div1080")) {
            const div1080 = document.createElement("div")
            div1080.id = "div1080";
            document.getElementById("parent").prepend(div1080);
            div1080.appendChild(carousel)
            let infoT = tracklist[currentImg]
            const divP = createPDiv(4,infoT.titre,infoT.auteur,infoT.album,infoT.annee)
            div1080.append(divP)
        } else if (window.innerWidth >= 720 ){
            img2Square(220,fixedImage,moveImage);
            trackImg.forEach((value) => {
                value.classList.add("img720")
            })
            if(document.getElementById("div1080") && window.innerWidth < 1080){
                document.getElementById("parent").insertBefore(carousel,document.getElementById("div1080"))
                document.getElementById("div1080").remove()
            }
        } else {
            img2Square(300,fixedImage,moveImage);
            trackImg.forEach((value) => {
                value.classList.remove("img720")
            })
        }
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
    breakPointImg()

    window.onresize = breakPointImg;
}

export { initImg }  