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