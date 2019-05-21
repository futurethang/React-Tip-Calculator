import React from "react";
import "./App.css";

export interface ITipCalculator {
  billTotal: number;
  taxes: number;
  partySize: number;
  tipPercent: number;
  tipTotal: number;
}

class App extends React.Component<any, ITipCalculator> {
  state = {
    billTotal: 0,
    taxes: 0,
    partySize: 1,
    tipPercent: 20,
    tipTotal: 0
  };

  updateBalance = async (updateObj: any) => {
    const { newValue, propToUpdate } = updateObj;
    let updatedState: any = { ...this.state };
    updatedState[propToUpdate] = newValue;
    // debugger;
    await this.setState(updatedState);
    this.updateTip();
  };

  updateTip = () => {
    const { billTotal, taxes, partySize, tipPercent, tipTotal } = this.state;
    let totalNoTax = billTotal - taxes;
    let dividedByPartySize = totalNoTax / partySize;
    let tipAsPercent = tipPercent / 100;
    let outPut = parseFloat((dividedByPartySize * tipAsPercent).toFixed(2));
    // debugger;
    this.setState({
      tipTotal: outPut
    });
  };

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
      <div className="App">
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
        <SplitSettings
          label="split"
          partySize={this.state.partySize}
          increment={this.incrementPartySize}
          decrement={this.decrementPartySize}
        />
        <TipSettings
          label="tip % "
          tipPercent={this.state.tipPercent}
          updateBalance={this.updateBalance}
          dataProp="tipPercent"
        />
        <TipTotal label="amount due" tipTotal={this.state.tipTotal} />
      </div>
    );
  }
}
//>>>>>>>>>>>>>>>>>>>>>>>>> END APP

//------------------------------------------------------

//>>>>>>>>>>>>>>>>>>>>>>>>> HEADER
function Header(): JSX.Element {
  return (
    <div>
      <header className="App-header">
        <h1>TIP CALCULATOR</h1>
      </header>
    </div>
  );
}
//>>>>>>>>>>>>>>>>>>>>>>>>> END HEADER

//------------------------------------------------------

//>>>>>>>>>>>>>>>>>> INPUTCHECK
class InputCheck extends React.Component<any, any> {
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
        <br />
        <span>$</span>
        <input
          type="number"
          step="0.01"
          className="text"
          placeholder={this.props.balance}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
//>>>>>>>>>>>>>>>>>> END INPUTCHECK

//------------------------------------------------------

//>>>>>>>>>>>>>>>>>> TIPSETTINGS
class TipSettings extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  handleChange = (e: any) => {
    let newValue = parseFloat(e.target.value.slice(0, 2));
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
        <input
          type="number"
          min="0"
          max="100"
          step="0.01"
          className="tip"
          placeholder={this.props.tipPercent}
          onChange={this.handleChange}
        />
        {/* replace with onTouch slider UI element that modifies state */}
      </div>
    );
  }
}
//>>>>>>>>>>>>>>>>>> END TIPSETTINGS

//------------------------------------------------------

//>>>>>>>>>>>>>>>>> SPLITSETTINGS
function SplitSettings(props: any): JSX.Element {
  return (
    <div className="section">
      <label className="inputLabel">{props.label}</label>
      <button onClick={() => props.increment()}>+</button>
      <button onClick={() => props.decrement()}>-</button>
      <h3>party of {props.partySize}</h3>
    </div>
  );
}
//>>>>>>>>>>>>>>> END SPLITSETTINGS

//------------------------------------------------------

//>>>>>>>>>>>>>>>>> TIP TOTAL
function TipTotal(props: any): JSX.Element {
  return (
    <div className="section">
      <label className="inputLabel">{props.label}</label>
      <input type="checkbox" name="splitToggle" />
      <h1>${props.tipTotal}</h1>
    </div>
  );
}
//>>>>>>>>>>>>>>>>> END  TIP TOTAL

//------------------------------------------------------

export default App;
