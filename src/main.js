import {createSvg, createMap} from "./map/map_creation.js";
import { waitListener, zIndex, waitForElm, addColor } from "./helper_functions.js";
import {createItems} from "./bars/right_bar.js"


const invoke = window.__TAURI__.invoke
const MAIN_DIV = document.getElementById("main_div");
const RIGHT_BAR_DIV = document.getElementById("right_bar");
const COLORS = ["blue", "green", "orange", "red"]
const blueColor = "#0000FF";
const greenColor = "#008000";
const orangeColor = "#FFA500";
const redColor = "#FF0000";
const ROAD_COLORS = [blueColor, greenColor, orangeColor, redColor]

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
const makeHouse = async (i, j) => invoke("make_house", {x: i, y: j});

const get_coor = (list) => {
    let num = Math.floor(list[0] / 4);
    const left = (18.2 + 2.2 * list[1]) - 1.1;
    let top = (num * 7.65) + (list[0] - num * 4) * 1.275 - 1.1 + 12.35
    if ([3,7,11,15,19,23].includes(list[0])) {top += 1.275}
    return [left, top]
}


const nextRound = () => {
    invoke("end_turn");
}


const buyDevCard = () => {

}

const VERTICAL_ROADS = [3, 7, 11, 15, 19]
const RIGHT_ANGLED_ROADS = [1, 5, 9, 13, 17]
const getSuitableRoadOption = (i,j) => {
    if (VERTICAL_ROADS.includes(i)) {return 2}
    if (Math.floor(i / 4) % 2 === 0 && RIGHT_ANGLED_ROADS.includes(j)) {return 1}
    if (Math.floor(i / 4) % 2 === 1 && !RIGHT_ANGLED_ROADS.includes(j)) {return 1}
    return 3
}


const createRoad = async (i, j, left, top, player) => {
    let num = getSuitableRoadOption(i,j);
    const SIZES = [[6.2, 4.4], [1.4, 6.3], [6.2, 4.4]];
    let [width, height] = SIZES[num - 1];
    let address = `/svg/roads/road${num}.svg`
    let res = await createSvg(width, height, left - ((width / 2) - 1.1), top - ((height / 2) -1.1), address, [addColor(ROAD_COLORS[player])]); 
}



const createHouse = async (i, j, left, top, player) => {
    await createSvg(3.74 ,2.53, left - 0.77, top - 0.3, `./svg/houses/${COLORS[player]}_house.svg`, [zIndex("10")]);
    await makeHouse(i, j);
}

const createMovablePoint = async (functionName, buildSomeThingFunction, buttons, promises, events, currentPlayer) => {
    let res = eval(await invoke(functionName));
    let counter = 0;
    for (let part of res) {
        counter += 1;
        let [left, top] = get_coor(part);
        promises.push(createSvg(2.2, 2.2, left, top,"./svg/movable_point/movable_point.svg", [zIndex("6")]).then(div => {
            buttons.push(div);
            events.push(waitListener(div, "click", [() => buildSomeThingFunction(part[0], part[1], left, top, currentPlayer)]))
        }));
    }
}

const getHouses = async (buttons, events, promises, currentPlayer) => {
    await createMovablePoint("get_housable_points", createHouse, buttons, promises, events, currentPlayer)
}

const getRoads = async (buttons, events, promises, currentPlayer) => {
    await createMovablePoint("get_roads", createRoad, buttons, promises, events, currentPlayer);
}

const getDevCards = (buttons, events, promises, currentPlayer) => {

}


const createButtons = async (buttons, events, promises, currentPlayer) => {
    await getHouses(buttons, events, promises, currentPlayer);
    await getRoads(buttons, events, promises, currentPlayer);
    getDevCards(buttons, events, promises, currentPlayer);
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