const myHeading = document.querySelector("h1");
myHeading.textContent = "hello yes!";


// initializing stuff I use everywhere
let randomArray = [];
let colors = [];
let arr_space = document.getElementById("arrays");
var canvas = document.getElementById("myCanvas");
const MAX_ARR_VAL = 1000;

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
        colors.push("black");
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
     * returns -1 if array value at first greater than array value at second
     * returns -1 if array value at first less than array value at second
     * 
     * first - int index of the first element to compare
     * second - int index of the second element to compare
     */

    if (randomArray[first] > randomArray[second]) {
        // first greater than second
    }
    if (randomArray[first] < randomArray[second]) {
        // first less than second
    }
}

function bubble_sort(arr) {
    var compare = true;
    while (compare === true) {
        compare = false;
        for (let i = 1; i < arr.length; i++) {
            draw_array(canvas, randomArray, colors)
            if (arr[i] < arr[i-1]) {
                compare = true;
                let temp = arr[i];
                arr[i] = arr[i-1];
                arr[i-1] = temp;
            }
        }
    }

}