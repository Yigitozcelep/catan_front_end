import {createSvg, createMap} from "./map/map_creation.js";
import { waitListener } from "./helper_functions.js";


const invoke = window.__TAURI__.invoke


const createRandomMap = () => {
    invoke('get_random_map').then((gameString) => {
        console.log(gameString);
        let res = [];
        for (let i = 0; i < 18; i++) res.push({"num": 0, "resource": "wool", "hexagon_type": "water"})
        let data = JSON.parse(gameString.toLowerCase());
        for (let i = 0; i < data.length; i++) res.push(data[i]);
        createMap(res);
    })
}

const nextRound = () => {

}

const buildHouse = () => {

}

const buildRoad = () => {

}

const buyDevCard = () => {

}


const getHouses = async (data) => {
    
}

const getRoads = (data) => {
   
}

const getDevCards = (data) => {

}


const createButtons = async () => {
    let main_div = document.getElementById("main_div");
    let data = []
    getHouses()
    getRoads()
    getDevCards()
    if (data.length === 0) nextRound();
    else await Promise.race(data);
}

const start = async () => {
    createRandomMap()
    for (let i = 0; i < 10; i++) {
        await createButtons()
    }
}


start()
