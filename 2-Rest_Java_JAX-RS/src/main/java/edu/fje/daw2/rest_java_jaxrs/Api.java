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
    public String consultarServidor() {
        return "Servidor funcionant correctament!";
    }


    // INICIAR PARTIDA --> POST: Indicamos en la URL el código de la partida que queremos empezar
    @Path("/iniciarJoc/codiPartida/{gameCode}")
    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.TEXT_PLAIN)
    public Response iniciarJoc(@PathParam("gameCode") int gameCode){
        codisPartides.add(new Partida(gameCode,"","",0,0));
        return Response.status(200).entity("La partida s'ha creat correctament.").build();
    }

    // CONSULTAR ESTADO DE LAS PARTIDAS --> GET: Indicamos en la URL el código de la partida que queremos consultar
    @Path("/consultarEstatPartida/{codiPartida}")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String consultarEstatPartida(@PathParam("codiPartida") int codiPartida) {
        Partida partida = new Partida(codiPartida,"","",0,0);
        int pos = codisPartides.indexOf(partida);
        return codisPartides.get(pos).toString();
    }


    // ELIMINAR UNA PARTIDA DEL ARRAY --> DELETE: Indicamos por parámetros de la URL el código de la partida que queremos eliminar
    @Path("/acabarJoc/{codiPartida}")
    @DELETE
    @Produces(MediaType.TEXT_PLAIN)
    public String acabarPartida(@PathParam("codiPartida") int codiPartida){
        Partida partida = new Partida(codiPartida,"","",0,0);
        int pos = codisPartides.indexOf(partida); // -1
        if (pos == -1){
            return "La partida que esteu intentant eliminar no existeix, per tant, no es pot eliminar.";
        }else{
            codisPartides.remove(pos);
            return "La partida s'ha eliminat correctament.";
        }
    }

}