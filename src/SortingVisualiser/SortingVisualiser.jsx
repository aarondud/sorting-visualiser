import React from 'react';
import './SortingVisualiser.css';

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

    mergeSort() {}

    quickSort() {}

    heapSort() {}

    bubbleSprt() {}

    render() {
        const {array} = this.state;

        return (
            <div>
                <div className="menu-bar">
                    <button onClick={() => this.resetArray()}>Generate New Array</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button onClick={() => this.quickSort()}>Quick Sort</button>
                    <button onClick={() => this.heapSort()}>Heap Sort</button>
                    <button onClick={() => this.bubbleSprt()}>Bubble Sort</button>
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
