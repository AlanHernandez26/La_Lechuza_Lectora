// Archivo: Js/checkoutNavigation.js
// Maneja la navegación (Regresar, Siguiente) y las acciones de Agregar Domicilio
// en las páginas del proceso de compra (/logeado/compra/).

document.addEventListener('DOMContentLoaded', () => {
    
    // Rutas (Relativas a la carpeta /html/logeado/compra/)
    const BASE_PAGES = {
        CARRITO: '../carrito.html', // Sube 1 nivel a /logeado/
        RESUMEN: 'resumen_compra.html',
        DOMICILIO: 'domicilio.html',
        PAGO: 'pago.html',
        FINALIZAR: 'finalizar.html'
    };

    // Página de formulario externo (relativa a /html/logeado/)
    const MODAL_PAGES = {
        // Sube un nivel a /logeado/ y encuentra el formulario:
        AGREGAR_DOMICILIO_FORM: '../Agregar_domicilio.html' 
    };

    // -------------------------------------------------------------------------
    // Funciones de Navegación
    // -------------------------------------------------------------------------

    /**
     * Adjunta todos los listeners de navegación (siguiente, anterior).
     */
    function setupNavigationListeners() {
        // Botones Siguiente y Anterior (data-next-step/data-prev-step)
        document.querySelectorAll('.btn-next-step, .btn-prev-step').forEach(btn => {
            const isNext = btn.classList.contains('btn-next-step');
            
            btn.onclick = () => {
                const stepKey = btn.getAttribute(isNext ? 'data-next-step' : 'data-prev-step');
                
                // La ruta para regresar/avanzar entre los 4 pasos es directa (misma carpeta)
                if (BASE_PAGES[stepKey]) {
                    window.location.href = BASE_PAGES[stepKey];
                }
            };
        });
        
        // Botón Cancelar Compra (en resumen_compra.html, etc.)
        const cancelBtn = document.querySelector('.btn-cancel-checkout');
        if (cancelBtn) {
            // Cancelar lleva al index de la raíz (Sube 3 niveles: /compra/, /logeado/, /html/)
            cancelBtn.onclick = () => window.location.replace('../../../index.html');
        }
        
        // Botón Regresar de Domicilio.html (Excepción: Regresa a carrito.html)
        // El botón de domicilio.html con data-prev-step="resumen_compra" debe ir a carrito.html
        document.querySelectorAll('.btn-prev-step[data-prev-step="resumen_compra"]').forEach(btn => {
             btn.onclick = () => {
                 window.location.href = BASE_PAGES.CARRITO; // Navega a ../carrito.html
             };
        });
    }

    /**
     * Maneja el flujo de Agregar Domicilio (Redirección al formulario externo).
     */
    function setupDomicilioActions() {
        // 1. Redirección al formulario de agregar domicilio (desde domicilio.html)
        const addAddressBtn = document.querySelector('.btn-add-address');
        if (addAddressBtn) {
            addAddressBtn.onclick = () => {
                // Navega de /compra/ a /logeado/Agregar_domicilio.html
                window.location.href = MODAL_PAGES.AGREGAR_DOMICILIO_FORM; 
            };
        }
        
        // 2. Lógica del botón GUARDAR DOMICILIO (Si estamos en Agregar_domicilio.html)
        const guardarDomicilioBtn = document.getElementById('btn-guardar-domicilio');
        if (guardarDomicilioBtn) {
            guardarDomicilioBtn.onclick = (event) => {
                event.preventDefault(); 
                // Simulación de guardar exitoso (Asume que showSuccessModal está definido)
                if (typeof showSuccessModal === 'function') {
                    showSuccessModal('¡Dirección Agregada!', 'Tu nuevo domicilio ha sido guardado con éxito y está listo para ser seleccionado.');
                }
                // El listener de aceptación del modal se programa en checkoutManager.js
            };
        }
    }
    
    // -------------------------------------------------------------------------
    // INICIALIZACIÓN
    // -------------------------------------------------------------------------
    
    setupNavigationListeners();
    setupDomicilioActions();
});