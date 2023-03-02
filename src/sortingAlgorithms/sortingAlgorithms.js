/**
 * Implements Merge Sort in ascending order
 * Stable, recursive, divide & conquer, O(nlogn)
 * Works well with large datasets, if size of dataset unknown consider other alogrithm like insertion sort

 * @param {array} array unsorted array of doubles
 * @returns {array} ascending sorted array
 */
export function mergeSort(array) {

    // recursion finished when 1 item remaining in array
    if (array.length <= 1) {
        return array;
    }

    // recursively call merge sort, recursively cutting array in half
    let mid = Math.floor(array.length / 2),
        leftArray = mergeSort(array.slice(0,mid)),
        rightArray = mergeSort(array.slice(mid));
    
    // use merge utility to start build arrays back up, with each merge sorting along the way
    return mergeArray(leftArray, rightArray);
    

    /**
     * Implements sorting and merging of two arrays
     * O(N), where N = max(arr1.length, arr2.length)
     * 
     * @param {array} arr1 an array
     * @param {array} arr2 an array
     * @returns {array} sorted merged array
     */
    function mergeArray(arr1, arr2) {
            
        let sorted = [];

        //while there are items in either array, check which first item is smaller, add it to the sorted array, and remove it from it's original array
        while (arr1.length && arr2.length) {
            if (arr1[0] < arr2[0]) {
                sorted.push(arr1.shift());
            }
            else {
                sorted.push(arr2.shift());
            }
        }

        // If there's anything left over (ie. arrays not same size) concatonate remaining onto the end
        return sorted.concat(arr1,arr2);
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