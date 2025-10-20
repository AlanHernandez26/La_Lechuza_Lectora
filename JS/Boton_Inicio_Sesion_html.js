

document.addEventListener('DOMContentLoaded', () => {

    const headerLoginButtons = document.querySelectorAll('.btn-primary');

    const userLoginURL = '../html/Inicio_de_sesion/Inicio_sesion.html';

    headerLoginButtons.forEach(button => {
        if (button.textContent.trim() === 'Iniciar Sesión') {
            button.addEventListener('click', () => {

                window.location.href = userLoginURL;
            });
        }
    });
});
