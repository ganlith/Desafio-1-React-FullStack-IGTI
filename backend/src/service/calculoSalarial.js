const express = require("express");
const calculateSalaryFrom = require('../utils/salary');

module.exports = {

    async calculaSalario(request, response) {

        const { value } = request.params;
        //const { value } = request.body;

        const salarioFinal = calculateSalaryFrom(value);
 
        return response.json(salarioFinal);

    }
}