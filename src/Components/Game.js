import React, {useState, useEffect} from "react";
import "../App.css";
import Board from "./Board";
import {  FaArrowsAltV }  from "react-icons/fa";

const size = 15;
let currSquare = -1;
let endGame = false;

function Game() {
  const [game, setGame] = useState({
    history: [{
      squares: Array(size*size).fill(null),
      currRow: null,
      currColumn: null,
    }],
    stepNumber: 0,
    ascending: true,
    isPlayerX: true,
  })

  function handleClick(i) {
    const hIStOrY = game.history.slice(0, game.stepNumber + 1);
    const current = hIStOrY[hIStOrY.length - 1];
    const squares = current.squares.slice();

    if (endGame || squares[i]) {
      return;
    }
    currSquare = i;
    const rIdx = parseInt(i/size);
    const cIdx = i - rIdx*size;
    squares[i] = game.isPlayerX ? 'X' : 'O';

    setGame({
      history: hIStOrY.concat([{
        squares: squares,
        currRow: rIdx + 1,
        currColumn: cIdx + 1,
      }]),
      stepNumber: hIStOrY.length,
      isPlayerX: !game.isPlayerX,
      ascending: game.ascending,

    });

    if(calculateWinner(squares, i))
    {
      endGame = true;
    }
  }

  function jumpTo(step) {
    endGame = step === game.history.length - 1 ? true : false;
    setGame({
      history: game.history,
      stepNumber: step,
      isPlayerX: step % 2 === 0,
      ascending: game.ascending,

    });
  }

  function handleToggleButtonClick(ascending) {
    console.log(ascending);

    setGame({
      history: game.history,
      stepNumber: game.stepNumber,
      isPlayerX: game.isPlayerX,
      ascending: !ascending,

    });
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

  function renderMoves(){
    const moves = game.history.map((step, move) => {
      const desc = move ?
        'Move #' + move + ": r" + step.currRow + " - c" + step.currColumn:
        'Game start';
      return (
        <li key={move}>
          <button
            className={`history-button ${
              move === game.stepNumber ? "selected" : ""
            }`}
            onClick={() => jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });

    return moves;
  }
  const renderStatus = () => {
    const current = game.history[game.stepNumber];
    const winner = calculateWinner(current.squares, currSquare);
    const draw = calculateDraw(current.squares);
    let status;
    if (winner) {
      console.log(winner);
      status = "Winner Player: " + current.squares[winner[0]];
    } else if (draw) {
      status = "Game Drawed";
    } else {
      status = "Next player: " + (game.isPlayerX ? "X" : "O");
    }
    return status;
  }

  const renderWinner = () => {
    // console.log(game.stepNumber);
    const current = game.history[game.stepNumber];

    const winner = calculateWinner(current.squares, currSquare);
    return winner;

  }

  // useEffect(() => (
  //   renderWinner()
  // ))
  console.log("293: " + game.stepNumber);
  return (
    <div>
      <div className="game">
        <div className="game-board">
      <div className="game-title">Gomoku 15x15</div>

          <Board
            onClick={(i) => handleClick(i)}
            squares={game.history[game.stepNumber].squares}
            winner={renderWinner()}
          />
        </div>
        <div className="game-info">
          <div className="game-status">
            {renderStatus()}
            <div
                className="toggle-button-historylist"
                onClick={() => handleToggleButtonClick(game.ascending)}
              >
                <FaArrowsAltV />

              </div>
          </div>
          
          <ol className="history-list">
              {game.ascending ? renderMoves() : renderMoves().slice(0).reverse()}
            </ol>
        </div>
      </div>
    </div>
  );
}





export default Game;