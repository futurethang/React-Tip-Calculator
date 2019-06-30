import React from "react";
import Header from "./Components/Header";
import InputCheck from "./Components/InputCheck";
import TipSettings from "./Components/TipSettings";
import SplitSettings from "./Components/SplitSettings";
import TipTotal from "./Components/TipTotal";
import GrandTotal from "./Components/GrandTotal";
import "./App.css";

export interface ITipCalculator {
  // Defin the shape of the main State object
  billTotal: number;
  taxes: number;
  partySize: number;
  splitTip: number;
  tipPercent: number;
  tipTotal: number;
  grandTotal: number;
}

class App extends React.Component<any, ITipCalculator> {
  state = {
    billTotal: 0, // bill total before tax
    taxes: 0, // taxes on bill
    partySize: 1, // number of people sharing the tip total
    tipPercent: 18, // percent to tip
    splitTip: 0,
    tipTotal: 0, // calculated tip amount, excluding tax from the total
    grandTotal: 0, // final paymeny total, tax and tip included
    hue: 100 // style variable to update the app background color
  };

  // a function that receives properties and values as input and updates state
  updateBalance = async (updateObj: any) => {
    const { newValue, propToUpdate } = updateObj;
    // console.log(newValue, propToUpdate);
    let updatedState: any = { ...this.state };
    updatedState[propToUpdate] = newValue;
    // debugger;
    await this.setState(updatedState);
    this.updateTip();
  };

  // function to calculate the correct tip total and grand total to update to the state
  updateTip = () => {
    const { billTotal, taxes, partySize, tipPercent } = this.state;
    let totalNoTax = billTotal - taxes;
    let tipAsPercent = tipPercent / 100;
    let tipTotal = Math.round(totalNoTax * tipAsPercent * 1e2) / 1e2 || 0; // default to 0 to avoid NaN ;
    let grandTotal = Math.round((Number(billTotal) + tipTotal) * 1e2) / 1e2; // rounded and parsed to display dollars.cents float format correctly
    let outPut = Math.round((tipTotal / partySize) * 1e2) / 1e2;
    this.setState({
      splitTip: outPut,
      tipTotal: tipTotal,
      grandTotal: grandTotal
    });
  };

  // action functions to adjust party size
  incrementPartySize = async () => {
    let newSize = this.state.partySize + 1;
    await this.setState({
      partySize: newSize
    });
    this.updateTip();
  };

  decrementPartySize = async () => {
    let newSize;
    this.state.partySize <= 1
      ? (newSize = 1) // prevent the count from being lower than 1
      : (newSize = this.state.partySize - 1);

    await this.setState({
      partySize: newSize
    });
    this.updateTip();
  };

  render() {
    return (
      <div
        className="App"
        style={{ backgroundColor: `hsla(${this.state.hue},60%,90%,1)` }}
      >
        <Header />
        <InputCheck
          label="bill total"
          updateBalance={this.updateBalance}
          dataProp="billTotal"
          balance={this.state.billTotal}
        />
        <InputCheck
          label="taxes"
          updateBalance={this.updateBalance}
          dataProp="taxes"
          balance={this.state.taxes}
        />
        <TipSettings
          label="tip"
          tipPercent={this.state.tipPercent}
          updateBalance={this.updateBalance}
          dataProp="tipPercent"
        />
        <SplitSettings
          label="split"
          partySize={this.state.partySize}
          increment={this.incrementPartySize}
          decrement={this.decrementPartySize}
        />
        <TipTotal
          label="tip per person"
          tipTotal={this.state.tipTotal}
          splitTip={this.state.splitTip}
        />
        <GrandTotal
          label="total amount due"
          grandTotal={this.state.grandTotal}
        />
      </div>
    );
  }
}

export default App;
