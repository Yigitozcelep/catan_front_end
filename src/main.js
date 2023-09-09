import create_map, {create_svg} from "./map/map_creation.js";
import { waitListener } from "./helper_functions.js";


const invoke = window.__TAURI__.invoke


let create_random_map = () => {
    invoke('get_random_map').then((game_string) => {
        console.log(game_string);
        let res = [];
        for (let i = 0; i < 18; i++) res.push({"num": 0, "resource": "wool", "hexagon_type": "water"})
        let data = JSON.parse(game_string.toLowerCase());
        for (let i = 0; i < data.length; i++) res.push(data[i]);
        create_map(res);
    })
}

let next_round = () => {

}

let build_house = () => {

}

let build_road = () => {

}

let buy_dev_card = () => {

}


let get_houses = async (data) => {
    let moves = await invoke("get_housable_points");
    create_svg(193.5, 325, "./svg/movable_point/movable_point.svg")

}

let get_roads = (data) => {
   
}

let get_dev_cards = (data) => {

}


let create_buttons = async () => {
    let main_div = document.getElementById("main_div");
    let data = []
    get_houses()
    get_roads()
    get_dev_cards()
    if (data.length === 0) next_round();
    else await Promise.race(data);
}

let start = async () => {
    create_random_map()
    for (let i = 0; i < 10; i++) {
        await create_buttons()
    }
}


start()

