import React from "react";
import "./App.css";

export interface ITipCalculator {
  billTotal: number;
  taxes: number;
  partySize: number;
  tipPercent: number;
  tipTotal: number;
  grandTotal: number;
}

class App extends React.Component<any, ITipCalculator> {
  state = {
    billTotal: 0,
    taxes: 0,
    partySize: 1,
    tipPercent: 18,
    tipTotal: 0,
    grandTotal: 0,
    hue: 100
  };

  updateBalance = async (updateObj: any) => {
    const { newValue, propToUpdate } = updateObj;
    // console.log(newValue, propToUpdate);
    let updatedState: any = { ...this.state };
    updatedState[propToUpdate] = newValue;
    // debugger;
    await this.setState(updatedState);
    this.updateTip();
  };

  updateTip = () => {
    const { billTotal, taxes, partySize, tipPercent } = this.state;
    let totalNoTax = billTotal - taxes;

    let tipAsPercent = tipPercent / 100;
    let tipTotal = totalNoTax * tipAsPercent || 0;
    let grandTotal = Math.round((Number(billTotal) + tipTotal) * 1e2) / 1e2;

    // (Number(billTotal) + tipTotal).toFixed(2);

    // the issure below is that the tip total comes after party division, which leaves no reference to the actual tip total, just the split one
    let outPut = Math.round((tipTotal / partySize) * 1e2) / 1e2;
    // parseInt((tipTotal / partySize).toFixed(2));

    // debugger;
    // let dividedByPartySize = totalNoTax / partySize;
    this.setState({
      tipTotal: outPut,
      grandTotal: grandTotal
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
        <TipTotal label="tip per person" tipTotal={this.state.tipTotal} />
        <GrandTotal
          label="total amount due"
          grandTotal={this.state.grandTotal}
        />
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

  slideTipUpdate = async (e: number) => {
    let tip; // default tip amount to adjust with swipe
    let minimumTip: number = 10;
    let maximumTip: number = 35;
    let minimumHue: number = 0;
    let maximumHue: number = 200;
    let maxWidth: number = 375;
    let touchScale: number;
    let xScale = e / maxWidth;
    touchScale = xScale > 1 ? 1 : xScale;
    tip = touchScale * maximumTip > minimumTip ? touchScale * maximumTip : 10;
    tip = tip.toFixed(0);
    let hue: any =
      touchScale * maximumHue > minimumHue ? touchScale * maximumHue : 0;
    hue = hue.toFixed(0);
    const updateTip = {
      newValue: tip,
      propToUpdate: this.props.dataProp
    };
    const updateHue = {
      newValue: hue,
      propToUpdate: "hue"
    };
    // console.log(updateHue.newValue);
    await this.props.updateBalance(updateTip);
    this.props.updateBalance(updateHue);
  };

  render() {
    return (
      <div
        className="section tipPercent"
        onTouchMove={e => {
          this.slideTipUpdate(e.touches[0].clientX);
        }}
      >
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

//>>>>>>>>>>>>>>>>> GRAND TOTAL
function GrandTotal(props: any): JSX.Element {
  return (
    <div className="section">
      <label className="inputLabel">{props.label}</label>
      <span className="taxTotal">${props.grandTotal}</span>
    </div>
  );
}
//>>>>>>>>>>>>>>>>> END  GRAND TOTAL

//------------------------------------------------------

export default App;
