const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const partides = [
  /*{
    gameCode: 0,
    tornsGuanyats1: 0,
    jugada1: "",
    tornsGuanyats2: 0,
    jugada2: "",
    guanyadorPartida: ""
  },
  {
    gameCode: 1,
    tornsGuanyats1: 0,
    jugada1: "pedra",
    tornsGuanyats2: 0,
    jugada2: "paper",
    guanyadorPartida: ""
  }*/
]

const esquema = buildSchema(`
enum Jugades{
  pedra
  paper
  tisores
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
}

type Mutation {
  crearPartida(gameCode: ID!): Partida
  cambiarJugada(gameCode: ID!, jugada1: Jugades, jugada2: Jugades): Partida
  jugarPartida(gameCode: ID!): Partida
  esborrarPartida(gameCode: ID!): [Partida]
}
`);

const arrel = {
    consultaPartides: () => partides,

    consultaPartida: ({gameCode}) => {
      partidaConsultada = partides.find(partida => partida.gameCode == gameCode);
      return partidaConsultada;
    },

    crearPartida: ({gameCode}) => {
      let nouCodi = gameCode;
      partidaTrobada = partides.find(partida => partida.gameCode == gameCode);
      if (!partidaTrobada){
        partidaCreada = {
          gameCode: nouCodi,
          tornsGuanyats1: 0,
          jugada1: "",
          tornsGuanyats2: 0,
          jugada2: "",
          guanyadorPartida: ""
        }
        partides.push(partidaCreada);
        return partidaCreada;
      }

      return null;
    },

    cambiarJugada: ({gameCode, jugada1, jugada2}) => {
      let index = partides.findIndex(partida => partida.gameCode == gameCode);

      if (index == -1){
        return null;
      }else {
        if(!jugada1){
          partides[index].jugada2 = jugada2;
        }else if(!jugada2){
          partides[index].jugada1 = jugada1;
        }else if (jugada1 && jugada2){
          partides[index].jugada1 = jugada1;
          partides[index].jugada2 = jugada2;
        }else if (!jugada1 && !jugada2){
          return null;
        }
        return partides[index];
      }
      
    },

    jugarPartida: ({gameCode}) => {
      let index = partides.findIndex(partida => partida.gameCode == gameCode);
      if (index == -1){
        return null;
      }else {
        eleccionJugador1 = partides[index].jugada1;
        eleccionJugador2 = partides[index].jugada2;

        if (eleccionJugador1 == "" && eleccionJugador2 == ""){
          console.log("Ninguno de los jugadores ha lanzado jugada.");
          return null;
        }else if (eleccionJugador1 == ""){
          console.log("El jugador 1 no ha lanzado jugada.");
          return null;
        }else if (eleccionJugador2 == ""){
          console.log("El jugador 2 no ha lanzado jugada.");
          return null;
        }else if (eleccionJugador1 == eleccionJugador2){
          console.log("Els jugados han empatat el torn, han tret la mateixa jugada.");
        }
      }
      
    },
    esborrarPartida: ({gameCode}) => {
      index = partides.findIndex(partida => partida.gameCode == gameCode);
      delete partides[index];
      return partides;

    }
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