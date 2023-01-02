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


let codisPartides = [
];

app.post('/iniciarJoc/codiPartida/:gameCode', (req, res) => {
    // El código de la nueva partida es introducido desde los parámetros de la dirección. 
    let codiRepetit = false;
    let codiNou = [];
    for (let i of codisPartides) {
        if (i.gameCode == req.params.gameCode) {
            codiRepetit = true;
        }
    }

    // Revisión de la variable 'codiRepetit' para comprobar si el codigo introducido está repetido o no.
    if (codiRepetit == true) {
        res.send("El codi de partida introduït està repetit. Introdueix un codi de partida diferent.");
    } else {
        codiNou = { gameCode: parseInt(req.params.gameCode), jugadaJugador1: '', jugadaJugador2: '', guanyadesJugador1: 0, guanyadesJugador2: 0 };
        codisPartides.push(codiNou);
        res.send(codisPartides);
    }
});

app.get('/consultarEstatPartida/:codiPartida', (req, res) => {
    codisPartides.forEach(function (partida) {
        if (partida.gameCode === parseInt(req.params.codiPartida)) {
            let partidaActual = { gameCode: partida.gameCode, GuanyadesJugador1: partida.guanyadesJugador1, GuanyadesJugador2: partida.guanyadesJugador2 };
            res.send(partidaActual);
        }
    })


});

app.put('/moureJugador/:codiPartida/:jugador/:jugada', (req, res) => {
    codisPartides.forEach(function (partida) {
        if (partida.gameCode === parseInt(req.params.codiPartida)) {
            if (req.params.jugador == 1) {
                partida.jugadaJugador1 = req.params.jugada;
            } else if (req.params.jugador == 2) {
                partida.jugadaJugador2 = req.params.jugada;
            }
        }
    })

    res.send(codisPartides);
});

app.put('/jugarPartida/:codiPartida', (req, res) => {
    codisPartides.forEach(function (partida) {
        if (partida.gameCode === parseInt(req.params.codiPartida)) {
            eleccionJugador1 = partida.jugadaJugador1;
            eleccionJugador2 = partida.jugadaJugador2;

            if( eleccionJugador1 == '' && eleccionJugador2 == ''){
                res.send ("Ningún jugador ha escollit moviment.");
            }else if( eleccionJugador2 == ''){
                res.send("El jugador 2 no ha escollit moviment.");
            }else if( eleccionJugador1 == ''){
                res.send("El jugador 1 no ha escollit moviment.");
            }else if (partida.guanyadesJugador1 == 3 || partida.guanyadesJugador2 == 3){
                res.send('La partida ha finalitzat. Has d\'acabar la partida manualment.');
            }
            else if (eleccionJugador1 == eleccionJugador2) {
                res.send("Els jugadors han empatat la partida.");
            } else if (
                (eleccionJugador1 === 'pedra' && eleccionJugador2 === 'tisora') ||
                (eleccionJugador1 === 'paper' && eleccionJugador2 === 'pedra') ||
                (eleccionJugador1 === 'tisora' && eleccionJugador2 === 'paper')
            ) {
                partida.guanyadesJugador1 = partida.guanyadesJugador1 + 1;
                if(partida.guanyadesJugador1 == 3){
                    res.send("EL JUGADOR 1 HA GUANYAT LA PARTIDA!!!");
                }else{
                    res.send("El jugador 1 ha guanyat el torn.");
                }
                res.send("El jugador 1 ha guanyat el torn.");
            } else {
                partida.guanyadesJugador2 = partida.guanyadesJugador2 + 1;
                if(partida.guanyadesJugador2 == 3){
                    res.send("EL JUGADOR 2 HA GUANYAT LA PARTIDA!!!");
                }else{
                    res.send("El jugador 2 ha guanyat el torn.");
                }
                
            }
        }
    })
});



    app.delete('/acabarJoc/:codiPartida', (req, res) => {

        codisPartidesNou = [];

        for (let i of codisPartides) {
            if (i.gameCode != req.params.codiPartida) {
                codisPartidesNou.push(i);
            }
        }

        codisPartides = codisPartidesNou;

        res.send(codisPartides);
        
    });

app.get('/consultarServidor', (req, res) => {
    res.send("Servidor funcionant correctament!");

});

app.listen(3000, () => console.log('Inici del servidor.'));
