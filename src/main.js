import create_map from "./map/map_creation.js";



const invoke = window.__TAURI__.invoke

invoke('get_random_map').then((message) => {
    let res = [];
    for (let i = 0; i < 18; i++) res.push({"num": 0, "resource": "wool", "hexagon_type": "water"})
    let data = eval(message.toLowerCase());
    for (let i = 0; i < data.length; i++) res.push(data[i]);
    create_map(res);
})

