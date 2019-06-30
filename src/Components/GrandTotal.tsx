import React from "react";
import "../App.css";

export default function GrandTotal(props: any): JSX.Element {
  return (
    <div className="section">
      <label className="inputLabel">{props.label}</label>
      <span className="taxTotal">${props.grandTotal}</span>
    </div>
  );
}