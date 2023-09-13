import {createSvg, createMap} from "./map/map_creation.js";
import { waitListener, zIndex } from "./helper_functions.js";
import {createItems} from "./bars/right_bar.js"


const invoke = window.__TAURI__.invoke
const MAIN_DIV = document.getElementById("main_div");

const createRandomMap = () => {
    invoke('get_random_map').then((gameString) => {
        let res = [];
        for (let i = 0; i < 18; i++) res.push({"num": 0, "resource": "wool", "hexagon_type": "water"})
        let data = JSON.parse(gameString.toLowerCase());
        for (let i = 0; i < data.length; i++) res.push(data[i]);
        createMap(res);
    })
}

const getPlayerInfo = async () => JSON.parse(await invoke("get_players"))

const getBankInfo = async () => JSON.parse(await invoke("get_bank"));
    
const getDeckInfo = async () => JSON.parse(await invoke("get_deck"));

const createRightBar = () => {

}

const get_coor = (list) => {
    let num = Math.floor(list[0] / 4);
    const left = (18.2 + 2.2 * list[1]) - 1.1;
    const top = (num * 7.65) + (list[0] - num * 4) * 1.275 - 1.1 + 12.35
    return [left, top]
}

const nextRound = () => {

}

const buildHouse = () => {

}

const buildRoad = () => {

}

const buyDevCard = () => {

}


const getHouses = async (buttons, events, promises) => {
    let res = eval(await invoke("get_housable_points"));
    let counter = 0;
    for (let part of res) {
        counter += 1;
        let [left, top] = get_coor(part);
        promises.push(createSvg(2.2, 2.2, left, top,"./svg/movable_point/movable_point.svg", [zIndex("6")]).then(div => {
            buttons.push(div);
            events.push(waitListener(div, "click"))
        }));
    }
}

const getRoads = (buttons, events, promises) => {
   
}

const getDevCards = (buttons, events, promises) => {

}


const createButtons = async (buttons, events, promises) => {
    await getHouses(buttons, events, promises);
    await getRoads(buttons, events, promises);
    await getDevCards(buttons, events, promises);
}

const start = async () => {
    const bankInfo = await getBankInfo();
    const playerInfo = await getPlayerInfo();
    const deckInfo = await getDeckInfo();
    createRandomMap();
    createItems(bankInfo, deckInfo, playerInfo);
    for (let i = 0; i < 2; i++) {
        let promises = []
        let buttons = [];
        let events = [];
        await createButtons(buttons, events, promises);
        await Promise.all(promises)
        if (events.length === 0) nextRound();
        else {
            await Promise.race(events);
            for (let button of buttons) button.parentNode.removeChild(button);

        }
    }
}

await start()
