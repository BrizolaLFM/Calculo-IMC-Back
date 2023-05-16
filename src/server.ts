import express, { Express, Request, response, Response } from 'express';
import dotenv from 'dotenv';
import _, { isEmpty, isNumber, result } from 'lodash';


dotenv.config({ path: process.env.NODE_ENV === "test" ? "./test/.env-test" : ".env" });

const server: Express = express();
const cors = require('cors');

server.use(cors({
    origin: '*'
}));

const port: number = _.toNumber(8080);
server.use(express.json())

server.post('/imc', (req: Request, res: Response) => {
    (req.body)
    if (req.body.nome == "") {
        return res.json({"message":"Favor preencher todos os campos!"});
    }
if (req.body.peso == '') {
    return res.json({"message":"Favor preencher todos os campos!"});
}
if (req.body.altura == "") {
    return res.json({"message":"Favor preencher todos os campos!"});
}

    const {nome, peso, altura} = req.body 
    let xAltura = altura;

    if(Number.isInteger(Number.parseFloat(altura))){
        xAltura = altura.toString().replace(/\D/g, "")/100;
    }

    const valorIMC = parseFloat((peso / (xAltura * xAltura)).toFixed(2));
    
    let situacao = "";

    if (valorIMC < 18.5) {
        situacao = 'abaixo do peso.';
    } else if (valorIMC < 25) {
        situacao = 'no peso ideal.';
    } else if (valorIMC < 30) {
        situacao = 'levemente acima do peso.';
    } else if (valorIMC < 35) {
        situacao = 'com obesidade grau I. Atenção!';
    } else if (valorIMC < 40) {
        situacao = 'com obesidade grau II. Atenção!';
    } else {
        situacao = 'com obesidade grau III. Cuidado!!!';
    }
    const result = `${nome} seu IMC é ${valorIMC} e você está ${situacao}`;
    console.log(result)
    res.send({ "message":result })
});

export default server.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});