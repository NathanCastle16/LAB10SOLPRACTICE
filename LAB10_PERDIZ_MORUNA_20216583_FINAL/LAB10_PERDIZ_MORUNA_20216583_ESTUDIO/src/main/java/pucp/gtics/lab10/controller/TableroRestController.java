package pucp.gtics.lab10.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pucp.gtics.lab10.entity.Tablero;
import pucp.gtics.lab10.repository.TableroRepository;

import java.util.List;

@RestController
@RequestMapping("/api/tablero")
public class TableroRestController {

    private final TableroRepository tableroRepository;

    public TableroRestController(TableroRepository tableroRepository) {
        this.tableroRepository = tableroRepository;
    }

    @GetMapping
    public List<Tablero> listarTablero() {
        return tableroRepository.findAllByOrderByFilaAscColumnaAsc();
    }

    @PostMapping("/incrementar")
    public List<Tablero> incrementarHambre() {
        List<Tablero> celdas = tableroRepository.findAll();

        for (Tablero celda : celdas) {
            if (celda.getNivelHambre() < 5) {
                celda.setNivelHambre(celda.getNivelHambre() + 1);
            }
        }

        tableroRepository.saveAll(celdas);
        return tableroRepository.findAllByOrderByFilaAscColumnaAsc();
    }

    @PostMapping("/alimentar")
    public ResponseEntity<?> alimentar(
            @RequestParam Integer fila,
            @RequestParam Integer columna,
            @RequestParam Integer filas,
            @RequestParam Integer columnas) {

        if (filas <= 0 || columnas <= 0 || filas > 5 || columnas > 5) {
            return ResponseEntity.badRequest().body("Dimensiones inválidas");
        }

        if (fila < 0 || columna < 0 || fila + filas > 5 || columna + columnas > 5) {
            return ResponseEntity.badRequest().body("El kernel no cabe en esa posición");
        }

        List<Tablero> celdas = tableroRepository.findAll();

        for (Tablero celda : celdas) {

            boolean filaCubierta =
                    celda.getFila() >= fila &&
                    celda.getFila() < fila + filas;

            boolean columnaCubierta =
                    celda.getColumna() >= columna &&
                    celda.getColumna() < columna + columnas;

            if (filaCubierta &&
                columnaCubierta &&
                celda.getNivelHambre() > 0) {

                celda.setNivelHambre(
                        celda.getNivelHambre() - 1
                );
            }
        }

        tableroRepository.saveAll(celdas);

        return ResponseEntity.ok(
                tableroRepository.findAllByOrderByFilaAscColumnaAsc()
        );
    }

    @PostMapping("/reiniciar")
    public List<Tablero> reiniciarTablero() {
        List<Tablero> celdas = tableroRepository.findAll();

        for (Tablero celda : celdas) {
            celda.setNivelHambre(0);
        }

        tableroRepository.saveAll(celdas);
        return tableroRepository.findAllByOrderByFilaAscColumnaAsc();
    }
}
