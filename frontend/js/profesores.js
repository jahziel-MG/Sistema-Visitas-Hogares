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
// CARGAR PROFESORES GUARDADOS
// ==========================================

function cargarProfesores() {

    const profesores =
        JSON.parse(localStorage.getItem("profesores")) || [];

    profesores.forEach(function (profesor) {

        const fila = document.createElement("tr");

        fila.innerHTML = `

            <td>${profesor.codigo}</td>

            <td>${profesor.dni}</td>

            <td>${profesor.apellidos}</td>

            <td>${profesor.nombres}</td>

            <td>${profesor.curso}</td>

            <td>${profesor.seccion}</td>

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

        tablaProfesores.appendChild(fila);

    });

}


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
        // CREAR OBJETO PROFESOR
        // ==========================================

        const nuevoProfesor = {

            codigo: codigo,

            dni: dni,

            apellidos: apellidos,

            nombres: nombres,

            curso: curso,

            seccion: seccion

        };


        // ==========================================
        // OBTENER PROFESORES GUARDADOS
        // ==========================================

        let profesores =
            JSON.parse(localStorage.getItem("profesores")) || [];


        // ==========================================
        // EDITAR PROFESOR EXISTENTE
        // ==========================================

        if (filaProfesorEditando) {

            const codigoAnterior =
                filaProfesorEditando
                    .querySelectorAll("td")[0]
                    .textContent
                    .trim();


            const indice =
                profesores.findIndex(function (profesor) {

                    return profesor.codigo === codigoAnterior;

                });


            if (indice !== -1) {

                profesores[indice] = nuevoProfesor;

            }


            filaProfesorEditando.innerHTML = `

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


            alert("Profesor actualizado correctamente.");

        }


        // ==========================================
        // CREAR NUEVO PROFESOR
        // ==========================================

        else {

            profesores.push(nuevoProfesor);

            const fila =
                document.createElement("tr");

            fila.innerHTML = `

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

            tablaProfesores.appendChild(fila);

            alert("Profesor registrado correctamente.");

        }


        // ==========================================
        // GUARDAR EN LOCALSTORAGE
        // ==========================================

        localStorage.setItem(
            "profesores",
            JSON.stringify(profesores)
        );


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


        const codigo =
            fila.querySelectorAll("td")[0]
                .textContent
                .trim();


        const confirmar = confirm(
            "¿Está seguro de eliminar este profesor?"
        );


        if (confirmar) {

            fila.remove();


            let profesores =
                JSON.parse(localStorage.getItem("profesores")) || [];


            profesores =
                profesores.filter(function (profesor) {

                    return profesor.codigo !== codigo;

                });


            localStorage.setItem(
                "profesores",
                JSON.stringify(profesores)
            );


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

        const texto =
            buscarProfesor.value.toLowerCase().trim();


        const filas =
            tablaProfesores.querySelectorAll("tr");


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


// ==========================================
// CARGAR AL ABRIR LA PÁGINA
// ==========================================

cargarProfesores();