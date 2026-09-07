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
    document.getElementById("total-alumnos");

if (contadorAlumnos) {

    contadorAlumnos.textContent =
        alumnos.length;

}


// ==========================================
// CONTADOR DE PROFESORES
// ==========================================

const contadorProfesores =
    document.getElementById("total-profesores");

if (contadorProfesores) {

    contadorProfesores.textContent =
        profesores.length;

}


// ==========================================
// CONTADOR DE VISITAS
// ==========================================

const contadorVisitas =
    document.getElementById("total-visitas");

if (contadorVisitas) {

    contadorVisitas.textContent =
        visitas.length;

}


// ==========================================
// ÚLTIMAS VISITAS
// ==========================================

const tablaUltimasVisitas =
    document.getElementById("ultimas-visitas");

if (tablaUltimasVisitas) {

    // Mostrar las últimas 5 visitas
    const ultimasVisitas = visitas.slice(-5).reverse();

    if (ultimasVisitas.length === 0) {

        tablaUltimasVisitas.innerHTML = `
            <tr>
                <td colspan="4">
                    No hay visitas registradas.
                </td>
            </tr>
        `;

    } else {

        ultimasVisitas.forEach(function (visita) {

            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${visita.fecha || "-"}</td>

                <td>${visita.alumno || "-"}</td>

                <td>${visita.profesor || "-"}</td>

                <td>
                    <span class="estado estado-pendiente">
                        ${visita.estado || "Pendiente"}
                    </span>
                </td>
            `;

            tablaUltimasVisitas.appendChild(fila);

        });

    }

}


// ==========================================
// PRÓXIMAS VISITAS
// ==========================================

const proximasVisitas =
    document.getElementById("proximas-visitas");

if (proximasVisitas) {

    const visitasPendientes = visitas
        .filter(function (visita) {

            return visita.estado === "Pendiente";

        })
        .slice(0, 4);


    if (visitasPendientes.length === 0) {

        proximasVisitas.innerHTML = `
            <div class="sin-visitas">
                No hay próximas visitas.
            </div>
        `;

    } else {

        proximasVisitas.innerHTML = "";

        visitasPendientes.forEach(function (visita) {

            const elemento =
                document.createElement("div");

            elemento.className = "proxima-visita";

            elemento.innerHTML = `

                <div class="fecha-visita">
                    📅
                </div>

                <div class="datos-visita">

                    <strong>
                        ${visita.alumno || "Sin alumno"}
                    </strong>

                    <small>
                        Prof. ${visita.profesor || "Sin profesor"}
                    </small>

                    <small>
                        ${visita.fecha || "Sin fecha"}
                    </small>

                </div>

            `;

            proximasVisitas.appendChild(elemento);

        });

    }

}