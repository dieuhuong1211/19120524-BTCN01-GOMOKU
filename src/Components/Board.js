import React from "react";
import "../App.css";

import Square from "./Square";
const size = 15;

function Board(props){
  const renderSquare = (i) => {
    return (
      <Square
        className={
          props.winner && props.winner.includes(i) ? "win" : ""
        }
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
        
      />
    );
  }

  return (
    <div className="board-rows">
      {Array(size)
        .fill(null)
        .map((itemi, i) => (
          <div className="board-columns" key={i}>
            {Array(size)
            .fill(null)
            .map((itemj, j) => (
            <div key={j}>
              {renderSquare(size*i+j)}
            </div>
            ))}
          </div>
        ))}
    </div>
    
  );
}

export default Board;