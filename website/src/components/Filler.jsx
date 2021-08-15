import React, { Component } from 'react';
import '../App.css';
import * as d3 from 'd3';

export default class Filler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerScores: [1, 1],
            playerBoxes: [[90], [9]],
            currentPlayer: 0,
            prevColors: ['',''],
            playerArrows: ['',''],
            winner: null
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

    // Resets all opacities and changes the specified ones
    changeOpacity(changeColors) {
        let colors = ['red', 'blue', 'green', 'white', 'purple', 'orange', 'yellow'];
        let allObjs = d3.selectAll('.bottom')._groups[0];
        colors.forEach((color, index) => {
            d3.select(allObjs[index])
                .style('opacity', 1.0)
        })
        
        changeColors.forEach((entry) => {
            if (entry !== '') {
                d3.select(allObjs[colors.indexOf(entry)])
                    .style('opacity', 0.1)
            }
        })
    }

    generateData(dim, start, delta, size, flag = false) {
        let colors = ['red', 'blue', 'green', 'white', 'purple', 'orange', 'yellow'];
        let data = [];
        let x;
        let y = start[1];
        let color;
        let className;

        for (let i = 0; i < dim[0]; i++) {
            x = start[0];
            for (let j = 0; j < dim[1]; j++ ) {
                color = flag ? colors[j] : colors[Math.floor(Math.random() * colors.length)];
                className = flag ? 'bottom' : 'top';
                data.push({'x': x, 'y': y, 'size': size, 'flag': flag, 'color': color, 'className': className});
                x += delta[0];
            }
            y += delta[1];
          }
        return data;
    }

    updateText() {
        if (this.state.currentPlayer) { // Player 2
            d3.select('.Vis').select('.player2')
                .text('Player 2 Score: ' + this.state.playerScores[1])
        } else { // Player 1
            d3.select('.player1')
                .text('Player 1 Score: ' + this.state.playerScores[0])
        }
    }

    updateBoardText(newBoxes) {
        let allObjs = d3.selectAll('.board')._groups[0];

        newBoxes[0].forEach((index) => {
            d3.select(allObjs[index])
                .attr('visibility', 'visible')
                .text('1')
        })

        newBoxes[1].forEach((index) => {
            d3.select(allObjs[index])
                .attr('visibility', 'visible')
                .text('2')
        })
    }
    
    main() {
        let data = this.generateData(...[[10, 10], [150, 75], [40, 40], 40]);
        let constantData = this.generateData(...[[1, 7], [50, 515], [90, 100], 50, true]);
        let { height, width, border } = this.props;

        let svg = d3.select('.Vis')
            .append('svg')
            .attr('height', height)
            .attr('width', width)
            .style('border', border)
        
        let groups = svg.selectAll('.groups')
            .data(data.concat(constantData))
            .enter()
            .append('g')

        //let squares = svg.selectAll('rect')
        //    .data(data.concat(constantData))
        //    .enter()
        groups.append('rect')
            .attr('x', (data) => (data.x))
            .attr('y', (data) => (data.y))
            .attr('height', (data) => (data.size))
            .attr('width', (data) => (data.size))
            .style('fill', (data) => (data.color))
            .attr('stroke', 'black')
            .attr('class', (data) => (data.className))
            .on('click', (data) => {
                if (data.target.__data__.flag & d3.select(data.target).style('opacity')) this.update(data.target.__data__.color)
            })
        
        groups.append('text')
            .attr('x', (data) => (data.x + data.size/3))
            .attr('y', (data) => (data.y + data.size*2/3))
            .style('font-size', '20px')
            .style('fill', 'black')
            .text('1')
            .attr('class', (data) => {
                if (!data.flag) return 'board';
                return 'stat';
            })
            .attr('visibility', 'hidden')

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

        let player1Arrow = svg.append('line')
            .attr('x1', 25)
            .attr('y1', 45)
            .attr('x2', 75)
            .attr('y2', 45)
            .attr('stroke-width', 5)
            .attr('stroke', 'white')
            .attr('marker-end', 'url(#triangle)')
        
        let player2Arrow = svg.append('line')
            .attr('x1', 370)
            .attr('y1', 45)
            .attr('x2', 420)
            .attr('y2', 45)
            .attr('stroke-width', 5)
            .attr('stroke', 'white')
            .attr('marker-end', 'url(#triangle)')
            .style('visibility', 'hidden')
        
        svg.append("svg:defs").append("svg:marker")
            .attr("id", "triangle")
            .attr("refX", 6)
            .attr("refY", 6)
            .attr("markerWidth", 30)
            .attr("markerHeight", 30)
            .attr("markerUnits", "userSpaceOnUse")
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M 0 0 12 6 0 12 3 6")
            .style("fill", "red");
        
        svg.append('text')
            .attr('x', this.props.width / 2)
            .attr('y', 50)
            .attr('text-anchor', 'middle')
            .style('fill', textColor)
            .style('font-size', titleSize)
            .style('text-decoration', 'underline')
            .text('Winner: Player ' + this.state.winner)
            .attr('class', 'winner')
            .style('visibility', 'hidden')
        
        this.setState({playerArrows: [player1Arrow, player2Arrow]})
        this.updateBoardText(this.state.playerBoxes);
    }

    update(color) {
        let prevPlayerBoxes = this.state.playerBoxes[this.state.currentPlayer];
        let allIndices = prevPlayerBoxes;
        allIndices.forEach(num => allIndices = allIndices.concat(this.getAdjacentIndices(num)));

        let newIndices = prevPlayerBoxes.concat(this.getNewIndices(allIndices, color));
        newIndices = newIndices.filter((item, index) => newIndices.indexOf(item) === index);

        // Remove indices belonging to the other player
        newIndices = newIndices.filter((item) => !this.state.playerBoxes[1 - this.state.currentPlayer].includes(item));

        let playerScores = this.state.playerScores;
        let playerBoxes = this.state.playerBoxes;
        let prevColors = this.state.prevColors;

        this.changeColor(newIndices, color);
        let updatedColors = this.state.currentPlayer ? [prevColors[0], color] : [color, prevColors[1]];
        this.changeOpacity(updatedColors)
        this.setState({prevColors: updatedColors})

        let newBoxes;
        let newScores;
        
        if (this.state.currentPlayer) { // Player 2
            newBoxes = [playerBoxes[0], newIndices];
            newScores = [playerScores[0], newIndices.length];
        } else { // Player 1
            newBoxes = [newIndices, playerBoxes[1]];
            newScores = [newIndices.length, playerScores[1]];
        }

        this.setState({playerBoxes: newBoxes});
        this.setState({playerScores: newScores});
        this.state.playerArrows[this.state.currentPlayer]
            .style('visibility', 'hidden')
        this.state.playerArrows[1 - this.state.currentPlayer]
            .style('visibility', 'visible')
        this.setState({currentPlayer: 1 - this.state.currentPlayer});

        this.updateBoardText(newBoxes)
        this.checkEndGame(newScores);
    }

    checkEndGame(newScores) {
        let player1Score = newScores[0];
        let player2Score = newScores[1];
        if (player1Score + player2Score === 10) {
            let winner = (player1Score > player2Score) ? 1 : (player2Score > player1Score) ? 2 : 'tie';
            this.setState({winner: winner});
            this.gameOver(winner)
        }   
    }

    // Hide Arrows and Player Scores and Show Winner Text
    gameOver(winner) {
        [d3.select('.player2'), d3.select('.player1'), ...this.state.playerArrows].forEach((item) => {
            item.style('visibility', 'hidden')
        })
        d3.select('.winner')
            .text(() => {
                return winner !== 'tie' ? 'Winner: Player ' + winner : 'Tie'
            })
            .style('visibility', 'visible')
    }

    getNewIndices(indices, inputColor) {
        let allRects = d3.selectAll('rect')._groups[0];
        let newRects = [];

        indices.forEach((num) => {
            let temp = allRects[num].__data__.color === inputColor ? newRects.push(num) : null;
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
