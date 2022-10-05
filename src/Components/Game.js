import React from "react";
import "../App.css";
import Board from "./Board";
import { FaArrowDown, FaArrowUp, FaArrowsAltV }  from "react-icons/fa";

const size = 15;
let currSquare = -1;
let endGame = false;

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(size*size).fill(null),
        currRow: null,
        currColumn: null,
      }],
      stepNumber: 0,
      ascending: true,
      isPlayerX: true,
    };
  }

  handleClick(i) {
    

    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (endGame || squares[i]) {
      return;
    }
    currSquare = i;
    const rIdx = parseInt(i/size);
    const cIdx = i - rIdx*size;
    squares[i] = this.state.isPlayerX ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares,
        currRow: rIdx + 1,
        currColumn: cIdx + 1,
      }]),
      stepNumber: history.length,
      isPlayerX: !this.state.isPlayerX,
      ascending: this.state.ascending,

    });

    if(calculateWinner(squares, i))
    {
      endGame = true;
    }
  }

  jumpTo(step) {
    endGame = step === this.state.history.length - 1 ? true : false;
    this.setState({
      stepNumber: step,
      isPlayerX: step % 2 === 0,
    });
  }

  handleToggleButtonClick(ascending) {
    this.setState({
      ascending: !ascending,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares, currSquare);
    // console.log(winner);
    const draw = calculateDraw(current.squares);
    
    const moves = history.map((step, move) => {
      const desc = move ?
        'Move #' + move + ": r" + step.currRow + " - c" + step.currColumn:
        'Game start';
      return (
        <li key={move}>
          <button
            className={`history-button ${
              move === this.state.stepNumber ? "selected" : ""
            }`}
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      console.log(winner);
      status = "Winner Player: " + current.squares[winner[0]];
    } else if (draw) {
      status = "Game Drawed";
    } else {
      status = "Next player: " + (this.state.isPlayerX ? "X" : "O");
    }

    return (
      <div>
        <div className="game">
          <div className="game-board">
        <div className="game-title">Gomoku 15x15</div>

            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
              winner={winner}
            />
          </div>
          <div className="game-info">
            <div className="game-status">
              {status}
              <div
                  className="toggle-button-historylist"
                  onClick={() => this.handleToggleButtonClick(this.state.ascending)}
                >
                  <FaArrowsAltV />

                </div>
            </div>
            
            <ol className="history-list">
                {this.state.ascending ? moves : moves.slice(0).reverse()}
              </ol>
          </div>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares, index) {
  let winner = [index];
  if(squares[index] === null)
    return null;

  const rIdx = parseInt(index/size);
  const cIdx = index - rIdx*size;
  let i = rIdx;
  let j = cIdx;

  let count = 1;

  // X
  // X
  // X
  // X
  // X
  
  while(i - 1 >= 0)
  {
    i = i - 1;
    
    if(count === 5)
    {
      return winner;
    }
    if(squares[index] !== squares[size*i+j])
      break;
    winner.push(size*i+j);
    count++;
  }
  i = rIdx;
  while(i + 1 <= (size - 1))
  {
    i = i + 1;
    if(count === 5)
    {
      return winner;
    }
    if(squares[index] !== squares[size*i+j]) 
      break;
    winner.push(size*i+j);
    count++;
  }
  i = rIdx;

  winner = [index];
  count = 1;
  // X X X X X
  while(j - 1 >= 0)
  {
    j = j - 1;
    
    if(count === 5)
    {
      return winner;

    }
    if(squares[index] !== squares[size*i+j])
      break;
    winner.push(size*i+j);
    count++;
  }
  j = cIdx;
  while(j + 1 <= (size - 1))
  {
    j = j + 1;

    
    if(count === 5)
    {
      return winner;

    }
    if(squares[index] !== squares[size*i+j]) 
      break;
    winner.push(size*i+j);
    count++;
  }
  j = cIdx;

  winner = [index];
  count = 1;
  // X
  //  X
  //   X
  //    X
  //     X
  while((i - 1 >= 0) && (j - 1 >= 0))
  {
    i = i - 1;
    j = j - 1;
    
    if(count === 5)
    {
      return winner;

    }
    if(squares[index] !== squares[size*i+j])
      break;
    winner.push(size*i+j);
    count++;
  }
  i = rIdx;
  j = cIdx;
  while((i + 1 <= (size - 1)) && (j + 1 <= (size - 1)))
  {
    i = i + 1;
    j = j + 1;
    
    if(count === 5)
    {
      return winner;
    }
    if(squares[index] !== squares[size*i+j])
      break;
    winner.push(size*i+j);
    count++;
  }
  i = rIdx;
  j = cIdx;
  
  winner = [index];
  count = 1;
  //     X
  //    X
  //   X
  //  X
  // X
  while((i - 1 >= 0) && (j + 1 <= (size - 1)))
  {
    i = i - 1;
    j = j + 1;
    
    if(count === 5)
    {
      return winner;
    }
    if(squares[index] !== squares[size*i+j])
      break;
    winner.push(size*i+j);
    count++;
  }
  i = rIdx;
  j = cIdx;
  while((i + 1 <= (size - 1)) && (j - 1 >= 0))
  {
    i = i + 1;
    j = j - 1;
    
    if(count === 5)
    {
      return winner;
    }
    if(squares[index] !== squares[size*i+j])
      break;
    winner.push(size*i+j);
    count++;
  }


  return null;
}

function calculateDraw(squares) {

  for (let i = 0; i < size * size; i++) {
    if (!squares[i]) 
      return;
  }
  return true;
  
}

export default Game;