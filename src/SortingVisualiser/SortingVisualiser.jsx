import React from 'react';
import './SortingVisualiser.css';
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms';

// animation speed (miliseconds)
const ANIMATION_SPEED_MS = 0.5;

// STATIC number of bars (values) in the array -- not used 
const NUMBER_OF_ARRAY_BARS = 310;

// main colour of array bars
const PRIMARY_COLOUR = 'pink';

// comparison colour of array bars
const SECONDARY_COLOUR = 'magenta';

export default class SortingVisualiser extends React.Component {
    constructor(props) {
        super(props);

        this.state = { array: [], };
    }

    componentDidMount() {
        this.resetArray();
    }

    // this is used during generate new array button
    resetArray() {
        const array = [];
        // const MAXVALUE = 700; // max value of random integer 

        let barHeight = (window.screen.height - 150);

        // for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
        //     array.push(getRandomInt(barHeight));
        // }

        for (let i = 0; i < (window.screen.width - 400) / 4; i++) {
            array.push(getRandomInt(barHeight));
        }

        this.setState({ array });
    }

    mergeSort() {
        //const sortedArray = sortingAlgorithms.mergeSort(this.state.array.slice());
        const animations = sortingAlgorithms.mergeSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; i++) {

            const arrayBars = document.getElementsByClassName('array-bar');

            // every 3 values we start a new animation
            // if 1st value, change to comparison colour
            // if 2nd value, change back to primary colour
            // if 3rd value, we do the swap
            const isColourChange = i % 3 !== 2;

            if (isColourChange) {

                const [barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                const colour = i % 3 === 0 ? SECONDARY_COLOUR : PRIMARY_COLOUR;
                setTimeout(() => {

                    barOneStyle.backgroundColor = colour;
                    barTwoStyle.backgroundColor = colour;

                },
                    i * ANIMATION_SPEED_MS);
            }
            else {
                setTimeout(() => {

                    const [barOneIndex, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIndex].style;
                    barOneStyle.height = `${newHeight}px`;
                },
                    i * ANIMATION_SPEED_MS);
            }
        }
    }

    // source - stack overflow
    // https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
    arraysEqual(arr1, arr2) {
        if (arr1 === arr2) {
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
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    testSortingAlgorithms() {
        for (let i = 0; i < 100; i++) {
            const arr = [];
            const bound = this.randomInteger(1, 2000);

            for (let i = 0; i < bound; i++) {
                arr.push(this.randomInteger(-2000, 2000));
            }

            const jsSortedArray = arr.slice().sort((a, b) => a - b);;
            // const mergeSortedArray = sortingAlgorithms.mergeSort(arr.slice());
            //const bubbleSortedArray = sortingAlgorithms.bubbleSort(arr.slice());
            // console.log(this.arraysEqual(jsSortedArray, mergeSortedArray));
            //console.log(this.arraysEqual(jsSortedArray, bubbleSortedArray));
        }
    }

    quickSort() { }

    heapSort() { }

    bubbleSort() {
        const animations = sortingAlgorithms.bubbleSortAnimations(this.state.array);

        for (let i = 1; i < animations.length + 1; i++) {

            const arrayBars = document.getElementsByClassName('array-bar');

            // 1st animation - change to comparison colour
            if (i % 3 === 1) {
                const [barOneIndex, barTwoIndex] = animations[i - 1];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;

                const colour = SECONDARY_COLOUR;

                setTimeout(() => {

                    barOneStyle.backgroundColor = colour;
                    barTwoStyle.backgroundColor = colour;

                },
                    i * ANIMATION_SPEED_MS);
            }

            // 2nd animation - revert to primary colour
            else if (i % 3 === 2) {
                const [barOneIndex, barTwoIndex] = animations[i - 1];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;

                const colour = PRIMARY_COLOUR;

                setTimeout(() => {

                    barOneStyle.backgroundColor = colour;
                    barTwoStyle.backgroundColor = colour;

                },
                    i * ANIMATION_SPEED_MS);

            }

            // 3rd animation - swap bars
            else if (i % 3 === 0) {

                setTimeout(() => {

                    const [barOneIndex, barTwoIndex, barOneHeight, barTwoHeight] = animations[i - 1];
                    const barOneStyle = arrayBars[barOneIndex].style;
                    const barTwoStyle = arrayBars[barTwoIndex].style;

                    barOneStyle.height = `${barOneHeight}px`;
                    barTwoStyle.height = `${barTwoHeight}px`;
                },
                    i * ANIMATION_SPEED_MS);

            }
        }
    }

    render() {
        const { array } = this.state;

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
                            style={{
                                backgroundColor: PRIMARY_COLOUR,
                                height: `${value}px`,
                            }}
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
}
