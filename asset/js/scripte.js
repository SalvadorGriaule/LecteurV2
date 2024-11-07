import { initImg } from "./modules/initImg.js";
import { initNavigation ,nextTrack } from "./modules/initNavigation.js";
import {initTxt} from "./modules/initTxt.js";
import { tracklist } from "./datajs/track.js";
import { playlist } from "./modules/playlist.js";
import "./hammer.js"

globalThis.musicHist = [];
globalThis.modeLect = false;
globalThis.tracklist = tracklist
globalThis.dataSlider = [];

tracklist.forEach((track) => {
    dataSlider.push({urlImg:track.cover,title:track.titre,textContent:track.auteur})
})

globalThis.carousel = document.querySelector("#carousel");
globalThis.hammertime = new Hammer(carousel)


globalThis.currentImg = 0;
globalThis.currentTrack = new Audio("/asset/audio/"+tracklist[currentImg].audio)
currentTrack.addEventListener("ended",nextTrack);

initImg();
initNavigation();
initTxt();
playlist();