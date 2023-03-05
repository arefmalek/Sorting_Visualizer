function isSorted(arr) {
    return arr.every((val, i, arr) => i==0 || val >= arr[i - 1]);
}



async function bubbleSort(arr) {
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

async function selectionSort(arr) {
    // algorithm works by selecting the minimum element in i...n and swapping
    for (let i = 0; i < arr.length; i++) {
        let minDex = i;
        for (let j = i+1; j < arr.length; j++) {

            drawArray();
            drawBar(minDex, array[minDex], "red");
            if (arr[minDex] > arr[j]) {
                // update smallest element
                minDex = j;

                drawBar(minDex, array[minDex], "red");
                // await sleep();
            }
            await sleep();
        }

        // swap i with minDex
        drawArray();
        drawBar(i, array[i], "red");
        drawBar(minDex, array[minDex], "red");
        swap(i, minDex);
        await sleep();
        drawArray();
    }

    return arr;
}

async function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        // start at first index
        let j = i;
        while (j > 0 && arr[j-1] > arr[j]) { 

            drawArray();
            drawBar(j-1, arr[j-1], "red");
            drawBar(j, arr[j], "red");
            swap(j-1, j);
            await sleep();

            j--;
        }
    }

    return arr;
}

/**
 * 
 * @param {Array to construct heap from, then sort} arr 
 */
async function heapSort(arr) {
    let getLeftChild = (index) => {
        return (index * 2 + 1 < arr.length) ? arr[index * 2 + 1]: -1;
    }

    let getRightChild = (index) => {
        return (index * 2 + 2 < arr.length) ? arr[index * 2 + 2]: -1;
    }

    let getParentIndex = (index) => {
        return (index != 0) ? Math.floor((index-1)/2): -1
    }

    let swimUp = (index) => {
        let parentIndex = getParentIndex(index);
        while (parentIndex != -1 && arr[parentIndex] < arr[index]) {
            // do the swap and update the value
            swap(parentIndex, index);
            index = parentIndex;
            parentIndex = getParentIndex(index);
            drawArray();

        }

    }

    for (let i = 0; i < arr.length; i++) {
        swimUp(i)
        console.log(i, arr[i], getLeftChild(i), getRightChild(i));
    }

    return arr;
}



async function mergeSort(leftIndex, rightIndex) {
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
