// Archivo: Js/recoveryActions.js
// Maneja las acciones de los tres botones del formulario de Recuperación de Contraseña.

document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================================
    // RUTAS FIJAS DEL FLUJO (Calculadas desde /html/inicio_de_sesion/)
    // =========================================================================
    
    // 1. Destino de ÉXITO (Simulación de cambio de contraseña)
    // Asumimos que esta página estará en la misma carpeta: /html/inicio_de_sesion/
    const TO_CHANGE_PASSWORD_URL = 'Cambio_Contraseña.html'; 

    // 2. Destino de REGRESO: Vuelve al formulario de login
    const TO_LOGIN_URL = 'inicio_sesion.html'; 

    
    // =========================================================================
    // SELECTORES DE BOTONES
    // =========================================================================
    const btnEnviarCodigo = document.getElementById('btn-enviar-codigo');
    const btnSiguiente = document.getElementById('btn-siguiente');
    const btnRegresar = document.getElementById('btn-regresar');

    
    // -------------------------------------------------------------------------
    // 1. FUNCIONALIDAD: ENVIAR CÓDIGO (Simulación)
    // -------------------------------------------------------------------------
    if (btnEnviarCodigo) {
        btnEnviarCodigo.addEventListener('click', () => {
            const emailInput = document.getElementById('correo');
            
            if (emailInput && emailInput.value.trim() !== '') {
                // Simulación de una alerta de éxito (cambiar por un modal en el futuro)
                alert(`Simulación: Código enviado a ${emailInput.value.trim()}.`); 
            } else {
                alert("Por favor, introduce tu correo electrónico.");
            }
        });
    }

    // -------------------------------------------------------------------------
    // 2. FUNCIONALIDAD: SIGUIENTE (Redirecciona a la página de cambio de contraseña)
    // -------------------------------------------------------------------------
    if (btnSiguiente) {
        btnSiguiente.addEventListener('click', () => {
            // Nota: Aquí se implementaría la lógica de validación del código.
            // Por ahora, solo redirigimos para el frontend.
            console.log("Simulando validación exitosa. Redirigiendo a cambio de contraseña...");
            window.location.href = TO_CHANGE_PASSWORD_URL;
        });
    }

    // -------------------------------------------------------------------------
    // 3. FUNCIONALIDAD: REGRESAR (Vuelve al formulario de login)
    // -------------------------------------------------------------------------
    if (btnRegresar) {
        btnRegresar.addEventListener('click', () => {
            console.log("Regresando al formulario de inicio de sesión.");
            window.location.href = TO_LOGIN_URL;
        });
    }
});
