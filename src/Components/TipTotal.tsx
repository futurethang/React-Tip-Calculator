import React from "react";
import "../App.css";

export default function TipTotal(props: any): JSX.Element {
  return (
    <div className="section tip-area">
      <div className="total-tip">
        <label className="inputLabel">total tip</label>
        <span className="taxTotal">${props.tipTotal}</span>
      </div>
      <div className="split-tip">
        <label className="inputLabel">{props.label}</label>
        <span className="taxTotal" style={{ color: "rgb(56, 73, 110)" }}>
          ${props.splitTip}
        </span>
      </div>
    </div>
  );
}
