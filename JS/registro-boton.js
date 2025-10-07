// Archivo: Js/registerButtonRedirect.js
// Maneja la redirección del botón "Crear Cuenta" de la página principal.

document.addEventListener('DOMContentLoaded', () => {
    // 1. Selecciona el botón "Crear Cuenta"
    const registerButton = document.querySelector('.btn-secondary');

    // La ruta de destino, asumiendo que:
    // - Estás en: Código/index.html (raíz)
    // - Destino es: Código/html/inicio_de_sesion/Registro.html
    const REGISTER_URL = 'html/inicio_de_sesion/Registro.html'; 

    if (registerButton) {
        registerButton.addEventListener('click', () => {
            // Redirige directamente al formulario de registro.
            window.location.href = REGISTER_URL;
            console.log("Redirigiendo a:", REGISTER_URL);
        });
    }
});