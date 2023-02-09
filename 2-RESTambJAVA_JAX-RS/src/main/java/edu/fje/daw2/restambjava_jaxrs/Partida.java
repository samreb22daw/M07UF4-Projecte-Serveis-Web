package edu.fje.daw2.restambjava_jaxrs;

public class Partida {
    // Atributos
    private int gameCode;
    private int tornsGuanyatsJugador1;
    private String jugadaJugador1;
    private int tornsGuanyatsJugador2;
    private String jugadaJugador2;
    private String guanyadorPartida;

    // Constructor con parámetros
    public Partida(int gameCode, int tornsGuanyatsJugador1, String jugadaJugador1, int tornsGuanyatsJugador2, String jugadaJugador2, String guanyadorPartida) {
        this.gameCode = gameCode;
        this.tornsGuanyatsJugador1 = tornsGuanyatsJugador1;
        this.jugadaJugador1 = jugadaJugador1;
        this.tornsGuanyatsJugador2 = tornsGuanyatsJugador2;
        this.jugadaJugador2 = jugadaJugador2;
        this.guanyadorPartida = guanyadorPartida;
    }

    // Métodos Getters y Setters
    public int getGameCode() {
        return gameCode;
    }

    public void setGameCode(int gameCode) {
        this.gameCode = gameCode;
    }

    public int getTornsGuanyatsJugador1() {
        return tornsGuanyatsJugador1;
    }

    public void setTornsGuanyatsJugador1(int tornsGuanyatsJugador1) {
        this.tornsGuanyatsJugador1 = tornsGuanyatsJugador1;
    }

    public String getJugadaJugador1() {
        return jugadaJugador1;
    }

    public void setJugadaJugador1(String jugadaJugador1) {
        this.jugadaJugador1 = jugadaJugador1;
    }

    public int getTornsGuanyatsJugador2() {
        return tornsGuanyatsJugador2;
    }

    public void setTornsGuanyatsJugador2(int tornsGuanyatsJugador2) {
        this.tornsGuanyatsJugador2 = tornsGuanyatsJugador2;
    }

    public String getJugadaJugador2() {
        return jugadaJugador2;
    }

    public void setJugadaJugador2(String jugadaJugador2) {
        this.jugadaJugador2 = jugadaJugador2;
    }

    public String getGuanyadorPartida() {
        return guanyadorPartida;
    }

    public void setGuanyadorPartida(String guanyadorPartida) {
        this.guanyadorPartida = guanyadorPartida;
    }

    // Método toString()
    @Override
    public String toString() {
        return "Partida {" +
                "gameCode=" + gameCode +
                ", tornsGuanyatsJugador1=" + tornsGuanyatsJugador1 +
                ", jugadaJugador1='" + jugadaJugador1 + '\'' +
                ", tornsGuanyatsJugador2=" + tornsGuanyatsJugador2 +
                ", jugadaJugador2='" + jugadaJugador2 + '\'' +
                ", guanyadorPartida='" + guanyadorPartida + '\'' +
                '}';
    }

    // Método equal
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Partida codi = (Partida) o;
        return gameCode == codi.gameCode;
    }
}
