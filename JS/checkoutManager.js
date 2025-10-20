document.addEventListener('DOMContentLoaded', () => {
    
    const STORAGE_KEY_CHECKOUT = 'laLechuzaCheckoutData';
    const CART_PAGE_URL = '../carrito.html'; 
    const INDEX_PAGE_URL = '../../../index.html';

    const STEP_PAGES = {
        resumen_compra: 'resumen_compra.html',
        direccion: 'domicilio.html',
        pago: 'pago.html',
        finalizar: 'finalizar.html'
    };

    let checkoutData = {
        selectedAddress: 'address1',
        selectedPayment: 'paypal',
        isCartEmpty: true,
        totals: {
            itemCount: 0,
            subtotal: 0.00,
            shipping: 'Gratis',
            total: 0.00
        }
    };

    if (typeof loadCart !== 'function' || typeof calculateTotals !== 'function') {
        console.error("ERROR: checkoutManager requiere loadCart y calculateTotals de cartManager.js.");
        return;
    }

    function saveCheckoutData() {
        localStorage.setItem(STORAGE_KEY_CHECKOUT, JSON.stringify(checkoutData));
    }

    function loadCheckoutData() {

        loadCart();
        checkoutData.totals = calculateTotals();
        checkoutData.isCartEmpty = checkoutData.totals.itemCount === 0;

        const storedData = localStorage.getItem(STORAGE_KEY_CHECKOUT);
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            checkoutData.selectedAddress = parsedData.selectedAddress || checkoutData.selectedAddress;
            checkoutData.selectedPayment = parsedData.selectedPayment || checkoutData.selectedPayment;
        }
    }
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

        const url = STEP_PAGES[stepKey];

        if (useReplace) {
            window.location.replace(url);
        } else {
            window.location.href = url;
        }
    }

    function finalizePurchase(event) {
        event.preventDefault();

        localStorage.removeItem(STORAGE_KEY); 

        localStorage.removeItem(STORAGE_KEY_CHECKOUT); 

        const modal = document.getElementById('compra-success-modal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    function attachCheckoutListeners() {

        document.querySelectorAll('.btn-next-step').forEach(btn => {
            btn.onclick = () => navigateToStep(btn.getAttribute('data-next-step'));
        });

        document.querySelectorAll('.btn-prev-step').forEach(btn => {
            btn.onclick = () => navigateToStep(btn.getAttribute('data-prev-step'));
        });

        const cancelBtn = document.querySelector('.btn-cancel-checkout');
        if (cancelBtn) {

            cancelBtn.onclick = () => window.location.replace(INDEX_PAGE_URL);
        }

        const finalizeBtn = document.getElementById('btn-finalizar-compra');
        if (finalizeBtn) {
            finalizeBtn.onclick = finalizePurchase;
        }

        const modalAcceptBtn = document.getElementById('btn-modal-compra-accept');
        if (modalAcceptBtn) {
            modalAcceptBtn.onclick = () => window.location.replace('../pagina_principal.html');
        }

        document.querySelectorAll('input[name="delivery_address"]').forEach(input => {
            input.onchange = () => {
                checkoutData.selectedAddress = input.value;
                saveCheckoutData();

                document.querySelectorAll('.address-option').forEach(label => label.classList.remove('selected'));
                input.closest('.address-option').classList.add('selected');
            };
        });

        document.querySelectorAll('input[name="payment_method"]').forEach(input => {
            input.onchange = () => {
                checkoutData.selectedPayment = input.value;
                saveCheckoutData();

                document.querySelectorAll('.payment-option').forEach(label => label.classList.remove('selected'));
                input.closest('.payment-option').classList.add('selected');
            };
        });
    }


    function init() {
        loadCheckoutData();

        if (checkoutData.isCartEmpty && !window.location.pathname.includes(CART_PAGE_URL)) {

             alert("Tu carrito está vacío. Redirigiendo a la página del carrito.");
             window.location.replace(CART_PAGE_URL); 
             return;
        }

        attachCheckoutListeners();

    }
    
    init();
});