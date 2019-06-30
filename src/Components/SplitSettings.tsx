import React from "react";
import "../App.css";

export default function SplitSettings(props: any): JSX.Element {
  return (
    <div className="section">
      <label className="inputLabel">{props.label}</label>
      <div className="inputArea">
        <span className="inputArea_text--split">
          party of {props.partySize}
        </span>
        <div className="addMinusButtons">
          <span onClick={() => props.increment()}>
            <i className="icon fas fa-plus-circle" />
          </span>
          <span onClick={() => props.decrement()}>
            <i className="icon fas fa-minus-circle" />
          </span>
        </div>
      </div>
    </div>
  );
}
