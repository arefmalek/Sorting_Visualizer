console.log("hello world")

//#region array/core stuff
async function randomizeArray() {
    array = [];
    for (let i = 0; i < ARR_SIZE; i++) {
        array.push(Math.floor(Math.random() * MAX_ARR_VAL));
    }
    draw_array();
}


async function draw_array() {
    /**
     * Draws the array sent on a canvas
     * 
     * canvas - DOM canvas element
     * arr - array of elements
     */

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


// how I'm gonna call the heap sort function
//()=>{heap_sort(0,randomArray.length - 1)}