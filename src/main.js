import create_map, {create_svg} from "./map/map_creation.js";



const invoke = window.__TAURI__.invoke

let game;

function create_random_map() {
    invoke('get_random_map').then((game_string) => {
        console.log(game_string);
        let res = [];
        for (let i = 0; i < 18; i++) res.push({"num": 0, "resource": "wool", "hexagon_type": "water"})
        let data = JSON.parse(game_string.toLowerCase());
        for (let i = 0; i < data.length; i++) res.push(data[i]);
        create_map(res);
    })
}


function waitListener(element, listerName) {
    return new Promise((resolve, reject) => {
        let listener = (event) => {
            element.removeEventListener(listerName, listener);
            resolve(event);
        }
        element.addEventListener(listerName, listener);
    })
}


function build_house() {

}

function build_road() {

}

function get_houses() {

}

function get_roads() {
   
}

function get_dev_cards() {

}

function buy_dev_card() {

}


async function start() {
    let res = create_svg(100, 100, 1, "./svg/movable_point/movable_point.svg", "");
    create_random_map()
}

start()


