
function is_sorted(arr) {
    arr_sort = [...arr];
    arr_sort.sort();

}

function bubble_sort(arr) {
    for (let i = 1; i < numberOfElements; i++) {
        let sorted = true
        for (let j = 0; j < numberOfElements - i; j++) {
            // if (!running) { stopRunning(); return; }
            if (array[j] > array[j + 1]) {
                sorted = false
                swap(j, j + 1)
            }
            drawArray()
            drawSelected(j)
            await sleep()
        }
        if (sorted) break
    }
    stopRunning()
}


function heap_sort(p1, p2) {
    return p1 * p2;   // The function returns the product of p1 and p2
}

