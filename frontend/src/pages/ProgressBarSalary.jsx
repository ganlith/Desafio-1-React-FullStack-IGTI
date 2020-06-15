import React, { Component } from "react";

export default class ProgressBarSalary extends Component {
  render() {
    const { descontoInss, descontoIrrf, percentualLiquido } = this.props;

    return (
      <>
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              height: "30px",
              backgroundColor: "#dad72f",
              width: descontoInss + "%",
            }}
          ></div>
          <div
            style={{
              height: "30px",
              backgroundColor: "#bb0d27",
              width: descontoIrrf + "%",
            }}
          ></div>
          <div
            style={{
              height: "30px",
              backgroundColor: "#1a551a",
              width: percentualLiquido + "%",
            }}
          ></div>
        </div>
      </>
    );
  }
}