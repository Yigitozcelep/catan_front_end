import {create_svg } from "../helper_functions.js";

let x = 30
let y = 230

const DISTANCE_X = 54.5;
const DISTANCE_Y = 90;

let port_counter = 0;
const PORT_NUMS = [1,2,3,3,4,5,5,6,1];
const PORT_DISTANCE = [[-85,20], [-40, 90], [55,90], [55,90], [105,25], [55,-62], [55,-62], [-30, -70], [-85,20]]
const SHAPE_DISTANCE = [[-64,27], [-20, 130], [108,132], [108,130], [155,35], [105,-55], [105,-55], [-7, -63], [-65,28]]


function create_port(el) {
    let [port_x, port_y] = PORT_DISTANCE[port_counter];
    let [shape_x, shape_y] = SHAPE_DISTANCE[port_counter];
    create_svg(x + port_x,y + port_y, 1,`./svg/ports/port${PORT_NUMS[port_counter]}.svg`, "");
    create_svg(x + shape_x, y + shape_y, 2, `./svg/shapes/${el.port.toLowerCase()}.svg`, "#000000")
    let address = el.port === "questionmark" ? `./svg/ports/num31.svg` : `./svg/ports/num21.svg`;
    create_svg(x + shape_x + 4, y + shape_y + 19, 2, address, "#000000")
    port_counter += 1;
}

function create_hexagons(plus_x, plus_y, list) {
    for (let i = 0; i < list.length; i++) {
        x += plus_x;
        y += plus_y;
        create_svg(x,y, 1, `./svg/hexagons/${list[i].hexagon_type}_hexagon.svg`, "");
        if (list[i].hexagon_type === "water") continue;
        create_svg(x + 34, y + 30, 1, `./svg/shapes/${list[i].hexagon_type}.svg`, "")
        if (list[i].hexagon_type === "desert") create_svg(x + 23, y + 55, 1, "./svg/shapes/knight.svg", "");
        else create_svg(x + 41, y + 70, 1, `./svg/nums/num${list[i].num}.svg`, "")
        if (list[i].port !== "none") create_port(list[i]);
    }
}

function create_diognal_right_down(list) {create_hexagons(DISTANCE_X, DISTANCE_Y, list);}
function create_left_to_right(list) {create_hexagons(DISTANCE_X * 2, 0, list)}
function create_diognal_right_up(list) {create_hexagons(DISTANCE_X, -DISTANCE_Y, list)}
function create_diognal_left_up(list) {create_hexagons(-DISTANCE_X, -DISTANCE_Y, list);}
function create_right_to_left(list) {create_hexagons(-DISTANCE_X * 2, 0, list);}
function create_diognal_left_down(list) {create_hexagons(-DISTANCE_X, DISTANCE_Y, list)}
function create_middle(list) {create_diognal_right_down(list);}

export default function create_map(list) {
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

export {create_svg}