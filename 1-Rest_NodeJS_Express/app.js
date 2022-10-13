/* 
    * Web service Rest amb NodeJS i Express
    * Projecte amb Rest, NodeJS i Express per la recreació del joc "pedra, paper i tisora"
    * @authors 15585039.clot@fje.edu (Samuel Rebollo) | 15585072.clot@fje.edu (Xavier Aranda) 
    * @version 1.0 03.10.22
*/

const express = require('express'); // 'const': Quiere decir que no se puede cambiar el contenido de la variable.
const app = express();

app.use(express.urlencoded({ extended: true })); // Quiere decir que queremos trabajar con URLs completas.
app.use(express.json()) // Para analizar las peticiones HTTP que lleven JSON en el body o cuerpo (le indicamos que queremos trabajar con JSONs).


let jugades = [
    { jugada: 'pedra' },
    { jugada: 'paper' },
    { jugada: 'tisora' }
];

let codisPartides = [
    { gameCode: 0 }
];




app.post('/iniciarJoc/codiPartida/:gameCode', (req, res) => {
    let codiRepetit = false;
    let codiNou = []; 
    for (let i of codisPartides){
        if (i.gameCode == req.params.gameCode){
            codiRepetit = true;
        }
    }

    // Revisión de la variable 'codiRepetit' para comprobar si el codigo introducido está repetido o no
    if (codiRepetit == true){
        res.send("El codi de partida introduït està repetit. Introdueix un codi de partida diferent.");
    }else {
        codiNou = {gameCode: parseInt(req.params.gameCode)};
        codisPartides.push(codiNou);
        res.send(codisPartides);
    }
});

app.get('/consultarEstatPartida/codiPartida : JSON', (req, res) => {

});

app.put('/moureJugador/codiPartida/jugador/tipusMoviment', (req, res) => {

});

app.delete('/acabarJoc/codiPartida', (req, res) => {

});

app.listen(3000, () => console.log('Inici del servidor.'));
