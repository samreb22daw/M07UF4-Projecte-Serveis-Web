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


// Array de objetos (vacío por el momento), donde guardaremos las partidas, movimientos de los jugadores, sus victorias y el ganador de la partida
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
        codiNou = { gameCode: parseInt(req.params.gameCode), tornsGuanyatsJugador1: 0, jugadaJugador1: '', tornsGuanyatsJugador2: 0, jugadaJugador2: '', guanyadorPartida: '' };
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
            let partidaConsultada = { gameCode: partida.gameCode, tornsGuanyatsJugador1: partida.tornsGuanyatsJugador1, jugadaJugador1: partida.jugadaJugador1, tornsGuanyatsJugador2: partida.tornsGuanyatsJugador2, jugadaJugador2: partida.jugadaJugador2, guanyadorPartida: partida.guanyadorPartida }; // Creamos un nuevo array que enseñaremos por pantalla mostrando las rondas ganadas de cada jugador, y la jugada actual de cada jugador
            console.log(`L'estat de la partida amb codi ${req.params.gameCode} ha estat consultat.`);
            res.send(partidaConsultada); // Mostramos "partidaConsultada", la cual tiene la información de la partida que se ha introducido por parámetros, es decir, de la partida que se quiere consultar
        }
    }
});


// INDICAR EL NÚMERO DE JUGADOR Y LA JUGADA QUE SACA UN JUGADOR --> PUT: Indicamos el código de partida, el jugador que somos, y la jugada que vamos a sacar mediante parámetros en la URL
app.put('/moureJugador/:gameCode/:jugador/:jugada', (req, res) => {
    for (let partida of codisPartides){ // Miramos uno a uno los objetos de "codisPartides" con el bucle for
        if (partida.gameCode === parseInt(req.params.gameCode)){ // Buscamos la partida con el codiPartida que hemos indicado en la URL
            if (partida.tornsGuanyatsJugador1 == 3){ // Comprobamos que ninguno de los jugadores haya ganado la partida, es decir, que ninguno de los jugadores haya ganado 3 turnos
                // Si el jugador 1 ha guanyat 3 torns, aquest jugador ha guanyat la partida, per tant, ho indiquem per un missatge
                res.send(`La partida amb codi ${req.params.gameCode} ha finalitzat. El jugador 1 ha guanyat la partida, ha arribat a les 3 victòries. Ja no pots llançar moviments ni jugar més torns, però pots consultar el resultat de la partida.`);
                console.log(`La partida amb codi ${req.params.gameCode} ha finalitzat. El jugador 1 ha guanyat la partida, ha arribat a les 3 victòries. Ja no es pot llançar moviments ni jugar més torns, però pots consultar el resultat de la partida.`);
            }else if (partida.tornsGuanyatsJugador2 == 3){
                // Si el jugador 2 ha guanyat 3 torns, aquest jugador ha guanyat la partida, per tant, ho indiquem per un missatge
                res.send(`La partida amb codi ${req.params.gameCode} ha finalitzat. El jugador 2 ha guanyat la partida, ha arribat a les 3 victòries. Ja no pots llançar moviments ni jugar més torns, però pots consultar el resultat de la partida.`);
                console.log(`La partida amb codi ${req.params.gameCode} ha finalitzat. El jugador 2 ha guanyat la partida, ha arribat a les 3 victòries. Ja no es pot llançar moviments ni jugar més torns, però pots consultar el resultat de la partida.`);
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


// JUGAR LA PARTIDA ENTRE LOS DOS JUGADORES CON LOS MOVIMIENTOS QUE HAN ESCOGIDO --> PUT: Indicamos por parámetros de la URL la partida que queremos jugar, y enfrentamos los movimientos de los jugadores
app.put('/jugarPartida/:gameCode', (req, res) => {
    for (let partida of codisPartides){ // Miramos uno a uno los objetos de "codisPartides" con el bucle for
        if (partida.gameCode === parseInt(req.params.gameCode)){
            eleccionJugador1 = partida.jugadaJugador1; // Asignamos la jugada del jugador 1 a una variable
            eleccionJugador2 = partida.jugadaJugador2; // Asignamos la jugada del jugador 2 a una variable
            if (partida.tornsGuanyatsJugador1 == 3){ // Primero, comprobamos que ningún jugador haya ganado la partida (haya llegado a las 3 victorias)
                // Si el jugador 1 ha guanyat 3 torns, aquest jugador ha guanyat la partida, per tant, ho indiquem per un missatge
                res.send(`La partida amb codi ${req.params.gameCode} ha finalitzat. El jugador 1 ha guanyat la partida, ha arribat a les 3 victòries. Ja no pots llançar moviments ni jugar més torns, però pots consultar el resultat de la partida.`);
                console.log(`La partida amb codi ${req.params.gameCode} ha finalitzat. El jugador 1 ha guanyat la partida, ha arribat a les 3 victòries. Ja no es pot llançar moviments ni jugar més torns, però pots consultar el resultat de la partida.`);
            }else if (partida.tornsGuanyatsJugador2 == 3){
                // Si el jugador 2 ha guanyat 3 torns, aquest jugador ha guanyat la partida, per tant, ho indiquem per un missatge
                res.send(`La partida amb codi ${req.params.gameCode} ha finalitzat. El jugador 2 ha guanyat la partida, ha arribat a les 3 victòries. Ja no pots llançar moviments ni jugar més torns, però pots consultar el resultat de la partida.`);
                console.log(`La partida amb codi ${req.params.gameCode} ha finalitzat. El jugador 2 ha guanyat la partida, ha arribat a les 3 victòries. Ja no es pot llançar moviments ni jugar més torns, però pots consultar el resultat de la partida.`);
            }else if (eleccionJugador1 == '' && eleccionJugador2 == ''){ // Comprobamos que los dos jugadores han indicado un movimiento. Si no han seleccionado movimiento los dos jugadores, no se puede jugar la partida
                res.send("Cap jugador ha escollit jugada. Per poder jugar un torn, els jugadors han d'escollir una jugada."); 
                console.log("Cap jugador ha escollit jugada. Per jugar un torn els jugadors han d'escollir una jugada.");
            }else if (eleccionJugador1 == ''){
                res.send("El jugador 1 no ha escollit jugada. Per poder jugar un torn, els dos jugadors han d'escollir una jugada.");
                console.log("El jugador 1 no ha escollit jugada. Per poder jugar un torn, els dos jugadors han d'escollir una jugada.");
            }else if (eleccionJugador2 == ''){
                res.send("El jugador 2 no ha escollit jugada. Per poder jugar un torn, els dos jugadors han d'escollir una jugada.");
                console.log("El jugador 2 no ha escollit jugada. Per poder jugar un torn, els dos jugadors han d'escollir una jugada.");
            }else if (eleccionJugador1 == eleccionJugador2){ // Empezamos con la lógica del programa (analizar las jugadas de los jugadores y decir quien de los dos gana el turno)
                res.send("Els jugados han empatat el torn, han tret la mateixa jugada.");
                console.log("Els jugados han empatat el torn, han tret la mateixa jugada.");
                /* Igualamos a nada ('') las jugadas de los dos jugadores, para que de este modo en cada turno tengan que indicar que jugada van
                a sacar, del mismo modo que el juego original */
                partida.jugadaJugador1 = '';
                partida.jugadaJugador2 = '';
            }else if ( // Filtramos para comprobar si el jugador1 ha ganado al jugador2
                (eleccionJugador1 === 'pedra' && eleccionJugador2 === 'tisora') ||
                (eleccionJugador1 === 'paper' && eleccionJugador2 === 'pedra') ||
                (eleccionJugador1 === 'tisora' && eleccionJugador2 === 'paper')
            ){
                partida.tornsGuanyatsJugador1 += 1;// Si el jugador 1 ha ganado, sumamos al jugador 1 un turno ganado
                if (partida.tornsGuanyatsJugador1 == 3){ // Filtramos para saber si el jugador1 ha ganado el turno o la partida (gana la partida si ha ganado 3 rondas)
                    partida.guanyadorPartida = 'Jugador 1'; // Si el jugador 1 llega a 3 victorias, ha ganado la partida, por tanto asigno a "guanyadorPartida" que el ganador ha sido el jugador 1
                    res.send("EL JUGADOR 1 HA GUANYAT LA PARTIDA, AMB AQUEST TORN QUÈ HA GUANYAT, HA ARRIBAT A LES 3 VICTÒRIES. FELICITATS!");
                    console.log("EL JUGADOR 1 HA GUANYAT LA PARTIDA, AMB AQUEST TORN QUÈ HA GUANYAT, HA ARRIBAT A LES 3 VICTÒRIES. FELICITATS!");
                    /* Igualamos a nada ('') las jugadas de los dos jugadores, para que de este modo en cada turno tengan que indicar que jugada van
                    a sacar, del mismo modo que el juego original */
                    partida.jugadaJugador1 = '';
                    partida.jugadaJugador2 = '';
                }else {
                    res.send("El jugador 1 ha guanyat el torn.");
                    console.log("El jugador 1 ha guanyat el torn.");
                    partida.jugadaJugador1 = '';
                    partida.jugadaJugador2 = '';
                }
            }else { // Si no ha ganado el jugador1 significa que ha ganado el jugador2
                partida.tornsGuanyatsJugador2 += 1; // Si el jugador 2 gana el turno, sumamos este turno ganado al jugador 2
                if (partida.tornsGuanyatsJugador2 == 3){  // Filtramos para saber si el jugador 2 ha ganado la partida o ha ganado el turno
                    partida.guanyadorPartida = 'Jugador 2'; // Si el jugador 1 llega a 3 victorias, ha ganado la partida, por tanto asigno a "guanyadorPartida" que el ganador ha sido el jugador 1
                    res.send("EL JUGADOR 2 HA GUANYAT LA PARTIDA, AMB AQUEST TORN QUÈ HA GUANYAT, HA ARRIBAT A LES 3 VICTÒRIES. FELICITATS!");
                    console.log("EL JUGADOR 2 HA GUANYAT LA PARTIDA, AMB AQUEST TORN QUÈ HA GUANYAT, HA ARRIBAT A LES 3 VICTÒRIES. FELICITATS!");
                    /* Igualamos a nada ('') las jugadas de los dos jugadores, para que de este modo en cada turno tengan que indicar que jugada van
                    a sacar, del mismo modo que el juego original */
                    partida.jugadaJugador1 = '';
                    partida.jugadaJugador2 = '';
                }else {
                    res.send("El jugador 2 ha guanyat el torn");
                    console.log("El jugador 2 ha guanyat el torn");
                    partida.jugadaJugador1 = '';
                    partida.jugadaJugador2 = '';
                }
            }
        }
    }
});


// ELIMINAR UNA PARTIDA DEL ARRAY --> DELETE: Indicamos por parámetros de la URL el código de la partida que queremos eliminar
app.delete('/acabarPartida/:gameCode', (req, res) => {
    let partidaExisteix = false; // Creamos una variable llamada 'partidaExisteix' que usaremos para controlar si una partida existe. En un inicio vale 'false'
    let codisPartidesAlter = []; // Creamos un array vacío
    for (let partida of codisPartides){ // Recorremos el array con las partidas
        if (partida.gameCode != parseInt(req.params.gameCode)){
            codisPartidesAlter.push(partida); // Subimos al array "codisPartidesAlter" todas las partidas que no tengan el código de partida que hemos introducido por parámetros en la URL (partida a eliminar)
        }
        if (partida.gameCode == parseInt(req.params.gameCode)){ // Si el codigo de partida que indicamos por parametros existe en el array 'codisPartides', la partida existe, por tanto la variable 'partidaExisteix' es true
            partidaExisteix = true;
        }
    }
    codisPartides = codisPartidesAlter; // Igualamos codiPartides para que tenga todas las partidas que hay en el array 'codisPartidesAlter' (de este modo codisPartides tendrá todas las partidas excepto la borrada)
    if (partidaExisteix){ // Si 'partidaExisteix' es true, hemos eliminado correctamente la partida la cual hemos indicado su código de partida por parámetros
        console.log(`Partida amb codi ${req.params.gameCode} eliminada correctament.`);
        res.send(`Partida amb codi ${req.params.gameCode} eliminada correctament.`);
    }else {
        console.log(`La partida amb codi ${req.params.gameCode} no existeix, per tant, no es pot eliminar.`);
        res.send(`La partida amb codi ${req.params.gameCode} no existeix, per tant, no es pot eliminar.`);
    }
});


app.listen(3000, () => console.log('Inici del servidor.'));