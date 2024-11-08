import { createPDiv } from "./playlist.js";

const initImg = () => {
    
    const square = (number) => {
        fixedImage.width = moveImage.width = number;
        fixedImage.height = moveImage.height = number;
    }

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
            square(220);
            trackImg.forEach((value) => {
                value.classList.add("img720")
            })
            if(document.getElementById("div1080") && window.innerWidth < 1080){
                document.getElementById("parent").insertBefore(carousel,document.getElementById("div1080"))
                document.getElementById("div1080").remove()
            }
        } else {
            square(300);
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