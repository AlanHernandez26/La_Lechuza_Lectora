// Archivo: Js/changePassword.js
// Lógica avanzada para validar la seguridad de la contraseña, la coincidencia y el toggle de visibilidad.

document.addEventListener('DOMContentLoaded', () => {
    const passwordForm = document.getElementById('password-form');
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const regresarButton = document.getElementById('btn-regresar');
    const toggleButtons = document.querySelectorAll('.password-toggle'); // Selector para los iconos de ojo
    
    // Elementos de la lista de requisitos
    const reqLength = document.getElementById('req-length');
    const reqNumber = document.getElementById('req-number');
    const reqSpecial = document.getElementById('req-special');
    const reqCommon = document.getElementById('req-common');
    const reqMatch = document.getElementById('req-match'); 

    // --- RUTAS DE REDIRECCIÓN ---
    const SUCCESS_REDIRECT_URL = '../../index.html'; // Sube 2 niveles hasta la raíz
    const REGRESAR_URL = 'inicio_sesion.html'; // Regresa al formulario de login (misma carpeta)

    const commonPasswords = ["123456", "password", "qwerty", "12345678", "123456789", "qwertyuiop"];

    /**
     * Alterna la visibilidad de la contraseña al hacer clic en el icono del ojo.
     */
    function togglePasswordVisibility(event) {
        const icon = event.currentTarget;
        const targetId = icon.getAttribute('data-target');
        const inputField = document.getElementById(targetId);

        if (inputField.type === 'password') {
            inputField.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash'); // Ojo tachado
        } else {
            inputField.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye'); // Ojo abierto
        }
    }

    /**
     * Actualiza el icono y el color de un requisito en la lista.
     */
    function updateRequirement(element, condition) {
        if (!element) return;

        element.style.color = condition ? 'green' : 'red';
        const icon = element.querySelector('i');
        if (icon) {
            icon.className = condition ? 'fa-solid fa-check' : 'fa-solid fa-times';
        }
    }

    /**
     * Revisa todas las reglas de validación y actualiza la interfaz.
     */
    function validateAndDisplay(newPass, confirmPass) {
        let allRulesMet = true;

        // --- 1. Reglas de Seguridad ---
        
        // Regla 1: Longitud (6 a 10)
        const lengthValid = newPass.length >= 6 && newPass.length <= 10;
        updateRequirement(reqLength, lengthValid);
        if (!lengthValid) allRulesMet = false;

        // Regla 2: Número (al menos 1)
        const numberValid = /[0-9]/.test(newPass);
        updateRequirement(reqNumber, numberValid);
        if (!numberValid) allRulesMet = false;

        // Regla 3: Carácter especial (al menos 1)
        const specialValid = /[!@#$%^&*]/.test(newPass);
        updateRequirement(reqSpecial, specialValid);
        if (!specialValid) allRulesMet = false;

        // Regla 4: No común
        const commonValid = !commonPasswords.includes(newPass.toLowerCase());
        updateRequirement(reqCommon, commonValid);
        if (!commonValid) allRulesMet = false;

        // --- 2. Regla de Coincidencia ---
        const isMatch = (newPass === confirmPass) && (newPass.length > 0 || confirmPass.length === 0);
        updateRequirement(reqMatch, isMatch);
        if (!isMatch) allRulesMet = false;
        
        return allRulesMet;
    }

    // --- PROGRAMACIÓN DE LISTENERS ---

    // 1. Toggle de Contraseña (Ojo)
    toggleButtons.forEach(button => {
        button.addEventListener('click', togglePasswordVisibility);
    });

    // 2. Validación en Tiempo Real (keyup)
    if (newPasswordInput && confirmPasswordInput) {
        const updateAll = () => {
            const newPass = newPasswordInput.value;
            const confirmPass = confirmPasswordInput.value;
            validateAndDisplay(newPass, confirmPass);
        };

        newPasswordInput.addEventListener('keyup', updateAll);
        confirmPasswordInput.addEventListener('keyup', updateAll);
        
        // Inicializar la validación al cargar
        updateAll();
    }
    
    // 3. Programación del Formulario (Botón Aceptar)
    if (passwordForm) {
        passwordForm.addEventListener('submit', (event) => {
            event.preventDefault(); 

            const newPass = newPasswordInput.value;
            
            const allRulesMet = validateAndDisplay(newPass, confirmPasswordInput.value);
            
            if (allRulesMet) {
                // SIMULACIÓN DE ÉXITO 
                alert("¡Contraseña cambiada con éxito! Redirigiendo al inicio."); 
                console.log("Cambio exitoso. Redirigiendo a:", SUCCESS_REDIRECT_URL);
                
                window.location.href = SUCCESS_REDIRECT_URL;
            } else {
                alert("Por favor, corrige los requisitos de seguridad y asegúrate de que las contraseñas coincidan.");
            }
        });
    }

    // 4. Programación del Botón Regresar
    if (regresarButton) {
        regresarButton.addEventListener('click', () => {
            window.location.href = REGRESAR_URL;
        });
    }
});