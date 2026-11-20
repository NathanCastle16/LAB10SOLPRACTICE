$(document).ready(function () {

    let filasKernel = 2;
    let columnasKernel = 2;

    let temporizador = null;
    let pausado = false;

    const colores = [
        "#FFFFFF",
        "#22C55E",
        "#FACC15",
        "#FB923C",
        "#EF4444",
        "#991B1B"
    ];

    function mostrarError(mensaje) {
        $("#mensaje").html(mensaje);
    }

    function limpiarError() {
        $("#mensaje").html("");
    }

    function dibujarTablero(celdas) {

        $("#tablero").html("");

        for (let i = 0; i < celdas.length; i++) {

            let celda = celdas[i];
            let nuevaCelda = $("<div></div>");

            nuevaCelda.addClass("celda");

            nuevaCelda.attr(
                "data-fila",
                celda.fila
            );

            nuevaCelda.attr(
                "data-columna",
                celda.columna
            );

            nuevaCelda.css(
                "background-color",
                colores[celda.nivelHambre]
            );

            nuevaCelda.html(
                celda.nivelHambre
            );

            if (celda.nivelHambre >= 4) {
                nuevaCelda.css("color", "#FFFFFF");
            } else {
                nuevaCelda.css("color", "#111111");
            }

            $("#tablero").append(nuevaCelda);
        }
    }

    function cargarTablero() {

        $.ajax({
            method: "GET",
            url: "/api/tablero"

        }).done(function (msg) {

            dibujarTablero(msg);

        }).fail(function (err) {

            console.log(err);
            alert("Ocurrió un error al cargar el tablero");
        });
    }

    function construirKernel(valor) {

        let partes =
            valor.toLowerCase().split("x");

        if (partes.length != 2) {

            mostrarError(
                "Use el formato filasxcolumnas. Ejemplo: 2x3"
            );

            $("#kernel").html("");
            return false;
        }

        let filas =
            parseInt(partes[0]);

        let columnas =
            parseInt(partes[1]);

        if (isNaN(filas) ||
            isNaN(columnas)) {

            mostrarError(
                "Use números enteros. Ejemplo: 2x3"
            );

            $("#kernel").html("");
            return false;
        }

        if (filas <= 0 ||
            columnas <= 0 ||
            filas > 5 ||
            columnas > 5) {

            mostrarError(
                "Las dimensiones deben ser enteros positivos y no superar 5x5"
            );

            $("#kernel").html("");
            return false;
        }

        limpiarError();

        filasKernel = filas;
        columnasKernel = columnas;

        $("#kernel").html("");

        $("#kernel").css(
            "grid-template-columns",
            "repeat(" + columnas + ", 60px)"
        );

        for (let i = 0;
             i < filas * columnas;
             i++) {

            let semilla =
                $("<div></div>");

            semilla.addClass("semilla");

            semilla.html(
                '<img src="/img/semilla_girasol.jpg" ' +
                'alt="Semilla de girasol" draggable="false">'
            );

            $("#kernel").append(semilla);
        }

        return true;
    }

    function incrementarHambre() {

        $.ajax({
            method: "POST",
            url: "/api/tablero/incrementar"

        }).done(function (msg) {

            dibujarTablero(msg);

        }).fail(function (err) {

            console.log(err);
        });
    }

    function iniciarTemporizador() {

        if (temporizador == null) {

            temporizador =
                setInterval(
                    incrementarHambre,
                    8000
                );
        }
    }

    function detenerTemporizador() {

        if (temporizador != null) {

            clearInterval(
                temporizador
            );

            temporizador = null;
        }
    }

    $("#dimensiones").on(
        "input",
        function () {

            construirKernel(
                $(this).val()
            );
        }
    );

    $("#kernel").on(
        "dragstart",
        function (event) {

            if (!construirKernel(
                $("#dimensiones").val()
            )) {
                event.preventDefault();
                return;
            }

            let datos =
                filasKernel +
                "x" +
                columnasKernel;

            event.originalEvent
                .dataTransfer
                .setData(
                    "text/plain",
                    datos
                );
        }
    );

    $("#tablero").on(
        "dragover",
        ".celda",
        function (event) {

            event.preventDefault();

            $(this).addClass(
                "sobre"
            );
        }
    );

    $("#tablero").on(
        "dragleave",
        ".celda",
        function () {

            $(this).removeClass(
                "sobre"
            );
        }
    );

    $("#tablero").on(
        "drop",
        ".celda",
        function (event) {

            event.preventDefault();

            $(this).removeClass(
                "sobre"
            );

            let fila =
                parseInt(
                    $(this).attr(
                        "data-fila"
                    )
                );

            let columna =
                parseInt(
                    $(this).attr(
                        "data-columna"
                    )
                );

            if (fila + filasKernel > 5 ||
                columna + columnasKernel > 5) {

                mostrarError(
                    "El kernel no cabe en esa posición del nido"
                );

                return;
            }

            limpiarError();

            $.ajax({
                method: "POST",
                url: "/api/tablero/alimentar",
                data: {
                    fila: fila,
                    columna: columna,
                    filas: filasKernel,
                    columnas: columnasKernel
                }

            }).done(function (msg) {

                dibujarTablero(msg);

            }).fail(function (err) {

                console.log(err);

                mostrarError(
                    "No fue posible alimentar esa región"
                );
            });
        }
    );

    $("#btnReiniciar").click(
        function () {

            $.ajax({
                method: "POST",
                url: "/api/tablero/reiniciar"

            }).done(function (msg) {

                limpiarError();
                dibujarTablero(msg);

            }).fail(function (err) {

                console.log(err);
            });
        }
    );

    $("#btnPausar").click(
        function () {

            if (pausado) {

                iniciarTemporizador();

                $(this).html(
                    "Pausar"
                );

                pausado = false;

            } else {

                detenerTemporizador();

                $(this).html(
                    "Continuar"
                );

                pausado = true;
            }
        }
    );

    construirKernel(
        $("#dimensiones").val()
    );

    cargarTablero();
    iniciarTemporizador();
});
