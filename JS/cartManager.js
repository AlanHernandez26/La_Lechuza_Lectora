// Archivo: Js/cartManager.js
// Maneja el estado global del carrito, la persistencia (localStorage), el renderizado en carrito.html, y los cálculos de totales.

let cartItems = []; 
// Rutas de Checkout (asumimos que la carpeta 'compra' está dentro de 'logeado')
const CHECKOUT_START_URL = 'compra/resumen_compra.html'; 
const CART_PAGE_URL = 'carrito.html'; 
const STORAGE_KEY = 'laLechuzaLectoraCart'; 

// -------------------------------------------------------------------------
// PERSISTENCIA Y UTILIDADES
// -------------------------------------------------------------------------

function saveCart() {
    // Guarda el estado actual en localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
}

function loadCart() {
    // Carga el estado guardado al iniciar la página
    const storedCart = localStorage.getItem(STORAGE_KEY);
    if (storedCart) {
        cartItems = JSON.parse(storedCart);
    }
}

/**
 * Calcula el subtotal (suma de precio * cantidad) y los totales finales.
 */
function calculateTotals() {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingCost = 0; // Costo de envío simulado (Gratis)
    const total = subtotal + shippingCost;

    return {
        subtotal: subtotal.toFixed(2),
        shipping: shippingCost === 0 ? 'Gratis' : shippingCost.toFixed(2),
        total: total.toFixed(2),
        itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
    };
}


// -------------------------------------------------------------------------
// MANIPULACIÓN DEL CARRITO (Añadir/Quitar/Actualizar)
// -------------------------------------------------------------------------

/**
 * Actualiza el badge de conteo en el header.
 */
function updateCartCount() {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const countElement = document.getElementById('cart-count');
    
    if (countElement) {
        countElement.textContent = totalItems;
        countElement.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

/**
 * Añade un producto al carrito.
 */
function addToCart(productId, buyNow = false) {
    loadCart(); 
    
    // LÓGICA DE COMPRA DIRECTA: Si es Compra Directa, limpiamos el carrito antes
    if (buyNow) {
        cartItems = []; 
    }

    const itemIndex = cartItems.findIndex(item => item.id === productId);
    
    if (itemIndex > -1) {
        cartItems[itemIndex].quantity += 1;
    } else {
        // Simulación: Añadir nuevo producto (Datos mock necesarios para el renderizado del carrito)
        cartItems.push({ 
            id: productId, 
            quantity: 1, 
            price: 450, // Precio simulado
            name: `Libro Simulado #${productId}`,
            image: `../../Imagenes/mock_portada${(productId % 5) + 1}.jpg` // Ruta mock
        }); 
    }
    
    saveCart();
    updateCartCount();
    
    // Si es compra directa, redirigimos al checkout inmediatamente
    if (buyNow) {
        startCheckout();
    }
}

/**
 * Actualiza la cantidad de un producto o lo elimina.
 */
function updateItemQuantity(productId, newQuantity) {
    const itemIndex = cartItems.findIndex(item => item.id === productId);

    if (itemIndex > -1) {
        if (newQuantity <= 0) {
            // Eliminar producto si la cantidad es 0 o menos
            cartItems.splice(itemIndex, 1);
        } else {
            cartItems[itemIndex].quantity = newQuantity;
        }
        
        saveCart();
        updateCartCount();

        // Si estamos en la página del carrito, forzamos la recarga de la vista
        if (window.location.pathname.includes(CART_PAGE_URL)) {
             renderCart();
        }
    }
}

/**
 * Elimina un producto completamente.
 */
function removeItem(productId) {
    const initialLength = cartItems.length;
    cartItems = cartItems.filter(item => item.id !== productId);
    
    if (cartItems.length < initialLength) {
        saveCart();
        updateCartCount();
        if (window.location.pathname.includes(CART_PAGE_URL)) {
             renderCart();
        }
    }
}


// -------------------------------------------------------------------------
// RENDERIZADO Y FLUJO DE COMPRA
// -------------------------------------------------------------------------

/**
 * Genera el HTML de una sola tarjeta de producto en el carrito (Usado en carrito.html).
 */
function generateCartItemHTML(item) {
    const itemTotal = (item.price * item.quantity).toFixed(2);
    
    return `
        <div class="cart-item" data-product-id="${item.id}">
            <img src="${item.image}" alt="Portada de ${item.name}">
            <div class="item-details">
                <h2>${item.name}</h2>
                <p>Precio unitario: $${item.price.toFixed(2)}</p>
                <div class="item-quantity-controls">
                    <button class="btn-qty-control btn-minus" data-id="${item.id}">-</button>
                    <span class="item-quantity-display">${item.quantity}</span>
                    <button class="btn-qty-control btn-plus" data-id="${item.id}">+</button>
                </div>
                <button class="btn-remove" data-id="${item.id}">Quitar del carrito</button>
            </div>
            <span class="item-price total-item-price">$${itemTotal}</span>
        </div>
    `;
}

/**
 * Renderiza todos los elementos del carrito y actualiza los totales en carrito.html.
 */
function renderCart() {
    const container = document.getElementById('cart-items-container');
    const totals = calculateTotals();

    if (!container) return;

    if (cartItems.length === 0) {
        container.innerHTML = '';
        document.getElementById('empty-cart-message').style.display = 'block';
    } else {
        document.getElementById('empty-cart-message').style.display = 'none';
        container.innerHTML = cartItems.map(generateCartItemHTML).join('');
        attachCartPageListeners();
    }

    // Actualizar Totales del Resumen
    const totalItemsDisplay = document.getElementById('total-items-display');
    if (totalItemsDisplay) totalItemsDisplay.textContent = totals.itemCount;
    
    const subtotalDisplay = document.getElementById('subtotal-display');
    if (subtotalDisplay) subtotalDisplay.textContent = `$${totals.subtotal}`;
    
    const shippingDisplay = document.getElementById('shipping-display');
    if (shippingDisplay) shippingDisplay.textContent = totals.shipping;
    
    const totalDisplay = document.getElementById('total-display');
    if (totalDisplay) totalDisplay.textContent = `$${totals.total}`;
}

/**
 * Adjunta listeners para los botones de cantidad y remover en la página del carrito.
 */
function attachCartPageListeners() {
    // Botones de Cantidad (+)
    document.querySelectorAll('.btn-plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            const item = cartItems.find(i => i.id === id);
            if (item) { updateItemQuantity(id, item.quantity + 1); }
        });
    });
    
    // Botones de Cantidad (-)
    document.querySelectorAll('.btn-minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            const item = cartItems.find(i => i.id === id);
            if (item) { updateItemQuantity(id, item.quantity - 1); }
        });
    });
    
    // Botones de Remover Item
    document.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            removeItem(id);
        });
    });
}

