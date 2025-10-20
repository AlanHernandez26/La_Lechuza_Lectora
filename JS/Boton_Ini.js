document.addEventListener('DOMContentLoaded', () => {

    const homeButton = document.querySelector('.icon-button i.fa-house');

    const isLoggedFlowPage = window.location.pathname.includes('/logeado/'); 

    if (homeButton) {
        homeButton.closest('button').addEventListener('click', () => {
            
            let targetURL = '';
            
            if (isLoggedFlowPage) {

                targetURL = 'Pagina_principal.html';
                
            } else {

                targetURL = '../index.html';
            }

            window.location.replace(targetURL); 
        });
    }

    console.log("Funciones de JS de botón de inicio cargadas correctamente.");
});