import React, { Component } from "react";
import css from "./styles.css";
import ProgressBarSalary from "./ProgressBarSalary.jsx";
import api from "../services/api";

export default class calculosalarial extends Component {

  constructor() {
    super();

    this.state = {
      fullSalary: 0,
      baseINSS: 0,
      baseIRPF: 0,
      discountINSS: 0,
      discountIRPF: 0,
      netSalary: 0,
      parcentBaseIRPF: 0,
      parcentBaseInss: 0,
      parcentDiscountIRPF: 0,
      parcentDiscountInss: 0,
      parcentNetSalary: 0
    };

    this.calculaSalary(this.state.fullSalary)

  }

  async calculaSalary() {

    const data = await api.get(`calculo-salarial/${this.state.fullSalary}`);

    const dataFinal = data.data;

    this.setState(() => ({
      fullSalary: dataFinal.baseINSS,
      baseINSS: dataFinal.baseINSS,
      baseIRPF: dataFinal.baseIRPF,
      discountINSS: dataFinal.discountINSS,
      discountIRPF: dataFinal.discountIRPF,
      netSalary: dataFinal.netSalary,
      parcentBaseIRPF: dataFinal.parcentBaseIRPF,
      parcentBaseInss: dataFinal.parcentBaseInss,
      parcentDiscountIRPF: dataFinal.parcentDiscountIRPF,
      parcentDiscountInss: dataFinal.parcentDiscountInss,
      parcentNetSalary: dataFinal.parcentNetSalary
    }))
  }

  render() {

    return (
      <>
        <div className="row">
          <form className="col s12">
            <div className="card blue-grey darken-2">
              <div className="card-content white-text">
                <span className="card-title">React Salário</span>

                <div className="row">
                  <div className="input-field col s12">
                    <input
                      value={this.state.fullSalary}
                      placeholder="Salário"
                      id="salario"
                      type="number"
                      min='0'
                      className={css.valores}
                      onChange={(e) => this.setState({ fullSalary: e.target.value }, () => { this.calculaSalary() })}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col s3">
                <label>Base INSS:</label>
                <input
                  value={new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    maximumFractionDigits: 2,
                  }).format(this.state.baseINSS)}
                  id="baseinss"
                  type="text"
                  className={css.valores}
                />
              </div>
              <div className="col s3">
                <label>Desconto INSS:</label>
                <input
                  value={
                    new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                      maximumFractionDigits: 2,
                    }).format(this.state.discountINSS) +
                    " (" +
                    new Intl.NumberFormat("pt-BR", {
                      maximumFractionDigits: 2,
                    }).format(this.state.parcentDiscountInss) + " %)"
                  }
                  id="descontoinss"
                  type="text"
                  className={css.descontoInss}
                />
              </div>
              <div className="col s3">
                <label>Base IRRF:</label>
                <input
                  value={new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    maximumFractionDigits: 2,
                  }).format(this.state.baseIRPF)}
                  id="baseirrf"
                  type="text"
                  className={css.valores}
                />
              </div>
              <div className="col s3">
                <label>Desconto IRRF:</label>
                <input
                  value={
                    new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                      maximumFractionDigits: 2,
                    }).format(this.state.discountIRPF) +
                    " (" +
                    new Intl.NumberFormat("pt-BR", {
                      maximumFractionDigits: 2,
                    }).format(this.state.parcentDiscountIRPF) + " %)"
                  }
                  id="descontoirrf"
                  type="text"
                  className={css.descontoIrrf}
                />
              </div>
            </div>
            <div className="row">
              <div className="col s3">
                <label>Salario Final:</label>
                <input
                  value={
                    new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                      maximumFractionDigits: 5,
                    }).format(this.state.netSalary) +
                    " (" +
                    new Intl.NumberFormat("pt-BR", {
                      maximumFractionDigits: 2,
                    }).format(this.state.parcentNetSalary) + " %)"
                  }
                  id="descontoinss"
                  type="text"
                  className={css.salarioLiquido}
                />
              </div>
            </div>
          </form>
        </div>
        <ProgressBarSalary
          descontoInss={new Intl.NumberFormat("en-IN", {
            maximumFractionDigits: 2,
          }).format(this.state.parcentDiscountInss)}
          descontoIrrf={new Intl.NumberFormat("en-IN", {
            maximumFractionDigits: 2,
          }).format(this.state.parcentDiscountIRPF)}
          percentualLiquido={new Intl.NumberFormat("en-IN", {
            maximumFractionDigits: 2,
          }).format(this.state.parcentNetSalary)}
        />
      </>
    )
  }
}