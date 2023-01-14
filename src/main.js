

//# Canvas/ array operations

// clear the canvas
function clearCanvas() {
    ctx.beginPath();
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.closePath();
}

function resetArray() {
    array = [];
}



//#Array Operation functions
function drawBar(index, value, color=DEFAULT_COLOR) {
    ctx.beginPath();
    // clear the previous bar
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(Math.ceil(WIDTH / ARR_SIZE * index), 0, Math.floor(WIDTH / ARR_SIZE), HEIGHT);

    // draw new bar from the bottom
    ctx.fillStyle = color;
    ctx.fillRect(Math.ceil(WIDTH / ARR_SIZE * index), HEIGHT, Math.floor(WIDTH / ARR_SIZE), Math.floor(-HEIGHT*(value/MAX_ARR_VAL)) );

    ctx.closePath();
}

function drawArray(){
    clearCanvas();

    for (let i = 0; i < array.length; i++) {
        // draw bar in a certain color
        let val = array[i];
        drawBar(i, val, DEFAULT_COLOR);
    }
}

function randomizeArray(){
    // clear canvas and array
    clearCanvas();
    resetArray();

    // build random array
    for(let i = 0; i < ARR_SIZE; i++) {
        array.push(Math.floor(Math.random()*MAX_ARR_VAL));
    }

    // draw that array
    drawArray();
}


function runSort() {
    // get the sorting function
    bubble_sort(array).then(sorted => {
        array = sorted;
        drawArray();
    }
    );
}

//#HTML Editing setup
function speedInput() {
    SPEED = speedSlider.value;
    speedOutput.innerHTML = SPEED;
}
function sizeInput() {
    ARR_SIZE = sizeSlider.value;
    sizeOutput.innerHTML = ARR_SIZE;
}


// canvas setup
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
const WIDTH = canvas.width, HEIGHT = canvas.height;

// button, slider setup
randomizeBtn = document.getElementById("randomizeBtn");
sortingBtn = document.getElementById("sortButton");

// array size
var sizeSlider= document.getElementById("sizeSlider");
var sizeOutput = document.getElementById("sizeValue");
var ARR_SIZE;
// getting latency
var speedSlider = document.getElementById("speedSlider");
var speedOutput = document.getElementById("speedValue"); // get the output from the slider span
var SPEED;


// everytime we mess with slider, it updates values inside
speedSlider.oninput = speedInput;
sizeSlider.oninput = function() {
    sizeInput();
    randomizeArray();
}

// initializing stuff I use everywhere
let array = []
const MAX_ARR_VAL = 100;

// COLORS
const DEFAULT_COLOR = "black";
const BACKGROUND_COLOR = "white";



// first call 
speedInput();
sizeInput();
randomizeArray(); // randomize and draw the array

