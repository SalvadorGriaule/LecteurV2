const loadSVG = async (filename) => {
    let result;
    const content = document.createElement("div")
    content.classList.add("svgContent")
    result = await fetch("./asset/img/svg/"+filename).then((val) => {return val.text()}).then((val) => {
        content.innerHTML = val.substring(val.indexOf("<svg"));
    })
    return content
}

const initInfo = async () => {
    let artist = tracklist[currentImg].auteur;
    let id = await fetch("https://musicbrainz.org/ws/2/artist/?query=" + artist + "&fmt=json").then((val) => { return val.json() }).then((val) => { return val.artists[0].id })
    let album = await fetch("https://musicbrainz.org/ws/2/release-group?artist=" + id + "&fmt=json&type=album").then((val) => { return val.json() }).then((val) => { return val["release-groups"] });
    const div = document.createElement("div");
    
    if (document.querySelector("#side")){
        document.querySelector("#side").innerHTML =""
    }
    for (let i = 0; i < album.length; i++) {
        const pInsert = document.createElement("p");
        pInsert.textContent = album[i].title;
        div.append(pInsert)
    }
    
    if(!document.getElementById("side")){
        const side = document.createElement("section");
        side.id = "side";
        document.getElementById("playlist").after(side)   
    }
    const sideBut = document.createElement("div")
    const svg = await loadSVG("onglet.svg")
    side.append(sideBut)
    sideBut.id = "sideButton"
    sideBut.append(svg);
    svg.querySelector("path").style.fill = "#d63501"
    console.log();
    
    side.append(div)

}

export {loadSVG,initInfo}

