/* 
    * Web Service con SOAP
    * Proyecto con SOAP para la recreación del juego "piedra, papel o tijera"
    * @authors 15585039.clot@fje.edu (Samuel Rebollo) | 15585072.clot@fje.edu (Xavier Aranda) 
    * @version 1.0 12.02.23 (data començament)
*/

package daw2;

import java.util.ArrayList;

import javax.jws.WebService;
import javax.jws.WebMethod;
import javax.jws.WebParam;

@WebService(serviceName = "WebServiceSOAP")
public class WebServiceSOAP {
    
    // Array (vacío por el momento), donde guardaremos las partidas, movimientos de los jugadores, sus victorias y el ganador de la partida
    

    
    @WebMethod(operationName = "hello")
    public String hello(@WebParam(name = "name") String txt) {
        return "Hello " + txt + " !";
    }
}
