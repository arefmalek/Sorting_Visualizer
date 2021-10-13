const myHeading = document.querySelector("h1");
myHeading.textContent = "hello yes!";


// initializing stuff I use everywhere
let randomArray = [];
let colors = [];
var canvas = document.getElementById("myCanvas");
const MAX_ARR_VAL = 1000;

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

speedSlider.oninput = function() {
    speedOutput.innerHTML = this.value;
    SPEED = this.value;
}


// drawing the array on a canvas

function resetArray() {
    randomArray = []
    for (let i = 0; i < ARR_SIZE; i++) {
        randomArray.push(Math.floor(Math.random() * MAX_ARR_VAL));
        colors.push(DEFAULT_COLOR);
    }
    draw_array(canvas, randomArray, colors);
}

// this function isn't mine - Justin Johnson from Stanford wrote it
// https://cs.stanford.edu/people/jcjohns/sorting.js/js/sorting.js
function draw_array(canvas, ary, colors) {
    /*
     * Draw an array on a canvas.
     *
     * Inputs:
     * - canvas: a DOM canvas object
     * - ary: An array of numbers to draw
     * - colors: An array of the same length as ary, whose ith element
     *   is a string giving the color for the ith element of ary
     */
    var width_ratio = 2;
    var ctx = canvas.getContext('2d');

    // Clear the canvas
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Find min and max elements
    var min = ary[0];
    var max = ary[0];
    for (var i = 1; i < ary.length; i++) {
        min = ary[i] < min ? ary[i] : min;
        max = ary[i] > max ? ary[i] : max;
    }

    // Figure out width of bars and spacing
    var n = ary.length;
    var spacing = canvas.width / (width_ratio * n + n + 1);
    var bar_width = spacing * width_ratio;

    // Draw a box around the outside of the canvas
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    function convert_y(y) {
        // Want convert_y(max) = 0, convert_y(min) = canvas.height`
        var a = canvas.height / (min - max);
        var b = max * canvas.height / (max - min);
        return a * y + b;
    }

    // Draw a baseline for zero
    var y_zero = convert_y(0);
    ctx.beginPath();
    ctx.moveTo(0, y_zero);
    ctx.lineTo(canvas.width, y_zero);
    ctx.stroke();

    // Now draw boxes
    var x = spacing;
    for (var i = 0; i < ary.length; i++) {
        ctx.fillStyle = colors[i];
        var y = convert_y(ary[i]);
        if (ary[i] >= 0) {
            ctx.fillRect(x, y, bar_width, y_zero - y);
        } else {
            ctx.fillRect(x, y_zero, bar_width, y - y_zero);
        }
        x += spacing + bar_width;
    }
}

function compare_indexes(first, second) {
    /**
     * Compares two values 
     * returns 1 if array value at first greater than array value at second
     * returns -1 if array value at first less than array value at second
     * 
     * first - int index of the first element to compare
     * second - int index of the second element to compare
     */
    colors[first] = COMPARE_COLOR;
    colors[second] = COMPARE_COLOR;
    draw_array(canvas, randomArray, colors);
    sleep(SPEED);

    var returnVal = 0
    if (randomArray[first] >= randomArray[second]) {returnVal = 1;}
    else {returnVal -1;}

    colors[first] = DEFAULT_COLOR;
    colors[second] = DEFAULT_COLOR;
 
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
 
function swap(index1, index2) {
    /**
     * Swaps the values between two arrays and updates the array
     */
    // update colors
    colors[index1] = SWAP_COLOR;
    colors[index2] = SWAP_COLOR;
    // update values
    temp = randomArray[index1];
    randomArray[index1] = randomArray[index2];
    randomArray[index2] = temp;
    // show new array
    draw_array(canvas, randomArray, colors);
    sleep(SPEED);

    colors[index1] = DEFAULT_COLOR;
    colors[index2] = DEFAULT_COLOR;

    return returnVal;
}


function insertion_sort() {
    for (let i = 0; i < randomArray.length; i++) {
        var minVal = i;
        colors[i] = SWAP_COLOR;
        for (let j = i; j < randomArray.length; j++) {
            draw_array(canvas, randomArray, colors);
            if (compare_indexes(j, i) === -1) {
                colors[minVal] = DEFAULT_COLOR;
                minVal = j;
                colors[minVal] = SWAP_COLOR;
            }
        }
        if (minVal != i) {swap(minVal, i);}
    }
}

function bubble_sort() {
    var compare = true;
    while (compare === true) {
        compare = false;
        for (let i = 1; i < randomArray.length; i++) {
            console.log(compare_indexes(i-1, i));
            draw_array(canvas, randomArray, colors)
            if (compare_indexes(i-1, i) === 1) {
                compare = true;
                swap(i, i-1);
           }
        }
    }

}