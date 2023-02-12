<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pedra, Paper i Tisora</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <script type="text/javascript">

        // CONSULTAR EL ESTADO SERVIDOR:
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
                document.getElementById("estatServidor").innerHTML = this.responseText;
            }
        });

        xhr.open("GET", "http://localhost:8080/2_RESTambJAVA_JAX_RS_war_exploded/api/daw2/consultarServidor");

        xhr.send(null);
        // *************************************************************************************

        // CREAR / INICIAR UNA NUEVA PARTIDA:
        function iniciarPartida() {
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    console.log(this.responseText);
                    document.getElementById("partidaIniciada").innerHTML = this.responseText;
                }
            });

            xhr.open("POST", "http://localhost:8080/2_RESTambJAVA_JAX_RS_war_exploded/api/daw2/iniciarPartida/codiPartida/" + document.getElementById('gameCode').value);

            xhr.send(null);
        }
        // *************************************************************************************

        // CONSULTAR ESTADO DE UNA PARTIDA
        function consultarPartida() {
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function() {
                if(this.readyState === 4) {
                    console.log(this.responseText);
                    document.getElementById('partidaConsultada').innerHTML = this.responseText;
                }
            });

            xhr.open("GET", "http://localhost:8080/2_RESTambJAVA_JAX_RS_war_exploded/api/daw2/consultarEstatPartida/" + document.getElementById('consultarGameCode').value);

            xhr.send(null);
        }
        // *************************************************************************************

        // ESCOGER JUGADA Y EL JUGADOR QUE VAMOS A SER EN UNA PARTIDA DE LAS DISPONIBLES
        function escollirJugada() {
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function() {
                if(this.readyState === 4) {
                    console.log(this.responseText);
                    document.getElementById('jugadaSeleccionada').innerHTML = this.responseText;
                }
            });

            // Creamos unas variables para almacenar el valor de los valores recogidos en ellas
            let gameCode = document.getElementById('escollirGameCode').value;
            let jugador = document.getElementById('escollirJugador').value;
            let juagada = document.getElementById('jugadaEscollida').value;

            xhr.open("PUT", "http://localhost:8080/2_RESTambJAVA_JAX_RS_war_exploded/api/daw2/moureJugador/" + gameCode + "/" + jugador + "/" + juagada );

            xhr.send(null);
        }
        // *************************************************************************************

        // JUGAR UNA PARTIDA DISPONIBLE Y ENFRENTAR LAS JUGADAS DE LOS 2 JUGADORES
        function jugarPartida(){
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function() {
                if(this.readyState === 4) {
                    console.log(this.responseText);
                    document.getElementById('partidaJugada').innerHTML = this.responseText;
                }
            });

            xhr.open("PUT", "http://localhost:8080/2_RESTambJAVA_JAX_RS_war_exploded/api/daw2/jugarPartida/" + document.getElementById('jugarCodiPartida').value);

            xhr.send(null);
        }
        // *************************************************************************************

        // ELIMINAR UNA PARTIDA
        function eliminarPartida(){
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function() {
                if(this.readyState === 4) {
                    console.log(this.responseText);
                    document.getElementById('partidaEliminada').innerHTML = this.responseText;
                }
            });

            xhr.open("DELETE", "http://localhost:8080/2_RESTambJAVA_JAX_RS_war_exploded/api/daw2/acabarPartida/" + document.getElementById('esborrarPartida').value);

            xhr.send(null);
        }
        // *************************************************************************************

        // FUNCIÓN PARA LIMPIAR LOS DATOS DE LA PANTALLA
        function netejarDades(){
            // Esta función iguala a nada todos los mensajes que se muestran en la interfaz, para de este modo limpiar los datos (todos los mensajes)
            document.getElementById("partidaIniciada").innerHTML = '';
            document.getElementById('partidaConsultada').innerHTML = '';
            document.getElementById('jugadaSeleccionada').innerHTML = '';
            document.getElementById('partidaJugada').innerHTML = '';
            document.getElementById('partidaEliminada').innerHTML = '';
            console.log("Dades netejades.");
        }
        // *************************************************************************************

    </script>
