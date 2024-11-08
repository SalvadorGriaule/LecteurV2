import * as initN from "./initNavigation.js"

export const createPDiv = (hideNum, ...arg) => {
    const div = document.createElement("div");
    for (let i = 0; i < arg.length; i++) {
        const pInsert = document.createElement("p");
        pInsert.textContent = arg[i];
        if (i >= hideNum) pInsert.classList.add("hideP");
        div.append(pInsert)
    }
    return div
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
    const divP = createPDiv(2, tabSend.auteur, tabSend.titre, tabSend.album, tabSend.annee);

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

export const playlist = () => {
    const divPL = document.createElement("div");
    divPL.id = "playlist"
    tabPL(tracklist, divPL)
    document.querySelector("#parent").after(divPL)
}