/* 
    * Consumidor SOAP
    * Proyecto con SOAP para la recreación del juego "piedra, papel o tijera"
    * @authors 15585039.clot@fje.edu (Samuel Rebollo) | 15585072.clot@fje.edu (Xavier Aranda) 
    * @version 1.0 12.02.23 (data començament)
*/

package consumidorsoap;

import java.util.Scanner;
import java.util.InputMismatchException;

public class ConsumidorSOAP {
    public static void main(String[] args) {
        // Creamos un objeto de tipo Scanner llamado scanner para recoger valores por teclado
        Scanner scanner = new Scanner(System.in);
        
        // **************************** COMENZAMOS CON EL MENÚ DE OPCIONES DEL PROGRAMA ****************************
        // Creamos una variable para controlar si queremos continuar con el menú de opciones o finalizar el programa
        boolean continuar = true;
        while(continuar){
            System.out.println("\n************************* MENÚ D'OPCIONS *************************");
            System.out.println("1 - Consultar estat del servidor");
            System.out.println("2 - Crear / iniciar una partida");
            System.out.println("3 - Consultar estat d'una partida");
            System.out.println("4 - Treure jugada a una partida");
            System.out.println("5 - Jugar una partida (enfrentar jugades dels jugadors)");
            System.out.println("6 - Esborrar una partida");
            System.out.println("0 - Sortir del joc");
            System.out.println("\nSelecciona alguna de les opcions disponibles: ");
            String opcio = scanner.next();
            // Switch que controla las opciones seleccionadas
            switch(opcio){
                case "1":
                    System.out.println(consultarServidor());
                    break;
                case "2":
                    try {
                        System.out.println("Indica el codi de partida de la partida que vols crear (només números enters): ");
                        int codiPartida = scanner.nextInt();
                        System.out.println(iniciarPartida(codiPartida));
                    } catch (InputMismatchException ex) {
                        System.out.println("El codi de partida de la partida que vols crear ha de ser obligatòriament un enter.");
                        // Variable que se come "enters" en caso de que salte un catch
                        String menjaEnter = scanner.next();
                    }
                    break;
                case "3":
                    try {
                        System.out.println("Indica el codi de partida de la partida que vols consultar (només números enters): ");
                        int codiPartida = scanner.nextInt();
                        System.out.println(consultarEstatPartida(codiPartida));
                    } catch (InputMismatchException ex) {
                        System.out.println("El codi de partida de la partida que vols consultar ha de ser obligatòriament un enter.");
                        // Variable que se come "enters" en caso de que salte un catch
                        String menjaEnter = scanner.next();
                    }
                    break;
                case "4":
                    try {
                        System.out.println("Indica el codi de partida de la partida que vols treure jugada (només números enters): ");
                        int codiPartida = scanner.nextInt();
                        System.out.println("Indica el número de jugador que seràs (Jugador 1 o Jugador 2, només números enters): ");
                        int jugador = scanner.nextInt();
                        System.out.println("Indica la jugada que treuràs (pedra, paper o tisora): ");
                        String jugada = scanner.next();
                        System.out.println(moureJugador(codiPartida, jugador, jugada));
                    }catch (InputMismatchException ex) {
                        System.out.println("El codi de partida i el número de jugador han de ser números enters.");
                        // Variable que se come "enters" en caso de que salte un catch
                        String menjaEnter = scanner.next();
                    }
                    break;
                case "5":
                    try {
                        System.out.println("Indica el codi de partida de la partida que vols jugar (només números enters): ");
                        int codiPartida = scanner.nextInt();
                        System.out.println(jugarPartida(codiPartida));
                    } catch (InputMismatchException ex) {
                        System.out.println("El codi de partida de la partida que vols jugar ha de ser obligatòriament un enter.");
                        // Variable que se come "enters" en caso de que salte un catch
                        String menjaEnter = scanner.next();
                    }
                    break;
                case "6":
                    try {
                        System.out.println("Indica el codi de partida de la partida que vols esborrar (només números enters): ");
                        int codiPartida = scanner.nextInt();
                        System.out.println(acabarPartida(codiPartida));
                    } catch (InputMismatchException ex) {
                        System.out.println("El codi de partida de la partida que vols esborrar ha de ser obligatòriament un enter.");
                        // Variable que se come "enters" en caso de que salte un catch
                        String menjaEnter = scanner.next();
                    }
                    break;
                case "0":
                    continuar = false;
                    break;
                default:
                    System.out.println("La opció que has seleccionat no està disponible. Selecciona una de les possibles opcions: ");
            }
        }
    }
    
    
    // Métodos del Servicio Web que vamos a utilizar en el consumidor (programa)
    //
    // CONSULTAR FUNCIONAMIENTO DEL SERVIDOR
    private static String consultarServidor() {
        daw2.WebServiceSOAP_Service service = new daw2.WebServiceSOAP_Service();
        daw2.WebServiceSOAP port = service.getWebServiceSOAPPort();
        return port.consultarServidor();
    }
    
    // CREAR / INICIAR UNA PARTIDA
    private static String iniciarPartida(int gameCode) {
        daw2.WebServiceSOAP_Service service = new daw2.WebServiceSOAP_Service();
        daw2.WebServiceSOAP port = service.getWebServiceSOAPPort();
        return port.iniciarPartida(gameCode);
    }
    
    // CONSULTAR ESTADO DE LAS PARTIDAS
    private static String consultarEstatPartida(int gameCode) {
        daw2.WebServiceSOAP_Service service = new daw2.WebServiceSOAP_Service();
        daw2.WebServiceSOAP port = service.getWebServiceSOAPPort();
        return port.consultarEstatPartida(gameCode);
    }
    
    // INDICAR EL NÚMERO DE JUGADOR Y LA JUGADA QUE SACA UN JUGADOR
    private static String moureJugador(int gameCode, int jugador, java.lang.String jugada) {
        daw2.WebServiceSOAP_Service service = new daw2.WebServiceSOAP_Service();
        daw2.WebServiceSOAP port = service.getWebServiceSOAPPort();
        return port.moureJugador(gameCode, jugador, jugada);
    }
    
    // JUGAR LA PARTIDA ENTRE LOS DOS JUGADORES CON LOS MOVIMIENTOS QUE HAN ESCOGIDO
    private static String jugarPartida(int gameCode) {
        daw2.WebServiceSOAP_Service service = new daw2.WebServiceSOAP_Service();
        daw2.WebServiceSOAP port = service.getWebServiceSOAPPort();
        return port.jugarPartida(gameCode);
    }
    
    // ELIMINAR UNA PARTIDA DE LA LISTA DE PARTIDAS
    private static String acabarPartida(int gameCode) {
        daw2.WebServiceSOAP_Service service = new daw2.WebServiceSOAP_Service();
        daw2.WebServiceSOAP port = service.getWebServiceSOAPPort();
        return port.acabarPartida(gameCode);
    } 
}
