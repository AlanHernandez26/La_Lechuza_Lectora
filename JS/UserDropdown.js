document.addEventListener('DOMContentLoaded', () => {
    const avatarButton = document.getElementById('avatar-btn');
    const dropdownMenu = document.getElementById('avatar-dropdown');
    const logoutButton = document.getElementById('logout-btn');
    const LOGOUT_REDIRECT_URL = '../../index.html'; 

    function toggleDropdown() {
        if (dropdownMenu) {
            if (dropdownMenu.style.display === 'block') {
                dropdownMenu.style.display = 'none';
            } else {
                dropdownMenu.style.display = 'block';
            }
        }
    }

    function handleLogout(event) {
        event.preventDefault();
        console.log("Cierre de sesión simulado.");
        window.location.replace(LOGOUT_REDIRECT_URL);
    }

    if (avatarButton) {
        avatarButton.addEventListener('click', toggleDropdown);
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }

    document.addEventListener('click', (event) => {
        if (dropdownMenu && avatarButton && 
            !avatarButton.contains(event.target) && 
            !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = 'none';
        }
    });
});