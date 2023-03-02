/**
 * Implements Merge Sort in ascending order
 * Stable, recursive, divide & conquer, time O(nlogn), Space O(n)
 * Works well with large datasets, if size of dataset unknown consider other alogrithm like insertion sort

 * @param {array} array unsorted array
 * @returns {array} ascending sorted array
 */
export function mergeSort(array) {

    if (array.length <= 1) {
        return array;
    }

    let auxillaryArray = array.slice();

    mergeSortRec(array, 0, array.length - 1, auxillaryArray);

    return array;

    /**
     * Recursive Merge Sort function
     * Time O(nlogn), space O(n)
     * Optimised to track bounds/indices for animaiton purposes, utilising an auxillary array to optomise space complexity
     * 
     * @param {array} array unsorted array
     * @param {integer} start starting indix of 1st half array
     * @param {integer} end ending index of 2nd half array
     * @param {array} auxArray auxillary array
     */
    function mergeSortRec(array, start, end, auxArray) {

        // recursion finished when divided down to single element
        if (start == end) {
            return;
        }

        // middle index
        const mid = Math.floor((start + end) / 2);

        // recursively call merge sort
        mergeSortRec(auxArray, start, mid, array);
        mergeSortRec(auxArray, mid + 1, end, array);

        //use merge utility to build arrays back up, with each merge sorting along the way
        mergeArrays(array, start, mid, end, auxArray);
    }

    /**
     * Implements sorting and merging of two halves of array, achieved through auxillary array
     * Time O(n), space O(n)
     * 
     * @param {array} auxArray auxillary array
     * @param {integer} start starting index
     * @param {integer} mid middle index
     * @param {integer} end ending index
     * @param {array} array unsorted array
     */
    function mergeArrays(auxArray, start, mid, end, array) {

        let i1 = start, // index keeps positio in the 1st half of array
            i2 = mid + 1, // index keeps position in the 2nd half of array
            i = start; // index keeps position in the auxillary array

        // while the indices are inside their half, check which item is smaller, overwrite the correspondng position in the auxillary array
        while (i1 <= mid && i2 <= end) {
            if (array[i1] < array[i2]) {
                auxArray[i] = array[i1];
                i1 += 1;
            } else {
                auxArray[i] = array[i2];
                i2 += 1;
            }
            i += 1;
        }

        // if remaining elements unchecked in first half (ie. 1st half > 2nd half) overwrite onto the auxillary array
        while (i1 <= mid) {
            auxArray[i] = array[i1];
            i += 1;
            i1 += 1;
        }

        // if remaining elements unchecked in second half (ie. 2nd half > 1st half) overwrite onto the auxillary array
        while (i2 <= end) {
            auxArray[i] = array[i2];
            i += 1;
            i2 += 1;
        }
    }
}

export function bubbleSort(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - (i + 1); j++) {
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
    return array;
}
