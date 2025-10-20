document.addEventListener('DOMContentLoaded', () => {

    const TO_CANCEL_URL = '../../index.html'; 

    const TO_SUCCESS_PAGE_URL = '../logeado/Pagina_principal.html'; 

    const TO_REGISTER_URL = 'Registro.html'; 
    const TO_RECOVERY_URL = 'Recuperacion.html';

    /**
     * Valida que una cadena tenga el formato básico de un correo electrónico.
     * @param {string} email La cadena a validar.
     * @returns {boolean} True si la cadena parece un correo válido.
     */
    function isValidEmail(email) {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const loginSubmitButton = document.querySelector('.login-action-buttons .btn-primary');

    const correoInput = document.getElementById('correo');
    const contrasenaInput = document.getElementById('contrasena'); 

    if (loginSubmitButton && loginSubmitButton.textContent.trim().toLowerCase() === 'iniciar sesión') {
        loginSubmitButton.addEventListener('click', (event) => {
            event.preventDefault(); 
            
            const email = correoInput ? correoInput.value.trim() : '';
            const password = contrasenaInput ? contrasenaInput.value.trim() : '';

            if (!email || !password) {
                alert("Por favor, ingresa tu correo y contraseña.");
                return;
            }
            if (!isValidEmail(email)) {
                alert("El formato del correo electrónico ingresado no es válido.");
                return;
            }

            window.location.replace(TO_SUCCESS_PAGE_URL);
        });
    }

    const cancelButton = document.querySelector('.btn-cancel');

    if (cancelButton) {
        cancelButton.addEventListener('click', () => {

            window.location.replace(TO_CANCEL_URL);
        });
    }

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
