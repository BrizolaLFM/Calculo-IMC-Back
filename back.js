//Criando uma API para a Calculadora de IMC

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/', function(req,res){
    const {peso, altura, nome} = req.body
    const IMC = peso / (altura*altura)
    res.json({nome, IMC})
});

app.listen(3000, () => console.log("Tá funcionando!"));