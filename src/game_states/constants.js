function delete_calc_and_percantage(name) {
    return eval(name.slice(5, -2))
}

function get_css_constant(name, modification) {
    let root = document.querySelector(':root');
    let rootStyles = getComputedStyle(root);
    let result = rootStyles.getPropertyValue("--" + name);
    return modification(result);
}

const WIDTH_HEXAGON = get_css_constant("WIDTH_HEXAGON", delete_calc_and_percantage);
const HEIGHT_HEXAGON = get_css_constant("HEIGHT_HEXAGON", delete_calc_and_percantage);

const WIDTH_SQUARE = get_css_constant("WIDTH_SQUARE", delete_calc_and_percantage);
const HEIGHT_SQUARE = get_css_constant("HEIGHT_SQUARE", delete_calc_and_percantage);

const HEIGHT_NUM = get_css_constant("HEIGHT_NUM", delete_calc_and_percantage);
const WIDTH_NUM = get_css_constant("WIDTH_NUM", delete_calc_and_percantage);


const WIDTH_LAMBUR_BLOCK = get_css_constant("WIDTH_LAMBUR_BLOCK", delete_calc_and_percantage);
const HEIGHT_LAMBUR_BLOCK = get_css_constant("HEIGHT_LAMBUR_BLOCK", delete_calc_and_percantage);

const WIDTH_LAMBUR_LEAF = get_css_constant("WIDTH_LAMBUR_LEAF", delete_calc_and_percantage);
const HEIGHT_LAMBUR_LEAF = get_css_constant("HEIGHT_LAMBUR_LEAF", delete_calc_and_percantage);

const WIDTH_BRICK = get_css_constant("WIDTH_BRICK", delete_calc_and_percantage);
const HEIGHT_BRICK = get_css_constant("HEIGHT_BRICK", delete_calc_and_percantage);

const WIDTH_BODY_WOOL = get_css_constant("WIDTH_BODY_WOOL", delete_calc_and_percantage);
const HEIGHT_BODY_WOOL = get_css_constant("HEIGHT_BODY_WOOL", delete_calc_and_percantage);

const WIDTH_TAIL_WOOL = get_css_constant("WIDTH_TAIL_WOOL", delete_calc_and_percantage);
const HEIGHT_TAIL_WOOL = get_css_constant("HEIGHT_TAIL_WOOL", delete_calc_and_percantage);

const WIDTH_HEAD_WOOL = get_css_constant("WIDTH_HEAD_WOOL", delete_calc_and_percantage);
const HEIGHT_HEAD_WOOL = get_css_constant("HEIGHT_HEAD_WOOL", delete_calc_and_percantage);

const WIDTH_EYE_WOOL = get_css_constant("WIDTH_EYE_WOOL", delete_calc_and_percantage);
const HEIGHT_EYE_WOOL = get_css_constant("HEIGHT_EYE_WOOL", delete_calc_and_percantage);

const WIDTH_MOUTH_WOOL = get_css_constant("WIDTH_MOUTH_WOOL", delete_calc_and_percantage);
const HEIGHT_MOUTH_WOOL = get_css_constant("HEIGHT_MOUTH_WOOL", delete_calc_and_percantage);

const WIDTH_LEG_WOOL = get_css_constant("WIDTH_LEG_WOOL", delete_calc_and_percantage);
const HEIGHT_LEG_WOOL = get_css_constant("HEIGHT_LEG_WOOL", delete_calc_and_percantage);

const HEIGHT_GRAIN = get_css_constant("HEIGHT_GRAIN", delete_calc_and_percantage);
const WIDTH_GRAIN = get_css_constant("WIDTH_GRAIN", delete_calc_and_percantage);

const HEIGHT_ORE = get_css_constant("HEIGHT_ORE", delete_calc_and_percantage);
const WIDTH_ORE = get_css_constant("WIDTH_ORE", delete_calc_and_percantage);



export {WIDTH_HEXAGON, HEIGHT_HEXAGON, WIDTH_SQUARE, HEIGHT_SQUARE, HEIGHT_NUM, WIDTH_NUM, WIDTH_LAMBUR_BLOCK, HEIGHT_LAMBUR_BLOCK, WIDTH_LAMBUR_LEAF, HEIGHT_LAMBUR_LEAF, WIDTH_BRICK, HEIGHT_BRICK, WIDTH_BODY_WOOL, HEIGHT_BODY_WOOL, WIDTH_TAIL_WOOL, HEIGHT_TAIL_WOOL, WIDTH_HEAD_WOOL, HEIGHT_HEAD_WOOL, WIDTH_EYE_WOOL, HEIGHT_EYE_WOOL, WIDTH_MOUTH_WOOL, HEIGHT_MOUTH_WOOL, WIDTH_LEG_WOOL, HEIGHT_LEG_WOOL, HEIGHT_GRAIN, WIDTH_GRAIN, HEIGHT_ORE, WIDTH_ORE}