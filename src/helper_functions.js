function create_svg(cur_x, cur_y, scale, address, color) {
    let div = document.createElement("div");
        div.style.position = "absolute"
        div.style.left = `${cur_x}px`;
        div.style.top = `${cur_y}px`;
        fetch(address).then(r => r.text()).then(text => {
        let parser = new DOMParser();
        let my_svg = parser.parseFromString(text, "image/svg+xml");
        let viewBox = my_svg.documentElement.getAttribute("viewBox").split(/\s+|,/);
        let width = my_svg.documentElement.getAttribute("width")
        let height = my_svg.documentElement.getAttribute("height");
        let view_width = viewBox[2] * scale;
        let view_height = viewBox[3] * scale
        my_svg.documentElement.setAttribute("viewBox", "0 0" + " " + view_width + " " + view_height); 
        if (color !== "") {
            
            let svgShapes = my_svg.documentElement.querySelectorAll('path');
            svgShapes.forEach(function(shape) {
                shape.setAttribute('fill', 'black');
            });
        }
        div.appendChild(my_svg.documentElement);
        document.getElementById("main_div").appendChild(div);
        return my_svg;
    }).catch(console.error.bind(console));
}


export {create_svg}