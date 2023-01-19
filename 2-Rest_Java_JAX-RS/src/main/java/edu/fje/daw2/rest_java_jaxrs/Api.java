package edu.fje.daw2.rest_java_jaxrs;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.*;

@Path("/daw2")
public class Api {

    // Array (vacío por el momento), donde guardaremos las partidas, movimientos de los jugadores, sus victorias y el ganador de la partida
    private static List<Partida> codisPartides = new ArrayList<Partida>();


    // CONSULTAR FUNCIONAMIENTO DEL SERVIDOR --> GET: Consultamos que el servidor está funcionando
    @Path("/consultarServidor")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public Response consultarServidor() {
        return Response.status(200).entity("Servidor funcionant correctament!").build();
    }


    // INICIAR PARTIDA --> POST: Indicamos en la URL el código de la partida que queremos empezar y creamos la partida para comenzar a jugarla
    @Path("/iniciarPartida/codiPartida/{gameCode}")
    @POST
    @Produces(MediaType.TEXT_PLAIN)
    public Response iniciarPartida(@PathParam("gameCode") int gameCode) {
        // Primeramente, buscamos si la partida con el código de partida introducido por parámetros ya existe o no
        Partida partidaTemp = new Partida(gameCode,0,"",0,"","");
        int pos = codisPartides.indexOf(partidaTemp);
        if (pos == -1){
            // Si 'pos' == -1, quiere decir que la partida no existe en el array 'codisPartides', por tanto, creamos la partida con su código de partida en el array
            codisPartides.add(new Partida(gameCode,0,"",0,"",""));
            return Response.status(200).entity("La partida amb codi "+gameCode+" ha estat creada correctament.").build();
        }else {
            // Si 'pos' no es == -1, quiere decir que la partida con el código de partida introducido por parámetros ya existe, por tanto, informamos al usuario
            return Response.status(200).entity("La partida amb codi "+gameCode+" ja existeix. Introdueix un altre codi de partida per crear una nova partida.").build();
        }
    }


    // CONSULTAR ESTADO DE LAS PARTIDAS --> GET: Indicamos en la URL el código de la partida que queremos consultar
    @Path("/consultarEstatPartida/{gameCode}")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String consultarEstatPartida(@PathParam("gameCode") int gameCode) {
        // Primeramente, buscamos si la partida con el código de partida introducido por parámetros que queremos consultar existe o no
        Partida partidaTemp = new Partida(gameCode,0,"",0,"","");
        int pos = codisPartides.indexOf(partidaTemp);
        if (pos == -1) {
            // Si 'pos' == -1, quiere decir que la partida no existe en el array 'codisPartides', por tanto, no se puede consultar la partida debido a que no existe
            return "La partida amb codi "+gameCode+" que vols consultar no existeix. Introdueix un codi d'una partida existent per consultar-la.";
        }else {
            // Si 'pos' no es == -1, quiere decir que la partida que se quiere consultar existe, por tanto, mostramos la información de la partida
            return codisPartides.get(pos).toString();
        }
    }






}