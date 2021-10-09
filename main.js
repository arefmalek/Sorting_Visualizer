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
ctx.fillStyle="#FF0000";

resetArray();
var box_width = Math.floor(CANVAS_WIDTH / ARR_LENGTH) - 1;
for (let ind = 0; ind < ARR_LENGTH; ind++) {
    ctx.fillRect((box_width+1)*ind, 0, box_width, randomArray[ind] / MAX_ARR_VAL);
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