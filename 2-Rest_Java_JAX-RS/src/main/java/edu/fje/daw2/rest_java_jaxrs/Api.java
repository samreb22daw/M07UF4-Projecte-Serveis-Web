package edu.fje.daw2.rest_java_jaxrs;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/daw2")
public class Api {

    // CONSULTAR FUNCIONAMIENTO DEL SERVIDOR --> GET: Consultamos que el servidor está funcionando
    @Path("/consultarServidor")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String servidorConsultat() {
        return "Servidor funcionant correctament!";
    }

}