package edu.fje.daw2.rest_java_jaxrs;

public class Partida {
    // Atributos
    private int gameCode;
    private String jugadaJugador1;
    private String jugadaJugador2;
    private int guanyadesJugador1;
    private int guanyadesJugador2;

    // Constructor con parámetros
    public Partida(int gameCode, String jugadaJugador1, String jugadaJugador2, int guanyadesJugador1, int guanyadesJugador2) {
        this.gameCode = gameCode;
        this.jugadaJugador1 = jugadaJugador1;
        this.jugadaJugador2 = jugadaJugador2;
        this.guanyadesJugador1 = guanyadesJugador1;
        this.guanyadesJugador2 = guanyadesJugador2;
    }

    // Métodos Getters y Setters
    public int getGameCode() {
        return gameCode;
    }

    public void setGameCode(int gameCode) {
        this.gameCode = gameCode;
    }

    public String getJugadaJugador1() {
        return jugadaJugador1;
    }

    public void setJugadaJugador1(String jugadaJugador1) {
        this.jugadaJugador1 = jugadaJugador1;
    }

    public String getJugadaJugador2() {
        return jugadaJugador2;
    }

    public void setJugadaJugador2(String jugadaJugador2) {
        this.jugadaJugador2 = jugadaJugador2;
    }

    public int getGuanyadesJugador1() {
        return guanyadesJugador1;
    }

    public void setGuanyadesJugador1(int guanyadesJugador1) {
        this.guanyadesJugador1 = guanyadesJugador1;
    }

    public int getGuanyadesJugador2() {
        return guanyadesJugador2;
    }

    public void setGuanyadesJugador2(int guanyadesJugador2) {
        this.guanyadesJugador2 = guanyadesJugador2;
    }

    // Método toString
    @Override
    public String toString() {
        return "Partida {" +
                "gameCode=" + gameCode +
                ", jugadaJugador1='" + jugadaJugador1 + '\'' +
                ", jugadaJugador2='" + jugadaJugador2 + '\'' +
                ", guanyadesJugador1=" + guanyadesJugador1 +
                ", guanyadesJugador2=" + guanyadesJugador2 +
                '}';
    }

    // Método equal
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Partida alumne = (Partida) o;
        return gameCode == alumne.gameCode;
    }
}
