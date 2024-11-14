import { initInfo } from "./initMusicBrainz.js";
const css = (elem, style) => {
    for(const [key,value] of Object.entries(style)){
        elem.style[key] = value;
    }
}

export const initTxt = () => {
    const div = document.createElement("div");
    const divTxt = document.createElement("div");
    divTxt.id = "divT"
    const p = document.createElement("p");
    const h2 = document.createElement("h2");
    h2.textContent = Object.values(dataSlider[currentImg])[1]
    p.textContent = Object.values(dataSlider[currentImg])[2]
    divTxt.append(h2);
    divTxt.append(p);
    div.append(divTxt)
    div.classList.add("dph")
    initInfo()
    //css(div,{backgroundColor:"rgba(255, 63, 0, 0.61)", backdropFilter:"blur(8px)",position:"absolute",top:"0",zIndex:"3"})
    carousel.append(div)
}