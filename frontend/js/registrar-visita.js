// ==========================================
// FORMULARIO DE REGISTRO DE VISITA
// ==========================================

const formularioRegistro =
    document.getElementById("form-registro-visita");


// ==========================================
// SELECTORES
// ==========================================

const selectAlumno =
    document.getElementById("alumno-registro");

const selectProfesor =
    document.getElementById("profesor-registro");


// ==========================================
// CARGAR ALUMNOS
// ==========================================

function cargarAlumnosRegistro() {

    if (!selectAlumno) return;

    const alumnos =
        JSON.parse(localStorage.getItem("alumnos")) || [];

    // Limpiar opciones
    selectAlumno.innerHTML = `
        <option value="">
            Seleccionar alumno
        </option>
    `;

    alumnos.forEach(function (alumno) {

        const opcion =
            document.createElement("option");

        opcion.value = alumno.codigo;

        opcion.textContent =
            alumno.nombres + " " + alumno.apellidos;

        selectAlumno.appendChild(opcion);

    });

}


// ==========================================
// CARGAR PROFESORES
// ==========================================

function cargarProfesoresRegistro() {

    if (!selectProfesor) return;

    const profesores =
        JSON.parse(localStorage.getItem("profesores")) || [];

    // Limpiar opciones
    selectProfesor.innerHTML = `
        <option value="">
            Seleccionar profesor
        </option>
    `;

    profesores.forEach(function (profesor) {

        const opcion =
            document.createElement("option");

        opcion.value = profesor.codigo;

        opcion.textContent =
            profesor.nombres + " " + profesor.apellidos;

        selectProfesor.appendChild(opcion);

    });

}


// ==========================================
// GUARDAR VISITA
// ==========================================

if (formularioRegistro) {

    formularioRegistro.addEventListener("submit", function (evento) {

        // Evitar recarga
        evento.preventDefault();


        // ==========================================
        // OBTENER DATOS
        // ==========================================

        const alumno =
            selectAlumno.options[
                selectAlumno.selectedIndex
            ].textContent;

        const profesor =
            selectProfesor.options[
                selectProfesor.selectedIndex
            ].textContent;

        const fecha =
            document.getElementById("fecha-registro").value;

        const motivo =
            document.getElementById("motivo-registro").value;

        const estado =
            document.getElementById("estado-registro").value;


        // ==========================================
        // CREAR VISITA
        // ==========================================

        const nuevaVisita = {

            alumno: alumno,

            profesor: profesor,

            fecha: fecha,

            motivo: motivo,

            estado: estado

        };


        // ==========================================
        // OBTENER VISITAS
        // ==========================================

        let visitas =
            JSON.parse(localStorage.getItem("visitas")) || [];


        // ==========================================
        // AGREGAR VISITA
        // ==========================================

        visitas.push(nuevaVisita);


        // ==========================================
        // GUARDAR
        // ==========================================

        localStorage.setItem(
            "visitas",
            JSON.stringify(visitas)
        );


        // ==========================================
        // MENSAJE
        // ==========================================

        alert(
            "Visita registrada correctamente."
        );


        // ==========================================
        // IR A VISITAS
        // ==========================================

        window.location.href =
            "visitas.html";

    });

}


// ==========================================
// CARGAR DATOS AL ABRIR
// ==========================================

cargarAlumnosRegistro();

cargarProfesoresRegistro();