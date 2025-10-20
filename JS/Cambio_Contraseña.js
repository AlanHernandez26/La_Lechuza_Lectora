

document.addEventListener('DOMContentLoaded', () => {
    const passwordForm = document.getElementById('password-form');
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const regresarButton = document.getElementById('btn-regresar');
    const toggleButtons = document.querySelectorAll('.password-toggle'); 
    

    const reqLength = document.getElementById('req-length');
    const reqNumber = document.getElementById('req-number');
    const reqSpecial = document.getElementById('req-special');
    const reqCommon = document.getElementById('req-common');
    const reqMatch = document.getElementById('req-match'); 

  
    const SUCCESS_REDIRECT_URL = '../../index.html'; 
    const REGRESAR_URL = 'inicio_sesion.html'; 

    const commonPasswords = ["123456", "password", "qwerty", "12345678", "123456789", "qwertyuiop"];


    function togglePasswordVisibility(event) {
        const icon = event.currentTarget;
        const targetId = icon.getAttribute('data-target');
        const inputField = document.getElementById(targetId);

        if (inputField.type === 'password') {
            inputField.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash'); 
        } else {
            inputField.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye'); 
        }
    }

    function updateRequirement(element, condition) {
        if (!element) return;

        element.style.color = condition ? 'green' : 'red';
        const icon = element.querySelector('i');
        if (icon) {
            icon.className = condition ? 'fa-solid fa-check' : 'fa-solid fa-times';
        }
    }


    function validateAndDisplay(newPass, confirmPass) {
        let allRulesMet = true;


        const lengthValid = newPass.length >= 6 && newPass.length <= 10;
        updateRequirement(reqLength, lengthValid);
        if (!lengthValid) allRulesMet = false;

 
        const numberValid = /[0-9]/.test(newPass);
        updateRequirement(reqNumber, numberValid);
        if (!numberValid) allRulesMet = false;

        const specialValid = /[!@#$%^&*]/.test(newPass);
        updateRequirement(reqSpecial, specialValid);
        if (!specialValid) allRulesMet = false;


        const commonValid = !commonPasswords.includes(newPass.toLowerCase());
        updateRequirement(reqCommon, commonValid);
        if (!commonValid) allRulesMet = false;


        const isMatch = (newPass === confirmPass) && (newPass.length > 0 || confirmPass.length === 0);
        updateRequirement(reqMatch, isMatch);
        if (!isMatch) allRulesMet = false;
        
        return allRulesMet;
    }


    toggleButtons.forEach(button => {
        button.addEventListener('click', togglePasswordVisibility);
    });


    if (newPasswordInput && confirmPasswordInput) {
        const updateAll = () => {
            const newPass = newPasswordInput.value;
            const confirmPass = confirmPasswordInput.value;
            validateAndDisplay(newPass, confirmPass);
        };

        newPasswordInput.addEventListener('keyup', updateAll);
        confirmPasswordInput.addEventListener('keyup', updateAll);
        

        updateAll();
    }
    

    if (passwordForm) {
        passwordForm.addEventListener('submit', (event) => {
            event.preventDefault(); 

            const newPass = newPasswordInput.value;
            
            const allRulesMet = validateAndDisplay(newPass, confirmPasswordInput.value);
            
            if (allRulesMet) {

                alert("¡Contraseña cambiada con éxito! Redirigiendo al inicio."); 
                console.log("Cambio exitoso. Redirigiendo a:", SUCCESS_REDIRECT_URL);
                
                window.location.href = SUCCESS_REDIRECT_URL;
            } else {
                alert("Por favor, corrige los requisitos de seguridad y asegúrate de que las contraseñas coincidan.");
            }
        });
    }


    if (regresarButton) {
        regresarButton.addEventListener('click', () => {
            window.location.href = REGRESAR_URL;
        });
    }
});