import React, { Component } from 'react';
import '../App.css';
import * as d3 from 'd3';

export default class Filler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerScores: [1, 1],
            playerBoxes: [[90], [9]],
            currentPlayer: 0
        }

        this.changeColor = this.changeColor.bind(this);
        this.getAdjacentIndices = this.getAdjacentIndices.bind(this);
    }

    componentDidMount() {
        this.main()
        console.log('TEXT');
        //console.log(d3.select('.Vis').selectAll('text')._groups[0][this.state.currentPlayer]);
        console.log(d3.select('.player1'))
        console.log(d3.selectAll('text'))
    }

    componentDidUpdate() {
        this.updateText();
    }

    generateData(dim, start, delta, size, flag = false) {
        let colors = ['red', 'blue', 'green', 'black', 'purple', 'white', 'yellow'];
        let data = [];
        let x;
        let y = start[1];
        let color;

        for (let i = 0; i < dim[0]; i++) {
            x = start[0];
            for (let j = 0; j < dim[1]; j++ ) {
                color = flag ? colors[j] : colors[Math.floor(Math.random() * colors.length)];
                data.push({'x': x, 'y': y, 'size': size, 'flag': flag, 'color': color});
                x += delta[0];
            }
            y += delta[1];
          }
        return data;
    }

    updateText() {
        let textColor = 'white';
        let titleSize = '25px';

        if (this.state.currentPlayer) { // Player 2
            d3.select('.Vis').select('.player2')
                .text('Player 2 Score: ' + this.state.playerScores[1])
        } else { // Player 1
            d3.select('.player1')
                .text('Player 1 Score: ' + this.state.playerScores[0])
        }

        //d3.select('.Vis').select('text')
        //d3.select('.Vis').selectAll('text')._groups[0][this.state.currentPlayer]
        //    .text('Player' + (this.state.currentPlayer + 1) + ' Score: ' + this.state.playerScores[0]) //player1Score)
    }
    
    main() {
        let { data, constantData, player1Score } = this.state;
        data = this.generateData(...[[10, 10], [150, 75], [40, 40], 40]);
        constantData = this.generateData(...[[1, 7], [50, 515], [90, 100], 50, true]);
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
                if (data.target.__data__.flag) this.update(data.target.__data__.color)
                else console.log("NOTHING: " + data.target.__data__.color)
            })
        
        let textColor = 'white';
        let titleSize = '25px';

        let playerScores = this.state.playerScores;
    
        svg.append('text')
            .attr('x', this.props.width / 4)
            .attr('y', 50)
            .attr('text-anchor', 'middle')
            .style('fill', textColor)
            .style('font-size', titleSize)
            .style('text-decoration', 'underline')
            .text('Player 1 Score: ' + playerScores[0])
            .attr('class', 'player1')
        
        svg.append('text')
            .attr('x', this.props.width * 3 / 4)
            .attr('y', 50)
            .attr('text-anchor', 'middle')
            .style('fill', textColor)
            .style('font-size', titleSize)
            .style('text-decoration', 'underline')
            .text('Player 2 Score: ' + playerScores[1])
            .attr('class', 'player2')

    }

    update(color) {
        let prevPlayer1Boxes = this.state.playerBoxes[this.state.currentPlayer]; //[0];//player1Boxes;
        //console.log(prevPlayer1Boxes);
        let allIndices = prevPlayer1Boxes;
        allIndices.forEach(num => allIndices = allIndices.concat(this.getAdjacentIndices(num)));

        let newIndices = prevPlayer1Boxes.concat(this.getNewIndices(allIndices, color));
        newIndices = newIndices.filter((item, index) => newIndices.indexOf(item) === index);
        console.log('NEW');
        console.log(newIndices);

        let playerScores = this.state.playerScores;
        let playerBoxes = this.state.playerBoxes;

        this.changeColor(newIndices, color);

        if (this.state.currentPlayer) { // Player 2 
            this.setState({playerBoxes: [playerBoxes[0], newIndices]});
            this.setState({playerScores: [playerScores[0], newIndices.length]});
        } else { // Player 1
            this.setState({playerBoxes: [newIndices, playerBoxes[1]]});
            this.setState({playerScores: [newIndices.length, playerScores[1]]});
        }
        this.setState({currentPlayer: 1 - this.state.currentPlayer});

        //this.setState({playerBoxes: [newIndices, playerBoxes[1]]});
        //this.setState({playerScores: [newIndices.length, playerScores[1]]});
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
        console.log('CHANGE');
        console.log(rectIndices);
        rectIndices.forEach((rectIndex) => {
            let rect = d3.selectAll('rect')._groups[0][rectIndex];

            d3.select(rect)
                .transition()
                .duration(2000)
                .style('fill', color)
        })
    }

    getAdjacentIndices(currentIndex) {
        let dim = 10;
        let maxIndex = 99;

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
