import * as initN from "./initNavigation.js"

const tabPL = (tab,target) => {
    const divPack = document.createElement("div"); 
    divPack.classList.add("track")
    const divImg = document.createElement("div");
    const img = document.createElement("img");
    const divP = document.createElement("div");
    const pAuter = document.createElement("p");
    const pTitre = document.createElement("p");
    img.src = `./asset/img/cover/${tab[tab.length-1].cover}`;
    img.width = 45;
    img.height = 45;
    pAuter.textContent = tab[tab.length-1].auteur;
    pTitre.textContent = tab[tab.length-1].titre
    divImg.append(img);
    divP.append(pAuter);
    divP.append(pTitre);
    divPack.append(divImg);
    divPack.append(divP)
    let j = tab.length-1
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
    
    if(tab.length >1) return tabPL(tab.slice(0,tab.length - 1),target)
}

export const playlist = () => {
    const divPL = document.createElement("div");
    divPL.id = "playlist"
    tabPL(tracklist,divPL)
    document.querySelector("#parent").after(divPL)
}