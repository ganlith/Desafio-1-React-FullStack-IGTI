const express = require("express");

  function round(value) {
    return +value.toFixed(2);
  }
  
  function calculateDiscountINSS(baseINSS) {
    var fs = require("fs");

    let data = fs.readFileSync('./src/repository/inss_table.json', 'utf8');

    const inss = JSON.parse(data);

    const INSS_TABLE = inss.INSS_TABLE;

    let discountINSS = 0;
  
    if (baseINSS > 6101.07) {
      return 713.1;
    }
  
    for (var i = 0; i < INSS_TABLE.length; i++) {
      var currentItem = INSS_TABLE[i];
      let discountValue = 0;
  
      if (baseINSS > currentItem.maxValue) {
        // prettier-ignore
        discountValue = 
          round(currentItem.difference * currentItem.discountPercentage);
  
        discountINSS += discountValue;
      } else {
        // prettier-ignore
        discountValue = 
          round((baseINSS - currentItem.minValue) * currentItem.discountPercentage);
  
        discountINSS += discountValue;
        break;
      }
    }
  
    discountINSS = round(discountINSS);
  
    return discountINSS;
  }
  
  function calculateDiscountIRPF(baseIRPF) {
    let discountIRPF =
      baseIRPF < 1903.98
        ? 0
        : baseIRPF < 2826.65
        ? round(baseIRPF * 0.075) - 142.8
        : baseIRPF < 3751.05
        ? round(baseIRPF * 0.15) - 354.8
        : baseIRPF < 4664.68
        ? round(baseIRPF * 0.225) - 636.13
        : round(baseIRPF * 0.275) - 869.36;
  
    discountIRPF = round(discountIRPF);
  
    return discountIRPF;
  }

  function calcularPercentual(fullSalary, vlrCalculo){
    return (vlrCalculo/fullSalary)*100
  }
  
  module.exports = function calculateSalaryFrom(fullSalary) {
    const baseINSS = fullSalary;
    const discountINSS = calculateDiscountINSS(baseINSS);
  
    const baseIRPF = baseINSS - discountINSS;
    const discountIRPF = calculateDiscountIRPF(baseIRPF);
  
    const netSalary = baseINSS - discountINSS - discountIRPF;
    
    const parcentBaseInss = calcularPercentual(fullSalary,baseINSS);    
    const parcentDiscountInss = calcularPercentual(fullSalary,discountINSS);
    const parcentBaseIRPF = calcularPercentual(fullSalary,baseIRPF);
    const parcentDiscountIRPF = calcularPercentual(fullSalary,discountIRPF);
    const parcentNetSalary = calcularPercentual(fullSalary,netSalary);

    return {
      baseINSS,
      parcentBaseInss,
      discountINSS,
      parcentDiscountInss,
      baseIRPF,
      parcentBaseIRPF,
      discountIRPF,
      parcentDiscountIRPF,
      netSalary,
      parcentNetSalary
    };
  }
  