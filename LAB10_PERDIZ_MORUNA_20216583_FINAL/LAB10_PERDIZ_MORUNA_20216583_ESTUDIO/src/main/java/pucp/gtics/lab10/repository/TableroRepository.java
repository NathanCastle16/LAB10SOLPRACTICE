package pucp.gtics.lab10.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pucp.gtics.lab10.entity.Tablero;

import java.util.List;

public interface TableroRepository extends JpaRepository<Tablero, Integer> {

    List<Tablero> findAllByOrderByFilaAscColumnaAsc();
}
