/* 
    * Web service Rest con NodeJS/ExpressJS
    * Proyecto con Rest, NodeJS y ExpressJS para la recreación del juego "piedra, papel o tijera"
    * @authors 15585039.clot@fje.edu (Samuel Rebollo) | 15585072.clot@fje.edu (Xavier Aranda) 
    * @version 1.0 03.10.22
*/

const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true })); // Quiere decir que queremos trabajar con URLs completas
app.use(express.json()) // Para analizar las peticiones HTTP que lleven JSON en el body o cuerpo (le indicamos que queremos trabajar con JSONs)


// Array de objetos (vacío por el momento), donde guardaremos las partidas, movimientos de los jugadores y sus victorias
let codisPartides = [
];


// CONSULTAR FUNCIONAMIENTO DEL SERVIDOR --> GET: Consultamos que el servidor está funcionando
app.get('/consultarServidor', (req, res) => {
    console.log("Estat del servidor consultat, tot funcionant correctament.");
    res.send("Servidor funcionant correctament!");
});


// INICIAR PARTIDA --> POST: Indicamos en la URL el código de la partida que queremos empezar y creamos la partida para comenzar a jugarla
app.post('/iniciarPartida/codiPartida/:gameCode', (req, res) => {
    // El código de la partida que queremos empezar es introducido en los parámetros de la URL
    let codiRepetit = false; // Variable que vamos a utilizar para controlar si una partida existe o no
    let codiNou = []; // Array que vamos a utilizar para subir los datos al array "codisPartides"
    for (let i of codisPartides) {
        if (i.gameCode == req.params.gameCode) {
            codiRepetit = true;
        }
    }
    // Revisamos la variable "codiRepetit" para comprobar si el código de partida introducido por parámetros está repetido o no
    if (codiRepetit){
        // Si "codiRepetit == true", indicamos por mensaje que la partida ya existe, por tanto, no se puede crear una partida de una que ya existe
        res.send(`La partida amb codi ${req.params.gameCode} ja existeix. Introdueix un altre codi de partida per crear una nova partida.`);
        console.log(`La partida amb codi ${req.params.gameCode} ja existeix. Per crear una nova partida s'ha d'introduir un codi no repetit.`);
    }else {
        // Si el código de la partida no existe (no está repetido), creamos la nueva partida con el código introducido por parámetros añadiéndolo al array "codisPartides"
        codiNou = { gameCode: parseInt(req.params.gameCode), jugadaJugador1: '', jugadaJugador2: '', guanyadesJugador1: 0, guanyadesJugador2: 0 };
        codisPartides.push(codiNou); // Subimos al array "codisPartides" la nueva partida que se ha creado con el código que se ha introducido por parámetros
        // Finalmente, indicamos por mensaje que la partida ha sido creada correctamente.
        res.send(`La partida amb codi ${req.params.gameCode} ha estat creada correctament.`);
        console.log(`La partida amb codi ${req.params.gameCode} ha estat creada correctament.`);
    }
});


// CONSULTAR ESTADO DE LAS PARTIDAS --> GET: Indicamos en la URL el código de la partida que queremos consultar
app.get('/consultarEstatPartida/:gameCode', (req, res) => {
    for (let partida of codisPartides){ // Miramos uno a uno los objetos de "codisPartides" con el bucle for
        if (partida.gameCode === parseInt(req.params.gameCode)){ // Buscamos en el array "codisPartides" el valor del parámetro introducido en la URL
            let partidaConsultada = { gameCode: partida.gameCode, guanyadesJugador1: partida.guanyadesJugador1, jugadaJugador1: partida.jugadaJugador1, guanyadesJugador2: partida.guanyadesJugador2, jugadaJugador2: partida.jugadaJugador2, }; // Creamos un nuevo array que enseñaremos por pantalla mostrando las rondas ganadas de cada jugador, y la jugada actual de cada jugador
            console.log(`L'estat de la partida amb codi ${req.params.gameCode} ha estat consultat.`);
            res.send(partidaConsultada); // Mostramos "partidaConsultada", la cual tiene la información de la partida que se ha introducido por parámetros, es decir, de la partida que se quiere consultar
        }
    }
});


