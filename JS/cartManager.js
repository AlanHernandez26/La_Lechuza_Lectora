// Archivo: Js/cartManager.js
// Maneja el estado global del carrito (conteo), la visualización y la interacción en el catálogo.

// El carrito se almacena temporalmente en una variable global.
let cartItems = []; 
const CHECKOUT_PAGE_URL = 'proceso_de_compra.html'; 
const CART_PAGE_URL = 'carrito.html';

/**
 * Actualiza el badge de conteo en el header.
 */
function updateCartCount() {
    // Calculamos el número total de artículos
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const countElement = document.getElementById('cart-count');
    
    if (countElement) {
        countElement.textContent = totalItems;
        // Muestra u oculta el círculo de conteo
        countElement.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

/**
 * Añade un producto al carrito o incrementa su cantidad.
 * @param {string} productId ID único del producto.
 */
function addToCart(productId) {
    const itemIndex = cartItems.findIndex(item => item.id === productId);
    
    if (itemIndex > -1) {
        cartItems[itemIndex].quantity += 1;
    } else {
        // Simulación: Añadir nuevo producto
        cartItems.push({ id: productId, quantity: 1, price: 450 }); 
    }
    
    updateCartCount();
    console.log(`Carrito actualizado. Total de artículos: ${cartItems.length}`);
    alert(`¡Producto ${productId} añadido! Total en carrito: ${cartItems.length}`); // Usar modal en producción
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
            addToCart(productId);
        });
    });

    // 2. Listener en el ícono del header (Redirección a carrito.html)
    const cartHeaderButton = document.getElementById('cart-icon-btn');
    if (cartHeaderButton) {
        cartHeaderButton.addEventListener('click', () => {
             // Redirige a la página del carrito. Asume que está en /html/logeado/
             window.location.href = CART_PAGE_URL; 
        });
    }
    
    // 3. Listener en el botón "Comprar Ahora" (simula compra directa)
    document.querySelectorAll('.btn-buy-now').forEach(button => {
         button.addEventListener('click', () => {
             // Redirección a proceso_de_compra.html
             window.location.href = CHECKOUT_PAGE_URL; 
         });
    });
}

// Inicializa los listeners estáticos del header al cargar
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    initCartListeners();
});