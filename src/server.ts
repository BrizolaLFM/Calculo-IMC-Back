import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import _ from 'lodash';


dotenv.config({ path: process.env.NODE_ENV === "test" ? "./test/.env-test" : ".env" });

const server: Express = express();
const cors = require('cors');

server.use(cors({
    origin: '*'
}));


const port: number = _.toNumber(3000);
server.use(express.json())

server.post('/imc', (req: Request, res: Response) => {
    console.log(req.body) 
    if (req.body == ''){
        return res.json("message: favor preencher todos os campos!")
    }
    
    const peso = req.body.peso
    const nome = req.body.nome
    const xAltura = Number(req.body.altura)
    const valorIMC = peso / (xAltura * xAltura)

    let situacao = ""

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
    res.send({ "message": result })
});

export default server.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

console.log('hello world!');