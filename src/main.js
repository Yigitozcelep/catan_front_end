import Hexagon, {HEIGHT_HEXAGON, WIDTH_HEXAGON} from "./game_states/hexagon.js";
import Game_State from "./game_states/game_controller.js";
import create_map from "./game_states/create_map.js";
import RightBar from "./bars/right_bar.js";

let game_state = new Game_State();
let right_bar = new RightBar(game_state.players);


function random_choice(list) {
    return list[Math.floor(list.length * Math.random())];
}

let something = [];
let data = ["lumber", "brick", "wool", "desert", "grain", "ore"];
let nums = [2,3,4,5,6,7,8,9,10,11,12]
for (let i = 0; i < 18; i++) something.push([0, "water"]);

for (let i = 0; i < 19; i++) something.push([random_choice(nums), random_choice(data)]);


create_map(something);


