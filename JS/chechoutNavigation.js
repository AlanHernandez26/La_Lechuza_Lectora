document.addEventListener('DOMContentLoaded', () => {

    const BASE_PAGES = {
        CARRITO: '../carrito.html',
        RESUMEN: 'resumen_compra.html',
        DOMICILIO: 'domicilio.html',
        PAGO: 'pago.html',
        FINALIZAR: 'finalizar.html'
    };

    const MODAL_PAGES = {

        AGREGAR_DOMICILIO_FORM: '../Agregar_domicilio.html' 
    };

    function setupNavigationListeners() {

        document.querySelectorAll('.btn-next-step, .btn-prev-step').forEach(btn => {
            const isNext = btn.classList.contains('btn-next-step');
            
            btn.onclick = () => {
                const stepKey = btn.getAttribute(isNext ? 'data-next-step' : 'data-prev-step');

                if (BASE_PAGES[stepKey]) {
                    window.location.href = BASE_PAGES[stepKey];
                }
            };
        });

        const cancelBtn = document.querySelector('.btn-cancel-checkout');
        if (cancelBtn) {

            cancelBtn.onclick = () => window.location.replace('../../../index.html');
        }

        document.querySelectorAll('.btn-prev-step[data-prev-step="resumen_compra"]').forEach(btn => {
             btn.onclick = () => {
                 window.location.href = BASE_PAGES.CARRITO; 
             };
        });
    }

    function setupDomicilioActions() {

        const addAddressBtn = document.querySelector('.btn-add-address');
        if (addAddressBtn) {
            addAddressBtn.onclick = () => {

                window.location.href = MODAL_PAGES.AGREGAR_DOMICILIO_FORM; 
            };
        }
        
        const guardarDomicilioBtn = document.getElementById('btn-guardar-domicilio');
        if (guardarDomicilioBtn) {
            guardarDomicilioBtn.onclick = (event) => {
                event.preventDefault(); 

                if (typeof showSuccessModal === 'function') {
                    showSuccessModal('¡Dirección Agregada!', 'Tu nuevo domicilio ha sido guardado con éxito y está listo para ser seleccionado.');
                }

            };
        }
    }

    setupNavigationListeners();
    setupDomicilioActions();
});