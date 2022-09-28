import React from "react";
import "../App.css";

import Square from "./Square";
const size = 15;

class Board extends React.Component {
  renderSquare(i) {
    // this.props.winner && this.props.winner.includes(i) ? console.log(i) : {}
    return (
      <Square
        className={
          this.props.winner && this.props.winner.includes(i) ? "win" : ""
        }
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        
      />
    );
  }

  
    render() {
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
                    {this.renderSquare(size*i+j)}
                  </div>
                  ))}
                </div>
              ))}
          </div>
          
        );
    }
}

export default Board;