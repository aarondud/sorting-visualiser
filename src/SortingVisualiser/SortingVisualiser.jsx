import React from 'react';
import './SortingVisualiser.css';
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms';

export default class SortingVisualiser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {array: [],};
    }

    componentDidMount() {
        this.resetArray();
    }

    // this is used during generate new array button
    resetArray() {
        const array = [];
        const noElements = 200; // no of elements in an array
        const MAXVALUE = 700; // max value of random integer 
        
        for (let i = 0; i < noElements; i++) {
            array.push(getRandomInt(MAXVALUE));
        }

        this.setState({array});
    }

    mergeSort(arr) {
        const sortedArray = sortingAlgorithms.mergeSort(this.state.array.slice());
    }

    // source - stack overflow
    // https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
    arraysEqual(arr1, arr2) {
        if (arr1 == arr2) {
            return true;
        }
        if (arr1 == null || arr2 == null) {
            //console.log(arr1);
            //console.log(arr2);
            console.log(2);
            return false;
        }
        if (arr1.length !== arr2.length) {
            console.log(3);
            return false;
        }

        for (var i = 0; i < arr1.length; ++i) {
            if (arr1[i] !== arr2[i]) {
                console.log(4);
                return false;
            }
        }
        return true;
    }

    randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    testSortingAlgorithms() {
        for (let i = 0; i < 100; i++) {
            const arr = [];
            const bound = this.randomInteger(1,2000);
            
            for (let i = 0; i < bound; i++) {
                arr.push(this.randomInteger(-2000,2000));
            }
            
            const jsSortedArray = arr.slice().sort((a,b) => a - b);;
            const mergeSortedArray = sortingAlgorithms.mergeSort(arr.slice());
            const bubbleSortedArray = sortingAlgorithms.bubbleSort(arr.slice());
            console.log(this.arraysEqual(jsSortedArray, mergeSortedArray));
            console.log(this.arraysEqual(jsSortedArray, bubbleSortedArray));
        }
    }

    quickSort() {}

    heapSort() {}

    bubbleSort() {
        const sortedArray = sortingAlgorithms.bubbleSort(this.state.array.slice());
    }

    render() {
        const {array} = this.state;

        return (
            <div>
                <div className="menu-bar">
                    <button onClick={() => this.resetArray()}>Generate New Array</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button onClick={() => this.quickSort()}>Quick Sort</button>
                    <button onClick={() => this.heapSort()}>Heap Sort</button>
                    <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    <button onClick={() => this.testSortingAlgorithms()}>Test Sorting</button>

                </div>
   
                <div className="array-container">
                
                {array.map((value, idx) => (
                    <div
                    className="array-bar" 
                    key={idx}
                    style={{height: `${value}px`}}
                    ></div>
                ))}
                    
                </div>
            </div>
            )
        }
}

// gets random integer for resetting array
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
};