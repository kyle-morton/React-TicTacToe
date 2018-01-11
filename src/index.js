import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//     // *need constructor only if component has state
//     // constructor(props){ 
//     //     super(props);
//     //     this.state = {
//     //         value: null 
//     //     };
//     // }
//     render() {
//       return (
//         <button className="square" onClick={() => this.props.onClick()}>
//           {this.props.value}
//         </button>
//       );
//     }
//   }

  /* Functional Component -> needs nothing more than render so use shorthand */
  function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        xIsNext: true
      }
    }
    handleClick(i) {

      /* REM: making a copy, updating, then reassigning is FASTER than mutating existing state value */
      /* REM: tracking changes to mutable object is complex, tracking changes to immutable (new copy) is MUCH easier */

      const squares = this.state.squares.slice(); //get copy of squares instead of changing existing

      //if someone won or square already has value
      if (calculateWinner(squares) || squares[i])
        return;
      
      squares[i] = this.state.xIsNext ? 'X' : 'O'; //update chosen square with x
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext
      }); //set squares in state
    }
    renderSquare(i) {
      return <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />;
    }
  
    render() {
      const winner = calculateWinner(this.state.squares);
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  