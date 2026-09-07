// ==========================================
// URL DE LA API
// ==========================================

const API_URL =
    "/Sistema-Visitas-Hogares/backend/api/estudiantes.php";


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

const cantidadAlumnos =
    document.getElementById("cantidad-alumnos");


// ==========================================
// VARIABLE PARA SABER SI ESTAMOS EDITANDO
// ==========================================

let filaAlumnoEditando = null;


// ==========================================
// ACTUALIZAR CONTADOR
// ==========================================

function actualizarContador() {

    if (!cantidadAlumnos) {
        return;
    }

    const filas =
        tablaAlumnos.querySelectorAll("tr");

    cantidadAlumnos.textContent = filas.length;
}


// ==========================================
// CARGAR ALUMNOS DESDE LA API
// ==========================================

async function cargarAlumnos() {

    try {

        const respuesta = await fetch(API_URL);

        if (!respuesta.ok) {
            throw new Error(
                "Error HTTP: " + respuesta.status
            );
        }

        const resultado = await respuesta.json();

        if (!resultado.success) {

            throw new Error(
                resultado.message ||
                "No se pudieron cargar los alumnos."
            );
        }

        tablaAlumnos.innerHTML = "";

        resultado.data.forEach(function (alumno) {

            crearFilaAlumno(alumno);

        });

        actualizarContador();

    } catch (error) {

        console.error(
            "Error al cargar alumnos:",
            error
        );

        alert(
            "No se pudieron cargar los alumnos."
        );
    }
}


// ==========================================
// CREAR FILA DE ALUMNO
// ==========================================

function crearFilaAlumno(alumno) {

    const fila =
        document.createElement("tr");

    // Guardamos el ID real de la base de datos
    fila.dataset.id =
        alumno.id_estudiante;

    // Creamos un código visual
    const codigo =
        "ALU-" +
        String(alumno.id_estudiante)
            .padStart(3, "0");

    fila.innerHTML = `

        <td>
            <span class="codigo-alumno">
                ${codigo}
            </span>
        </td>

        <td>
            <span class="dato-dni">
                ${alumno.dni ?? ""}
            </span>
        </td>

        <td>
            <strong>
                ${alumno.apellidos}
            </strong>
        </td>

        <td>
            ${alumno.nombres}
        </td>

        <td>
            <span class="badge-grado">
                ${alumno.grado}
            </span>
        </td>

        <td>
            <span class="badge-seccion">
                ${alumno.seccion}
            </span>
        </td>

        <td>

            <div class="acciones-tabla">

                <button
                    type="button"
                    class="btn-editar"
                    title="Editar alumno">
                    ✏️ Editar
                </button>

                <button
                    type="button"
                    class="btn-eliminar"
                    title="Eliminar alumno">
                    🗑️ Eliminar
                </button>

            </div>

        </td>

    `;

    tablaAlumnos.appendChild(fila);
}


// ==========================================
// ABRIR MODAL - NUEVO ALUMNO
// ==========================================

if (btnNuevoAlumno) {

    btnNuevoAlumno.addEventListener(
        "click",
        function () {

            formularioAlumno.reset();

            filaAlumnoEditando = null;

            modalAlumno.classList.add("activo");

        }
    );

}


// ==========================================
// CERRAR MODAL
// ==========================================

if (cerrarModal) {

    cerrarModal.addEventListener(
        "click",
        function () {

            modalAlumno.classList.remove("activo");

            formularioAlumno.reset();

            filaAlumnoEditando = null;

        }
    );

}


// ==========================================
// CANCELAR
// ==========================================

if (cancelarAlumno) {

    cancelarAlumno.addEventListener(
        "click",
        function () {

            modalAlumno.classList.remove("activo");

            formularioAlumno.reset();

            filaAlumnoEditando = null;

        }
    );

}


// ==========================================
// GUARDAR / EDITAR ALUMNO
// ==========================================

