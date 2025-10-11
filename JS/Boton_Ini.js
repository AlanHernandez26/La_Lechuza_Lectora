// Archivo: Boton_ini.js
// Maneja la funcionalidad del Botón de Inicio (Casita)
// Determina si el usuario está logeado (en el flujo de /html/logeado/) para redirigir.

document.addEventListener('DOMContentLoaded', () => {
    // 1. Funcionalidad del Botón de Inicio (Casita)
    const homeButton = document.querySelector('.icon-button i.fa-house');
    
    // Esta clase indica si la página pertenece al flujo de usuario logeado (ej. Carrito, Perfil, etc.)
    // Si la página se está ejecutando desde /html/logeado/, asumimos que el usuario está logeado.
    const isLoggedFlowPage = window.location.pathname.includes('/logeado/'); 

    if (homeButton) {
        homeButton.closest('button').addEventListener('click', () => {
            
            let targetURL = '';
            
            if (isLoggedFlowPage) {
                // CASO 1: Sesión Iniciada (en /html/logeado/)
                // Redirige a la página principal, que está en la MISMA CARPETA.
                targetURL = 'Pagina_principal.html';
                
            } else {
                // CASO 2: Sesión NO Iniciada (en /html/)
                // Sube un nivel para llegar al index.html en la raíz.
                targetURL = '../index.html';
            }
            
            // Usamos replace para evitar que el usuario use el botón "Atrás" y regrese a la página.
            window.location.replace(targetURL); 
        });
    }

    console.log("Funciones de JS de botón de inicio cargadas correctamente.");
});