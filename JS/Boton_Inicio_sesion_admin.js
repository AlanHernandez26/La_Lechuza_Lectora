// Archivo: Js/Boton_Inicio_sesion_admin.js
// Maneja la redirección del botón 'Administrativo' al formulario de login de administrador.

document.addEventListener('DOMContentLoaded', () => {
    // 1. Selecciona el botón 'Administrativo' usando su clase
    const adminSwitchButton = document.querySelector('.btn-admin-switch');

    // La ruta de destino, asumiendo que:
    // - Estás en: Código/html/inicio_de_sesion/inicio_sesion.html
    // - Destino es: Código/html/inicio_de_sesion/inicio_sesion_admin.html
    const ADMIN_LOGIN_URL = 'inicio_sesion_admin.html'; 

    if (adminSwitchButton) {
        adminSwitchButton.addEventListener('click', () => {
            // Redirige al archivo de login del administrador.
            window.location.href = ADMIN_LOGIN_URL;
            console.log("Redirigiendo a:", ADMIN_LOGIN_URL);
        });
    }
});
