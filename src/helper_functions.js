const addColor = (color) => {
    return (mySvg, myDiv) => {
        let svgShapes = mySvg.documentElement.querySelectorAll('path');
            svgShapes.forEach(function(shape) {
                shape.setAttribute('fill', color);
        });
    }
}

const zIndex = (z) => {
    return (mySvg, myDiv) => {
        myDiv.style.zIndex = z
    };
}

const addClass = (name) => {
    return (mySvg, myDiv) => {myDiv.classList.add(name)}
}

const counter = 0;
const scale = (num) => {
    return (mySvg, myDiv) => {
        let svgShapes = mySvg.documentElement.querySelectorAll('path');
            svgShapes.forEach(function(shape) {
            shape.setAttribute("transform", `scale(${num})`);
        });
    }
}

const createSvg = async (width, height, curX, curY, address, funcs = []) => {
    let div = document.createElement("div");
    div.style.position = "absolute"
    div.style.left = `${curX}vw`;
    div.style.top = `${curY}vw`;
    div.style.width = `${width}vw`
    div.style.height = `${height}vw`
    let response = await fetch(address);
    let text = await response.text();
    let parser = new DOMParser();
    let mySvg = parser.parseFromString(text, "image/svg+xml");
    for (let func of funcs) func(mySvg, div);
    mySvg = div.appendChild(mySvg.documentElement);
    div = document.getElementById("main_div").appendChild(div);
    return div;
}



const waitListener = (element, listerName, funcs=[]) => {
    return new Promise((resolve, reject) => {
        let listener = async (event) => {
            element.removeEventListener(listerName, listener);
            for (let func of funcs) await func();
            resolve(event);
        }
        element.addEventListener(listerName, listener);
    })
}


function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

export {createSvg, addColor, zIndex, scale, addClass, waitListener, waitForElm}