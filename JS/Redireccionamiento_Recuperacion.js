document.addEventListener('DOMContentLoaded', () => {
    const TO_CHANGE_PASSWORD_URL = 'Cambio_Contraseña.html'; 
    const TO_LOGIN_URL = 'inicio_sesion.html'; 

    const btnEnviarCodigo = document.getElementById('btn-enviar-codigo');
    const btnSiguiente = document.getElementById('btn-siguiente');
    const btnRegresar = document.getElementById('btn-regresar');

    if (btnEnviarCodigo) {
        btnEnviarCodigo.addEventListener('click', () => {
            const emailInput = document.getElementById('correo');
            
            if (emailInput && emailInput.value.trim() !== '') {

                alert(`Simulación: Código enviado a ${emailInput.value.trim()}.`); 
            } else {
                alert("Por favor, introduce tu correo electrónico.");
            }
        });
    }

    if (btnSiguiente) {
        btnSiguiente.addEventListener('click', () => {

            console.log("Simulando validación exitosa. Redirigiendo a cambio de contraseña...");
            window.location.href = TO_CHANGE_PASSWORD_URL;
        });
    }

    if (btnRegresar) {
        btnRegresar.addEventListener('click', () => {
            console.log("Regresando al formulario de inicio de sesión.");
            window.location.href = TO_LOGIN_URL;
        });
    }
});
