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
    const { billTotal, taxes, partySize, tipPercent } = this.state;
    let totalNoTax = billTotal - taxes;
    let dividedByPartySize = totalNoTax / partySize;
    let tipAsPercent = tipPercent / 100;
    let outPut =
      parseFloat((dividedByPartySize * tipAsPercent).toFixed(2)) || 0;
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
          label="tip"
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

//------------------------------------------------------

//>>>>>>>>>>>>>>>>>> TIPSETTINGS
class TipSettings extends React.Component<any, any> {
  handleChange = (e: any) => {
    let newValue = parseFloat(e.target.value.slice(0, 2)) || 0;
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
        <div className="inputArea" style={{ justifyContent: "flex-start" }}>
          <input
            type="number"
            min="0"
            max="100"
            step="1"
            className="inputArea_text--tip"
            placeholder={this.props.tipPercent}
            onChange={this.handleChange}
          />
          <span>%</span>
        </div>
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
//>>>>>>>>>>>>>>> END SPLITSETTINGS

//------------------------------------------------------

//>>>>>>>>>>>>>>>>> TIP TOTAL
function TipTotal(props: any): JSX.Element {
  return (
    <div className="section">
      <label className="inputLabel">{props.label}</label>
      <span className="taxTotal">${props.tipTotal}</span>
    </div>
  );
}
//>>>>>>>>>>>>>>>>> END  TIP TOTAL

//------------------------------------------------------

export default App;
