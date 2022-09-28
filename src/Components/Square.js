import React from "react";
import "../App.css";

function Square(props) {
    return (
      <button className={`square ${props.className}`} onClick={props.onClick}>
        {props.value}
      </button>
    );
}

export default Square;