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

let codiPartida = [
    { gameCode: 0 }
];




app.post('/iniciarJoc/codiPartida', (req, res) => {
    let nouCodi = { gameCode: parseInt(req.body.gameCode) }; // req.body = sirve para rellenar y añadir nuevos 'campos'
    for (let i = 0; i < codiPartida.length; i++) {
        if (codiPartida[i].gameCode == nouCodi.gameCode) {
            res.send(`El codi de partida està repetit. Introdueix un codi de partida diferent.`);
            break;
        }
    }
    codiPartida.push(nouCodi);
    res.send(codiPartida);


});

app.get('/consultarEstatPartida/codiPartida : JSON', (req, res) => {

});

app.put('/moureJugador/codiPartida/jugador/tipusMoviment', (req, res) => {

});

app.delete('/acabarJoc/codiPartida', (req, res) => {

});

app.listen(3000, () => console.log('Inici del servidor.'));
