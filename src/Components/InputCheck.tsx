import React from "react";
import "../App.css";

export interface ITipCalculator {
  // Defin the shape of the main State object
  billTotal: number;
  taxes: number;
  partySize: number;
  tipPercent: number;
  tipTotal: number;
  grandTotal: number;
}

//>>>>>>>>>>>>>>>>>> INPUTCHECK
export default class InputCheck extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      amount: 0.0
    };
  }

  handleChange = (e: any) => {
    let newValue = parseFloat(e.target.value).toFixed(2);
    let updateObj = {
      newValue: newValue,
      propToUpdate: this.props.dataProp
    };
    this.props.updateBalance(updateObj);
  };

  render() {
    return (
      <div className="section">
        <label className="inputLabel">{this.props.label}</label>
        <div className="inputArea">
          <span>$</span>
          <input
            type="number"
            step="0.01"
            className="inputArea_text"
            placeholder={this.props.balance}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
//>>>>>>>>>>>>>>>>>> END INPUTCHECK