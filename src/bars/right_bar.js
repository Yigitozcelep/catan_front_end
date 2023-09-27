import { scale } from "../helper_functions.js";
const right_bar_div = document.getElementById("right_bar");


const createItems = (bankInfo, deckInfo, playerInfo) => {
    createEndTurn();
    const resources_names = ["grain", "lumber", "brick", "ore", "wool"]
    const dev_names = ["knight_card", "victory_card", "any_2_card", "monopoly_card", "road_card"]
    const megaParentDiv = createContainerDiv(100, 80, "column");
    megaParentDiv.style.gap = "4vh"
    megaParentDiv.style.alignItems = "center";
    const bankDiv = createContainerDiv(90, 17, "column");
    bankDiv.style.border = "0.10vw solid"
    bankDiv.style.gap = "1vh"
    bankDiv.style.justifyContent = "center"
    bankDiv.appendChild(createTopPart("../svg/right_bar/bank.svg"))
    
    bankDiv.append(createResource(bankInfo.resources, resources_names, "../svg/shapes/"))
    bankDiv.appendChild(createResource(deckInfo.weights, dev_names, "../svg/dev_cards/"))
    megaParentDiv.appendChild(bankDiv);
    for (let player of playerInfo) {
        const resource_counts = [player.grain, player.lumber, player.brick, player.ore, player.wool];
        const dev_counts = [player.dev_knight, player.dev_victory, player.dev_any_2, player.dev_monopoly, player.dev_road];
        const playerDiv = createContainerDiv(90, 17, "column");
        playerDiv.style.border = "0.10vw solid"
        playerDiv.style.justifyContent = "center"
        playerDiv.style.gap = "1vh"
        playerDiv.appendChild(createTopPart(`../svg/right_bar/player_icons/player_${player.player_num}.svg`))
        playerDiv.appendChild(createResource(resource_counts, resources_names, "../svg/shapes/"));
        playerDiv.appendChild(createResource(dev_counts, dev_names, "../svg/dev_cards/"))
        megaParentDiv.appendChild(playerDiv)
    }
    right_bar_div.appendChild(megaParentDiv)
    return megaParentDiv;
}

const createEndTurn = () => {
    const button = document.createElement("button");
    button.textContent = "END TURN" ;
    button.classList.add("end_turn_button");
    right_bar_div.appendChild(button);
}

const createContainerDiv = (width, height, flexDirection="row") => {
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.width = `${width}%`;
    div.style.height = `${height}%`;
    div.style.flexDirection = flexDirection;
    return div;
}


const createTopPart = (address) => {
    const containerDiv = createContainerDiv(100, 25);
    containerDiv.style.justifyContent = "center";
    const bank = document.createElement("img");
    bank.src = address
    bank.style.width = "100%"
    bank.style.height = "100%";
    containerDiv.appendChild(bank)
    return containerDiv;
}

const createResource = (counts, names, address) => {
    const mainContainer = createContainerDiv(100, 25, "row");
    mainContainer.style.justifyContent = "space-around"
    for (let i = 0; i < counts.length; i++) {
        const name = names[i];
        const count = counts[i];
        const currentContainer = createContainerDiv(100 / (counts.length + 1), 100, "row");
        currentContainer.style.border = "0.10vw solid"
        currentContainer.style.justifyContent = "space-around"
        currentContainer.style.alignItems = "center"
        const image = document.createElement("img");
            
        image.src = address + `${name}.svg`
        image.style.width = "60%";
        image.style.height = "80%";
        const text = document.createElement("p");
        text.innerHTML = count;
        text.style.fontSize = "1.4vw"
        currentContainer.appendChild(image);
        currentContainer.appendChild(text);
        mainContainer.appendChild(currentContainer)
    }
    return mainContainer
}

export {createItems}