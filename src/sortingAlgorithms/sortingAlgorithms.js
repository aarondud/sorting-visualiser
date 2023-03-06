/**
 * Implements Merge Sort in ascending order while recording the comparison and swap sequences
 * Stable, recursive, divide & conquer, time O(nlogn), Space O(n)
 * Works well with large datasets, if size of dataset unknown consider other alogrithm like insertion sort

 * @param {array} array unsorted array
 * @returns {array} array of animation sequences to compare and sort array
 */
export function mergeSortAnimations(array) {

    // array stores comparison and swapping animation sequences
    const animations = [];

    if (array.length <= 1) {
        return animations;
    }

    let auxiliaryArray = array.slice();

    mergeSortRec(array, 0, array.length - 1, auxiliaryArray, animations);

    return animations;

    /**
     * Recursive Merge Sort function
     * Time O(nlogn), space O(n)
     * Optimised to track bounds/indices for animaiton purposes, utilising an auxiliary array to optomise space complexity
     * 
     * @param {array} array unsorted array
     * @param {integer} start starting indix of 1st half array
     * @param {integer} end ending index of 2nd half array
     * @param {array} auxArray auxiliary array
     * @param {array} animations stores animation sequences
     */
    function mergeSortRec(array, start, end, auxArray, animations) {

        // recursion finished when divided down to single element
        if (start === end) {
            return;
        }

        // middle index
        const mid = Math.floor((start + end) / 2);

        // recursively call merge sort
        mergeSortRec(auxArray, start, mid, array, animations);
        mergeSortRec(auxArray, mid + 1, end, array, animations);

        //use merge utility to build arrays back up, with each merge sorting along the way
        mergeTwoArrays(array, start, mid, end, auxArray, animations);
    }

    /**
     * Implements sorting and merging of two halves of array, achieved through auxiliary array
     * Time O(n), space O(n)
     * 
     * @param {array} array main, unsorted array
     * @param {integer} start starting index
     * @param {integer} mid middle index
     * @param {integer} end ending index
     * @param {array} auxArray auxiliary array
     * @param {array} animations stores animation sequences
     */
    function mergeTwoArrays(array, start, mid, end, auxArray, animations) {

        let i1 = start, // index keeps positio in the 1st half of array
            i2 = mid + 1, // index keeps position in the 2nd half of array
            k = start; // index keeps position in the auxiliary array

        // while the indices are inside their half, check which item is smaller, overwrite the correspondng position in the auxiliary array
        while (i1 <= mid && i2 <= end) {

            // comparing i1 and i2; push once to change colour
            animations.push([i1, i2]);

            // push a second time to revert their colour
            animations.push([i1, i2]);


            if (auxArray[i1] <= auxArray[i2]) {

                // overwrite value at index k in main array with value of index i1 in auxiliary array
                animations.push([k, auxArray[i1]]);
                array[k] = auxArray[i1];
                i1 += 1;

            } else {

                // overwrite value at index k in main array with value of index i2 in auxilary array
                animations.push([k, auxArray[i2]]);
                array[k] = auxArray[i2];
                i2 += 1;
            }
            k += 1;
        }

        // if remaining elements unchecked in first half (ie. 1st half > 2nd half) overwrite onto the auxiliary array
        while (i1 <= mid) {

            //comparing i1 and i1, push once to change their colour, push a second time to revert their colour
            animations.push([i1, i1]);
            animations.push([i1, i1]);

            // overwrite value at index k in main array with value of index i1 in auxilary array
            animations.push([k, auxArray[i1]]);
            array[k] = auxArray[i1];
            k += 1;
            i1 += 1;
        }

        // if remaining elements unchecked in second half (ie. 2nd half > 1st half) overwrite onto the auxiliary array
        while (i2 <= end) {

            //comparing i2 and i2, push once to change their colour, push a second time to revert their colour
            animations.push([i2, i2]);
            animations.push([i2, i2]);

            // overwite value at index k in main array with value of index i2 in auxiliary array
            animations.push([k, auxArray[i2]]);
            array[k] = auxArray[i2];
            k += 1;
            i2 += 1;
        }
    }
}

/**
 * Implements Bubble Sort in ascending order while recording the comparison and swap sequences
 * 
 * Stable, in-place, time O(n^2), space O(N)
 * 
 * @param {*} array unsorted array
 * @returns ascending sorted array
 */
export function bubbleSortAnimations(array) {

    // stores animation sequences
    const animations = [];

    for (let i = 0; i < array.length; i++) {

        // visit each pair of elements in the array
        for (let j = 0; j < array.length - (i + 1); j++) {

            // is the element in its final sorted position
            let isSorted = false;

            // comparing j and (j+1), animations:
            // 1. change bars to comparison colours
            // 2. revert bars to original colours
            animations.push([j, j + 1]);
            animations.push([j, j + 1]);

            // if current item is greater than next item, swap
            if (array[j] > array[j + 1]) {


                // check if element is in final sorted position
                if (j === array.length - (i + 1) - 1) {
                    isSorted = true;
                }

                // swap values
                animations.push([j, j + 1, array[j + 1], array[j], isSorted]);

                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
            else {
                // don't swap values
                animations.push([j, j + 1, array[j], array[j + 1], isSorted]);
            }
        }
    }
    return animations;
}

export function insertionSort(array) {
}
