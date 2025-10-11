// Archivo: Js/loginRedirect.js
// Este módulo maneja todas las redirecciones relacionadas con el flujo de inicio de sesión (Login, Cancelar, Crear Cuenta, Olvido Contraseña).

document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================================
    // RUTAS FIJAS DEL FLUJO (¡Calculadas desde el index.html en la raíz!)
    // =========================================================================
    
    // 1. RUTA AL FORMULARIO DE LOGIN (Usada por el botón del header)
    // Destino: Código/html/Inicio_de_sesion/inicio_sesion.html
    const TO_LOGIN_FORM_URL = 'html/Inicio_de_sesion/inicio_sesion.html'; 
    
    // 2. RUTA DE CANCELACIÓN: Regresa a index.html (raíz)
    // Destino: Código/index.html
    const TO_CANCEL_URL = '../../index.html'; // Desde /html/Inicio_de_sesion/ sube dos niveles.

    // 3. RUTA DE ÉXITO DE LOGIN: Redirige a la página principal logeada.
    // Destino: Código/html/logeado/pagina_principal.html
    const TO_SUCCESS_PAGE_URL = '../../html/logeado/pagina_principal.html'; 

    // 4. RUTA AL FORMULARIO DE REGISTRO
    // Destino: Código/html/Inicio_de_sesion/Registro.html
    const TO_REGISTER_URL = 'Registro.html'; 

    // 5. RUTA AL FORMULARIO DE RECUPERACIÓN DE CONTRASEÑA
    // Destino: Código/html/Inicio_de_sesion/Recuperacion.html
    const TO_RECOVERY_URL = 'Recuperacion.html';


    // -------------------------------------------------------------------------
    // 1. Redirección desde el Header (Botón 'Iniciar Sesión')
    // -------------------------------------------------------------------------
    const headerLoginButtons = document.querySelectorAll('.btn-primary');
    
    headerLoginButtons.forEach(button => {
        // Usamos toLowerCase() para asegurar que funcione con "Sesión" o "sesión"
        if (button.textContent.trim().toLowerCase() === 'iniciar sesión') {
            button.addEventListener('click', () => {
                // Si el script se ejecuta en index.html (raíz), esta ruta es la correcta.
                window.location.href = TO_LOGIN_FORM_URL;
            });
        }
    });

    // -------------------------------------------------------------------------
    // 2. Funcionalidad del Botón 'Cancelar' (Dentro del formulario de Login/Registro)
    // -------------------------------------------------------------------------
    const cancelButton = document.querySelector('.btn-cancel');

    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            // Regresa al index.html de la raíz
            window.location.href = TO_CANCEL_URL;
        });
    }

    // -------------------------------------------------------------------------
    // 3. SIMULACIÓN de ÉXITO de Login (Botón 'Iniciar sesión' DENTRO del formulario)
    // -------------------------------------------------------------------------
    const loginSubmitButton = document.querySelector('.login-action-buttons .btn-primary');

    if (loginSubmitButton && loginSubmitButton.textContent.trim().toLowerCase() === 'iniciar sesión') {
        loginSubmitButton.addEventListener('click', (event) => {
            event.preventDefault(); // Previene el submit real del formulario
            
            // Simulación: Redirige a la página principal logeada
            console.log("Simulando login exitoso. Redirigiendo a:", TO_SUCCESS_PAGE_URL);
            window.location.href = TO_SUCCESS_PAGE_URL;
        });
    }

    // -------------------------------------------------------------------------
    // 4. Funcionalidad del Botón 'Crear cuenta' (Dentro del formulario de Login)
    // -------------------------------------------------------------------------
    const createAccountButton = document.querySelector('.btn-create-account');
    
    if (createAccountButton) {
        createAccountButton.addEventListener('click', () => {
            // Redirige al formulario de registro (está en la misma carpeta que el login)
            window.location.href = TO_REGISTER_URL; 
        });
    }

    // -------------------------------------------------------------------------
    // 5. Funcionalidad del Botón 'Olvido la contraseña?' (Dentro del formulario de Login)
    // -------------------------------------------------------------------------
    const forgotPasswordButton = document.querySelector('.btn-forgot-password');
    
    if (forgotPasswordButton) {
        forgotPasswordButton.addEventListener('click', () => {
            // Redirige al formulario de recuperación (está en la misma carpeta que el login)
            window.location.href = TO_RECOVERY_URL;
        });
    }

});
