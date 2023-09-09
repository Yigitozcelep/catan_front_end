let add_color = (color) => {
    return (my_svg, my_div) => {
        let svgShapes = my_svg.documentElement.querySelectorAll('path');
            svgShapes.forEach(function(shape) {
                shape.setAttribute('fill', color);
        });
    }
}
let z_index = (z) => {
    return (my_svg, my_div) => {
        my_div.style.zIndex = z
    };
}

let counter = 0;
let scale = (num) => {
    return (my_svg, my_div) => {
        let svgShapes = my_svg.documentElement.querySelectorAll('path');
            svgShapes.forEach(function(shape) {
            shape.setAttribute("transform", `scale(${num})`);
        });
    }
}

let create_svg = async (cur_x, cur_y, address, funcs = []) => {
    let div = document.createElement("div");
    div.style.position = "absolute"
    div.style.left = `${cur_x}px`;
    div.style.top = `${cur_y}px`;
    let response = await fetch(address);
    let text = await response.text();
    let parser = new DOMParser();
    let my_svg = parser.parseFromString(text, "image/svg+xml");
    for (let func of funcs) func(my_svg, div);
    my_svg = div.appendChild(my_svg.documentElement);
    div = document.getElementById("main_div").appendChild(div);
    return div;
}

let waitListener = (element, listerName) => {
    return new Promise((resolve, reject) => {
        let listener = (event) => {
            element.removeEventListener(listerName, listener);
            resolve(event);
        }
        element.addEventListener(listerName, listener);
    })
}

export {create_svg, add_color, z_index, scale, waitListener}