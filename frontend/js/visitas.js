// ==========================================
// ELEMENTOS DEL HTML
// ==========================================

const btnNuevaVisita =
    document.getElementById("btn-nueva-visita");

const modalVisita =
    document.getElementById("modal-visita");

const cerrarModalVisita =
    document.getElementById("cerrar-modal-visita");

const cancelarVisita =
    document.getElementById("cancelar-visita");

const formularioVisita =
    document.getElementById("form-visita");

const tablaVisitas =
    document.getElementById("tabla-visitas");

const buscarVisita =
    document.getElementById("buscar-visita");


// ==========================================
// VARIABLE PARA SABER SI ESTAMOS EDITANDO
// ==========================================

let filaVisitaEditando = null;


// ==========================================
// ABRIR MODAL - NUEVA VISITA
// ==========================================

if (btnNuevaVisita) {

    btnNuevaVisita.addEventListener("click", function () {

        formularioVisita.reset();

        filaVisitaEditando = null;

        modalVisita.classList.add("activo");

    });

}


// ==========================================
// CERRAR MODAL
// ==========================================

if (cerrarModalVisita) {

    cerrarModalVisita.addEventListener("click", function () {

        modalVisita.classList.remove("activo");

        formularioVisita.reset();

        filaVisitaEditando = null;

    });

}


// ==========================================
// CANCELAR
// ==========================================

if (cancelarVisita) {

    cancelarVisita.addEventListener("click", function () {

        modalVisita.classList.remove("activo");

        formularioVisita.reset();

        filaVisitaEditando = null;

    });

}


// ==========================================
// GUARDAR / EDITAR VISITA
// ==========================================

if (formularioVisita) {

    formularioVisita.addEventListener("submit", function (evento) {

        // Evitar recargar la página
        evento.preventDefault();


        // ==========================================
        // OBTENER DATOS
        // ==========================================

        const alumno =
            document.getElementById("alumno-visita").value.trim();

        const profesor =
            document.getElementById("profesor-visita").value.trim();

        const fecha =
            document.getElementById("fecha-visita").value;

        const motivo =
            document.getElementById("motivo-visita").value;

        const estado =
            document.getElementById("estado-visita").value;


        // ==========================================
        // CONVERTIR FECHA
        // ==========================================

        let fechaMostrar = fecha;

        if (fecha) {

            const partes = fecha.split("-");

            fechaMostrar =
                partes[2] + "/" +
                partes[1] + "/" +
                partes[0];

        }


        // ==========================================
        // CREAR CONTENIDO DE LA FILA
        // ==========================================

        const datosFila = `

            <td>${alumno}</td>

            <td>${profesor}</td>

            <td>${fechaMostrar}</td>

            <td>${motivo}</td>

            <td>${estado}</td>

            <td>

                <button
                    type="button"
                    class="btn-editar-visita">
                    Editar
                </button>

                <button
                    type="button"
                    class="btn-eliminar-visita">
                    Eliminar
                </button>

            </td>

        `;


        // ==========================================
        // EDITAR VISITA
        // ==========================================

        if (filaVisitaEditando) {

            filaVisitaEditando.innerHTML = datosFila;

            alert("Visita actualizada correctamente.");

        }


        // ==========================================
        // NUEVA VISITA
        // ==========================================

        else {

            const fila =
                document.createElement("tr");

            fila.innerHTML = datosFila;

            tablaVisitas.appendChild(fila);

            alert("Visita registrada correctamente.");

        }


        // ==========================================
        // CERRAR Y LIMPIAR
        // ==========================================

        modalVisita.classList.remove("activo");

        formularioVisita.reset();

        filaVisitaEditando = null;

    });

}


// ==========================================
// BOTONES EDITAR Y ELIMINAR
// ==========================================

document.addEventListener("click", function (evento) {


    // ==========================================
    // ELIMINAR VISITA
    // ==========================================

    if (
        evento.target.classList.contains(
            "btn-eliminar-visita"
        )
    ) {

        const fila =
            evento.target.closest("tr");

        const confirmar =
            confirm("¿Está seguro de eliminar esta visita?");

        if (confirmar) {

            fila.remove();

            alert("Visita eliminada correctamente.");

        }

    }


    // ==========================================
    // EDITAR VISITA
    // ==========================================

    if (
        evento.target.classList.contains(
            "btn-editar-visita"
        )
    ) {

        const fila =
            evento.target.closest("tr");

        const celdas =
            fila.querySelectorAll("td");


        // Guardar fila que estamos editando
        filaVisitaEditando = fila;


        // ==========================================
        // CARGAR ALUMNO
        // ==========================================

        document.getElementById("alumno-visita").value =
            celdas[0].textContent.trim();


        // ==========================================
        // CARGAR PROFESOR
        // ==========================================

        document.getElementById("profesor-visita").value =
            celdas[1].textContent.trim();


        // ==========================================
        // CARGAR FECHA
        // ==========================================

        const fechaTexto =
            celdas[2].textContent.trim();

        if (fechaTexto.includes("/")) {

            const partesFecha =
                fechaTexto.split("/");

            document.getElementById("fecha-visita").value =
                partesFecha[2] + "-" +
                partesFecha[1] + "-" +
                partesFecha[0];

        } else {

            document.getElementById("fecha-visita").value =
                fechaTexto;

        }


        // ==========================================
        // CARGAR MOTIVO
        // ==========================================

        document.getElementById("motivo-visita").value =
            celdas[3].textContent.trim();


        // ==========================================
        // CARGAR ESTADO
        // ==========================================

        document.getElementById("estado-visita").value =
            celdas[4].textContent.trim();


        // ==========================================
        // ABRIR MODAL
        // ==========================================

        modalVisita.classList.add("activo");

    }

});


// ==========================================
// BUSCADOR DE VISITAS
// ==========================================

if (buscarVisita) {

    buscarVisita.addEventListener("input", function () {

        const texto =
            buscarVisita.value.toLowerCase().trim();


        const filas =
            tablaVisitas.querySelectorAll("tr");


        filas.forEach(function (fila) {

            const contenido =
                fila.textContent.toLowerCase();


            if (contenido.includes(texto)) {

                fila.style.display = "";

            } else {

                fila.style.display = "none";

            }

        });

    });

}