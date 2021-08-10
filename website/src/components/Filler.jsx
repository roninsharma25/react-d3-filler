import React, { Component } from 'react';
import '../App.css';
import * as d3 from 'd3';

export default class Filler extends Component {
    constructor(props) {
        super(props);
        let colors = ['red', 'blue', 'green', 'black', 'purple', 'white', 'yellow'];
        this.state = {
            data: [
                {'x': 200, 'y': 100, 'size': 100, 'flag': false, 'color': colors[Math.floor(Math.random() * colors.length)]}, 
                {'x': 300, 'y': 100, 'size': 100, 'color': colors[Math.floor(Math.random() * colors.length)]},
                {'x': 400, 'y': 100, 'size': 100, 'color': colors[Math.floor(Math.random() * colors.length)]},
                {'x': 200, 'y': 200, 'size': 100, 'color': colors[Math.floor(Math.random() * colors.length)]},
                {'x': 300, 'y': 200, 'size': 100, 'color': colors[Math.floor(Math.random() * colors.length)]},
                {'x': 400, 'y': 200, 'size': 100, 'color': colors[Math.floor(Math.random() * colors.length)]},
                {'x': 200, 'y': 300, 'size': 100, 'color': colors[Math.floor(Math.random() * colors.length)]},
                {'x': 300, 'y': 300, 'size': 100, 'color': colors[Math.floor(Math.random() * colors.length)]},
                {'x': 400, 'y': 300, 'size': 100, 'color': colors[Math.floor(Math.random() * colors.length)]}
            ],
            constantData: [
                {'x': 100, 'y': 450, 'size': 50, 'color': colors[0], 'flag': true}, 
                {'x': 175, 'y': 450, 'size': 50, 'color': colors[1], 'flag': true},
                {'x': 250, 'y': 450, 'size': 50, 'color': colors[2], 'flag': true},
                {'x': 325, 'y': 450, 'size': 50, 'color': colors[3], 'flag': true},
                {'x': 400, 'y': 450, 'size': 50, 'color': colors[4], 'flag': true},
                {'x': 475, 'y': 450, 'size': 50, 'color': colors[5], 'flag': true},
                {'x': 550, 'y': 450, 'size': 50, 'color': colors[6], 'flag': true}
            ],
            player1Score: 1,
            player1Boxes: [6]
        }

        this.changeColor = this.changeColor.bind(this);
        this.getAdjacentIndices = this.getAdjacentIndices.bind(this);
    }

    componentDidMount() {
        this.main()
    }

    componentDidUpdate() {
        this.updateText();
    }

    updateText() {
        let textColor = 'white';
        let titleSize = '25px';

        d3.select('.Vis').select('text')
            .attr('x', this.props.width / 4)
            .attr('y', 50)
            .attr('text-anchor', 'middle')
            .style('fill', textColor)
            .style('font-size', titleSize)
            .style('text-decoration', 'underline')
            .text('Player 1 Score: ' + this.state.player1Score)
    }
    
    main() {
        let { data, constantData, player1Score } = this.state;
        let { height, width, border } = this.props;

        let svg = d3.select('.Vis')
            .append('svg')
            .attr('height', height)
            .attr('width', width)
            .style('border', border)

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
            .attr('stroke', 'black')
            .on('click', (data) => {
                if (data.target.__data__.flag) this.update(data.target.__data__.color)//this.changeColor(data.target.__data__.color, 1) 
                else console.log("NOTHING: " + data.target.__data__.color)
            })
        
        let textColor = 'white';
        let titleSize = '25px';
    
        svg.append('text')
            .attr('x', this.props.width / 4)
            .attr('y', 50)
            .attr('text-anchor', 'middle')
            .style('fill', textColor)
            .style('font-size', titleSize)
            .style('text-decoration', 'underline')
            .text('Player 1 Score: ' + this.state.player1Score)

    }

    update(color) {
        let prevPlayer1Boxes = this.state.player1Boxes;
        console.log(prevPlayer1Boxes);
        let allIndices = prevPlayer1Boxes;
        allIndices.forEach(num => allIndices = allIndices.concat(this.getAdjacentIndices(num)));

        let newIndices = prevPlayer1Boxes.concat(this.getNewIndices(allIndices, color));
        newIndices = newIndices.filter((item, index) => newIndices.indexOf(item) === index);
        console.log(newIndices);

        this.changeColor(newIndices, color);
        this.setState({player1Boxes: newIndices})
        this.setState({player1Score: newIndices.length})
    }

    getNewIndices(indices, inputColor) {
        let allRects = d3.selectAll('rect')._groups[0];
        let newRects = [];

        indices.forEach((num) => {
            let color = allRects[num].__data__.color;
            let temp = color === inputColor ? newRects.push(num) : null;
        })

        return newRects;
    }

    changeColor(rectIndices, color) {
        rectIndices.forEach((rectIndex) => {
            let rect = d3.selectAll('rect')._groups[0][rectIndex];

            d3.select(rect)
                .transition()
                .duration(2000)
                .style('fill', color)
        })
    }

    getAdjacentIndices(currentIndex) {
        let dim = 3;
        let maxIndex = 8;

        let above = currentIndex - dim;
        let below = currentIndex + dim;
        let right = currentIndex + 1;
        let left = currentIndex - 1;

        let indices = [];

        if (above >= 0) {
            indices.push(above);
        }

        if (below <= maxIndex) {
            indices.push(below);
        }

        if (currentIndex % dim !== dim - 1) {
            indices.push(right);
        }

        if (currentIndex % dim !== 0) {
            indices.push(left);
        }

        return indices;        
    }

    render() {
        return (
            <div className="Vis"></div>
        )
    }
          
}
