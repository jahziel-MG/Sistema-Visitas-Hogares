// ==========================================
// CONTADORES DEL INICIO
// ==========================================

// Obtener datos guardados en localStorage

const alumnos =
    JSON.parse(localStorage.getItem("alumnos")) || [];

const profesores =
    JSON.parse(localStorage.getItem("profesores")) || [];

const visitas =
    JSON.parse(localStorage.getItem("visitas")) || [];


// ==========================================
// CONTADOR DE ALUMNOS
// ==========================================

const contadorAlumnos =
    document.getElementById("contador-alumnos");

if (contadorAlumnos) {

    contadorAlumnos.textContent =
        alumnos.length;

}


// ==========================================
// CONTADOR DE PROFESORES
// ==========================================

const contadorProfesores =
    document.getElementById("contador-profesores");

if (contadorProfesores) {

    contadorProfesores.textContent =
        profesores.length;

}


// ==========================================
// CONTADOR DE VISITAS
// ==========================================

const contadorVisitas =
    document.getElementById("contador-visitas");

if (contadorVisitas) {

    contadorVisitas.textContent =
        visitas.length;

}