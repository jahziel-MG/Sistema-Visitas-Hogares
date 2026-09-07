// ===============================
// ELEMENTOS
// ===============================

const loginForm = document.getElementById("loginForm");

const usuario = document.getElementById("usuario");

const password = document.getElementById("password");

const showPassword = document.getElementById("showPassword");

const errorMessage = document.getElementById("errorMessage");


// ===============================
// MOSTRAR / OCULTAR CONTRASEÑA
// ===============================

showPassword.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";

        showPassword.textContent = "🙈";

    } else {

        password.type = "password";

        showPassword.textContent = "👁";

    }

});


// ===============================
// LOGIN
// ===============================

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const usuarioIngresado = usuario.value.trim();

    const passwordIngresada = password.value;


    // DATOS DE PRUEBA

    const usuarioCorrecto = "admin";

    const passwordCorrecta = "123456";


    // ===============================
    // COMPROBAR DATOS
    // ===============================

    if (
        usuarioIngresado === usuarioCorrecto &&
        passwordIngresada === passwordCorrecta
    ) {

        errorMessage.textContent = "";

        // Ir a la página principal

        window.location.href = "index.html";

    } else {

        errorMessage.textContent =
            "Usuario o contraseña incorrectos.";

    }

});