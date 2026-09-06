// ==========================================
// ELEMENTOS DEL HTML
// ==========================================

const btnNuevoProfesor =
    document.getElementById("btn-nuevo-profesor");

const modalProfesor =
    document.getElementById("modal-profesor");

const cerrarModalProfesor =
    document.getElementById("cerrar-modal-profesor");

const cancelarProfesor =
    document.getElementById("cancelar-profesor");

const formularioProfesor =
    document.getElementById("form-profesor");

const tablaProfesores =
    document.getElementById("tabla-profesores");

const buscarProfesor =
    document.getElementById("buscar-profesor");


// ==========================================
// VARIABLE PARA SABER SI ESTAMOS EDITANDO
// ==========================================

let filaProfesorEditando = null;


// ==========================================
// ABRIR MODAL - NUEVO PROFESOR
// ==========================================

if (btnNuevoProfesor) {

    btnNuevoProfesor.addEventListener("click", function () {

        // Limpiar formulario
        formularioProfesor.reset();

        // Indicar que es un nuevo profesor
        filaProfesorEditando = null;

        // Abrir modal
        modalProfesor.classList.add("activo");

    });

}


// ==========================================
// CERRAR MODAL
// ==========================================

if (cerrarModalProfesor) {

    cerrarModalProfesor.addEventListener("click", function () {

        modalProfesor.classList.remove("activo");

        formularioProfesor.reset();

        filaProfesorEditando = null;

    });

}


// ==========================================
// CANCELAR
// ==========================================

if (cancelarProfesor) {

    cancelarProfesor.addEventListener("click", function () {

        modalProfesor.classList.remove("activo");

        formularioProfesor.reset();

        filaProfesorEditando = null;

    });

}


// ==========================================
// GUARDAR / EDITAR PROFESOR
// ==========================================

if (formularioProfesor) {

    formularioProfesor.addEventListener("submit", function (evento) {

        // Evita que la página se recargue
        evento.preventDefault();


        // ==========================================
        // OBTENER DATOS DEL FORMULARIO
        // ==========================================

        const codigo =
            document.getElementById("codigo-profesor").value.trim();

        const dni =
            document.getElementById("dni-profesor").value.trim();

        const apellidos =
            document.getElementById("apellidos-profesor").value.trim();

        const nombres =
            document.getElementById("nombres-profesor").value.trim();

        const curso =
            document.getElementById("curso-profesor").value;

        const seccion =
            document.getElementById("seccion-profesor").value;


        // ==========================================
        // CONTENIDO DE LA FILA
        // ==========================================

        const datosFila = `

            <td>${codigo}</td>

            <td>${dni}</td>

            <td>${apellidos}</td>

            <td>${nombres}</td>

            <td>${curso}</td>

            <td>${seccion}</td>

            <td>

                <button
                    type="button"
                    class="btn-editar-profesor">

                    Editar

                </button>

                <button
                    type="button"
                    class="btn-eliminar-profesor">

                    Eliminar

                </button>

            </td>

        `;


        // ==========================================
        // EDITAR PROFESOR EXISTENTE
        // ==========================================

        if (filaProfesorEditando) {

            filaProfesorEditando.innerHTML = datosFila;

            alert("Profesor actualizado correctamente.");

        }




        // ==========================================
        // CREAR NUEVO PROFESOR
        // ==========================================

        else {

            const fila = document.createElement("tr");

            fila.innerHTML = datosFila;

            tablaProfesores.appendChild(fila);

            alert("Profesor registrado correctamente.");

        }


        // ==========================================
        // CERRAR Y LIMPIAR
        // ==========================================

        modalProfesor.classList.remove("activo");

        formularioProfesor.reset();

        filaProfesorEditando = null;

    });

}


// ==========================================
// BOTONES EDITAR Y ELIMINAR
// ==========================================

document.addEventListener("click", function (evento) {


    // ==========================================
    // ELIMINAR PROFESOR
    // ==========================================

    if (
        evento.target.classList.contains(
            "btn-eliminar-profesor"
        )
    ) {

        const fila =
            evento.target.closest("tr");


        const confirmar = confirm(
            "¿Está seguro de eliminar este profesor?"
        );


        if (confirmar) {

            fila.remove();

            alert("Profesor eliminado correctamente.");

        }

    }


    // ==========================================
    // EDITAR PROFESOR
    // ==========================================

    if (
        evento.target.classList.contains(
            "btn-editar-profesor"
        )
    ) {

        const fila =
            evento.target.closest("tr");

        const celdas =
            fila.querySelectorAll("td");


        // Guardar la fila que estamos editando

        filaProfesorEditando = fila;


        // ==========================================
        // CARGAR DATOS EN EL FORMULARIO
        // ==========================================

        document.getElementById("codigo-profesor").value =
            celdas[0].textContent.trim();

        document.getElementById("dni-profesor").value =
            celdas[1].textContent.trim();

        document.getElementById("apellidos-profesor").value =
            celdas[2].textContent.trim();

        document.getElementById("nombres-profesor").value =
            celdas[3].textContent.trim();

        document.getElementById("curso-profesor").value =
            celdas[4].textContent.trim();

        document.getElementById("seccion-profesor").value =
            celdas[5].textContent.trim();


        // Abrir modal

        modalProfesor.classList.add("activo");

    }

});


// ==========================================
// BUSCADOR DE PROFESORES
// ==========================================

if (buscarProfesor) {

    buscarProfesor.addEventListener("input", function () {

        // Texto escrito en el buscador

        const texto =
            buscarProfesor.value.toLowerCase().trim();


        // Obtener todas las filas

        const filas =
            tablaProfesores.querySelectorAll("tr");


        // Revisar cada profesor

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