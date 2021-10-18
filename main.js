const myHeading = document.querySelector("h1");
myHeading.textContent = "hello yes!";


// initializing stuff I use everywhere
let randomArray = [];
let colors = [];
var canvas = document.getElementById("myCanvas");
const MAX_ARR_VAL = 100;

// COLORS
const DEFAULT_COLOR = "black"
const COMPARE_COLOR = "red";
const SWAP_COLOR = "green"

// stuff we get from html side
var sizeSlider= document.getElementById("slider");
var sizeOutput = document.getElementById("demo");
sizeOutput.innerHTML = sizeSlider.value;
var ARR_SIZE = sizeSlider.value;
resetArray();

sizeSlider.oninput = function() {
  sizeOutput.innerHTML = this.value;
  ARR_SIZE = this.value;
  resetArray(randomArray);
}


// getting latency
var speedSlider = document.getElementById("speedSlider");
var speedOutput = document.getElementById("speedValue");
speedOutput.innerHTML = speedSlider.value;
var SPEED = speedSlider.value;

// sorting
var bubbleSort = document.getElementById("bubbleSort");
var insertionSort = document.getElementById("insertionSort");

speedSlider.oninput = function() {
    speedOutput.innerHTML = this.value;
    SPEED = this.value;
}


// drawing the array on a canvas

function resetArray() {
    randomArray = [];
    colors = [];
    for (let i = 0; i < ARR_SIZE; i++) {
        randomArray.push(Math.floor(Math.random() * MAX_ARR_VAL));
        colors.push(DEFAULT_COLOR);
    }
    console.log(randomArray);
    draw_array(canvas, randomArray, colors);
}

function draw_array(canvas, arr, colors) {
    /**
     * Draws the array sent on a canvas
     * 
     * canvas - DOM canvas element
     * arr - array of elements
     */

    const width_ratio = 2;
    let ctx = canvas.getContext("2d");

    // clear the canvas
    ctx.fillStyle = '#fff';
    ctx.fillRect(0,0,canvas.width, canvas.height);

    const n = arr.length;
    const spacing = canvas.width / (width_ratio * n + n + 1);
    const bar_width = spacing * width_ratio;

    // drawing rect around the outside of the canvas
    ctx.strokeRect(0,0,canvas.width,canvas.height);

    // start drawing the boxes again
    let x = spacing;
    for (let i = 0; i < arr.length; i++) {
        ctx.fillStyle = colors[i];
        const y = arr[i];
        ctx.fillRect(x, 0, bar_width, y);
        x += spacing + bar_width;
    }
}

function swap(index1, index2) {
    const temp = randomArray[index1];
    randomArray[index1] = randomArray[index2];
    randomArray[index2] = temp;

    colors[index1] = SWAP_COLOR;
    colors[index2] = SWAP_COLOR;
    draw_array(canvas, randomArray, colors);
    setTimeout(SPEED);

    colors[index1] = DEFAULT_COLOR;
    colors[index2] = DEFAULT_COLOR;
}

function bubble_sort() {
    let compare = true;
    console.log(randomArray);
    while (compare === true) {
        compare = false;
        for (let i = 0; i < randomArray.length - 1; i++) {
            if (randomArray[i] > randomArray[i+1]) {
                compare = true;
                swap(i, i+1);
            }
        }
    }
    draw_array(canvas, randomArray, colors);
}

function insertion_sort() {
    for (let i = 0; i < randomArray.length; i++) {
        let minDex = i;
        for (let j = i + 1; j < randomArray.length; j++) {
            if (randomArray[minDex] > randomArray[j]) {minDex = j;}
        }
        if (minDex != i) { swap(i, minDex);}
    }
    draw_array(canvas, randomArray, colors);
}

bubbleSort.addEventListener("click", bubble_sort);
insertionSort.addEventListener("click", insertion_sort);