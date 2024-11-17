import { createPDiv } from "./playlist.js";
import { breakPointAdd } from "./breakPoint.js";

const img2Square = (number,...target) => {
    target[target.length - 1].width = number
    target[target.length - 1].height = number
    if(target.length > 1) return img2Square(number,target.slice(0,target.length-1))
}

const breakPointImg = (...img) => {
    console.log(img,"img");
    let trackImg = document.querySelectorAll(".track img");
    if (window.innerWidth >= 1080 && !document.getElementById("div1080")) {
        const div1080 = document.createElement("div")
        div1080.id = "div1080";
        document.getElementById("parent").prepend(div1080);
        div1080.appendChild(carousel)
        let infoT = tracklist[currentImg]
        const divP = createPDiv(infoT.titre,infoT.auteur,infoT.album,infoT.annee)
        div1080.append(divP)
    } else if (window.innerWidth >= 720 ){
        img2Square(220,img[0],img[1]);
        trackImg.forEach((value) => {
            value.classList.add("img720")
        })
        if(document.getElementById("div1080") && window.innerWidth < 1080){
            document.getElementById("parent").insertBefore(carousel,document.getElementById("div1080"))
            document.getElementById("div1080").remove()
        }
    } else {
        img2Square(300,img[0],img[1]);
        trackImg.forEach((value) => {
            value.classList.remove("img720")
        })
    }
}

const initImg = () => {
    const fixedImage = document.createElement("img");
    fixedImage.classList.add("fixedImage");
    fixedImage.src = `./asset/img/cover/${dataSlider[currentImg].urlImg}`;
    carousel.append(fixedImage);

    const moveImage = document.createElement("img");
    moveImage.classList.add("moveImage");
    moveImage.src = `./asset/img/cover/${dataSlider[currentImg].urlImg}`;
    carousel.append(moveImage);
    breakPointAdd(breakPointImg,fixedImage,moveImage)
    
}

export { initImg }  