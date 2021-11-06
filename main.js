const myHeading = document.querySelector("h1");
myHeading.textContent = "Sorting Visualizer";


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
var sizeSlider= document.getElementById("sizeSlider");
var sizeOutput = document.getElementById("sizeValue");
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
var selectionSort = document.getElementById("selectionSort");
var insertionSort = document.getElementById("insertionSort");
var heapSort = document.getElementById("heapSort");

speedSlider.oninput = function() {
    speedOutput.innerHTML = this.value;
    SPEED = this.value;
}


// drawing the array on a canvas

async function resetArray() {
    randomArray = [];
    colors = [];
    for (let i = 0; i < ARR_SIZE; i++) {
        randomArray.push(Math.floor(Math.random() * MAX_ARR_VAL));
        colors.push(DEFAULT_COLOR);
    }
    draw_array(canvas, randomArray, colors);
}

async function draw_array(canvas, arr, colors) {
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

// helper function for timing
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function swap(arr, index1, index2) {
    /**
     * The helper function for swapping
     */
    const temp = randomArray[index1];
    randomArray[index1] = randomArray[index2];
    randomArray[index2] = temp;

    colors[index1] = SWAP_COLOR;
    colors[index2] = SWAP_COLOR;

    draw_array(canvas, arr, colors);

    await sleep(SPEED);
    colors[index1] = DEFAULT_COLOR;
    colors[index2] = DEFAULT_COLOR;

}

/**
 * Function that compares values at two different indexes of an array
 * 
 * @param {array of intergers} arr 
 * @param {int} index1 - first index of array for comparison
 * @param {int} index2 - second index of array for comparison
 * @returns -1 if arr[index1] > arr[index2], otherwise we return 1
 */
async function compare_to(arr, index1, index2) {
    colors[index1] = COMPARE_COLOR;
    colors[index2] = COMPARE_COLOR;

    draw_array(canvas, arr, colors);
    await sleep(SPEED);

    colors[index1] = DEFAULT_COLOR;
    colors[index2] = DEFAULT_COLOR;

    draw_array(canvas, arr, colors);
    await sleep(SPEED);

    if (arr[index1] > arr[index2]) return -1;
    else if (arr[index1] <= arr[index2]) return 1;
}

async function bubble_sort(arr) {
    let compare = true;
    while (compare === true) {
        compare = false;
        for (let i = 0; i < arr.length - 1; i++) {
            if (await compare_to(arr, i, i + 1) === -1) {
                compare = true;
                await swap(arr, i, i+1);
            }
        }
    }
    draw_array(canvas, arr, colors);
}

async function selection_sort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let minDex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (await compare_to(arr, minDex, j) === -1) {minDex = j;}
        }
        if (minDex != i) { await swap(arr, i, minDex);}
    }
    draw_array(canvas, arr, colors);
}

async function insertion_sort(arr) {
    for (let i = 0; i < arr.length; i++) {
        // start at first index
        val = arr[i];
        let j = i;
        while (j > 0 && await compare_to(arr, j, j-1) === 1) { 
            await swap(arr,j, j-1); 
            j -= 1;
        }
    }
}

/**
 * 
 * @param {Array to be heapified then sorted} arr 
 */
async function heap_sort(arr) {
    function getLeftChild(index, arrLength = arr.length) {
        return ((index * 2 + 1 < arrLength) ? index * 2 + 1: -1);
    }
    function getRightChild(index, arrLength = arr.length) {
        return ((index * 2 + 2 < arrLength) ? index * 2 + 2: -1);
    }

    // first step is that I need to build a max heap here
    /**
     * compares the left child of the heap with the current node
     * @param {index that we compare the left child with} index 
     */
    function lessThanLeft(index, arrLength = arr.length) {
        const left = getLeftChild(index, arr.length);
        if (left === -1) {return false;}
        return (arr[index] < arr[left]);
    }
    function lessThanRight(index, arrLength = arr.length) {
        const right = getRightChild(index, arrLength);
        if (right === -1) {return false;}
        return (arr[index] < arr[right]);
    }
    
    async function sinkDown(index) {
        while (index >= 0 && (lessThanLeft(index) || lessThanRight(index))) {
             // get left and right
            const leftIndex = getLeftChild(index);
            const rightIndex = getRightChild(index);

            // we guarantee minDex is positive b/c we 
            var minDex = -1;
            if (leftIndex === -1) {minDex = rightIndex;}
            else if (rightIndex === -1) {minDex = leftIndex;}
            else {
                minDex = (await compare_to(arr, leftIndex, rightIndex) === -1) ? leftIndex: rightIndex;
            }

            await swap(arr, index, minDex);
            index = minDex;           
        }
    }

    // we are building a min heap (priority queue)
    let idx = Math.floor(arr.length / 2) - 1;
    while (idx >= 0) {
        let tempNode = idx;
        // basically form heap
        await sinkDown(tempNode);
        idx -= 1;
    }
    draw_array(canvas, arr, colors);

    // sort down the array
    // 1. delete max (easy b/c it'll be the array)
    // 2. swap heap with last element in array
    // 3. sink down the last element on the heap, b/c we have heap structure we know the next 2 smallest 
    // values are immediately in front of the 
    let subArrLength = arr.length;
    while (subArrLength > 0) {
        let index = 0
        // "delete max"
        await swap(arr, index, --subArrLength);

        while (index < subArrLength && (lessThanLeft(index, subArrLength) || lessThanRight(index, subArrLength))) {
             // get left and right
            const leftIndex = (index * 2 + 1 < subArrLength) ? index * 2 + 1: -1;
            const rightIndex =(index * 2 + 2 < subArrLength) ? index * 2 + 2: -1;

            // we guarantee minDex is positive b/c we 
            var minDex = subArrLength;
            if (leftIndex === -1) {minDex = rightIndex;}
            else if (rightIndex === -1) {minDex = leftIndex;}
            else {
                minDex = (await compare_to(arr, leftIndex, rightIndex) === -1) ? leftIndex: rightIndex;
            }

            if (minDex < subArrLength && minDex > 0) {
                await swap(arr, index, minDex);
            }

            index = minDex;           
        }

    }
    draw_array(canvas, arr, colors);
}



async function merge_sort(leftIndex, rightIndex) {
}

bubbleSort.addEventListener("click", ()=>{bubble_sort(randomArray);} );
selectionSort.addEventListener("click", ()=>{selection_sort(randomArray);} );
insertionSort.addEventListener("click", ()=>{insertion_sort(randomArray);});
heapSort.addEventListener("click", ()=>{heap_sort(randomArray)});


// how I'm gonna call the heap sort function
//()=>{heap_sort(0,randomArray.length - 1)}