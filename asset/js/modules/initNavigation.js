import { initInfo } from "./initMusicBrainz.js";
import { loadSVG, fillSVG } from "./initMusicBrainz.js";

const moveImageEffect = (classEffect) => {
    document.querySelector(".moveImage").classList.add("transEffect");
    document.querySelector(".fixedImage").src = `./asset/img/cover/${dataSlider[currentImg].urlImg}`;
    document.querySelector(".moveImage").classList.add(classEffect);
    setTimeout(() => {
        document.querySelector(".moveImage").classList.remove("transEffect");
        document.querySelector(".moveImage").src = `./asset/img/cover/${dataSlider[currentImg].urlImg}`;
        document.querySelector(".moveImage").classList.remove(classEffect);
    }, 500)
}


const createNavBtn = (target, className, faClass) => {//next->fa-caret-right
    const div = document.createElement("div");
    div.classList.add(className);
    target.append(div);
    const i = document.createElement("i");
    i.classList.add("fa-solid");
    i.classList.add(faClass);
    div.append(i);
    return div;
}

const createNavSvg = async (target, className, svg) => {
    const divSvg = await loadSVG(svg)
    divSvg.classList.add(className)
    target.append(divSvg)
    return divSvg
}

const changTxt = () => {
    //divT = div>(h2+p)
    if (window.innerWidth > 1080) {
        document.querySelector("#div1080>div:last-of-type").classList.add("textFade");
        document.querySelector("#div1080>div:last-of-type").classList.add("fardIn");
        let infoP = document.querySelectorAll("#div1080>div:last-of-type p");
        setTimeout(() => {
            document.querySelector("#div1080>div:last-of-type").classList.remove("fardIn");
            document.querySelector("#div1080>div:last-of-type").classList.add("fardOut");
            infoP[0].textContent = tracklist[currentImg].titre;
            infoP[1].textContent = tracklist[currentImg].auteur;
            infoP[2].textContent = tracklist[currentImg].album;
            infoP[3].textContent = tracklist[currentImg].annee;
            document.querySelector("#div1080>div:last-of-type").classList.remove("fardOut");
        }, 500)
    }
    carousel.querySelector("#divT").classList.add("textFade");
    carousel.querySelector("#divT").classList.add("fardIn");
    setTimeout(() => {
        carousel.querySelector("#divT").classList.remove("fardIn");
        carousel.querySelector("#divT").classList.add("fardOut");
        carousel.querySelector("h2").textContent = dataSlider[currentImg].title;
        carousel.querySelector("p").textContent = dataSlider[currentImg].textContent;
        carousel.querySelector("#divT").classList.remove("fardOut");
    }, 500)
    initInfo()
}

const timePlayer = () => {
    const divTimer = document.createElement("div");
    const p = document.createElement("p")
    const divTimed = document.createElement("div");
    const timeProg = () => {
        let curentTT = new Date(currentTrack.currentTime * 1000).toISOString().substring(14, 19);
        let barProg = currentTrack.currentTime / currentTrack.duration * 100;
        p.textContent = curentTT;
        divTimed.style.width = `${barProg}%`
    }

    let interval
    if (!interval) {
        interval = setInterval(timeProg, 100, p)
    }
    const divTime = document.createElement("div");

    divTime.append(p)
    divTimer.append(divTimed)
    divTime.append(divTimer);
    document.querySelector("#commande").append(divTime)
    divTime.id = "GrpDiv"
    divTimer.id = "Timer";
    divTimed.id = "Timed"
    divTimer.addEventListener("click", (e) => {
        currentTrack.currentTime = e.offsetX * currentTrack.duration / divTimer.offsetWidth
    })
}

const shuffleTrack = () => {
    if (modeLect) {
        musicHist.push(currentImg);
        currentTrack.removeEventListener("ended", () => {
            shuffleTrack()
            currentTrack.play()
        })
        currentImg = Math.floor(Math.random() * tracklist.length)
        currentTrack = new Audio("/asset/audio/" + tracklist[currentImg].audio);
        currentTrack.addEventListener("ended", () => {
            shuffleTrack()
            currentTrack.play()
        });
        moveImageEffect("slide-right");
        changTxt();
    } else {
        nextTrack()
    }
}

const nextTrack = () => {
    currentTrack.removeEventListener("ended", () => {
        shuffleTrack()
        currentTrack.play()
    })
    currentImg === dataSlider.length - 1 ? currentImg = 0 : currentImg++;
    currentTrack = new Audio("/asset/audio/" + tracklist[currentImg].audio);
    currentTrack.addEventListener("ended", () => {
        shuffleTrack()
        currentTrack.play()
    });
    moveImageEffect("slide-right");
    changTxt();
}

const backTrack = () => {
    if (musicHist.length == 0) {
        currentImg === 0 ? currentImg = dataSlider.length - 1 : currentImg--;
    } else {
        currentImg = musicHist[musicHist.length - 1]
        musicHist.pop()
    }
    currentTrack = new Audio("/asset/audio/" + tracklist[currentImg].audio);
    moveImageEffect("slide-left");
    changTxt();
}

const initNavigation = async () => {
    const commande = document.createElement("div")
    commande.id = "commande";
    document.getElementById("parent").append(commande)
    const divBtn = document.createElement("div")
    divBtn.id = "commandeBtn"
    commande.append(divBtn)
    
    const divNext = createNavBtn(divBtn, "divNext", "fa-caret-right");
    divNext.addEventListener("click", shuffleTrack)
    
    const pauseSvg = await loadSVG("pause.svg")    
    fillSVG(pauseSvg,"#fff")
    const divPlay = createNavSvg(divBtn, "divPlay", "lect.svg").then((val) => {
        fillSVG(val,"#FFF")
        const playSvg = val.querySelector("svg").outerHTML;
        val.addEventListener("click", () => {
            if (currentTrack.paused) {
                currentTrack.play()
                val.innerHTML = pauseSvg.innerHTML;
            } else {
                currentTrack.pause()
                val.innerHTML = playSvg
            }
        })
    });

    const divSense = createNavBtn(divBtn, "divSense", "fa-arrow-right-long")
    divSense.addEventListener("click", () => {
        modeLect = !modeLect;
        divSense.querySelector("i").classList.toggle("fa-arrow-right-long");
        divSense.querySelector("i").classList.toggle("fa-shuffle");
    })

    const divPrev = createNavBtn(divBtn, "divPrev", "fa-caret-left");
    divPrev.addEventListener("click", backTrack)

    timePlayer()

}
export { initNavigation, nextTrack, moveImageEffect, changTxt, shuffleTrack }