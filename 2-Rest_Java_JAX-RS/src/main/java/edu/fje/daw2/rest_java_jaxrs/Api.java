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
    public String servidorConsultat() {
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

}