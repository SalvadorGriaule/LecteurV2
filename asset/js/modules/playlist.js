import * as initN from "./initNavigation.js"

const createPDiv = (...arg) => {
    const div = document.createElement("div");
    div.classList.add("infoInPL")
    for (let i = 0; i < arg.length; i++) {
        const pInsert = document.createElement("p");
        pInsert.textContent = arg[i];
        div.append(pInsert)
    }
    return div
}

const hideP = (numStart, className) => {
    const target = document.querySelectorAll("."+className)
    for (let i = 0; target.length > 0 && i < target.length; i++) {
        for (let j = numStart; j < target[i].children.length; j++){
            target[i].children[j].classList.add("hideP")
        }
    }
}

const tabPL = (tab, target) => {

    const divPack = document.createElement("div");
    divPack.classList.add("track")

    const divImg = document.createElement("div");
    const img = document.createElement("img");
    img.src = `./asset/img/cover/${tab[tab.length - 1].cover}`;
    img.width = 45;
    img.height = 45;
    divImg.append(img);
    let tabSend = tab[tab.length - 1]
    const divP = createPDiv(tabSend.auteur, tabSend.titre, tabSend.album, tabSend.annee);

    divPack.append(divImg);
    divPack.append(divP);

    let j = tab.length - 1
    divPack.addEventListener("click", () => {
        currentImg = j
        currentTrack = new Audio("/asset/audio/" + tracklist[currentImg].audio);
        currentTrack.addEventListener("ended", () => {
            initN.shuffleTrack()
            currentTrack.play()
        });
        initN.moveImageEffect("slide-right");
        initN.changTxt();
    })
    target.append(divPack)

    if (tab.length > 1) return tabPL(tab.slice(0, tab.length - 1), target)
}

const playlist = () => {
    const divPL = document.createElement("div");
    divPL.id = "playlist"
    tabPL(tracklist, divPL)
    document.querySelector("#parent").after(divPL)
    hideP(2,"infoInPL")
}

export { playlist, hideP, createPDiv }