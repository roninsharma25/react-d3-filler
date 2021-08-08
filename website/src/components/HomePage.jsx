import React, { Component } from 'react';
import Filler from './Filler';
import '../App.css';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Filler />
        )
    }
}