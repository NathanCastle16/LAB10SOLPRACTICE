package pucp.gtics.lab10.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tablero")
public class Tablero {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Integer fila;

    @Column(nullable = false)
    private Integer columna;

    @Column(name = "nivel_hambre", nullable = false)
    private Integer nivelHambre;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getFila() {
        return fila;
    }

    public void setFila(Integer fila) {
        this.fila = fila;
    }

    public Integer getColumna() {
        return columna;
    }

    public void setColumna(Integer columna) {
        this.columna = columna;
    }

    public Integer getNivelHambre() {
        return nivelHambre;
    }

    public void setNivelHambre(Integer nivelHambre) {
        this.nivelHambre = nivelHambre;
    }
}
