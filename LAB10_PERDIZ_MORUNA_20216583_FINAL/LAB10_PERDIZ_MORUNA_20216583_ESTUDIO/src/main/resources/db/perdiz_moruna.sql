CREATE DATABASE IF NOT EXISTS perdiz_moruna;

USE perdiz_moruna;

DROP TABLE IF EXISTS tablero;

CREATE TABLE tablero (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fila INT NOT NULL,
    columna INT NOT NULL,
    nivel_hambre INT NOT NULL DEFAULT 0,
    UNIQUE (fila, columna)
);

INSERT INTO tablero (fila, columna, nivel_hambre)
VALUES
(0,0,0), (0,1,0), (0,2,0), (0,3,0), (0,4,0),
(1,0,0), (1,1,0), (1,2,0), (1,3,0), (1,4,0),
(2,0,0), (2,1,0), (2,2,0), (2,3,0), (2,4,0),
(3,0,0), (3,1,0), (3,2,0), (3,3,0), (3,4,0),
(4,0,0), (4,1,0), (4,2,0), (4,3,0), (4,4,0);

SELECT * FROM tablero
ORDER BY fila, columna;