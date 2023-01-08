/* 
    * Web service Rest con NodeJS y Express
    * Proyecto con Rest, NodeJS y Express para la recreación del juego "piedra, papel, tijeras"
    * @authors 15585039.clot@fje.edu (Samuel Rebollo) | 15585072.clot@fje.edu (Xavier Aranda) 
    * @version 1.0 03.10.22
*/

const express = require('express'); // 'const': Quiere decir que no se puede cambiar el contenido de la variable
const app = express();

app.use(express.urlencoded({ extended: true })); // Quiere decir que queremos trabajar con URLs completas
app.use(express.json()) // Para analizar las peticiones HTTP que lleven JSON en el body o cuerpo (le indicamos que queremos trabajar con JSONs)

// Array de objetos (vacío por el momento), donde guardaremos las partidas, movimientos de los jugadores y sus victorias
let codisPartides = [
];


// INICIAR PARTIDA --> POST: Indicamos en la URL el código de la partida que queremos empezar
app.post('/iniciarJoc/codiPartida/:gameCode', (req, res) => {
    // El código de la nueva partida es introducido desde los parámetros de la dirección URL
    let codiRepetit = false;
    let codiNou = [];
    for (let i of codisPartides) {
        if (i.gameCode == req.params.gameCode) {
            codiRepetit = true;
        }
    }

    // Revisión de la variable 'codiRepetit' para comprobar si el codigo introducido está repetido o no
    if (codiRepetit == true) {
        // Si el código de partida ya existe, no se crea la partida, se indica que ya existe
        res.send("La partida amb el codi que has introduït ja existeix. Introdueix un codi de partida diferent.");
        console.log(`La partida amb codi ${req.params.gameCode} ja existeix.`);
    } else {
        // Si el código de la partida no existe, creamos la nueva partida con el código introducido por parámetros añadiéndolo al array "codisPartides"
        codiNou = { gameCode: parseInt(req.params.gameCode), jugadaJugador1: '', jugadaJugador2: '', guanyadesJugador1: 0, guanyadesJugador2: 0 };
        codisPartides.push(codiNou);
        console.log(`La partida amb codi ${req.params.gameCode} ha estat creada.`);
        res.send(codisPartides);
    }
});


// CONSULTAR ESTADO DE LAS PARTIDAS --> GET: Indicamos en la URL el código de la partida que queremos consultar
app.get('/consultarEstatPartida/:codiPartida', (req, res) => {
    codisPartides.forEach(function (partida) { // Miramos uno a uno los objetos de "codisPartides" con el bucle forEach
        if (partida.gameCode === parseInt(req.params.codiPartida)) {  // Buscamos en el array "codisPartides" el valor del parámetro introducido en la URL
            let partidaActual = { gameCode: partida.gameCode, GuanyadesJugador1: partida.guanyadesJugador1, JugadaActualJugador1: partida.jugadaJugador1, GuanyadesJugador2: partida.guanyadesJugador2, JugadaActualJugador2: partida.jugadaJugador2, }; // Creamos un nuevo array que enseñaremos por pantalla mostrando las rondas ganadas de cada jugador, y la jugada actual de cada jugador
            console.log(`L'estat de la partida amb codi ${req.params.codiPartida} ha estat consultat.`);
            res.send(partidaActual); // Mostramos "partidaActual"
        }
    })
});


