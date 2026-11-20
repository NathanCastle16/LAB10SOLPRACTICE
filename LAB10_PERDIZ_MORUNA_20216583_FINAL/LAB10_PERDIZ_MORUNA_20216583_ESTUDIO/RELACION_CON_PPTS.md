# Relación con las PPT

## JavaScript
Se usan variables, funciones, eventos, temporización y manipulación dinámica.

## jQuery
Todo el código se registra dentro de:

```javascript
$(document).ready(function () {
    // código
});
```

Se usan:
- selectores `#` y `.`
- `.html()`
- `.append()`
- `.attr()`
- `.css()`
- `.on()`

Las celdas se agregan dinámicamente, por eso se usa delegación con `on()`.

## AJAX
Se sigue el patrón de la PPT:

```javascript
$.ajax({
    method: "GET",
    url: "/api/tablero"
}).done(function (msg) {
    // respuesta
}).fail(function (err) {
    console.log(err);
});
```

Para POST se usa `data`:

```javascript
data: {
    fila: fila,
    columna: columna,
    filas: filasKernel,
    columnas: columnasKernel
}
```

## REST + Spring Boot
Flujo:

Navegador/jQuery
-> petición HTTP
-> Spring Boot REST
-> Spring Data JPA
-> MySQL
-> respuesta JSON

No se agregó autenticación porque el enunciado del juego no solicita usuarios
ni protección de endpoints.
