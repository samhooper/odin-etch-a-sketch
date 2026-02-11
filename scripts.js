const gridContainer = document.querySelector(".grid-container");
const newButton = document.querySelector("button");

function buildNewGrid(tilesPerSide = 4) {

    removeCurrentGrid();

    let gridWidth = gridContainer.clientWidth;
    let tileDimension = gridWidth / tilesPerSide;
    for (let i = 0; i < tilesPerSide; i++){
        let rowDiv = buildGridRow(tilesPerSide, tileDimension);
        gridContainer.appendChild(rowDiv);
    }

    function removeCurrentGrid() {
        let currentGridRows = document.querySelectorAll(".flex-container");
        for (let i = 0; i < currentGridRows.length; i++) {
            gridContainer.removeChild(currentGridRows[i]);
        }
    }
}

function buildGridRow(tilesPerSide, tileDimensions) {
    let rowDiv = document.createElement("div");
    rowDiv.setAttribute("class", "flex-container");
    for (let i = 0; i < tilesPerSide; i++){
        let tileDiv = buildTile(tileDimensions);
        rowDiv.appendChild(tileDiv);
    }

    return rowDiv;
}

function buildTile(tileDimension) {
    let tile = document.createElement("div");
    tile.setAttribute("class", "grid-tile");
    tile.style.width = tileDimension + "px";
    tile.style.height = tileDimension + "px";
    tile.addEventListener("mouseover", (e) => paintTile(e));
    return tile;
}

function randInt(limit) {
    return Math.floor(Math.random() * limit);
}

function paintTile(event) {
    let tile = event.target;
    let bgColor = tile.style.backgroundColor;
    if (bgColor === "") {
        tile.style.backgroundColor = `rgb(${randInt(256)}, ${randInt(256)}, ${randInt(256)})`;
    }
    
    if (tile.style.opacity <= 0.9) {
        tile.style.opacity = +tile.style.opacity + 0.1;
        console.log(tile.style.backgroundColor);
    }
}

function validateTilesPerSide(tilesPerSide) {
    tilesPerSide = Number(tilesPerSide);
    if (!Number.isInteger(tilesPerSide) || tilesPerSide > 100 || tilesPerSide < 1) {
        alert("Whoops, please make sure you enter a number between 1 & 100!");
        return false;
    }

    return true;
}

buildNewGrid();

newButton.addEventListener("click", function (e) {
    let tilesPerSide = prompt("How many tiles per side on your new grid?", "16");
    if (!validateTilesPerSide(tilesPerSide)) {
        return;
    }

    buildNewGrid(tilesPerSide);
});