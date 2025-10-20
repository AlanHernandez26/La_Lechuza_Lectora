document.addEventListener('DOMContentLoaded', () => {
    const registerButton = document.querySelector('.btn-secondary');
    const REGISTER_URL = 'html/inicio_de_sesion/Registro.html'; 
    if (registerButton) {
        registerButton.addEventListener('click', () => {
            window.location.href = REGISTER_URL;
            console.log("Redirigiendo a:", REGISTER_URL);
        });
    }
});