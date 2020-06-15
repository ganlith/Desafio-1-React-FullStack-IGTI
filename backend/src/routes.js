const express = require("express");
const { celebrate, Segments, Joi } = require('celebrate');

const calculoControl = require('./service/calculoSalarial');

const routes = express.Router();

//Exemplo de passagem de parametro na url (ID)
routes.get("/calculo-salarial/:value", celebrate({
    [Segments.PARAMS]: Joi.object().keys({        
        value: Joi.number().required()
    })
}), calculoControl.calculaSalario);

//Exemplo de passagem de parametro no corpo da requisição
// routes.get("/calculo-salarial", celebrate({
//     [Segments.BODY]: Joi.object().keys({        
//         value: Joi.number().required()
//     })
// }), calculoControl.calculaSalario);

module.exports = routes;
