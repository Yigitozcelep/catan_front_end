import {create_type_shape, create_a_element} from "./create_shapes.js";
import { HEIGHT_SQUARE, WIDTH_SQUARE, HEIGHT_HEXAGON, WIDTH_HEXAGON } from "./constants.js";

class Hexagon {
    
    create_a_square() {
        let square = create_a_element(this.square_left, this.square_top, " square");
        if (this.type === "water" || this.type == "desert") square.style.visibility = "hidden";
        return square;
    }

    create_a_num_place() {
        let plus = 0;
        let my_class = " num";
        if (this.num === 6 || this.num === 8) my_class += " special_num";
        if (this.num >= 10) {plus = - (WIDTH_SQUARE / 7);}
        let my_num = create_a_element(this.num_left + plus, this.num_top, my_class)
        my_num.innerHTML += this.num;
        if (this.type === "water" || this.type == "desert") my_num.style.visibility = "hidden";
        return my_num;
    }
    
    constructor(top, left, num, type) {
        this.num = num;
        this.type = type;
        this.top = top;
        this.left = left;

        this.square_left = left + WIDTH_HEXAGON / 2 - WIDTH_SQUARE / 2;
        this.square_top =  top +( 5 * (HEIGHT_HEXAGON / 7)) - (HEIGHT_SQUARE / 2);

        this.num_left = this.square_left +  (2 * WIDTH_SQUARE) / 5;
        this.num_top = this.square_top + HEIGHT_SQUARE / 6;

        this.hexagon_place = create_a_element(left, top, ` hexagon ${type}_color`);
        this.square_place = this.create_a_square();
        this.num_place = this.create_a_num_place();
        create_type_shape(this.square_left, this.square_top, type);
    }
}


export default Hexagon
export {WIDTH_HEXAGON, HEIGHT_HEXAGON}