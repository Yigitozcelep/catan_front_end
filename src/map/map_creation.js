
let x = 30
let y = 230

const DISTANCE_X = 54.5;
const DISTANCE_Y = 90;

function create_svg(cur_x, cur_y, scale, address) {
    let div = document.createElement("div");
        div.style.position = "absolute"
        div.style.left = `${cur_x}px`;
        div.style.top = `${cur_y}px`;
        fetch(address).then(r => r.text()).then(text => {
        div.innerHTML += text;
    }).catch(console.error.bind(console));
    document.getElementById("main_div").appendChild(div);
}


function create_hexagons(plus_x, plus_y, list) {
    for (let i = 0; i < list.length; i++) {
        x += plus_x;
        y += plus_y;
        create_svg(x,y, 1, `./svg/hexagons/${list[i].hexagon_type}_hexagon.svg`);
        if (list[i].hexagon_type === "water") continue;
        create_svg(x + 34, y + 30, 1, `./svg/shapes/${list[i].hexagon_type}.svg`)
        create_svg(x + 41, y+70, 1, `./svg/nums/num${list[i].num}.svg`)
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
