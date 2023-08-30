
let x = 50
let y = 200

const DISTANCE_X = 45.5;
const DISTANCE_Y = 75;

let i = 0;

function create_svg(el, scale) {
    console.log(`${i}`, el);
    i += 1;
    let div = document.createElement("div");
        div.style.position = "absolute"
        div.style.top = `${y}px`;
        div.style.left = `${x}px`;
        fetch(`./svg/hexagons/${el.hexagon_type.toLowerCase()}_hexagon.svg`).then(r => r.text()).then(text => {
        div.innerHTML += text;
    }).catch(console.error.bind(console));
    document.getElementById("main_div").appendChild(div);
}


function create_hexagons(plus_x, plus_y, list) {
    for (let i = 0; i < list.length; i++) {
        x += plus_x;
        y += plus_y;
        create_svg(list[i], 1);
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
