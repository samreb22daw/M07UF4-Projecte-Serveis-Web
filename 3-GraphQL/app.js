const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
 
// schema de GraphQL, ! vol dir que NO POT SER NULL
const esquema = buildSchema(`
input entradaJugador {
    tornsGuanyats1: Int
    jugada1: String
    tornsGuanyats2: Int
    jugada2: String
  
}

type Partida {
    id: ID!
    tornsGuanyats1: Int
    jugada1: String
    tornsGuanyats2: Int
    jugada2: String

}

type Query {
  obtenirPartida(gameCode: Int): Partida
  esborrarPartida(gameCode: Int): Partida
}

type Mutation {
  crearPartida(gameCode: Int): Partida
  actualitzarJugada(gameCode: Int, input: entradaJugador): Partida
}
`);
 
// aquesta arrel té una funció per a cada endpoint de l'API

// Normalment seria una BD
const Partides = {};
 
const arrel = {
  obtenirPartida: ({gameCode}) => {
    if (!Partides[gameCode]) {
      throw new Error('cap Partida amb codi de partida ' + gameCode);
    }
    return new Jugador(gameCode, [input]);
  },
  esborrarPartida: ({gameCode}) => {
    Partides[gameCode] = null;
    return Partides;
  },
  crearPartida: (gameCode,{input}) => {
    let id = gameCode;
    Partida[id] = input;
    return new Partida(id, input);
  },
  actualitzarJugador: ({id, input}) => {
    if (!Partides[id]) {
      throw new Error('cap Jugador amb id ' + id);
    }
    Partides[id] = input;
    return new Partida(id, input);
  },
};
 
const app = express();
app.use(express.static('public'))
app.use('/graphql', graphqlHTTP({
  schema: esquema,
  rootValue: arrel,
  graphiql: true,
}));
app.listen(4000);
console.log('Executant servidor GraphQL API a http://localhost:4000/graphql');


//Classe que representa una Partida
class Partida {
  constructor(id, {tornsGuanyats1, jugada1, tornsGuanyats2, jugada2}) {
    this.id = id;
    this.tornsGuanyats1 = 0;
    this.jugada1 = "";
    this.tornsGuanyats1 = 0;
    this.jugada2 = "";
  }
}