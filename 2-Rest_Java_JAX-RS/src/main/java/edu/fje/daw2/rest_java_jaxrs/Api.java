package edu.fje.daw2.rest_java_jaxrs;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;

import java.util.ArrayList;
import java.util.List;

@Path("/daw2")
public class Api {

    @Context
    private UriInfo context;
    // Array (vacío por el momento), donde guardaremos las partidas, movimientos de los jugadores y sus victorias
    private static List<Partida> codisPartides = new ArrayList<Partida>();


    // CONSULTAR FUNCIONAMIENTO DEL SERVIDOR --> GET: Consultamos que el servidor está funcionando
    @Path("/consultarServidor")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public Response consultarServidor() {
        return Response.status(200).entity("Servidor funcionant correctament!").build();
    }


    // INICIAR PARTIDA --> POST: Indicamos en la URL el código de la partida que queremos empezar
    @Path("/iniciarJoc/codiPartida/{gameCode}")
    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.TEXT_PLAIN)
    public Response iniciarJoc(@PathParam("gameCode") int gameCode){
        // Primeramente, buscamos si la partida con el código de partida introducido por parámetros ya existe o no
        Partida partida = new Partida(gameCode,"","",0,0);
        int pos = codisPartides.indexOf(partida);
        if (pos == -1){
            // Si 'pos' == -1, quiere decir que la partida no existe en el array 'codisPartides', por tanto, creamos la partida con su código de partida en el array
            codisPartides.add(new Partida(gameCode,"","",0,0));
            return Response.status(200).entity("La partida amb codi "+gameCode+" ha estat creada correctament.").build();
        }else {
            // Si 'pos' no es == -1, quiere decir que la partida con el código de partida introducido por parámetros ya existe, por tanto, informamos al usuario
            return Response.status(200).entity("La partida amb codi "+gameCode+" ja existeix. Introdueix un altre de codi de partida per crear una nova partida.").build();
        }
    }


    // CONSULTAR ESTADO DE LAS PARTIDAS --> GET: Indicamos en la URL el código de la partida que queremos consultar
    @Path("/consultarEstatPartida/{codiPartida}")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String consultarEstatPartida(@PathParam("codiPartida") int codiPartida) {
        // Primeramente, buscamos si la partida con el código de partida introducido por parámetros que queremos consultar existe o no
        Partida partida = new Partida(codiPartida,"","",0,0);
        int pos = codisPartides.indexOf(partida);
        if (pos == -1){
            // Si 'pos' == -1, quiere decir que la partida no existe en el array 'codisPartides', por tanto, no se puede consultar la partida debido a que no existe
            return "La partida amb codi "+codiPartida+" que vols consultar no existeix. Introdueix un codi d'una partida existent per consultar-la.";
        }else {
            // Si 'pos' no es == -1, quiere decir que la partida que se quiere consultar existe, por tanto, mostramos la información de la partida
            return codisPartides.get(pos).toString();
        }
    }


    // INDICAR EL NÚMERO DE JUGADOR Y LA JUGADA QUE SACA UN JUGADOR --> PUT: Indicamos el código de partida, el jugador que somos, y la jugada que vamos a sacar mediante parámetros en la URL
    @Path("/moureJugador/{codiPartida}/{jugador}/{jugada}")
    @PUT
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.TEXT_PLAIN)
    public Response moureJugador(@PathParam("codiPartida") int codiPartida, @PathParam("jugador") int jugador, @PathParam("jugada") String jugada){
        // Primeramente, comprobamos si la partida a la que estamos indicando que jugador somos y la jugada que queremos sacar existe o no
        Partida partida = new Partida(codiPartida,"","",0,0);
        int pos = codisPartides.indexOf(partida);
        if (pos != -1){ // Si 'pos' no es == -1, la partida existe, por tanto, podemos indicar el jugador que vamos a ser y la jugada que vamos a jugar en la partida
            // Filtramos para que solo se pueda indicar que somos el jugador 1, o el jugador 2 (al ser un juego de 2 jugadores solo podemos sel el jugador 1 o el 2)
            if (jugador == 1 || jugador == 2){
                // Filtramos para que únicamente se pueda indicar una jugada de las disponibles en el juego ('pedra', 'paper' o 'tisora')
                if (jugada.toLowerCase().equals("pedra") || jugada.toLowerCase().equals("paper") || jugada.toLowerCase().equals("tisora")){
                    // Filtramos para comprobar que jugador hemos indicado ser, si el jugador 1, o el jugador 2
                    if (jugador == 1){
                        // En caso de que el jugador indique ser el jugador 1, asignamos a la jugada de este jugador ('jugadaJugador1') la jugada que ha indicado por parámetros
                        codisPartides.get(pos).setJugadaJugador1(jugada.toLowerCase());
                        return Response.status(200).entity("Ets el jugador "+jugador+" a la partida amb codi "+codiPartida+", i has seleccionat la jugada '"+jugada.toLowerCase()+"'.").build();
                    }else {
                        // En caso de que el jugador no sea el jugador 1 (entonces será el jugador 2), asignamos a la jugada de este jugador ('jugadaJugador2') la jugada que ha indicado por parámetros
                        codisPartides.get(pos).setJugadaJugador2(jugada.toLowerCase());
                        return Response.status(200).entity("Ets el jugador "+jugador+" a la partida amb codi "+codiPartida+", i has seleccionat la jugada '"+jugada.toLowerCase()+"'.").build();
                    }
                }else {
                    // Si 'jugada' no es una de las jugadas disponibles ('pedra', 'paper' o 'tisora'), indicamos por mensaje que la jugada es incorrecta y esta tiene que ser una de las disponibles
                    return Response.status(200).entity("La jugada que has introduït no és una jugada disponible. Has d'indicar una jugada entre 'pedra', 'paper' o 'tisora'.").build();
                }
            }else {
                // Si 'jugador' es diferente a 1 o 2, indicamos por mensaje que solo se puede ser el jugador 1 o el 2
                return Response.status(200).entity("El número de jugador que has introduït no està disponible. Indica si ets el jugador 1, o el jugador 2.").build();
            }
        }else {
            // Si 'pos' no es != -1 (es decir, 'pos' == -1), la partida no existe, por tanto, indicamos por mensaje que la partida que se quiere jugar no existe
            return Response.status(200).entity("La partida amb codi "+codiPartida+" no existeix. Introdueix un codi d'una partida existent per poder indicar quin jugador ets i la jugada que treus.").build();
        }
    }



    // ELIMINAR UNA PARTIDA DEL ARRAY --> DELETE: Indicamos por parámetros de la URL el código de la partida que queremos eliminar
    @Path("/acabarJoc/{codiPartida}")
    @DELETE
    @Produces(MediaType.TEXT_PLAIN)
    public String acabarPartida(@PathParam("codiPartida") int codiPartida){
        // Primeramente, buscamos si la partida con el código de partida introducido por parámetros que queremos eliminar existe o no
        Partida partida = new Partida(codiPartida,"","",0,0);
        int pos = codisPartides.indexOf(partida);
        if (pos == -1){
            // Si 'pos' == -1, quiere decir que la partida no existe en el array 'codisPartides', por tanto, no se puede eliminar la partida ya que no existe
            return "La partida amb codi "+codiPartida+" que esteu intentant eliminar no existeix. Introdueix un codi d'una partida existent per poder eliminar-la.";
        }else{
            // Si 'pos' no es == -1, quiere decir que la partida que se quiere eliminar existe, por tanto, eliminamos la partida del array de partidas
            codisPartides.remove(pos);
            return "La partida amb codi "+codiPartida+" ha sigut eliminada correctament.";
        }
    }
}