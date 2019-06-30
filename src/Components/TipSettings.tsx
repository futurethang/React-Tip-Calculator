import React from "react";
import "../App.css";

export default class TipSettings extends React.Component<any, any> {
  handleChange = (e: any) => {
    let newValue = parseFloat(e.target.value.slice(0, 2)) || 0;
    let updateObj = {
      newValue: newValue,
      propToUpdate: this.props.dataProp
    };
    this.props.updateBalance(updateObj);
  };
  // live-update function that converts the user's touch response into hue shifted backround that mirrors the service experience
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
          <div className="shine" style={{ fontSize: ".5em", marginLeft: "1em" }}>slide to adjust tip</div>
        </div>
        {/* replace with onTouch slider UI element that modifies state */}
      </div>
    );
  }
}
