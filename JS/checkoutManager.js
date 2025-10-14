// Archivo: Js/checkoutManager.js
// Maneja el estado, la navegación y la simulación del proceso de compra (Checkout).

document.addEventListener('DOMContentLoaded', () => {
    
    const STORAGE_KEY_CHECKOUT = 'laLechuzaCheckoutData';
    const CART_PAGE_URL = '../carrito.html'; 
    const INDEX_PAGE_URL = '../../../index.html'; // Sube tres niveles a la raíz

    // Páginas de checkout (relativas a la carpeta /html/logeado/compra/)
    const STEP_PAGES = {
        resumen_compra: 'resumen_compra.html',
        direccion: 'domicilio.html',
        pago: 'pago.html',
        finalizar: 'finalizar.html'
    };

    // Estado global de la compra (guardado en localStorage)
    let checkoutData = {
        selectedAddress: 'address1', // Simulación de ID de dirección
        selectedPayment: 'paypal',  // Simulación de método de pago
        isCartEmpty: true,
        totals: {
            itemCount: 0,
            subtotal: 0.00,
            shipping: 'Gratis',
            total: 0.00
        }
    };
    
    // Asumimos que esta función existe y carga el carrito desde cartManager.js
    if (typeof loadCart !== 'function' || typeof calculateTotals !== 'function') {
        console.error("ERROR: checkoutManager requiere loadCart y calculateTotals de cartManager.js.");
        return;
    }

    // -------------------------------------------------------------------------
    // PERSISTENCIA Y UTILIDADES
    // -------------------------------------------------------------------------

    function saveCheckoutData() {
        localStorage.setItem(STORAGE_KEY_CHECKOUT, JSON.stringify(checkoutData));
    }

    function loadCheckoutData() {
        // Cargar datos del carrito y totales desde cartManager
        loadCart();
        checkoutData.totals = calculateTotals();
        checkoutData.isCartEmpty = checkoutData.totals.itemCount === 0;

        // Cargar selecciones previas (dirección, pago) desde el almacenamiento local de checkout
        const storedData = localStorage.getItem(STORAGE_KEY_CHECKOUT);
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            checkoutData.selectedAddress = parsedData.selectedAddress || checkoutData.selectedAddress;
            checkoutData.selectedPayment = parsedData.selectedPayment || checkoutData.selectedPayment;
        }
    }
    
    // -------------------------------------------------------------------------
    // NAVEGACIÓN Y REDIRECCIONES
    // -------------------------------------------------------------------------

    /**
     * Navega a la siguiente página del checkout (o a la anterior).
     * @param {string} stepKey Clave de la página de destino (resumen_compra, domicilio, etc.).
     * @param {boolean} useReplace Usar window.location.replace() para romper el historial.
     */
    function navigateToStep(stepKey, useReplace = false) {
        if (!STEP_PAGES[stepKey]) {
            console.error(`Paso de checkout desconocido: ${stepKey}`);
            return;
        }
        
        // La URL de destino es relativa a la carpeta /compra/
        const url = STEP_PAGES[stepKey];

        if (useReplace) {
            window.location.replace(url);
        } else {
            window.location.href = url;
        }
    }

    /**
     * Simula la finalización de la compra.
     */
    function finalizePurchase(event) {
        event.preventDefault();

        // 1. SIMULACIÓN DE ÉXITO Y LIMPIEZA
        // (Aquí iría la llamada al backend real para guardar el pedido)

        // Limpiamos el carrito simulado
        localStorage.removeItem(STORAGE_KEY); 
        
        // Opcional: Limpiar el estado de checkout guardado
        localStorage.removeItem(STORAGE_KEY_CHECKOUT); 

        // 2. MOSTRAR MODAL DE ÉXITO
        const modal = document.getElementById('compra-success-modal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }


    // -------------------------------------------------------------------------
    // INICIALIZACIÓN Y LISTENERS
    // -------------------------------------------------------------------------

    /**
     * Adjunta todos los listeners de navegación (siguiente, anterior, finalizar).
     */
    function attachCheckoutListeners() {
        // Botones Siguiente y Anterior
        document.querySelectorAll('.btn-next-step').forEach(btn => {
            btn.onclick = () => navigateToStep(btn.getAttribute('data-next-step'));
        });

        document.querySelectorAll('.btn-prev-step').forEach(btn => {
            btn.onclick = () => navigateToStep(btn.getAttribute('data-prev-step'));
        });

        // Botón Cancelar Compra (desde resumen_compra.html)
        const cancelBtn = document.querySelector('.btn-cancel-checkout');
        if (cancelBtn) {
             // Redirige al índice principal (sube dos niveles de /compra/ y /logeado/ a la raíz)
            cancelBtn.onclick = () => window.location.replace(INDEX_PAGE_URL);
        }
        
        // Botón Finalizar Compra (desde finalizar.html)
        const finalizeBtn = document.getElementById('btn-finalizar-compra');
        if (finalizeBtn) {
            finalizeBtn.onclick = finalizePurchase;
        }
        
        // Botón Aceptar del Modal de Éxito (redirige a la principal logeada después de la compra)
        const modalAcceptBtn = document.getElementById('btn-modal-compra-accept');
        if (modalAcceptBtn) {
            modalAcceptBtn.onclick = () => window.location.replace('../pagina_principal.html');
        }
        
        // Listener para la selección de dirección (Paso 2)
        document.querySelectorAll('input[name="delivery_address"]').forEach(input => {
            input.onchange = () => {
                checkoutData.selectedAddress = input.value;
                saveCheckoutData();
                // Desactiva la clase 'selected' de todos los hermanos
                document.querySelectorAll('.address-option').forEach(label => label.classList.remove('selected'));
                input.closest('.address-option').classList.add('selected');
            };
        });
        
        // Listener para la selección de método de pago (Paso 3)
        document.querySelectorAll('input[name="payment_method"]').forEach(input => {
            input.onchange = () => {
                checkoutData.selectedPayment = input.value;
                saveCheckoutData();
                // Desactiva la clase 'selected' de todos los hermanos
                document.querySelectorAll('.payment-option').forEach(label => label.classList.remove('selected'));
                input.closest('.payment-option').classList.add('selected');
            };
        });
    }

    /**
     * Función principal que se ejecuta al cargar la página.
     */
    function init() {
        loadCheckoutData();

        if (checkoutData.isCartEmpty && !window.location.pathname.includes(CART_PAGE_URL)) {
             // Si el carrito está vacío, redirigir al carrito para evitar el checkout
             alert("Tu carrito está vacío. Redirigiendo a la página del carrito.");
             window.location.replace(CART_PAGE_URL); 
             return;
        }
        
        // Renderizar el contenido dinámico del paso actual
        // (Aquí llamarías a funciones para renderizar la lista de productos/direcciones, etc.)
        
        attachCheckoutListeners();
        // Si necesitas forzar la visualización de totales en el resumen:
        // updateFinalSummary(); 
    }
    
    init();
});