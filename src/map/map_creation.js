import {createSvg, addColor, zIndex, scale} from "../helper_functions.js";

let x = 5
let y = 20

const DISTANCE_X = 4.4; 
const DISTANCE_Y = 7.65;


let portCounter = 0;
const PORT_NUMS = [1,2,3,3,4,5,5,6,1];
const PORT_HEIGHT_WIDTH = [[4.5, 5.85], [5.49, 5.13],   [5.13, 5.4],    [4.41, 5.85], [5.04, 5.49], [5.04, 5.67]]
const PORT_DISTANCE =     [[-4, 2.2],   [-0.3, 7.4],    [4, 7.4],       [8.5, 2],     [4.1,-2.6],   [-0.4,-2.8]]
const SHIP_DISTANCE =     [[-7, 2.2],   [-3, 10],       [6, 10],        [10, 2],      [6,-5.5],     [-2.8,-5.5]]


const createPort = (el) => {
    let [port_width, port_height] = PORT_HEIGHT_WIDTH[PORT_NUMS[portCounter] -1];
    let [port_x, port_y] = PORT_DISTANCE[PORT_NUMS[portCounter] -1];
    let [ship_x, ship_y] = SHIP_DISTANCE[PORT_NUMS[portCounter] -1];
    createSvg(port_width, port_height, x + port_x, y + port_y,`./svg/ports/port${PORT_NUMS[portCounter]}.svg`, [zIndex("2")]);
    createSvg(5.76, 4.95, x + ship_x, y + ship_y, "./svg/ports/ship.svg", [zIndex("3")])
    createSvg(3.6, 2.88, x + ship_x + 2, y + ship_y + 0.5, `./svg/shapes/${el.port.toLowerCase()}.svg`, [zIndex("4"), addColor("#000000"), scale("0.5")]);
    let address = el.port === "questionmark" ? `./svg/ports/num31.svg` : `./svg/ports/num21.svg`;
    createSvg(2.5,2.2, x + ship_x + 2.2, y + ship_y + 1.9, address, [zIndex("4"), addColor("#000000"), scale("0.5")]);
    portCounter += 1;
}

const createHexagons = (plus_x, plus_y, list) => {
    for (let i = 0; i < list.length; i++) {
        x += plus_x;
        y += plus_y;
        createSvg(8.7, 10, x, y,`./svg/hexagons/${list[i].hexagon_type}_hexagon.svg`);
        if (list[i].hexagon_type === "water") continue;
        createSvg(3.6, 2.88 , x + 2.5, y + 2.3, `./svg/shapes/${list[i].hexagon_type}.svg`, [zIndex("1")])
        if (list[i].hexagon_type === "desert") createSvg(1.8, 2.8, x + 1.2, y + 4.2, "./svg/shapes/knight.svg", [zIndex("1")]);
        else createSvg(2.25, 1.98, x + 3.225 , y + 5.85, `./svg/nums/num${list[i].num}.svg`, [zIndex("1")])
        if (list[i].port !== "none") createPort(list[i]);
    }
}

const createRightDown = (list) => createHexagons(DISTANCE_X, DISTANCE_Y, list)
const createLeftRight = (list) => createHexagons(DISTANCE_X * 2, 0, list)
const createRightUp = (list) => createHexagons(DISTANCE_X, -DISTANCE_Y, list)
const createLeftUp = (list) => createHexagons(-DISTANCE_X, -DISTANCE_Y, list)
const createRightLeft = (list) => createHexagons(-DISTANCE_X * 2, 0, list)
const createLeftDown = (list) => createHexagons(-DISTANCE_X, DISTANCE_Y, list)
const createMiddle = (list) => createRightDown(list)

const createMap = (list) => {
    let i = 0;
    let plus;
    let functionArray = [
        createRightDown, createLeftRight, createRightUp, 
        createLeftUp, createRightLeft, createLeftDown
    ];
    for (let len = 0; len < 3; len++) {
        for (let j = 0; j < functionArray.length; j++) {
            if (j === 0) plus = 4 - len;
            else if (j == functionArray.length - 1) plus = 2 - len;
            else plus = 3 - len;
            let currentList = list.slice(i, i + plus);
            i += plus;
            functionArray[j](currentList);
        }
    }
    createMiddle(list.slice(list.length -1, list.length));
}

export {createSvg, createMap}