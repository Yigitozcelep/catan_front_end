import Hexagon, {HEIGHT_HEXAGON, WIDTH_HEXAGON} from "./game_states/hexagon.js";
import Game_State from "./game_states/game_controller.js";
import create_map from "./game_states/create_map.js";
import RightBar from "./bars/right_bar.js";

const invoke = window.__TAURI__.invoke
let game_state = new Game_State();
let right_bar = new RightBar(game_state.players);

invoke('get_random_map').then((message) => {
    let res = [];
    for (let i = 0; i < 18; i++) res.push({"num": 0, "resource": "wool", "hexagon_type": "water"})
    let data = eval(message);
    for (let i = 0; i < data.length; i++) res.push(data[i]);
    create_map(res);
})