// INDICAR EL NÚMERO DE JUGADOR Y LA JUGADA QUE SACA UN JUGADOR --> PUT: Indicamos el código de partida, el jugador que somos, y la jugada que vamos a sacar mediante parámetros en la URL
app.put('/moureJugador/:gameCode/:jugador/:jugada', (req, res) => {
    for (let partida of codisPartides){ // Miramos uno a uno los objetos de "codisPartides" con el bucle for
        if (partida.gameCode === parseInt(req.params.gameCode)){ // Buscamos la partida con el codiPartida que hemos indicado en la URL
            if (partida.guanyadesJugador1 == 3 || partida.guanyadesJugador2 == 3){ // Comprobamos que ninguno de los jugadores haya ganado la partida, es decir, que ninguno de los jugadores haya ganado 3 turnos
                // En caso de que alguno de los jugadores haya ganado la partida, se indica por mensaje que la partida ha finalizado y ya no se puede jugar más
                res.end(`La partida amb codi ${req.params.gameCode} ha finalitzat, un jugador ha arribat a les 3 victòries. 
                Ja no pots llançar moviments ni jugar més torns, però pots consultar el resultat de la partida.`);
                console.log(`La partida amb codi ${req.params.gameCode} ha finalitzat, un jugador ha arribat a les 3 victòries.
                Ja no es pot llançar moviments ni jugar més torns, però pots consultar el resultat de la partida.`);
            }else { // En caso de que ningún jugador haya ganado la partida, seguimos con el proceso para lanzar movimientos
                if (req.params.jugador == 1 || req.params.jugador == 2){ // Filtramos para que solo se pueda indicar que somos el jugador 1 o el jugador 2
                    // Si se indica un número de jugador correcto (1 o 2), continuamos con el proceso
                    if (req.params.jugada.toLocaleLowerCase() == 'pedra' || req.params.jugada.toLocaleLowerCase() == 'paper' || req.params.jugada.toLocaleLowerCase() == 'tisora'){ // Filtramos para que únicamente se pueda indicar una jugada de las disponibles en el juego ('pedra', 'paper' o 'tisora')
                        // Si se indica una jugada correcta de las disponibles, continuamos con el proceso
                        if (req.params.jugador == 1){ // Comprobamos si el jugador ha indicado que es el jugador 1
                            // Asignamos a 'jugadaJugador1' del array "codisPartides" la jugada que ha indicado el jugador 1
                            partida.jugadaJugador1 = req.params.jugada.toLocaleLowerCase();
                            res.send(`Ets el jugador ${req.params.jugador} a la partida amb codi ${req.params.gameCode}, i has seleccionat la jugada '${req.params.jugada.toLocaleLowerCase()}'.`);
                            console.log(`El jugador ${req.params.jugador} ha llançat '${req.params.jugada.toLocaleLowerCase()}' a la partida amb codi ${req.params.gameCode}.`);
                        }else { // Si el jugador no ha indicado ser el jugador número 1, ha indicado ser el jugador número 2
                            // Asignamos a 'jugadaJugador1' del array "codisPartides" la jugada que ha indicado el jugador 2
                            partida.jugadaJugador2 = req.params.jugada.toLocaleLowerCase();
                            res.send(`Ets el jugador ${req.params.jugador} a la partida amb codi ${req.params.gameCode}, i has seleccionat la jugada '${req.params.jugada.toLocaleLowerCase()}'.`);
                            console.log(`El jugador ${req.params.jugador} ha llançat '${req.params.jugada.toLocaleLowerCase()}' a la partida amb codi ${req.params.gameCode}.`);
                        }
                    }else {
                        // Si se indica una jugada no disponible, mostramos un mensaje indicando que la jugada indicada es incorrecta
                        res.send("La jugada que has introduït no és una jugada disponible. Has d'indicar una jugada entre 'pedra', 'paper' o 'tisora'.");
                        console.log("Un jugador ha indicat una jugada no disponible. Le jugades disponibles són 'pedra', 'paper' o 'tisora'.");
                    }
                }else {
                    // En caso de indicar que somos un número de jugador diferente a 1 o 2, indicamos un mensaje donde decimos que solo se puede ser el jugador 1 o el 2
                    res.send("El número de jugador que has introduït no està disponible. Indica si ets el jugador 1, o el jugador 2.");
                    console.log("Un jugador ha indicat un número de jugador no disponible. Els jugadors disponibles són l'1 o el 2.");
                }
            }
        }
    }
});



app.listen(3000, () => console.log('Inici del servidor.'));
