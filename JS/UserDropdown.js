// Archivo: Js/userDropdown.js
// Maneja la funcionalidad del menú desplegable del avatar (Mi Perfil, Cerrar Sesión).

document.addEventListener('DOMContentLoaded', () => {
    const avatarButton = document.getElementById('avatar-btn');
    const dropdownMenu = document.getElementById('avatar-dropdown');
    const logoutButton = document.getElementById('logout-btn');
    
    // RUTA DE CIERRE DE SESIÓN: Desde /html/logeado/ sube dos niveles (../../) hasta el index.html de la raíz.
    const LOGOUT_REDIRECT_URL = '../../index.html'; 

    /**
     * Función para alternar la visibilidad del menú desplegable.
     */
    function toggleDropdown() {
        if (dropdownMenu) {
            if (dropdownMenu.style.display === 'block') {
                dropdownMenu.style.display = 'none';
            } else {
                dropdownMenu.style.display = 'block';
            }
        }
    }

    /**
     * Maneja el cierre de sesión simulado.
     */
    function handleLogout(event) {
        event.preventDefault();
        
        // Simulación de limpieza de sesión (futura integración con Base de Datos o tokens)
        console.log("Cierre de sesión simulado.");
        
        // La clave de seguridad (para prevenir que la flecha de atrás funcione)
        // La función replace() reemplaza la URL actual sin añadir una nueva entrada al historial del navegador.
        // Esto evita que el usuario pueda usar el botón 'Atrás' para volver a la página de sesión iniciada.
        window.location.replace(LOGOUT_REDIRECT_URL);
    }
    
    // -------------------------------------------------------------------------
    // PROGRAMACIÓN DE EVENTOS
    // -------------------------------------------------------------------------

    // 1. Mostrar/Ocultar menú al hacer clic en el avatar
    if (avatarButton) {
        avatarButton.addEventListener('click', toggleDropdown);
    }

    // 2. Cierre de Sesión (usando replace() para seguridad)
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }

    // 3. Ocultar el menú si se hace clic fuera de él
    document.addEventListener('click', (event) => {
        if (dropdownMenu && avatarButton && 
            !avatarButton.contains(event.target) && 
            !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = 'none';
        }
    });
});