if (formularioAlumno) {

    formularioAlumno.addEventListener(
        "submit",
        async function (evento) {

            evento.preventDefault();

            // ==========================================
            // OBTENER DATOS
            // ==========================================

            const dni =
                document
                    .getElementById("dni")
                    .value
                    .trim();

            const apellidos =
                document
                    .getElementById("apellidos")
                    .value
                    .trim();

            const nombres =
                document
                    .getElementById("nombres")
                    .value
                    .trim();

            const grado =
                document
                    .getElementById("grado")
                    .value;

            const seccion =
                document
                    .getElementById("seccion")
                    .value;


            // ==========================================
            // DATOS QUE ENVIAREMOS A PHP
            // ==========================================

            const alumno = {

                dni: dni,

                apellidos: apellidos,

                nombres: nombres,

                grado: grado,

                seccion: seccion

            };


            try {

                // ==========================================
                // EDITAR
                // ==========================================

                if (filaAlumnoEditando) {

                    const id =
                        filaAlumnoEditando.dataset.id;


                    const respuesta = await fetch(
                        `${API_URL}?id=${id}`,
                        {
                            method: "PUT",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify(alumno)
                        }
                    );


                    const resultado =
                        await respuesta.json();


                    if (!respuesta.ok ||
                        !resultado.success) {

                        throw new Error(
                            resultado.message ||
                            "No se pudo actualizar el alumno."
                        );
                    }


                    alert(
                        "Alumno actualizado correctamente."
                    );

                }

                // ==========================================
                // CREAR NUEVO
                // ==========================================

                else {

                    const respuesta = await fetch(
                        API_URL,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify(alumno)
                        }
                    );


                    const resultado =
                        await respuesta.json();


                    if (!respuesta.ok ||
                        !resultado.success) {

                        throw new Error(
                            resultado.message ||
                            "No se pudo registrar el alumno."
                        );
                    }


                    alert(
                        "Alumno registrado correctamente."
                    );

                }


                // ==========================================
                // ACTUALIZAR TABLA
                // ==========================================

                modalAlumno.classList.remove("activo");

                formularioAlumno.reset();

                filaAlumnoEditando = null;

                await cargarAlumnos();

            } catch (error) {

                console.error(
                    "Error al guardar alumno:",
                    error
                );

                alert(
                    error.message ||
                    "Ocurrió un error al guardar el alumno."
                );

            }

        }
    );

}


// ==========================================
// BOTONES EDITAR Y ELIMINAR
// ==========================================

document.addEventListener(
    "click",
    async function (evento) {

        // ==========================================
        // ELIMINAR ALUMNO
        // ==========================================

        if (
            evento.target.classList.contains(
                "btn-eliminar"
            )
        ) {

            const fila =
                evento.target.closest("tr");

            const id =
                fila.dataset.id;

            const confirmar =
                confirm(
                    "¿Está seguro de eliminar este alumno?"
                );


            if (!confirmar) {
                return;
            }


            try {

                const respuesta = await fetch(
                    `${API_URL}?id=${id}`,
                    {
                        method: "DELETE"
                    }
                );


                const resultado =
                    await respuesta.json();


                if (!respuesta.ok ||
                    !resultado.success) {

                    throw new Error(
                        resultado.message ||
                        "No se pudo eliminar el alumno."
                    );
                }


                alert(
                    "Alumno eliminado correctamente."
                );


                await cargarAlumnos();

            } catch (error) {

                console.error(
                    "Error al eliminar alumno:",
                    error
                );

                alert(
                    error.message ||
                    "Ocurrió un error al eliminar."
                );
            }

        }


        // ==========================================
        // EDITAR ALUMNO
        // ==========================================

        if (
            evento.target.classList.contains(
                "btn-editar"
            )
        ) {

            const fila =
                evento.target.closest("tr");

            const id =
                fila.dataset.id;


            try {

                const respuesta = await fetch(
                    `${API_URL}?id=${id}`
                );


                const resultado =
                    await respuesta.json();


                if (!respuesta.ok ||
                    !resultado.success) {

                    throw new Error(
                        resultado.message ||
                        "No se pudo obtener el alumno."
                    );
                }


                const alumno =
                    resultado.data;


                filaAlumnoEditando = fila;


                // ==========================================
                // CARGAR DATOS EN EL FORMULARIO
                // ==========================================

                document
                    .getElementById("codigo")
                    .value =
                    "ALU-" +
                    String(alumno.id_estudiante)
                        .padStart(3, "0");

                document
                    .getElementById("dni")
                    .value =
                    alumno.dni ?? "";

                document
                    .getElementById("apellidos")
                    .value =
                    alumno.apellidos;

                document
                    .getElementById("nombres")
                    .value =
                    alumno.nombres;

                document
                    .getElementById("grado")
                    .value =
                    alumno.grado;

                document
                    .getElementById("seccion")
                    .value =
                    alumno.seccion;


                modalAlumno.classList.add(
                    "activo"
                );

            } catch (error) {

                console.error(
                    "Error al obtener alumno:",
                    error
                );

                alert(
                    error.message ||
                    "No se pudo cargar el alumno."
                );
            }

        }

    }
);


// ==========================================
// BUSCADOR DE ALUMNOS
// ==========================================

if (buscarAlumno) {

    buscarAlumno.addEventListener(
        "input",
        function () {

            const texto =
                buscarAlumno.value
                    .toLowerCase()
                    .trim();


            const filas =
                tablaAlumnos.querySelectorAll("tr");


            filas.forEach(function (fila) {

                const contenido =
                    fila.textContent
                        .toLowerCase();


                if (
                    contenido.includes(texto)
                ) {

                    fila.style.display = "";

                } else {

                    fila.style.display = "none";

                }

            });

        }
    );

}


// ==========================================
// CARGAR ALUMNOS AL ABRIR LA PÁGINA
// ==========================================

cargarAlumnos();