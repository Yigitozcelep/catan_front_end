import { WIDTH_HEXAGON, HEIGHT_HEXAGON} from "./constants.js";
import Hexagon from "./hexagon.js";

const DISTANCE_X = (WIDTH_HEXAGON / 2) + 0.02;
const DISTANCE_Y = (HEIGHT_HEXAGON - HEIGHT_HEXAGON / 4) + 0.02;
let x = 0;
let y = HEIGHT_HEXAGON + (HEIGHT_HEXAGON / 2) + DISTANCE_Y;

x += -DISTANCE_X / 2;


function create_hexagons(plus_x, plus_y, list) {
    for (let i = 0; i < list.length; i++) {
        x += plus_x;
        y += plus_y;
        new Hexagon(y,x, list[i][0], list[i][1]);
    }
}


function create_diognal_right_down(list) {create_hexagons(DISTANCE_X, DISTANCE_Y, list);}
function create_left_to_right(list) {create_hexagons(DISTANCE_X * 2, 0, list)}
function create_diognal_right_up(list) {create_hexagons(DISTANCE_X, -DISTANCE_Y, list)}
function create_diognal_left_up(list) {create_hexagons(-DISTANCE_X, -DISTANCE_Y, list);}
function create_right_to_left(list) {create_hexagons(-DISTANCE_X * 2, 0, list);}
function create_diognal_left_down(list) {create_hexagons(-DISTANCE_X, DISTANCE_Y, list)}
function create_middle(list) {create_diognal_right_down(list);}

function create_map(list) {
    let i = 0;
    let plus;
    let function_array = [
        create_diognal_right_down, create_left_to_right, create_diognal_right_up, 
        create_diognal_left_up, create_right_to_left, create_diognal_left_down
    ];
    for (let len = 0; len < 3; len++) {
        for (let j = 0; j < function_array.length; j++) {
            if (j === 0) plus = 4 - len;
            else if (j == function_array.length - 1) plus = 2 - len;
            else plus = 3 - len;
            let current_list = list.slice(i, i + plus);
            i += plus;
            function_array[j](current_list);
        }
    }
    create_middle(list.slice(list.length -1, list.length));
}

export default create_map;