/**
 * Redirige al primer paso del proceso de compra.
 */
function startCheckout() {
    if (cartItems.length > 0) {
        // Redirige a la subcarpeta 'compra'
        window.location.href = CHECKOUT_START_URL; 
    } else {
        alert("Tu carrito está vacío. Añade algunos libros antes de continuar.");
    }
}

/**
 * Inicializa los listeners específicos del carrito, incluyendo el botón de añadir/comprar
 * y el ícono de redirección en el header.
 */
function initCartListeners() {
    // 1. Listeners en las tarjetas de producto (Catálogo)
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.currentTarget.getAttribute('data-product-id');
            addToCart(productId, false); 
        });
    });

    // 2. Listener en el botón "Comprar Ahora" (simula compra directa)
    document.querySelectorAll('.btn-buy-now').forEach(button => {
         button.addEventListener('click', (e) => {
             const productId = e.currentTarget.getAttribute('data-product-id');
             addToCart(productId, true); // Compra Directa activa buyNow=true
         });
    });

    // 3. Listener en el ícono del header (Redirección a carrito.html)
    const cartHeaderButton = document.getElementById('cart-icon-btn');
    if (cartHeaderButton) {
        cartHeaderButton.addEventListener('click', () => {
             window.location.href = CART_PAGE_URL; 
        });
    }

    // 4. Listener en el botón "Continuar con la compra" (en carrito.html)
    const checkoutBtn = document.getElementById('btn-start-checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', startCheckout);
    }
}


// -------------------------------------------------------------------------
// INICIALIZACIÓN GLOBAL
// -------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // Carga el estado guardado
    loadCart();
    updateCartCount();
    
    // Inicializa listeners del Catálogo/Header 
    initCartListeners(); 

    // Si estamos en la página del carrito, renderizamos el contenido completo
    if (window.location.pathname.includes(CART_PAGE_URL)) {
         renderCart();
    }
    
    // Exportamos las funciones esenciales para que checkoutManager las use
    window.calculateTotals = calculateTotals;
    window.updateItemQuantity = updateItemQuantity;
    window.removeItem = removeItem;
    window.loadCart = loadCart;
});