import {WIDTH_HEXAGON, HEIGHT_HEXAGON, WIDTH_SQUARE, HEIGHT_SQUARE, HEIGHT_NUM, WIDTH_NUM, WIDTH_LAMBUR_BLOCK, HEIGHT_LAMBUR_BLOCK, WIDTH_LAMBUR_LEAF, HEIGHT_LAMBUR_LEAF, WIDTH_BRICK, HEIGHT_BRICK, WIDTH_BODY_WOOL, HEIGHT_BODY_WOOL, WIDTH_TAIL_WOOL, HEIGHT_TAIL_WOOL, WIDTH_HEAD_WOOL, HEIGHT_HEAD_WOOL, WIDTH_EYE_WOOL, HEIGHT_EYE_WOOL, WIDTH_MOUTH_WOOL, HEIGHT_MOUTH_WOOL, WIDTH_LEG_WOOL, HEIGHT_LEG_WOOL, HEIGHT_GRAIN, WIDTH_GRAIN, HEIGHT_ORE, WIDTH_ORE} from "./constants.js"


const main_div = document.getElementById("main_div");
function create_a_element(left, top, clases) {
    let my_div = document.createElement("div");
    my_div.className = clases;
    my_div.style.top = `${top}%`;
    my_div.style.left = `${left}%`;
    main_div.appendChild(my_div);
    return my_div;
}

function create_a_lumber(square_left, square_top, mul) {
    const block_left = square_left + (WIDTH_SQUARE / 2) - (WIDTH_LAMBUR_BLOCK / 2);
    const block_top = square_top - HEIGHT_LAMBUR_BLOCK - 0.4;
    const block = create_a_element(block_left , block_top, " bottom_of_lumber")
    
    const leaf_left = square_left;
    const leaf_top = block_top - (HEIGHT_HEXAGON) / 4;
    const leaf = create_a_element(leaf_left, leaf_top, " lumber_leaf");
    return [block, leaf];
}

function create_a_brick(squaer_left, square_top) {
    const row_1_left = squaer_left - (WIDTH_HEXAGON) / 14;
    const row_1_top = square_top - (HEIGHT_HEXAGON) / 3;
    const brick1 = create_a_element(row_1_left, row_1_top, " brick");
    const brick2 = create_a_element(row_1_left + WIDTH_HEXAGON / 4, row_1_top, " brick")
    const brick3 = create_a_element(row_1_left + WIDTH_HEXAGON / 8, row_1_top + HEIGHT_HEXAGON / 7, " brick")
    return [brick1, brick2, brick3]
}

function create_a_wool(squaer_left, square_top) {
    const wool_body_left = squaer_left - (WIDTH_HEXAGON) / 14;
    const wool_body_top = square_top - (HEIGHT_HEXAGON) / 3;
    const woold_body = create_a_element(wool_body_left, wool_body_top, " wool_body");
    
    const wool_tail_left = wool_body_left - 4 * (WIDTH_TAIL_WOOL) / 5;
    const wool_tail_top = wool_body_top - (HEIGHT_BODY_WOOL) / 4;
    const wool_tail = create_a_element(wool_tail_left, wool_tail_top, " wool_tail")

    const wool_head_left = wool_body_left + 3 * (WIDTH_BODY_WOOL) / 4 ;
    const wool_head_top = wool_body_top - (HEIGHT_HEAD_WOOL) / 3;
    const wool_head = create_a_element(wool_head_left, wool_head_top, " wool_head");

    const wool_eye_1_left = wool_head_left + (WIDTH_HEAD_WOOL) / 3;
    const wool_eye_1_top = wool_head_top + (HEIGHT_HEAD_WOOL) / 4;
    const wool_eye1 = create_a_element(wool_eye_1_left, wool_eye_1_top, " wool_eye")
    
    const wool_eye_2_left = wool_head_left + 2 * (WIDTH_HEAD_WOOL) / 3 ;
    const wool_eye_2_top = wool_head_top + (HEIGHT_HEAD_WOOL) / 4;
    const wool_eye2 = create_a_element(wool_eye_2_left, wool_eye_2_top, " wool_eye")

    const wool_mouth_left = wool_eye_1_left;
    const wool_mouth_top = wool_eye_1_top + (HEIGHT_HEAD_WOOL) / 4;
    const wool_mouth = create_a_element(wool_mouth_left, wool_mouth_top, " wool_mouth")

    const wool_leg_1_left = wool_body_left + (WIDTH_BODY_WOOL) / 5;
    const wool_leg_1_top = wool_body_top + (HEIGHT_BODY_WOOL);
    const wool_leg1 = create_a_element(wool_leg_1_left, wool_leg_1_top, " wool_leg")
    
    const wool_leg_2_left = wool_body_left + 5 * (WIDTH_BODY_WOOL) / 7;
    const wool_leg_2_top = wool_body_top + (HEIGHT_BODY_WOOL);
    const wool_leg2 = create_a_element(wool_leg_2_left, wool_leg_2_top, " wool_leg")
    return [woold_body, wool_tail, wool_head, wool_eye1, wool_eye2, wool_mouth, wool_leg1, wool_leg2];

}

function create_a_grain(square_left, square_top) {
    const grain_1_left = square_left + (WIDTH_SQUARE / 2) - (WIDTH_GRAIN / 2)
    const grain_1_top = square_top - HEIGHT_GRAIN - 0.4;
    const grain1 = create_a_element(grain_1_left, grain_1_top, " grain_1");
    
    const grain_2_left = grain_1_left;
    const grain_2_top = grain_1_top;
    const grain2 = create_a_element(grain_1_left + 0.3, grain_2_top, " grain_2");
    return [grain1, grain2];
}

function create_a_ore(square_left, square_top) {
    const ore_left = square_left + (WIDTH_SQUARE / 2) - (WIDTH_ORE / 2);
    const ore_top = square_top - HEIGHT_ORE - (HEIGHT_SQUARE) / 4;
    const ore = create_a_element(ore_left, ore_top, " ore")
    return [ore];
}

function create_type_shape(square_left, square_top, type, ) {
    if (type === "lumber") create_a_lumber(square_left, square_top);
    else if (type === "brick") create_a_brick(square_left, square_top);
    else if (type === "wool") create_a_wool(square_left, square_top);
    else if (type === "grain") create_a_grain(square_left, square_top);
    else if (type === "ore")  create_a_ore(square_left, square_top);
}



export {create_a_element, create_a_lumber, create_a_brick, create_a_wool, create_a_grain, create_a_ore, create_type_shape}