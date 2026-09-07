// ==========================================
// ELEMENTOS DEL HTML
// ==========================================

const btnNuevoAlumno =
    document.getElementById("btn-nuevo-alumno");

const modalAlumno =
    document.getElementById("modal-alumno");

const cerrarModal =
    document.getElementById("cerrar-modal");

const cancelarAlumno =
    document.getElementById("cancelar-alumno");

const formularioAlumno =
    document.getElementById("form-alumno");

const tablaAlumnos =
    document.getElementById("tabla-alumnos");

const buscarAlumno =
    document.getElementById("buscar-alumno");


// ==========================================
// VARIABLE PARA SABER SI ESTAMOS EDITANDO
// ==========================================

let filaAlumnoEditando = null;


// ==========================================
// CARGAR ALUMNOS GUARDADOS
// ==========================================

function cargarAlumnos() {

    const alumnos =
        JSON.parse(localStorage.getItem("alumnos")) || [];

    tablaAlumnos.innerHTML = "";

    alumnos.forEach(function (alumno) {

        crearFilaAlumno(alumno);

    });

}


// ==========================================
// CREAR FILA DE ALUMNO
// ==========================================

function crearFilaAlumno(alumno) {

    const fila =
        document.createElement("tr");

    fila.innerHTML = `

        <td>${alumno.codigo}</td>

        <td>${alumno.dni}</td>

        <td>${alumno.apellidos}</td>

        <td>${alumno.nombres}</td>

        <td>${alumno.grado}</td>

        <td>${alumno.seccion}</td>

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

}


// ==========================================
// ABRIR MODAL - NUEVO ALUMNO
// ==========================================

if (btnNuevoAlumno) {

    btnNuevoAlumno.addEventListener("click", function () {

        formularioAlumno.reset();

        filaAlumnoEditando = null;

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

        filaAlumnoEditando = null;

    });

}


// ==========================================
// CANCELAR
// ==========================================

if (cancelarAlumno) {

    cancelarAlumno.addEventListener("click", function () {

        modalAlumno.classList.remove("activo");

        formularioAlumno.reset();

        filaAlumnoEditando = null;

    });

}


// ==========================================
// GUARDAR / EDITAR ALUMNO
// ==========================================

if (formularioAlumno) {

    formularioAlumno.addEventListener("submit", function (evento) {

        evento.preventDefault();


        // ==========================================
        // OBTENER DATOS
        // ==========================================

        const codigo =
            document.getElementById("codigo").value.trim();

        const dni =
            document.getElementById("dni").value.trim();

        const apellidos =
            document.getElementById("apellidos").value.trim();

        const nombres =
            document.getElementById("nombres").value.trim();

        const grado =
            document.getElementById("grado").value;

        const seccion =
            document.getElementById("seccion").value;


        // ==========================================
        // CREAR OBJETO
        // ==========================================

        const alumno = {

            codigo: codigo,

            dni: dni,

            apellidos: apellidos,

            nombres: nombres,

            grado: grado,

            seccion: seccion

        };


        // ==========================================
        // OBTENER ALUMNOS GUARDADOS
        // ==========================================

        let alumnos =
            JSON.parse(localStorage.getItem("alumnos")) || [];


        // ==========================================
        // EDITAR ALUMNO EXISTENTE
        // ==========================================

        if (filaAlumnoEditando) {

            const celdas =
                filaAlumnoEditando.querySelectorAll("td");

            const codigoAnterior =
                celdas[0].textContent.trim();


            const indice =
                alumnos.findIndex(function (item) {

                    return item.codigo === codigoAnterior;

                });


            if (indice !== -1) {

                alumnos[indice] = alumno;

            }


            localStorage.setItem(
                "alumnos",
                JSON.stringify(alumnos)
            );


            filaAlumnoEditando.innerHTML = `

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
        // CREAR NUEVO ALUMNO
        // ==========================================

        else {

            alumnos.push(alumno);


            localStorage.setItem(
                "alumnos",
                JSON.stringify(alumnos)
            );


            crearFilaAlumno(alumno);


            alert("Alumno registrado correctamente.");

        }


        // ==========================================
        // CERRAR Y LIMPIAR
        // ==========================================

        modalAlumno.classList.remove("activo");

        formularioAlumno.reset();

        filaAlumnoEditando = null;

    });

}


// ==========================================
// BOTONES EDITAR Y ELIMINAR
// ==========================================

document.addEventListener("click", function (evento) {


    // ==========================================
    // ELIMINAR ALUMNO
    // ==========================================

    if (
        evento.target.classList.contains("btn-eliminar")
    ) {

        const fila =
            evento.target.closest("tr");


        const celdas =
            fila.querySelectorAll("td");


        const codigo =
            celdas[0].textContent.trim();


        const confirmar =
            confirm(
                "¿Está seguro de eliminar este alumno?"
            );


        if (confirmar) {

            let alumnos =
                JSON.parse(localStorage.getItem("alumnos")) || [];


            alumnos =
                alumnos.filter(function (alumno) {

                    return alumno.codigo !== codigo;

                });


            localStorage.setItem(
                "alumnos",
                JSON.stringify(alumnos)
            );


            fila.remove();


            alert("Alumno eliminado correctamente.");

        }

    }


    // ==========================================
    // EDITAR ALUMNO
    // ==========================================

    if (
        evento.target.classList.contains("btn-editar")
    ) {

        const fila =
            evento.target.closest("tr");


        const celdas =
            fila.querySelectorAll("td");


        filaAlumnoEditando = fila;


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


        // ==========================================
        // ABRIR MODAL
        // ==========================================

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


// ==========================================
// CARGAR ALUMNOS AL ABRIR LA PÁGINA
// ==========================================

cargarAlumnos();