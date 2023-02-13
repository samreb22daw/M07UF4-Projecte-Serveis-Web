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
    
    // Lista (vacía por el momento), donde guardaremos las partidas, movimientos de los jugadores, sus victorias y el ganador de la partida
    private ArrayList<Partida> codisPartides = new ArrayList<>();

    // CONSULTAR FUNCIONAMIENTO DEL SERVIDOR
    @WebMethod(operationName = "consultarServidor")
    public String consultarServidor() {
        return "Servidor funcionant correctament!";
    }

    // CREAR / INICIAR UNA PARTIDA
    @WebMethod(operationName = "iniciarPartida")
    public String iniciarPartida(@WebParam(name = "gameCode") int gameCode) {
        // Primeramente, buscamos si la partida con el código de partida introducido por parámetros ya existe o no
        Partida partidaTemp = new Partida(gameCode,0,"",0,"","");
        int pos = codisPartides.indexOf(partidaTemp);
        if (pos == -1){
            // Si 'pos' == -1, quiere decir que la partida no existe en el array 'codisPartides', por tanto, creamos la partida con su código de partida en el array
            codisPartides.add(new Partida(gameCode,0,"",0,"",""));
            return "La partida amb codi "+gameCode+" ha estat creada correctament.";
        }else {
            // Si 'pos' no es == -1, quiere decir que la partida con el código de partida introducido por parámetros ya existe, por tanto, informamos al usuario
            return "La partida amb codi "+gameCode+" ja existeix. Introdueix un altre codi de partida per crear una nova partida.";
        }
    }
    
    // CONSULTAR ESTADO DE LAS PARTIDAS
    @WebMethod(operationName = "consultarEstatPartida")
    public String consultarEstatPartida(@WebParam(name = "gameCode") int gameCode) {
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
    
    // INDICAR EL NÚMERO DE JUGADOR Y LA JUGADA QUE SACA UN JUGADOR
    @WebMethod(operationName = "moureJugador")
    public String moureJugador(@WebParam(name = "gameCode") int gameCode, @WebParam(name = "jugador") int jugador, @WebParam(name = "jugada") String jugada) {
        // Primeramente, comprobamos si la partida a la que estamos indicando que jugador somos y la jugada que queremos sacar existe o no
        Partida partidaTemp = new Partida(gameCode,0,"",0,"","");
        int pos = codisPartides.indexOf(partidaTemp);
        if (pos != -1) {  // Si 'pos' no es == -1, la partida existe, por tanto, podemos indicar el jugador que vamos a ser y la jugada que vamos a jugar en la partida
            // Guardo en unas nuevas variables los valores de 'tornsGuanyatsJugador1' y 'tornsGuanyatsJugador2'
            int guanyatsJugador1 = codisPartides.get(pos).getTornsGuanyatsJugador1();
            int guanyatsJugador2 = codisPartides.get(pos).getTornsGuanyatsJugador2();
            // Comprobamos que ninguno de los jugadores haya ganado la partida, es decir, que ninguno de los jugadores haya ganado 3 turnos
            if (guanyatsJugador1 == 3){
                return "La partida amb codi "+gameCode+" ha finalitzat. El jugador 1 ha guanyat la partida, ha arribat a les 3 victòries. Ja no pots llançar moviments ni jugar més torns, però pots consultar el resultat de la partida.";
            }else if(guanyatsJugador2 == 3){
                return "La partida amb codi "+gameCode+" ha finalitzat. El jugador 2 ha guanyat la partida, ha arribat a les 3 victòries. Ja no pots llançar moviments ni jugar més torns, però pots consultar el resultat de la partida.";
            }else { // En caso de que ningún jugador haya ganado la partida, seguimos con el proceso para lanzar movimientos
                // Filtramos para que solo se pueda indicar que somos el jugador 1, o el jugador 2 (al ser un juego de 2 jugadores solo podemos sel el jugador 1 o el 2)
                if (jugador == 1 || jugador == 2) {
                    // Filtramos para que únicamente se pueda indicar una jugada de las disponibles en el juego ('pedra', 'paper' o 'tisora')
                    if (jugada.toLowerCase().equals("pedra") || jugada.toLowerCase().equals("paper") || jugada.toLowerCase().equals("tisora")) {
                        // Filtramos para comprobar que jugador hemos indicado ser, si el jugador 1, o el jugador 2
                        if (jugador == 1){
                            // En caso de que el jugador indique ser el jugador 1, asignamos a la jugada de este jugador ('jugadaJugador1') la jugada que ha indicado por parámetros
                            codisPartides.get(pos).setJugadaJugador1(jugada.toLowerCase());
                            return "Ets el jugador "+jugador+" a la partida amb codi "+gameCode+", i has seleccionat la jugada '"+jugada.toLowerCase()+"'.";
                        }else {
                            // En caso de que el jugador no sea el jugador 1 (entonces será el jugador 2), asignamos a la jugada de este jugador ('jugadaJugador2') la jugada que ha indicado por parámetros
                            codisPartides.get(pos).setJugadaJugador2(jugada.toLowerCase());
                            return "Ets el jugador "+jugador+" a la partida amb codi "+gameCode+", i has seleccionat la jugada '"+jugada.toLowerCase()+"'.";
                        }
                    }else {
                        // Si 'jugada' no es una de las jugadas disponibles ('pedra', 'paper' o 'tisora'), indicamos por mensaje que la jugada es incorrecta y esta tiene que ser una de las disponibles
                        return "La jugada que has introduït no és una jugada disponible. Has d'indicar una jugada entre 'pedra', 'paper' o 'tisora'.";
                    }
                }else {
                    // Si 'jugador' es diferente a 1 o 2, indicamos por mensaje que solo se puede ser el jugador 1 o el 2
                    return "El número de jugador que has introduït no està disponible. Indica si ets el jugador 1, o el jugador 2.";
                }
            }
        }else {
            // Si 'pos' no es != -1 (es decir, 'pos' == -1), la partida no existe, por tanto, indicamos por mensaje que la partida que se quiere jugar no existe
            return "La partida amb codi "+gameCode+" no existeix. Introdueix un codi d'una partida existent per poder indicar quin jugador ets i la jugada que treus.";
        }
    }
    
    // JUGAR LA PARTIDA ENTRE LOS DOS JUGADORES CON LOS MOVIMIENTOS QUE HAN ESCOGIDO
    @WebMethod(operationName = "jugarPartida")
    public String jugarPartida(@WebParam(name = "gameCode") int gameCode) {
        // Primeramente, comprobamos si la partida que queremos jugar existe o no
        Partida partidaTemp = new Partida(gameCode,0,"",0,"","");
        int pos = codisPartides.indexOf(partidaTemp);
        if (pos != -1){ // Si 'pos' no es == -1, la partida existe, por tanto, podemos jugar la partida enfrentando las jugadas de los dos jugadores
            // Si la partida existe, asignamos a unas variables las jugadas del 'jugador 1' y del 'jugador2'
            String eleccionJugador1 = codisPartides.get(pos).getJugadaJugador1();
            String eleccionJugador2 = codisPartides.get(pos).getJugadaJugador2();
            // Guardo en unas nuevas variables los valores de 'tornsGuanyatsJugador1' y 'tornsGuanyatsJugador2'
            int guanyatsJugador1 = codisPartides.get(pos).getTornsGuanyatsJugador1();
            int guanyatsJugador2 = codisPartides.get(pos).getTornsGuanyatsJugador2();
            // Primero, comprobamos que ningún jugador haya ganado la partida (haya llegado a las 3 victorias)
            if (guanyatsJugador1 == 3){
                return "La partida amb codi "+gameCode+" ha finalitzat. El jugador 1 ha guanyat la partida, ha arribat a les 3 victòries. Ja no pots llançar moviments ni jugar més torns, però pots consultar el resultat de la partida.";
            }else if(guanyatsJugador2 == 3){
                return "La partida amb codi "+gameCode+" ha finalitzat. El jugador 2 ha guanyat la partida, ha arribat a les 3 victòries. Ja no pots llançar moviments ni jugar més torns, però pots consultar el resultat de la partida.";
            }else if (eleccionJugador1.equals("") && eleccionJugador2.equals("")){ // Comprobamos que los dos jugadores han indicado un movimiento. Si no han seleccionado movimiento los dos jugadores, no se puede jugar la partida
                return "Cap jugador ha escollit jugada. Per poder jugar un torn, els jugadors han d'escollir una jugada.";
            }else if (eleccionJugador1.equals("")){
                return "El jugador 1 no ha escollit jugada. Per poder jugar un torn, els dos jugadors han d'escollir una jugada.";
            }else if (eleccionJugador2.equals("")){
                return "El jugador 2 no ha escollit jugada. Per poder jugar un torn, els dos jugadors han d'escollir una jugada.";
            }else if (eleccionJugador1.equals(eleccionJugador2)) { // Empezamos con la lógica del programa (analizar las jugadas de los jugadores y decir quien de los dos gana el turno)
                /* Igualamos a nada ('') las jugadas de los dos jugadores, para que de este modo en cada turno tengan que indicar que jugada van
                a sacar, del mismo modo que el juego original */
                codisPartides.get(pos).setJugadaJugador1("");
                codisPartides.get(pos).setJugadaJugador2("");
                return "Els jugados han empatat el torn, han tret la mateixa jugada. (Jugada Jugador 1: "+eleccionJugador1+" | Jugada Jugador 2: "+eleccionJugador2+")";
            }else if ((eleccionJugador1.equals("pedra") && eleccionJugador2.equals("tisora")) || (eleccionJugador1.equals("paper") && eleccionJugador2.equals("pedra")) || (eleccionJugador1.equals("tisora") && eleccionJugador2.equals("paper"))){
                // Si el jugador 1 ha ganado, sumamos al jugador 1 un turno ganado
                guanyatsJugador1 += 1;
                codisPartides.get(pos).setTornsGuanyatsJugador1(guanyatsJugador1);
                if (guanyatsJugador1 == 3){
                    // Filtramos para saber si el jugador1 ha ganado el turno o la partida (gana la partida si ha ganado 3 rondas)
                    codisPartides.get(pos).setGuanyadorPartida("Jugador 1"); // Si el jugador 1 llega a 3 victorias, ha ganado la partida, por tanto asigno a "guanyadorPartida" que el ganador ha sido el jugador 1
                    /* Igualamos a nada ('') las jugadas de los dos jugadores, para que de este modo en cada turno tengan que indicar que jugada van
                    a sacar, del mismo modo que el juego original */
                    codisPartides.get(pos).setJugadaJugador1("");
                    codisPartides.get(pos).setJugadaJugador2("");
                    return "EL JUGADOR 1 HA GUANYAT LA PARTIDA, AMB AQUEST TORN QUÈ HA GUANYAT, HA ARRIBAT A LES 3 VICTÒRIES. FELICITATS!. (Jugada Jugador 1: "+eleccionJugador1+" | Jugada Jugador 2: "+eleccionJugador2+")";
                }else {
                    codisPartides.get(pos).setJugadaJugador1("");
                    codisPartides.get(pos).setJugadaJugador2("");
                    return "El jugador 1 ha guanyat el torn. (Jugada Jugador 1: "+eleccionJugador1+" | Jugada Jugador 2: "+eleccionJugador2+")";
                }
            }else {
                // Si el jugador 1 no ha ganado, quiere decir que ha ganado el jugador 2, es por ello que le sumamos el turno ganado al jugador 2
                guanyatsJugador2 += 1;
                codisPartides.get(pos).setTornsGuanyatsJugador2(guanyatsJugador2);
                if (guanyatsJugador2 == 3){
                    // Filtramos para saber si el jugador2 ha ganado el turno o la partida (gana la partida si ha ganado 3 rondas)
                    codisPartides.get(pos).setGuanyadorPartida("Jugador 2"); // Si el jugador 2 llega a 3 victorias, ha ganado la partida, por tanto asigno a "guanyadorPartida" que el ganador ha sido el jugador 2
                    /* Igualamos a nada ('') las jugadas de los dos jugadores, para que de este modo en cada turno tengan que indicar que jugada van
                    a sacar, del mismo modo que el juego original */
                    codisPartides.get(pos).setJugadaJugador1("");
                    codisPartides.get(pos).setJugadaJugador2("");
                    return "EL JUGADOR 2 HA GUANYAT LA PARTIDA, AMB AQUEST TORN QUÈ HA GUANYAT, HA ARRIBAT A LES 3 VICTÒRIES. FELICITATS!. (Jugada Jugador 1: "+eleccionJugador1+" | Jugada Jugador 2: "+eleccionJugador2+")";
                }else {
                    codisPartides.get(pos).setJugadaJugador1("");
                    codisPartides.get(pos).setJugadaJugador2("");
                    return "El jugador 2 ha guanyat el torn. (Jugada Jugador 1: "+eleccionJugador1+" | Jugada Jugador 2: "+eleccionJugador2+")";
                }
            }
        }else {
            // Si 'pos' no es != -1 (es decir, 'pos' == -1), la partida no existe, por tanto, indicamos por mensaje que la partida que se quiere jugar no existe
            return "La partida amb codi "+gameCode+" no existeix. Introdueix un codi d'una partida existent per poder jugar-la.";
        }
    }
    
    // ELIMINAR UNA PARTIDA DE LA LISTA DE PARTIDAS
    @WebMethod(operationName = "acabarPartida")
    public String acabarPartida(@WebParam(name = "gameCode") int gameCode) {
        // Primeramente, buscamos si la partida con el código de partida introducido por parámetros que queremos eliminar existe o no
        Partida partidaTemp = new Partida(gameCode,0,"",0,"","");
        int pos = codisPartides.indexOf(partidaTemp);
        if (pos == -1){
            // Si 'pos' == -1, quiere decir que la partida no existe en el array 'codisPartides', por tanto, no se puede eliminar la partida ya que no existe
            return "La partida amb codi "+gameCode+" no existeix, per tant, no es pot eliminar.";
        }else{
            // Si 'pos' no es == -1, quiere decir que la partida que se quiere eliminar existe, por tanto, eliminamos la partida del array de partidas
            codisPartides.remove(pos);
            return "Partida amb codi "+gameCode+" eliminada correctament.";
        }
    }   
}
