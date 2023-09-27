import {createSvg, createMap} from "./map/map_creation.js";
import { waitListener, zIndex, waitForElm } from "./helper_functions.js";
import {createItems} from "./bars/right_bar.js"


const invoke = window.__TAURI__.invoke
const MAIN_DIV = document.getElementById("main_div");
const RIGHT_BAR_DIV = document.getElementById("right_bar");

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

const getCurrentPlayer = async () => JSON.parse(await invoke("get_current_player"))

const getBankInfo = async () => JSON.parse(await invoke("get_bank"));
    
const getDeckInfo = async () => JSON.parse(await invoke("get_deck"));


const get_coor = (list) => {
    let num = Math.floor(list[0] / 4);
    const left = (18.2 + 2.2 * list[1]) - 1.1;
    const top = (num * 7.65) + (list[0] - num * 4) * 1.275 - 1.1 + 12.35
    return [left, top]
}

const nextRound = () => {
    console.log("gelyor")
    invoke("end_turn");
}

const buildHouse = () => {

}

const buildRoad = () => {

}

const buyDevCard = () => {

}


const COLORS = ["blue", "green", "orange", "red"]
const createHouse = async (i, j, left, top, player) => {
    await createSvg(3.4,2.3, left - 0.6, top - 0.2, `./svg/houses/${COLORS[player]}_house.svg`, [zIndex("10")]);
    await invoke("make_house", {x: i, y: j});
}

const getHouses = async (buttons, events, promises, currentPlayer) => {
    let res = eval(await invoke("get_housable_points"));
    let counter = 0;
    for (let part of res) {
        counter += 1;
        let [left, top] = get_coor(part);
        promises.push(createSvg(2.2, 2.2, left, top,"./svg/movable_point/movable_point.svg", [zIndex("6")]).then(div => {
            buttons.push(div);
            events.push(waitListener(div, "click", [() => createHouse(part[0], part[1], left, top, currentPlayer)]))
        }));
    }
}

const getRoads = (buttons, events, promises) => {
   
}

const getDevCards = (buttons, events, promises) => {

}


const createButtons = async (buttons, events, promises, currentPlayer) => {
    await getHouses(buttons, events, promises, currentPlayer);
    getRoads(buttons, events, promises);
    getDevCards(buttons, events, promises);
}


const createRightBar = async () => {
    const bankInfo = await getBankInfo();
    const playerInfo = await getPlayerInfo();
    const deckInfo = await getDeckInfo();
    createItems(bankInfo, deckInfo, playerInfo);
}


const createRound = async () => {
    const currentPlayer = await getCurrentPlayer();
    let promises = [];
    let buttons = [];
    let events = [];
    await createButtons(buttons, events, promises, currentPlayer);
    await Promise.all(promises)
    if (events.length === 0) nextRound();
    else {
        const button = await waitForElm(".end_turn_button");
        events.push(waitListener(button, "click", [() => {
                nextRound();
                while (RIGHT_BAR_DIV.firstChild) {
                    RIGHT_BAR_DIV.removeChild(RIGHT_BAR_DIV.lastChild)
                }
                createRightBar();
                createRound();
            }])
        )
        await Promise.race(events);
        for (let button of buttons) button.parentNode.removeChild(button);
    }
}


await createRightBar();
createRound();


createRandomMap();
await start();


export {createRightBar, createRound}