// INDICAR EL NÚMERO DE JUGADOR Y LA JUGADA QUE SACA UN JUGADOR --> PUT: Indicamos el código de partida, el jugador que somos, y la jugada que vamos a sacar mediante parámetros en la URL
app.put('/moureJugador/:codiPartida/:jugador/:jugada', (req, res) => {
    let partidaActual = {};
    codisPartides.forEach(function (partida) { // Miramos uno a uno los objetos de "codisPartides" con el bucle forEach
        if (partida.gameCode === parseInt(req.params.codiPartida)) { // Buscamos la partida con el codiPartida que hemos indicado en la URL
            if (req.params.jugador == 1 || req.params.jugador == 2) { // Filtramos para que solo se pueda indicar que somos el jugador 1 o el jugador 2
                if (req.params.jugada == 'pedra' || req.params.jugada == 'paper' || req.params.jugada == 'tisora') { // Filtramos para que únicamente se pueda indicar una jugada disponible (pedra, paper o tisora)
                    if (req.params.jugador == 1) { // Indicamos que jugador está realizando el movimiento y lo guardamos en el array "codisPartides" (jugador 1)
                        partida.jugadaJugador1 = req.params.jugada; // Cambiamos la jugada del jugador por la jugada que ha indicado (jugador 1)
                        console.log('El jugador 1 ha escollit jugada.');
                        partidaActual = { gameCode: partida.gameCode, JugadaJugador1: partida.jugadaJugador1 }; // Creamos un nuevo array que enseñaremos por pantalla omitiendo la jugada del jugador rival
                        res.send(partidaActual);
                    } else if (req.params.jugador == 2) { // Indicamos que jugador está realizando el movimiento y lo guardamos en el array "codisPartides" (jugador 2)
                        partida.jugadaJugador2 = req.params.jugada; // // Cambiamos la jugada del jugador por la jugada que ha indicado (jugador 1)
                        console.log('El jugador 2 ha escollit jugada.');
                        partidaActual = { gameCode: partida.gameCode, JugadaJugador2: partida.jugadaJugador2 }; // Creamos un nuevo array que enseñaremos por pantalla omitiendo la jugada del jugador rival
                        res.send(partidaActual);
                    }
                } else { // Si se indica una jugada no disponible, salta este mensaje indicando que la jugada es incorrecta
                    console.log("Un jugador ha indicat una jugada no disponible. Le jugades disponibles són 'pedra', 'paper' o 'tisora'.");
                    res.send("La jugada que has indicat no és una jugada disponible. Has d'indicar una jugada entre 'pedra', 'paper' o 'tisora'.");
                }
            } else { // Si se indica un número de jugador diferente a 1 o 2, salta este mensaje indicando que no es posible
                console.log("Un jugador ha indicat un número de jugador no disponible. Els jugadors disponibles són l'1 o el 2.");
                res.send("Número de jugador no disponible. Indica si ets el jugador 1 o el jugador 2.");
            }
        }
    })
});


