const btnNuevoAlumno = document.getElementById("btn-nuevo-alumno");
const modalAlumno = document.getElementById("modal-alumno");
const cerrarModal = document.getElementById("cerrar-modal");
const cancelarAlumno = document.getElementById("cancelar-alumno");
const formularioAlumno = document.getElementById("form-alumno");
const tablaAlumnos = document.getElementById("tabla-alumnos");
const buscarAlumno = document.getElementById("buscar-alumno");


// ==========================================
// VARIABLE PARA SABER SI ESTAMOS EDITANDO
// ==========================================

let filaEditando = null;


// ==========================================
// ABRIR MODAL - NUEVO ALUMNO
// ==========================================

if (btnNuevoAlumno) {

    btnNuevoAlumno.addEventListener("click", function () {

        formularioAlumno.reset();

        filaEditando = null;

        modalAlumno.classList.add("activo");

    });

}


// ==========================================
// CERRAR MODAL
// ==========================================

if (cerrarModal) {

    cerrarModal.addEventListener("click", function () {

        modalAlumno.classList.remove("activo");

        formularioAlumno.reset();

        filaEditando = null;

    });

}


// ==========================================
// CANCELAR
// ==========================================

if (cancelarAlumno) {

    cancelarAlumno.addEventListener("click", function () {

        modalAlumno.classList.remove("activo");

        formularioAlumno.reset();

        filaEditando = null;

    });

}


// ==========================================
// GUARDAR / EDITAR ALUMNO
// ==========================================

if (formularioAlumno) {

    formularioAlumno.addEventListener("submit", function (evento) {

        // Evitar que la página se recargue
        evento.preventDefault();


        // ==========================================
        // OBTENER DATOS DEL FORMULARIO
        // ==========================================

        const codigo =
            document.getElementById("codigo").value;

        const dni =
            document.getElementById("dni").value;

        const apellidos =
            document.getElementById("apellidos").value;

        const nombres =
            document.getElementById("nombres").value;

        const grado =
            document.getElementById("grado").value;

        const seccion =
            document.getElementById("seccion").value;


        // ==========================================
        // SI ESTAMOS EDITANDO
        // ==========================================

        if (filaEditando) {

            filaEditando.innerHTML = `

                <td>${codigo}</td>

                <td>${dni}</td>

                <td>${apellidos}</td>

                <td>${nombres}</td>

                <td>${grado}</td>

                <td>${seccion}</td>

                <td>

                    <button
                        type="button"
                        class="btn-editar">

                        Editar

                    </button>

                    <button
                        type="button"
                        class="btn-eliminar">

                        Eliminar

                    </button>

                </td>

            `;


            alert("Alumno actualizado correctamente.");

        }


        // ==========================================
        // SI ES UN NUEVO ALUMNO
        // ==========================================

        else {

            const fila = document.createElement("tr");

            fila.innerHTML = `

                <td>${codigo}</td>

                <td>${dni}</td>

                <td>${apellidos}</td>

                <td>${nombres}</td>

                <td>${grado}</td>

                <td>${seccion}</td>

                <td>

                    <button
                        type="button"
                        class="btn-editar">

                        Editar

                    </button>

                    <button
                        type="button"
                        class="btn-eliminar">

                        Eliminar

                    </button>

                </td>

            `;


            tablaAlumnos.appendChild(fila);


            alert("Alumno registrado correctamente.");

        }


        // ==========================================
        // CERRAR Y LIMPIAR
        // ==========================================

        modalAlumno.classList.remove("activo");

        formularioAlumno.reset();

        filaEditando = null;

    });

}


// ==========================================
// BOTONES EDITAR Y ELIMINAR
// ==========================================

document.addEventListener("click", function (evento) {


    // ==========================================
    // ELIMINAR ALUMNO
    // ==========================================

    if (evento.target.classList.contains("btn-eliminar")) {

        const fila =
            evento.target.closest("tr");


        const confirmar = confirm(
            "¿Está seguro de eliminar este alumno?"
        );


        if (confirmar) {

            fila.remove();

        }

    }


    // ==========================================
    // EDITAR ALUMNO
    // ==========================================

    if (evento.target.classList.contains("btn-editar")) {

        const fila =
            evento.target.closest("tr");

        const celdas =
            fila.querySelectorAll("td");


        // Guardar la fila que estamos editando
        filaEditando = fila;


        // ==========================================
        // CARGAR DATOS EN EL FORMULARIO
        // ==========================================

        document.getElementById("codigo").value =
            celdas[0].textContent.trim();

        document.getElementById("dni").value =
            celdas[1].textContent.trim();

        document.getElementById("apellidos").value =
            celdas[2].textContent.trim();

        document.getElementById("nombres").value =
            celdas[3].textContent.trim();

        document.getElementById("grado").value =
            celdas[4].textContent.trim();

        document.getElementById("seccion").value =
            celdas[5].textContent.trim();


        // Abrir modal
        modalAlumno.classList.add("activo");

    }

});


// ==========================================
// BUSCADOR DE ALUMNOS
// ==========================================

if (buscarAlumno) {

    buscarAlumno.addEventListener("input", function () {

        const texto =
            buscarAlumno.value.toLowerCase().trim();


        const filas =
            tablaAlumnos.querySelectorAll("tr");


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