function isSorted(arr) {
    return arr.every((val, i, arr) => i==0 || val >= arr[i - 1]);
}



async function bubble_sort(arr) {
    let compare = true;
    while (compare === true) {
        compare = false;
        for (let i = 0; i < arr.length - 1; i++) {
            // swap
            if (arr[i] > arr[i+1]) {
                compare = true;
                // swap
                swap(i, i+1);
                drawBar(i, array[i], "red");
                drawBar(i+1, array[i+1], "red");
                await sleep();
            }
            drawArray();
        }
    }

    return arr;
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

function test() {
    rand_arr = [];
    let s = 20                                      
    let maxVal = 100
    // build random array
    for(let i = 0; i < s; i++) {
        rand_arr.push(Math.floor(Math.random()*maxVal));
    }

    // test sorting algo
    bubble_sort(rand_arr).then(result => {
        console.log(result);
        console.log(isSorted(result));
    });
}
