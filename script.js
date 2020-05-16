let gridValue = document.querySelector('.input-value');
let gridContainer = document.querySelector('.grid-container');
let resetBtn = document.getElementById('reset').addEventListener('click', CreateNewGrid);
let chooseColor = document.querySelector('input[type="color"]');
let toggleGridOn = document.querySelector('#on');
toggleGridOn.addEventListener('click', ToggleGrid);
let toggleGridOff = document.querySelector('#off');
toggleGridOff.addEventListener('click', ToggleGrid);
let randomColor = document.querySelector('#random');
let eraser = document.querySelector('#eraser');
randomColor.addEventListener('click', ShowRandomColors);
eraser.addEventListener('mouseover', ClickEraser);
eraser.addEventListener('click', ClickEraser);
console.log(randomColor);
let bgColor = 'red';
let randomColorIsClicked = false;
chooseColor.addEventListener('change', CustomColor);

let div = [];

function CreateNewGrid(e) {
    toggleGridOff.checked = "true";
    if (div != null) { //Checks if the div already has children and if it does it removes them
        div.forEach((child) => {
            gridContainer.removeChild(child);
        });
    }
    let userInput = gridValue.value * gridValue.value;
    gridContainer.style.gridTemplateColumns = `repeat(${gridValue.value}, auto)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridValue.value}, auto)`;
    for (let i = 0; i < userInput; i++) {
        randomColorIsClicked = false;
        bgColor = 'red';
        div[i] = document.createElement('div');
        div[i].addEventListener('mouseover', colorDiv);
        div[i].addEventListener('click', colorDiv);
        gridContainer.appendChild(div[i]);
    }
}

let darkness = 50;

function colorDiv(e) {
    if (randomColorIsClicked) { //This returns false if other buttons have been clicked
        e.target.style.backgroundColor = ShowRandomColors(e, darkness);
        if (darkness <= 10 && darkness > 0) { //Incrementally darkens the random colors
            darkness -= 2;
            return
        } else if (darkness <= 50 && darkness > 0) {
            darkness -= 10;
            return
        } else if (darkness == 0) { //Darkness is equated to 50 when darkness is equal to zero and then the cycle begins again
            darkness = 50;
            return
        }
    }
    e.target.style.backgroundColor = bgColor; //If randomColorIsClicked is false then this happens
}

function CustomColor(e) {
    randomColorIsClicked = false; //Makes sure randomColor button is turned off before it performs its functions
    bgColor = e.target.value;
}

function ShowRandomColors(e, darkness) {
    randomColorIsClicked = true;
    let hue = Math.floor(Math.random() * 360);
    let saturation = Math.floor(Math.random() * 100);
    randomBgColor = "hsl(" + hue + ", " + saturation + "%, " + darkness + "%)";
    return randomBgColor;
}

function ClickEraser(e) {
    let userInput = gridValue.value * gridValue.value;
    for (let i = 0; i < userInput; i++) {
        randomColorIsClicked = false;
        bgColor = 'white';
        div[i].addEventListener('mouseover', colorDiv); //Erases whatever bgColor there is when there's a mouseover on the element
    }
}

function ToggleGrid(e) {
    if (e.target.id == 'on') {
        div.forEach((child) => {
            child.style.border = '1px solid black'; //Shows grid
        });
    }
    if (e.target.id == 'off') {
        div.forEach((child) => {
            child.style.border = '1px hidden black'; //Hides grid
        });
    }
}
CreateNewGrid();