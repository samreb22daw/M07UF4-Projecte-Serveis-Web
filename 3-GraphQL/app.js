const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const partides = [
  {
    gameCode: 0,
    tornsGuanyats1: 0,
    jugada1: "",
    tornsGuanyats2: 0,
    jugada2: "",
    guanyadorPartida: ""
  },
  {
    gameCode: 1,
    tornsGuanyats1: 2,
    jugada1: "pedra",
    tornsGuanyats2: 0,
    jugada2: "paper",
    guanyadorPartida: ""
  }
]

const esquema = buildSchema(`
type Partida {
  gameCode: ID!
  tornsGuanyats1: Int
  jugada1: String
  tornsGuanyats2: Int
  jugada2: String
  guanyadorPartida: String
}

type Query {
  consultaPartides: [Partida]!
  consultaPartida(gameCode: ID!): Partida!
}
`);

const arrel = {
    consultaPartides: () => partides,

    /*consultaPartida: (root, args) => {
      const {codiPartida} = args 
      return partides[0];
    }*/

    consultaPartida: ({gameCode}) => {
      partidaTrobada = partides.find(partida => partida.gameCode == gameCode)
      return partidaTrobada
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

class Partida {
  constructor(gameCode, {tornsGuanyats1, jugada1, tornsGuanyats2, jugada2, guanyadorPartida}) {
    this.gameCode=gameCode;
    this.tornsGuanyats1 = tornsGuanyats1;
    this.jugada1 = jugada1;
    this.tornsGuanyats2=tornsGuanyats2;
    this.jugada2=jugada2;
    this.guanyadorPartida=guanyadorPartida;
  }
}

