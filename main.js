const myHeading = document.querySelector("h1");
myHeading.textContent = "hello yes!";

// initializing stuff I use everywhere
let ARR_LENGTH = 10;
const MAX_ARR_VAL = 1000;
let randomArray = [];
let arr_space = document.getElementById("arrays");

var canvas = document.getElementById("myCanvas");
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT= canvas.height;

var ctx = canvas.getContext("2d");
ctx.fillStyle="red";

resetArray();
var box_width = Math.floor(CANVAS_WIDTH / ARR_LENGTH) - 1;
for (let ind = 0; ind < ARR_LENGTH; ind++) {
    ctx.fillRect((1+1)*ind, 0, 2, Math.floor(randomArray[ind] / MAX_ARR_VAL));
    console.log((box_width+1)*ind)
}

// drawing the array on a canvas

function resetArray() {
    randomArray = []
    for (let i = 0; i < ARR_LENGTH; i++) {
        randomArray.push(Math.floor(Math.random() * MAX_ARR_VAL));
    }
    arr_space.innerHTML = randomArray;
}

function drawArray() {

}