import React, { Component } from 'react';
import Filler from './Filler';
import '../App.css';

export default class HomePage extends Component {
    render() {
        return (
            <Filler height={600} width={700} border='5px solid white'/>
        )
    }
}