
document.addEventListener('DOMContentLoaded', () => {
    

    const LOGIN_FORM_URL = 'inicio_sesion.html'; 
    const TO_CANCEL_URL = '../../index.html'; 
    

    let currentCaptcha = '';
    const registrationForm = document.getElementById('registrationForm'); 
    

    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm_password');
    

    const reqLength = document.getElementById('reg-req-length');
    const reqNumber = document.getElementById('reg-req-number');
    const reqSpecial = document.getElementById('reg-req-special');
    const reqCommon = document.getElementById('reg-req-common');
    const reqMatch = document.getElementById('reg-req-match'); 


    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('telefono');
    const birthdateInput = document.getElementById('fecha_nacimiento');
    const captchaInput = document.getElementById('captcha-input');
    const refreshButton = document.getElementById('captcha-refresh');
    const modalAcceptButton = document.getElementById('btn-modal-accept');
    const cancelButton = document.querySelector('.btn-cancel');
    const toggleButtons = document.querySelectorAll('.password-toggle'); 
    
    const commonPasswords = ["123456", "password", "qwerty", "12345678", "123456789", "qwertyuiop"];


    function updateRequirement(element, condition) {
        if (!element) return;
        element.style.color = condition ? 'green' : 'red';
        const icon = element.querySelector('i');
        if (icon) {
            icon.className = condition ? 'fa-solid fa-check' : 'fa-solid fa-times';
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isNumeric(str) {
        return /^\d+$/.test(str);
    }

    function isValidAge(birthdateString) {
        if (!birthdateString) return false;
        const birthDate = new Date(birthdateString);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            return age - 1 >= 18;
        }
        return age >= 18;
    }


    function validatePasswordSecurity(pass, confirmPass) {
        let allRulesMet = true;


        const lengthValid = pass.length >= 6 && pass.length <= 10;
        updateRequirement(reqLength, lengthValid);
        if (!lengthValid) allRulesMet = false;


        const numberValid = /[0-9]/.test(pass);
        updateRequirement(reqNumber, numberValid);
        if (!numberValid) allRulesMet = false;


        const specialValid = /[!@#$%^&*]/.test(pass);
        updateRequirement(reqSpecial, specialValid);
        if (!specialValid) allRulesMet = false;


        const commonValid = !commonPasswords.includes(pass.toLowerCase());
        updateRequirement(reqCommon, commonValid);
        if (!commonValid) allRulesMet = false;


        const isMatch = (pass === confirmPass) && (pass.length > 0 || confirmPass.length === 0);
        updateRequirement(reqMatch, isMatch);
        if (!isMatch) allRulesMet = false;
        
        return allRulesMet;
    }
    
    function displayNewCaptcha() {
        const captchaElement = document.getElementById('captcha-display');
        if (captchaElement) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let result = '';
            for (let i = 0; i < 5; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            currentCaptcha = result;
            captchaElement.textContent = currentCaptcha;
        }
    }
    
    function validateCaptcha(userInput) {
        return userInput.trim().toUpperCase() === currentCaptcha;
    }

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
    
    displayNewCaptcha();
    if (passwordInput) validatePasswordSecurity("", ""); 

    if (passwordInput && confirmPasswordInput) {
        const updateAllPassFields = () => {
            const pass = passwordInput.value;
            const confirmPass = confirmPasswordInput.value;
            validatePasswordSecurity(pass, confirmPass);
        };
        passwordInput.addEventListener('keyup', updateAllPassFields);
        confirmPasswordInput.addEventListener('keyup', updateAllPassFields);
    }

    toggleButtons.forEach(button => {
        button.addEventListener('click', togglePasswordVisibility);
    });


    if (refreshButton) {
        refreshButton.addEventListener('click', displayNewCaptcha);
    }

    if (modalAcceptButton) {
        modalAcceptButton.addEventListener('click', () => {
            window.location.href = LOGIN_FORM_URL; 
        });
    }

    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            window.location.replace(TO_CANCEL_URL);
        });
    }

    if (registrationForm) {
        registrationForm.addEventListener('submit', (event) => {
            event.preventDefault(); 


            const email = emailInput ? emailInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const birthdate = birthdateInput ? birthdateInput.value : '';
            const captcha = captchaInput ? captchaInput.value.trim() : '';
            const password = passwordInput ? passwordInput.value : '';
            const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : '';


            if (!isValidEmail(email)) {
                alert("Error: Formato de correo electrónico no válido."); return;
            }
            if (!isNumeric(phone)) {
                alert("Error: El campo de Teléfono solo puede contener números."); return;
            }
            if (!isValidAge(birthdate)) {
                alert("Error: Debes ser mayor de 18 años para registrarte."); return;
            }
            

            const allPassRulesMet = validatePasswordSecurity(password, confirmPassword);
            if (!allPassRulesMet) {
                alert("Error: Por favor, cumple todos los requisitos de contraseña."); return;
            }


            if (!validateCaptcha(captcha)) {
                alert("Error: El código CAPTCHA es incorrecto."); 
                displayNewCaptcha();
                captchaInput.value = '';
                return;
            }

            document.getElementById('success-modal').style.display = 'flex';
        });
    }
});