</head>
<body>

    <div class="container">
        <!-- Títol principal -->
        <h3 class="text-primary" style="margin-top: 20px; text-align: center;">Joc del Pedra, Paper i Tisora</h3><br />

        <!-- Consultar estat del servidor -->
        <label style="font-weight: bold;" class="text-primary">ESTAT DEL SERVIDOR: </label><br />
        <label style="font-weight: bold" id="estatServidor"></label><br /><br />

        <!-- Crear iniciar una nova partida | Eliminar una partida -->
        <div style="display: flex; justify-content: space-between;">
            <div>
                <!-- Crear / iniciar una nova partida -->
                <label style="font-weight: bold;" class="text-primary">CREAR / INICIAR UNA NOVA PARTIDA: </label><br />
                Introdueix el codi de partida de la partida que vols iniciar: <input type="number" name="gameCode" id="gameCode" value="0" ><br />
                <button type="button" class="btn btn-primary" style="margin: 5px 5px 5px 0px;" onclick="iniciarPartida()">Iniciar partida</button><br />
                <label style="font-weight: bold" id="partidaIniciada"></label><br /><br />
            </div>
            <div>
                <!-- Eliminar una partida -->
                <label style="font-weight: bold;" class="text-primary">ELIMINAR UNA PARTIDA: </label><br />
                Introdueix el codi de partida de la partida que vols eliminar: <input type="number" name="esborrarPartida" id="esborrarPartida" value="0" ><br />
                <button type="button" class="btn btn-primary" style="margin: 5px 5px 5px 0px;" onclick="eliminarPartida()">Eliminar partida</button><br />
                <label style="font-weight: bold" id="partidaEliminada"></label><br /><br />
            </div>
        </div>

        <!-- Consultar l'estat d'una partida -->
        <label style="font-weight: bold;" class="text-primary">CONSULTAR ESTAT D'UNA PARTIDA: </label><br />
        Introdueix el codi de partida de la partida que vols consultar: <input type="number" name="consultarGameCode" id="consultarGameCode" value="0" ><br />
        <button type="button" class="btn btn-primary" style="margin: 5px 5px 5px 0px;" onclick="consultarPartida()">Consultar partida</button><br />
        <div>
            <label style="font-weight: bold" id="partidaConsultada"></label><br /><br />
        </div>

        <!-- Indicar el jugador i la jugada que treu un jugador a una partida -->
        <label style="font-weight: bold;" class="text-primary">INDICAR JUGADOR I TREURE JUGADA A UNA PARTIDA: </label><br />
        Introdueix el codi de partida de la partida que vols llançar jugada: &nbsp&nbsp <input type="number" name="escollirGameCode" id="escollirGameCode" value="0" ><br /><br />
        Introdueix el número de jugador que seràs (Jugador 1 o Jugador 2): <input type="number" name="escollirJugador" id="escollirJugador" value="0" ><br /><br />
        Selecciona la jugada que llançaràs a la partida:
        <select id="jugadaEscollida" name="jugadaEscollida">
            <option value="pedra">Pedra</option>
            <option value="paper">Paper</option>
            <option value="tisora">Tisora</option>
        </select><br />
        <button type="button" class="btn btn-primary" style="margin: 5px 5px 5px 0px;" onclick="escollirJugada()">Escollir jugada</button><br />
        <label style="font-weight: bold" id="jugadaSeleccionada"></label><br /><br />

        <!-- Jugar un torn a una partida en concret amb les jugades seleccionades pels jugadors -->
        <label style="font-weight: bold;" class="text-primary">JUGAR PARTIDA: </label><br />
        Introdueix el codi de partida de la partida que vols jugar: <input type="number" name="jugarCodiPartida" id="jugarCodiPartida" value="0" ><br />
        <button type="button" class="btn btn-primary" style="margin: 5px 5px 5px 0px;" onclick="jugarPartida()">Jugar partida</button><br />
        <label style="font-weight: bold" id="partidaJugada"></label><br /><br />
        <button type="button" class="btn btn-info" style="display: block; margin: auto;" onclick="netejarDades()">Netejar dades</button><br />
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>

</body>
</html>