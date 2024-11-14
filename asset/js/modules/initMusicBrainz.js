export const initInfo = async () => {
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
    document.getElementById("side").append(div)
}

