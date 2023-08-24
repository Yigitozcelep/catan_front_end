import {create_a_element} from "../game_states/create_shapes.js"

const LEFT = 70;
const TOPS = [18, 32, 46, 60]
const ATTRIBUTES = [
    "TOT: ", "LUMBER: ", "GRAIN: ", "ORE: ", "BRICK: ", "WOOL: ",
    "MAX_ROAD: ", "MAX_ARMY: ", "DEV_VICTORY: ", "DEV_ARMY: ", 
    "DEV_ROAD:" , "DEV_MONOPOLY: ", "DEV_2_RESOURCES: ",
]

function getWidth() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
  }
  
  function getHeight() {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight
    );
  }

function convert_pixel_to_percantage(pixel) {
    return ( pixel / getWidth() ) * 100;
}
function create_text(data, text, current_left, current_top) {
    let res = create_a_element(current_left, current_top, " ");
    res.style.position = "absolute";
    res.style.fontSize = "9.5px"
    res.style.zIndex = 4;
    res.textContent += text + " 0";
    let next_left = convert_pixel_to_percantage(res.offsetWidth) + current_left + 1;
    if (next_left > 100) {
        res.hidden = true;
        return create_text(data, text, LEFT + 0.5, current_top + 3);
    }
    data.push(res);
    return [next_left, current_top];
}

class RightBar {
    create_divs(player_list) {
        let data = [];
        for (let player = 0; player < 4; player++) {
            let left = LEFT + 0.5;
            let top = TOPS[player] + 0.5;
            data.push([]);
            for (let i = 0; i < ATTRIBUTES.length; i++) {
                [left, top] = create_text(data[player], ATTRIBUTES[i], left, top)
            }
        }
    }

    constructor(player_list) {
        create_a_element(LEFT, TOPS[0], " player_red")
        create_a_element(LEFT, TOPS[1], " player_green")
        create_a_element(LEFT, TOPS[2], " player_blue")
        create_a_element(LEFT, TOPS[3], " player_orange")
        this.player_list = player_list;
        this.divs = this.create_divs(player_list, LEFT, TOPS[0]);
    }

}




export default RightBar;