document.addEventListener('DOMContentLoaded', () => {

    const adminSwitchButton = document.querySelector('.btn-admin-switch');


    const ADMIN_LOGIN_URL = 'inicio_sesion_admin.html'; 

    if (adminSwitchButton) {
        adminSwitchButton.addEventListener('click', () => {

            window.location.href = ADMIN_LOGIN_URL;
            console.log("Redirigiendo a:", ADMIN_LOGIN_URL);
        });
    }
});