// JUGAR LA PARTIDA ENTRE LOS DOS JUGADORES CON LOS MOVIMIENTOS QUE HAN ESCOGIDO --> PUT: Indicamos por parámetros de la URL la partida que queremos jugar, y enfrentamos los movimientos de los jugadores
app.put('/jugarPartida/:codiPartida', (req, res) => {
    codisPartides.forEach(function (partida) { // Miramos uno a uno los objetos de "codisPartides" con el bucle forEach
        if (partida.gameCode === parseInt(req.params.codiPartida)) {
            eleccionJugador1 = partida.jugadaJugador1; // Asignamos la jugada del jugador 1 a una variable para facilitar el uso de esta
            eleccionJugador2 = partida.jugadaJugador2; // Asignamos la jugada del jugador 2 a una variable para facilitar el uso de esta

            if (eleccionJugador1 == '' && eleccionJugador2 == '') { // Comprobamos que los dos jugadores han indicado un movimiento. Si no han seleccionado movimiento los dos jugadores, no se puede jugar la partida
                console.log("Cap jugador ha escollit jugada.");
                res.send("Cap jugador ha escollit jugada."); //
            } else if (eleccionJugador2 == '') {
                console.log("El jugador 2 no ha escollit jugada."); //
                res.send("El jugador 2 no ha escollit jugada."); //
            } else if (eleccionJugador1 == '') {                     //
                console.log("El jugador 1 no ha escollit jugada.");
                res.send("El jugador 1 no ha escollit jugada."); //
            } else if (partida.guanyadesJugador1 == 3 || partida.guanyadesJugador2 == 3) { // Comprobamos si la partida no ha acabado (una partida acaba cuando se llega a 3 rondas ganadas)
                console.log('La partida ha finalitzat. Has de finalitzar la partida manualment.');
                res.send('La partida ha finalitzat. Has de finalitzar la partida manualment.');
            } else if (eleccionJugador1 == eleccionJugador2) { // Mostramos si los jugadores han empatado
                console.log("Els jugadors han empatat el torn.");
                res.send("Els jugadors han empatat el torn.");
            } else if ( // Filtramos para comprobar si el jugador1 ha ganado al jugador2
                (eleccionJugador1 === 'pedra' && eleccionJugador2 === 'tisora') ||
                (eleccionJugador1 === 'paper' && eleccionJugador2 === 'pedra') ||
                (eleccionJugador1 === 'tisora' && eleccionJugador2 === 'paper')
            ) {
                partida.guanyadesJugador1 = partida.guanyadesJugador1 + 1; // Si el jugador 1 ha ganado, sumamos al jugador1 una ronda ganada
                if (partida.guanyadesJugador1 == 3) { // Filtramos para saber si el jugador1 ha ganado la ronda o la partida (gana la partida si ha ganado 3 rondas)
                    console.log("EL JUGADOR 1 HA GUANYAT LA PARTIDA, HA ARRIBAT A LES 3 VICTORIES!!!");
                    res.send("EL JUGADOR 1 HA GUANYAT LA PARTIDA, HA ARRIBAT A LES 3 VICTORIES!!!");
                } else {
                    console.log("El jugador 1 ha guanyat el torn.");
                    res.send("El jugador 1 ha guanyat el torn.");
                }
            } else { // Si no ha ganado el jugador1 significa que ha ganado el jugador2
                partida.guanyadesJugador2 = partida.guanyadesJugador2 + 1; // Cuando el jugador 2 gana una ronda, sumamos una ronda ganada al jugador2
                if (partida.guanyadesJugador2 == 3) { // Filtramos para saber si el jugador2 ha ganado la ronda o la partida
                    console.log("EL JUGADOR 2 HA GUANYAT LA PARTIDA, HA ARRIBAT A LES 3 VICTORIES!!!");
                    res.send("EL JUGADOR 2 HA GUANYAT LA PARTIDA, HA ARRIBAT A LES 3 VICTORIES!!!");
                } else {
                    console.log("El jugador 2 ha guanyat el torn.");
                    res.send("El jugador 2 ha guanyat el torn.");
                }
            }
        }
    })
});


// ELIMINAR UNA PARTIDA DEL ARRAY --> DELETE: Indicamos por parámetros de la URL el código de la partida que queremos eliminar
app.delete('/acabarJoc/:codiPartida', (req, res) => {
    let partidaExisteix = false; // Creamos una variable llamada 'partidaExisteix' que usaremos para controlar si una partida existe. En un inicio vale 'false'
    let codisPartidesNou = []; // Creamos un array vacío
    for (let i of codisPartides) { // Recorremos el array con las partidas
        if (i.gameCode != req.params.codiPartida) {
            codisPartidesNou.push(i); // Subimos al array "codisPartidesNou" todas las partidas que no tengan el código de partida que hemos introducido por parámetros en la URL (partida a eliminar)
        }
        if (i.gameCode == req.params.codiPartida){ // Si el codigo de partida que indicamos por parametros existe en el array 'codisPartides', la partida existe, por tanto la variable 'partidaExisteix' es true
            partidaExisteix = true;
        }
    }
    codisPartides = codisPartidesNou; // Igualamos codiPartides para que tenga todas las partidas que hay en el array 'codisPartidesNou' (de este modo codisPartides tendrá todas las partidas excepto la borrada)
    if (partidaExisteix){ // Si 'partidaExisteix' es true, hemos eliminado correctamente la partida la cual hemos indicado su código de partida por parámetros
        console.log(`Partida amb codi ${req.params.codiPartida} eliminada correctament.`)
    }
    res.send(codisPartides); // Mostramos las partidas que quedan al haber eliminado la partida que queriamos. En caso de no eliminar una partida ya que el código de partida no existe, se muestran de todos modos todas las partidas que existen actualmente
});


// CONSULTAR FUNCIONAMIENTO DEL SERVIDOR --> GET: Consultamos que el servidor está funcionando
app.get('/consultarServidor', (req, res) => {
    console.log("Servidor funcionant correctament!");
    res.send("Servidor funcionant correctament!");
});

app.listen(3000, () => console.log('Inici del servidor.'));
