/* 
    * Web Service con GraphQL
    * Proyecto con GraphQL para la recreación del juego "piedra, papel o tijera"
    * @authors 15585039.clot@fje.edu (Samuel Rebollo) | 15585072.clot@fje.edu (Xavier Aranda) 
    * @version 1.0 09.02.23 (data començament)
*/

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');


// Array de objetos (vacío por el momento), donde guardaremos las partidas, movimientos de los jugadores, sus victorias y el ganador de la partida
const partides = [];


// Definimos el Schema de nuestro proyecto
const esquema = buildSchema(`
enum Jugades{
  pedra
  paper
  tisora
}

type Partida {
  gameCode: ID!
  tornsGuanyats1: Int
  jugada1: String
  tornsGuanyats2: Int
  jugada2: String
  guanyadorPartida: String
}

type Query {
  consultaPartides: [Partida]
  consultaPartida(gameCode: ID!): Partida
  consultaServidor: String
}

type Mutation {
  crearPartida(gameCode: ID!): String
  moureJugador(gameCode: ID!, jugada1: Jugades, jugada2: Jugades): String
  jugarPartida(gameCode: ID!): String
  esborrarPartida(gameCode: ID!): String
}
`);


// Definimos la raíz (rootValue) de nuestro proyecto, donde programamos los métodos utilizados en 'query' y 'mutation'
const arrel = {
    // CONSULTAR FUNCIONAMIENTO DEL SERVIDOR
    consultaServidor: () => {
      console.log("Estat del servidor consultat, tot funcionant correctament.");
      return "Servidor funcionant correctament!";
    },


    // CONSULTAMOS EL ESTADO DE TODAS LAS PARTIDAS DISPONIBLES
    consultaPartides: () => {
      // Mostramos las partidas disponibles por consola, y devolvemos en GraphQL el Array 'partides' con todas las partidas disponibles
      console.log(`Partides disponibles:`);
      console.log(partides);
      return partides;
    },

    
    // CONSULTAMOS EL ESTADO DE UNA PARTIDA EN CONCRETO INDICADA POR EL USUARIO
    consultaPartida: ({gameCode}) => {
      // Guardamos en la variable 'index' la posición en el Array de la partida que queremos consultar
      let index = partides.findIndex(partida => partida.gameCode == gameCode);
      if (index == -1){
        console.log(`La partida amb codi ${gameCode} no existeix, per tant, no es pot consultar.`);
        return null;
      }else {
        // Si la partida que queremos consultar existe, mostramos del Array de partides la posición exacta donde se encuentra la partida consultada
        console.log(`Partida amb codi ${gameCode} consultada: `);
        console.log(partides[index]);
        return partides[index];
      }
    },


    // CREAMOS / INICIAMOS UNA NUEVA PARTIDA
    crearPartida: ({gameCode}) => {
      let nouCodi = gameCode;
      // Guardamos en la variable 'partidaTrobada' la posición en el Array de la partida con código 'gameCode' (en caso de existir)
      let partidaTrobada = partides.findIndex(partida => partida.gameCode == gameCode);
      if (partidaTrobada != -1){
        // Si 'partidaTrobada' != -1, quiere decir que la partida ya existe, por tanto no cremos la partida de nuevo
        console.log(`La partida amb codi ${gameCode} ja existeix, per tant, no es pot crear de nou.`);
        return `La partida amb codi ${gameCode} ja existeix, per tant, no es pot crear de nou.`;
      }else {
        // Si 'partidaTrobada' NO es != -1, quiere decir que no existe una partida con el código que ha indicado el usuario. Creamos la partida
        partidaCreada = {
          gameCode: nouCodi,
          tornsGuanyats1: 0,
          jugada1: "",
          tornsGuanyats2: 0,
          jugada2: "",
          guanyadorPartida: ""
        }
        partides.push(partidaCreada);
        console.log(`Partida amb codi ${gameCode} creada correctament.`);
        return `La partida amb codi ${gameCode} ha estat creada correctament.`;
      }
    },


    // INDICAR LA JUGADA QUE UN JUGADOR VA A LANZAR (Jugador 1 o Jugador 2) EN UNA PARTIDA DISPONIBLE
    moureJugador: ({gameCode, jugada1, jugada2}) => {
      // Guardamos en la variable 'index' la posición en el Array de la partida que queremos lanzar una jugada
      let index = partides.findIndex(partida => partida.gameCode == gameCode);
      if (index == -1){
        // Si 'index' == -1 la partida no existe, por tanto, indicamos que no existe por consola y no permitimos lanzar jugada
        console.log(`La partida amb codi ${gameCode} no existeix. No es pot llançar moviment a una partida que no existeix.`);
        return `La partida amb codi ${gameCode} no existeix. No es pot llançar moviment a una partida que no existeix.`;
      }else {
        // Comprobamos antes de nada, que ninguno de los dos jugadores haya ganado la partida, es decir, haya ganado 3 turnos
        if (partides[index].tornsGuanyats1 == 3){ 
          console.log(`La partida amb codi ${gameCode} ha finalitzat. El jugador 1 ha guanyat la partida, ha arribat a les 3 victòries. Ja no es pot llançar moviments ni jugar més torns, però pots consultar el resultat de la partida.`);
          return `La partida amb codi ${gameCode} ha finalitzat. El jugador 1 ha guanyat la partida, ha arribat a les 3 victòries. Ja no es pot llançar moviments ni jugar més torns, però pots consultar el resultat de la partida.`;
        }else if (partides[index].tornsGuanyats2 == 3){
          console.log(`La partida amb codi ${gameCode} ha finalitzat. El jugador 2 ha guanyat la partida, ha arribat a les 3 victòries. Ja no es pot llançar moviments ni jugar més torns, però pots consultar el resultat de la partida.`);
          return `La partida amb codi ${gameCode} ha finalitzat. El jugador 2 ha guanyat la partida, ha arribat a les 3 victòries. Ja no es pot llançar moviments ni jugar més torns, però pots consultar el resultat de la partida.`;
        }else {
          /* Una vez comprobado que la partida donde se quiere jugar existe, y nadie ha ganado esa partida por el momento,comprobamos 
          si la jugada que se ha indicado es la del Jugador 1 o Jugador 2, y asignamos esta jugada a la partida en el Array */
          if (!jugada1 && !jugada2){
            console.log("No has llançat cap jugada. S'ha d'indicar la jugada que llançarà el Jugador 1 o el Jugador 2.");
            return "No has llançat cap jugada. S'ha d'indicar la jugada que llançarà el Jugador 1 o el Jugador 2.";
          }else if (!jugada1){
            partides[index].jugada2 = jugada2;
            console.log(`El jugador 2 ha llançat "${jugada2}".`);
            return `El jugador 2 ha llançat '${jugada2}'.`; 
          }else if (!jugada2){
            partides[index].jugada1 = jugada1;
            console.log(`El jugador 1 ha llançat "${jugada1}".`);
            return `El jugador 1 ha llançat '${jugada1}'.`; 
          }else if (jugada1 && jugada2){
            partides[index].jugada1 = jugada1;
            partides[index].jugada2 = jugada2;
            console.log(`El jugador 1 ha llançat "${jugada1}" | El jugador 2 ha llançat "${jugada2}".`);
            return `El jugador 1 ha llançat '${jugada1}' | El jugador 2 ha llançat '${jugada2}'.`; 
          }
        }
      }
    },


    // JUGAMOS LA PARTIDA QUE EL USUARIO INDICA. ENFRENTA LAS JUGADAS DE LOS DOS JUGADORES Y DICE QUIÉN GANA EL TURNO
    jugarPartida: ({gameCode}) => {
      // Bucamos la posición de la partida que queremos jugar en el Array 'partides'
      let index = partides.findIndex(partida => partida.gameCode == gameCode);
      if (index == -1){
        // Si index == -1, quiere decir que la partida con el código que hemos introducido no existe
        console.log(`La partida amb el codi de partida ${gameCode} no existeix. Introdueix un codi d'una partida existent per poder jugar-la.`);
        return `La partida amb el codi de partida ${gameCode} no existeix. Introdueix un codi d'una partida existent per poder jugar-la.`;
      }else {
        // Almacenamos en dos variables diferentes las jugadas del jugador 1 y del jugador 2 de la partida que vamos a jugar
        eleccionJugador1 = partides[index].jugada1;
        eleccionJugador2 = partides[index].jugada2;
        if (partides[index].tornsGuanyats1 == 3){ // Comprobamos que el jugador 1 no haya ganado tres rondas
          // En caso de que el jugador 1 haya ganado tres rondas, mostramos los resultados de la partida
          console.log(`La partida amb codi ${gameCode} ha finalitzat. El jugador 1 ha guanyat la partida, ha arribat a les 3 victòries. Ja no es pot llançar moviments ni jugar més torns, però pots consultar el resultat de la partida.`);
          return `La partida amb codi ${gameCode} ha finalitzat. El jugador 1 ha guanyat la partida, ha arribat a les 3 victòries. Ja no es pot llançar moviments ni jugar més torns, però pots consultar el resultat de la partida.`;
        }else if (partides[index].tornsGuanyats2 == 3){ // Comprobamos que el jugador 2 no haya ganado tres rondas
          // En caso de que el jugador 2 haya ganado tres rondas, mostramos los resultados de la partida
          console.log(`La partida amb codi ${gameCode} ha finalitzat. El jugador 2 ha guanyat la partida, ha arribat a les 3 victòries. Ja no es pot llançar moviments ni jugar més torns, però pots consultar el resultat de la partida.`);
          return `La partida amb codi ${gameCode} ha finalitzat. El jugador 2 ha guanyat la partida, ha arribat a les 3 victòries. Ja no es pot llançar moviments ni jugar més torns, però pots consultar el resultat de la partida.`;
        }else if (eleccionJugador1 == "" && eleccionJugador2 == ""){ // Comprobamos que los dos jugadores han indicado un movimiento. Si no han seleccionado movimiento los dos jugadores, no se puede jugar la partida
          console.log("Cap jugador ha escollit jugada. Per jugar un torn els jugadors han d'escollir una jugada.");
          return "Cap jugador ha escollit jugada. Per jugar un torn els jugadors han d'escollir una jugada.";
        }else if (eleccionJugador1 == ""){
          console.log("El jugador 1 no ha escollit jugada. Per poder jugar un torn, els dos jugadors han d'escollir una jugada.");
          return "El jugador 1 no ha escollit jugada. Per poder jugar un torn, els dos jugadors han d'escollir una jugada.";
        }else if (eleccionJugador2 == ""){
          console.log("El jugador 2 no ha escollit jugada. Per poder jugar un torn, els dos jugadors han d'escollir una jugada.");
          return "El jugador 2 no ha escollit jugada. Per poder jugar un torn, els dos jugadors han d'escollir una jugada.";
        }else if (eleccionJugador1 == eleccionJugador2){ // Empezamos con la lógica del programa (analizar las jugadas de los jugadores y decir quien de los dos gana el turno)
          console.log(`Els jugados han empatat el torn, han tret la mateixa jugada. (Jugada Jugador 1: ${eleccionJugador1} | Jugada Jugador 2: ${eleccionJugador2})`);
          /* Igualamos a nada ('') las jugadas de los dos jugadores, para que de este modo en cada turno tengan que indicar que jugada van
          a sacar, del mismo modo que el juego original */
          partides[index].jugada1 = "";
          partides[index].jugada2 = "";
          return `Els jugados han empatat el torn, han tret la mateixa jugada. (Jugada Jugador 1: ${eleccionJugador1} | Jugada Jugador 2: ${eleccionJugador2})`; 
        }else if ( // Filtramos para comprobar si el jugador1 ha ganado al jugador2
          (eleccionJugador1 === 'pedra' && eleccionJugador2 === 'tisora') ||
          (eleccionJugador1 === 'paper' && eleccionJugador2 === 'pedra') ||
          (eleccionJugador1 === 'tisora' && eleccionJugador2 === 'paper')
        ){
          partides[index].tornsGuanyats1 += 1; // Si el jugador 1 ha ganado, sumamos al jugador 1 un turno ganado
          if (partides[index].tornsGuanyats1 == 3){
            // Si después de ganar un turno, los turnos ganados del jugador 1 == 3, indicamos que ha ganado la partida en la posición del Array "guanyadorPartida"
            partides[index].guanyadorPartida = "Jugador 1";
            partides[index].jugada1 = "";
            partides[index].jugada2 = "";
            console.log("EL JUGADOR 1 HA GUANYAT LA PARTIDA, AMB AQUEST TORN QUÈ HA GUANYAT, HA ARRIBAT A LES 3 VICTÒRIES. FELICITATS!. (Jugada Jugador 1: "+eleccionJugador1+" | Jugada Jugador 2: "+eleccionJugador2+")");
            return "EL JUGADOR 1 HA GUANYAT LA PARTIDA, AMB AQUEST TORN QUÈ HA GUANYAT, HA ARRIBAT A LES 3 VICTÒRIES. FELICITATS!. (Jugada Jugador 1: "+eleccionJugador1+" | Jugada Jugador 2: "+eleccionJugador2+")";
          }else {
            /* Igualamos a nada ('') las jugadas de los dos jugadores, para que de este modo en cada turno tengan que indicar que jugada van
            a sacar, del mismo modo que el juego original */
            partides[index].jugada1 = "";
            partides[index].jugada2 = "";
            console.log(`El jugador 1 ha guanyat el torn. (Jugada Jugador 1: ${eleccionJugador1} | Jugada Jugador 2: ${eleccionJugador2})`);
            return `El jugador 1 ha guanyat el torn. (Jugada Jugador 1: ${eleccionJugador1} | Jugada Jugador 2: ${eleccionJugador2})`; 
          }
        }else { // Si no ha ganado el jugador1 significa que ha ganado el jugador2
          partides[index].tornsGuanyats2 += 1; // Si el jugador 2 ha ganado, sumamos al jugador 2 un turno ganado
          if (partides[index].tornsGuanyats2 == 3){
            // Si después de ganar un turno, los turnos ganados del jugador 2 == 3, indicamos que ha ganado la partida en la posición del Array "guanyadorPartida"
            partides[index].guanyadorPartida = "Jugador 2";
            partides[index].jugada1 = "";
            partides[index].jugada2 = "";
            console.log("EL JUGADOR 2 HA GUANYAT LA PARTIDA, AMB AQUEST TORN QUÈ HA GUANYAT, HA ARRIBAT A LES 3 VICTÒRIES. FELICITATS!. (Jugada Jugador 1: "+eleccionJugador1+" | Jugada Jugador 2: "+eleccionJugador2+")");
            return "EL JUGADOR 2 HA GUANYAT LA PARTIDA, AMB AQUEST TORN QUÈ HA GUANYAT, HA ARRIBAT A LES 3 VICTÒRIES. FELICITATS!. (Jugada Jugador 1: "+eleccionJugador1+" | Jugada Jugador 2: "+eleccionJugador2+")";
          }else {
            /* Igualamos a nada ('') las jugadas de los dos jugadores, para que de este modo en cada turno tengan que indicar que jugada van
            a sacar, del mismo modo que el juego original */
            partides[index].jugada1 = "";
            partides[index].jugada2 = "";
            console.log(`El jugador 2 ha guanyat el torn. (Jugada Jugador 1: ${eleccionJugador1} | Jugada Jugador 2: ${eleccionJugador2})`);
            return `El jugador 2 ha guanyat el torn. (Jugada Jugador 1: ${eleccionJugador1} | Jugada Jugador 2: ${eleccionJugador2})`; 
          }
        }
      }
    },


    // ELIMINAMOS UNA PARTIDA EXISTENTE
    esborrarPartida: ({gameCode}) => {
      // Bucamos la posición de la partida que queremos eliminar en el Array 'partides'
      let index = partides.findIndex(partida => partida.gameCode == gameCode);
      if (index == -1){
        // Si index == -1, indicamos por mensaje en la consola que la partida no existe y por tanto no se puede eliminar
        console.log(`La partida amb codi ${gameCode} no existeix, per tant, no pot ser esborrada.`);
        return `La partida amb codi ${gameCode} no existeix, per tant, no pot ser esborrada.`;
      }else {
        // Si la partida que queremos eliminar existe, la eliminamos del Array 
        partides.splice(index,1);
        console.log(`La partida amb codi ${gameCode} ha sigut esborrada correctament.`);
        return `La partida amb codi ${gameCode} ha sigut esborrada correctament.`;
      }
    }
};


const app = express();
app.use(express.static('public'));
app.use('/graphql', graphqlHTTP({
  schema: esquema,
  rootValue: arrel,
  graphiql: true,
}));

app.listen(4000);
console.log('Executant servidor GraphQL API a http://localhost:4000/graphql');