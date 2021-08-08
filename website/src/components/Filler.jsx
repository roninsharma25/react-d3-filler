import React, { Component } from 'react';
import '../App.css';
import * as d3 from 'd3';

export default class Filler extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
        let colors = ['red', 'blue', 'green', 'black', 'purple', 'white', 'yellow'];
        let data = [
            {'x': 200, 'y': 100, 'size': 100, 'flag': false, 'color': colors[Math.floor(Math.random() * colors.length)]}, 
            {'x': 300, 'y': 100, 'size': 100, 'color': colors[Math.floor(Math.random() * colors.length)]},
            {'x': 400, 'y': 100, 'size': 100, 'color': colors[Math.floor(Math.random() * colors.length)]},
            {'x': 200, 'y': 200, 'size': 100, 'color': colors[Math.floor(Math.random() * colors.length)]},
            {'x': 300, 'y': 200, 'size': 100, 'color': colors[Math.floor(Math.random() * colors.length)]},
            {'x': 400, 'y': 200, 'size': 100, 'color': colors[Math.floor(Math.random() * colors.length)]},
            {'x': 200, 'y': 300, 'size': 100, 'color': colors[Math.floor(Math.random() * colors.length)]},
            {'x': 300, 'y': 300, 'size': 100, 'color': colors[Math.floor(Math.random() * colors.length)]},
            {'x': 400, 'y': 300, 'size': 100, 'color': colors[Math.floor(Math.random() * colors.length)]}
        ];

        let constantData = [
            {'x': 100, 'y': 450, 'size': 50, 'color': colors[0], 'flag': true}, 
            {'x': 175, 'y': 450, 'size': 50, 'color': colors[1]},
            {'x': 250, 'y': 450, 'size': 50, 'color': colors[2]},
            {'x': 325, 'y': 450, 'size': 50, 'color': colors[3]},
            {'x': 400, 'y': 450, 'size': 50, 'color': colors[4]},
            {'x': 475, 'y': 450, 'size': 50, 'color': colors[5]},
            {'x': 550, 'y': 450, 'size': 50, 'color': colors[6]}
        ];

        let svg = d3.select('.Vis')
            .append('svg')
            .attr('width', 700)
            .attr('height', 600)
            .style('border', '5px solid white')

        let squares = svg.selectAll('rect')
            .data(data.concat(constantData))
            .enter()
            .append('rect')
        
        let squareAttributes = squares
            .attr('x', (data) => (data.x))
            .attr('y', (data) => (data.y))
            .attr('height', (data) => (data.size))
            .attr('width', (data) => (data.size))
            .style('fill', (data) => (data.color))
            .on('click', (data) => {
                if (data.target.__data__.flag) console.log(data.target.__data__.color)
                else console.log("NOTHING: " + data.target.__data__.color)
            })

    }
    render() {
        return (
            <div className="Vis"></div>
        )
    }
          
}
