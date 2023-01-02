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
];

let prova = [

];

app.post('/iniciarJoc/codiPartida/:gameCode', (req, res) => {
    // El código de la nueva partida es introducido desde los parámetros de la dirección. 
    let codiRepetit = false;
    let codiNou = []; 
    for (let i of codisPartides){
        if (i.gameCode == req.params.gameCode){
            codiRepetit = true;
        }
    }

    // Revisión de la variable 'codiRepetit' para comprobar si el codigo introducido está repetido o no.
    if (codiRepetit == true){
        res.send("El codi de partida introduït està repetit. Introdueix un codi de partida diferent.");
    }else {
        codiNou = {gameCode: parseInt(req.params.gameCode), jugadaJugador1:'', jugadaJugador2:'', guanyadesJugador1:0,guanyadesJugador2:0};
        codisPartides.push(codiNou);
        res.send(codisPartides);
    }
});

app.get('/consultarEstatPartida/:codiPartida', (req, res) => {
    codisPartides.forEach(function(partida) {
        if (partida.gameCode === parseInt(req.params.codiPartida)) {
            res.send(partida);
        }
    })
    
    res.send()
});

app.get('/consultarServidor', (req, res) => {
    res.send("Servidor funcionant correctament!");

});

app.put('/moureJugador/:codiPartida/:jugador/:jugada', (req, res) => { 
    let partidaActual = {codiPartida: parseInt(req.params.codiPartida), jugador: parseInt(req.params.jugador), jugada: req.params.jugada};
    
    prova.push(partidaActual);
    for (let i of codisPartides){
        if (i.gameCode == prova.codiPartida){
            
        }else{
            //EL CODIGO NO EXISTE
        }
    }
    res.send(prova);
});

app.delete('/acabarJoc/codiPartida', (req, res) => {

});

app.listen(3000, () => console.log('Inici del servidor.'));
