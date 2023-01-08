// canvas setup
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

function clearCanvas() {
    ctx.beginPath();
    // clear the canvas
    ctx.fillStyle = '#fff';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    
    ctx.closePath();
}

// button, slider setup
randomizeBtn = document.getElementById("randomizeBtn");

// array size
var sizeSlider= document.getElementById("sizeSlider");
var sizeOutput = document.getElementById("sizeValue");
var SIZE;

// getting latency
var speedSlider = document.getElementById("speedSlider");
var speedOutput = document.getElementById("speedValue"); // get the output from the slider span
var SPEED;


function speedInput() {
    var SPEED = speedSlider.value;
    speedOutput.innerHTML = SPEED;
}
function sizeInput() {
    var ARR_SIZE = sizeSlider.value;
    sizeOutput.innerHTML = ARR_SIZE;
}

speedInput();
sizeInput();
// randomizeArray(); // randomize and draw the array

// everytime we mess with slider, it updates values inside
speedSlider.oninput = speedInput;
sizeSlider.oninput = function() {
    sizeInput();
}

// initializing stuff I use everywhere
let array = []
const MAX_ARR_VAL = 100;

// COLORS
const DEFAULT_COLOR = "black";
const CANVAS_COLOR = "white";
