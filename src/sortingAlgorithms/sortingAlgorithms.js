function mergeSort(array) {

    if (array.length <= 1) {
        return array;
    }

    let mid = Math.floor(array.length / 2),
        leftArray = mergeSort(array.slice(0,mid)),
        rightArray = mergeSort(array.slice(mid));
    
    return mergeArray(leftArray, rightArray);
    

    function mergeArray(arr1, arr2) {
                
       let sorted = [];

       while (arr1.length && arr2.length) {
            if (arr1[0] < arr2[0]) {
                sorted.push(arr1.shift());
            }
            else {
                sorted.push(arr2.shift());
            }
       }

       return sorted.concat(arr1,arr2);
    }

}

//test
const unsortedArr = [31, 27, 28, 42, 13, 8, 11, 30, 17, 41, 15, 43, 1, 36, 9, 16, 20, 35, 48, 37, 7, 26, 34, 21, 22, 6, 29, 32, 49, 10, 12, 19, 24, 38, 5, 14, 44, 40, 3, 50, 46, 25, 18, 33, 47, 4, 45, 39, 23, 2];
let sorted = mergeSort(unsortedArr);
console.log(sorted);