import { breakPointAdd } from "./breakPoint.js"

const loadSVG = async (filename) => {
    const content = document.createElement("div")
    content.classList.add("svgContent")
    await fetch("./asset/img/svg/" + filename).then((val) => { return val.text() }).then((val) => {
        content.innerHTML = val.substring(val.indexOf("<svg"));
    })
    return content
}

const fillSVG = (svg, ...color) => {
    const SVGelem = [...svg.querySelectorAll("rect"),...svg.querySelectorAll("path")]
    let j = 0;
    
    for (let i = 0; i < SVGelem.length; i++) {
        if (color != "") SVGelem[i].style.fill = color[j];
        if (j < color.length - 1) j++
    }
}

const breakPointSide = (div) => {
    const plH = document.getElementById("playlist").clientHeight;
    let divH = div.style.height
    window.innerWidth >= 720 ? divH = plH + "px" : divH = "100%";
    div.style.height = divH;
}

const initInfo = async () => {
    let artist = tracklist[currentImg].auteur;
    let id = await fetch("https://musicbrainz.org/ws/2/artist/?query=" + artist + "&fmt=json").then((val) => { return val.json() }).then((val) => { return val.artists[0].id })
    let album = await fetch("https://musicbrainz.org/ws/2/release-group?artist=" + id + "&fmt=json&type=album").then((val) => { return val.json() }).then((val) => { return val["release-groups"] });
    const div = document.createElement("div");

    if (document.querySelector("#side")) {
        document.querySelector("#side").innerHTML = ""
    }
    for (let i = 0; i < album.length; i++) {
        const pInsert = document.createElement("p");
        pInsert.textContent = album[i].title;
        div.append(pInsert)
    }

    if (!document.getElementById("side")) {
        const side = document.createElement("section");
        side.id = "side";
        side.classList.add("sideTranslateX")
        document.getElementById("playlist").after(side)
    }
    const sideBut = document.createElement("div")
    const svg = await loadSVG("onglet.svg")
    side.append(sideBut)
    sideBut.id = "sideButton"
    sideBut.append(svg);
    fillSVG(svg, "#e08d00")
    svg.addEventListener("click", () => {
        side.classList.toggle("sideTranslateX")
    })
    side.append(div)
    breakPointAdd(breakPointSide, side)

}

export { loadSVG, fillSVG, initInfo }

