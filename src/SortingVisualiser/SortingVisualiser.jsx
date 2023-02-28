import React from 'react';
import './SortingVisualiser.css';

export default class SortingVisualiser extends React.Compnent {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    // this is used during generate new array button
    resetArray() {
        const array = [];
        const noElements = 100 // no of elements in an array
        const MAXVALUE = 10000 // max value of random integer 
        
        for (let i = 0; i < noElements; i++) {
            array.push(this.getRandomInt(MAXVALUE));
        }

        this.setState({array});
    }

    // gets random integer for resetting array
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    };
}

