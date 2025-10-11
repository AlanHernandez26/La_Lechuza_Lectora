// Archivo: Js/loginRedirect.js
// Maneja todas las redirecciones relacionadas con el flujo de inicio de sesión (Login, Cancelar, Crear Cuenta, Olvido Contraseña).

document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================================
    // RUTAS CRÍTICAS (OPTIMIZADAS PARA REEMPLAZO SEGURO)
    // =========================================================================
    
    // Función para obtener la ruta al index.html desde la ubicación actual (sube 2 niveles)
    const TO_CANCEL_URL = '../../index.html'; 

    // RUTA DE ÉXITO DE LOGIN: Redirige a la página principal logeada.
    // Desde /html/Inicio_de_sesion/ sube a /html/ (../) y baja a /logeado/
    const TO_SUCCESS_PAGE_URL = '../logeado/Pagina_principal.html'; 

    // Rutas relativas simples para navegación Href (dentro de la misma carpeta)
    const TO_REGISTER_URL = 'Registro.html'; 
    const TO_RECOVERY_URL = 'Recuperacion.html';

    /**
     * Valida que una cadena tenga el formato básico de un correo electrónico.
     * @param {string} email La cadena a validar.
     * @returns {boolean} True si la cadena parece un correo válido.
     */
    function isValidEmail(email) {
        // Expresión regular simple para verificar el formato email@dominio.algo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }


    // -------------------------------------------------------------------------
    // 3. SIMULACIÓN de ÉXITO de Login (Botón 'Iniciar sesión' DENTRO del formulario)
    // -------------------------------------------------------------------------
    const loginSubmitButton = document.querySelector('.login-action-buttons .btn-primary');
    // Obtenemos los campos de entrada
    const correoInput = document.getElementById('correo');
    const contrasenaInput = document.getElementById('contrasena'); 

    if (loginSubmitButton && loginSubmitButton.textContent.trim().toLowerCase() === 'iniciar sesión') {
        loginSubmitButton.addEventListener('click', (event) => {
            event.preventDefault(); 
            
            const email = correoInput ? correoInput.value.trim() : '';
            const password = contrasenaInput ? contrasenaInput.value.trim() : '';

            // VALIDACIÓN ESTRICTA DEL CORREO
            if (!email || !password) {
                alert("Por favor, ingresa tu correo y contraseña.");
                return;
            }
            if (!isValidEmail(email)) {
                alert("El formato del correo electrónico ingresado no es válido.");
                return;
            }

            // SIMULACIÓN DE ÉXITO (Si pasa la validación)
            window.location.replace(TO_SUCCESS_PAGE_URL);
        });
    }

    // -------------------------------------------------------------------------
    // 4. Funcionalidad del Botón 'Cancelar' (Dentro del formulario de Login)
    // -------------------------------------------------------------------------
    const cancelButton = document.querySelector('.btn-cancel');

    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            // USAMOS REPLACE() para eliminar el formulario del historial al cancelar
            window.location.replace(TO_CANCEL_URL);
        });
    }

    // -------------------------------------------------------------------------
    // 5. Botones de Navegación del Formulario de Login (Crear Cuenta / Olvidó)
    // -------------------------------------------------------------------------
    const createAccountButton = document.querySelector('.btn-create-account');
    if (createAccountButton) {
        createAccountButton.addEventListener('click', () => {
            window.location.href = TO_REGISTER_URL; 
        });
    }

    const forgotPasswordButton = document.querySelector('.btn-forgot-password');
    if (forgotPasswordButton) {
        forgotPasswordButton.addEventListener('click', () => {
            window.location.href = TO_RECOVERY_URL;
        });
    }
});
