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
// CARGAR VISITAS GUARDADAS
// ==========================================

function cargarVisitas() {

    const visitas =
        JSON.parse(localStorage.getItem("visitas")) || [];


    // Limpiar la tabla

    tablaVisitas.innerHTML = "";


    // Crear cada visita

    visitas.forEach(function (visita) {

        crearFilaVisita(visita);

    });

}


// ==========================================
// CREAR FILA DE VISITA
// ==========================================

function crearFilaVisita(visita) {

    const fila =
        document.createElement("tr");


    // Convertir fecha YYYY-MM-DD
    // a DD/MM/YYYY

    let fechaMostrar = visita.fecha;

    if (visita.fecha && visita.fecha.includes("-")) {

        const partes =
            visita.fecha.split("-");

        fechaMostrar =
            partes[2] + "/" +
            partes[1] + "/" +
            partes[0];

    }


    fila.innerHTML = `

        <td>${visita.alumno}</td>

        <td>${visita.profesor}</td>

        <td>${fechaMostrar}</td>

        <td>${visita.motivo}</td>

        <td>${visita.estado}</td>

        <td>
<button
    type="button"
    class="btn-editar-profesor btn-editar">
    ✏️ Editar
</button>

<button
    type="button"
    class="btn-eliminar-profesor btn-eliminar">
    🗑️ Eliminar
</button>
        </td>

    `;


    tablaVisitas.appendChild(fila);

}


// ==========================================
// ABRIR MODAL - NUEVA VISITA
// ==========================================

if (btnNuevaVisita) {

    btnNuevaVisita.addEventListener("click", function () {

        if (formularioVisita) {

            formularioVisita.reset();

        }

        filaVisitaEditando = null;

        if (modalVisita) {

            modalVisita.classList.add("activo");

        }

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
        // OBTENER VISITAS
        // ==========================================

        let visitas =
            JSON.parse(localStorage.getItem("visitas")) || [];


        // ==========================================
        // SI ESTAMOS EDITANDO
        // ==========================================

        if (filaVisitaEditando) {

            const filas =
                Array.from(tablaVisitas.querySelectorAll("tr"));

            const posicion =
                filas.indexOf(filaVisitaEditando);


            if (posicion !== -1) {

                visitas[posicion] = {

                    alumno: alumno,

                    profesor: profesor,

                    fecha: fecha,

                    motivo: motivo,

                    estado: estado

                };

            }


            localStorage.setItem(
                "visitas",
                JSON.stringify(visitas)
            );


            alert("Visita actualizada correctamente.");


        }


        // ==========================================
        // NUEVA VISITA
        // ==========================================

        else {

            const nuevaVisita = {

                alumno: alumno,

                profesor: profesor,

                fecha: fecha,

                motivo: motivo,

                estado: estado

            };


            visitas.push(nuevaVisita);


            localStorage.setItem(
                "visitas",
                JSON.stringify(visitas)
            );


            alert("Visita registrada correctamente.");

        }


        // ==========================================
        // ACTUALIZAR TABLA
        // ==========================================

        cargarVisitas();


        // ==========================================
        // CERRAR MODAL
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
    // ELIMINAR
    // ==========================================

    if (
        evento.target.classList.contains(
            "btn-eliminar-visita"
        )
    ) {

        const fila =
            evento.target.closest("tr");


        const filas =
            Array.from(
                tablaVisitas.querySelectorAll("tr")
            );


        const posicion =
            filas.indexOf(fila);


        const confirmar =
            confirm(
                "¿Está seguro de eliminar esta visita?"
            );


        if (confirmar) {

            let visitas =
                JSON.parse(
                    localStorage.getItem("visitas")
                ) || [];


            visitas.splice(posicion, 1);


            localStorage.setItem(
                "visitas",
                JSON.stringify(visitas)
            );


            cargarVisitas();


            alert(
                "Visita eliminada correctamente."
            );

        }

    }


    // ==========================================
    // EDITAR
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


        filaVisitaEditando = fila;


        // ==========================================
        // ALUMNO
        // ==========================================

        document.getElementById(
            "alumno-visita"
        ).value =
            celdas[0].textContent.trim();


        // ==========================================
        // PROFESOR
        // ==========================================

        document.getElementById(
            "profesor-visita"
        ).value =
            celdas[1].textContent.trim();


        // ==========================================
        // FECHA
        // ==========================================

        const fechaTexto =
            celdas[2].textContent.trim();


        if (fechaTexto.includes("/")) {

            const partesFecha =
                fechaTexto.split("/");


            document.getElementById(
                "fecha-visita"
            ).value =

                partesFecha[2] + "-" +
                partesFecha[1] + "-" +
                partesFecha[0];

        }
        else {

            document.getElementById(
                "fecha-visita"
            ).value =
                fechaTexto;

        }


        // ==========================================
        // MOTIVO
        // ==========================================

        document.getElementById(
            "motivo-visita"
        ).value =
            celdas[3].textContent.trim();


        // ==========================================
        // ESTADO
        // ==========================================

        document.getElementById(
            "estado-visita"
        ).value =
            celdas[4].textContent.trim();


        // ==========================================
        // ABRIR MODAL
        // ==========================================

        modalVisita.classList.add("activo");

    }

});


// ==========================================
// BUSCADOR
// ==========================================

if (buscarVisita) {

    buscarVisita.addEventListener(
        "input",
        function () {

            const texto =
                buscarVisita.value
                    .toLowerCase()
                    .trim();


            const filas =
                tablaVisitas.querySelectorAll("tr");


            filas.forEach(function (fila) {

                const contenido =
                    fila.textContent
                        .toLowerCase();


                if (
                    contenido.includes(texto)
                ) {

                    fila.style.display = "";

                }
                else {

                    fila.style.display = "none";

                }

            });

        }
    );

}


// ==========================================
// CARGAR AL ABRIR LA PÁGINA
// ==========================================

cargarVisitas();