
let cartItems = []; 

const CHECKOUT_START_URL = 'compra/resumen_compra.html'; 
const CART_PAGE_URL = 'carrito.html'; 
const STORAGE_KEY = 'laLechuzaLectoraCart'; 


function saveCart() {

    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
}

function loadCart() {

    const storedCart = localStorage.getItem(STORAGE_KEY);
    if (storedCart) {
        cartItems = JSON.parse(storedCart);
    }
}


function calculateTotals() {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingCost = 0;
    const total = subtotal + shippingCost;

    return {
        subtotal: subtotal.toFixed(2),
        shipping: shippingCost === 0 ? 'Gratis' : shippingCost.toFixed(2),
        total: total.toFixed(2),
        itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
    };
}


function updateCartCount() {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const countElement = document.getElementById('cart-count');
    
    if (countElement) {
        countElement.textContent = totalItems;
        countElement.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

function addToCart(productId, buyNow = false) {
    loadCart(); 
    

    if (buyNow) {
        cartItems = []; 
    }

    const itemIndex = cartItems.findIndex(item => item.id === productId);
    
    if (itemIndex > -1) {
        cartItems[itemIndex].quantity += 1;
    } else {

        cartItems.push({ 
            id: productId, 
            quantity: 1, 
            price: 450, 
            name: `Libro Simulado #${productId}`,
            image: `../../Imagenes/mock_portada${(productId % 5) + 1}.jpg`
        }); 
    }
    
    saveCart();
    updateCartCount();

    if (buyNow) {
        startCheckout();
    }
}

function updateItemQuantity(productId, newQuantity) {
    const itemIndex = cartItems.findIndex(item => item.id === productId);

    if (itemIndex > -1) {
        if (newQuantity <= 0) {

            cartItems.splice(itemIndex, 1);
        } else {
            cartItems[itemIndex].quantity = newQuantity;
        }
        
        saveCart();
        updateCartCount();

        if (window.location.pathname.includes(CART_PAGE_URL)) {
             renderCart();
        }
    }
}

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

    const totalItemsDisplay = document.getElementById('total-items-display');
    if (totalItemsDisplay) totalItemsDisplay.textContent = totals.itemCount;
    
    const subtotalDisplay = document.getElementById('subtotal-display');
    if (subtotalDisplay) subtotalDisplay.textContent = `$${totals.subtotal}`;
    
    const shippingDisplay = document.getElementById('shipping-display');
    if (shippingDisplay) shippingDisplay.textContent = totals.shipping;
    
    const totalDisplay = document.getElementById('total-display');
    if (totalDisplay) totalDisplay.textContent = `$${totals.total}`;
}

function attachCartPageListeners() {

    document.querySelectorAll('.btn-plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            const item = cartItems.find(i => i.id === id);
            if (item) { updateItemQuantity(id, item.quantity + 1); }
        });
    });
    

    document.querySelectorAll('.btn-minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            const item = cartItems.find(i => i.id === id);
            if (item) { updateItemQuantity(id, item.quantity - 1); }
        });
    });
    

    document.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            removeItem(id);
        });
    });
}

function startCheckout() {
    if (cartItems.length > 0) {

        window.location.href = CHECKOUT_START_URL; 
    } else {
        alert("Tu carrito está vacío. Añade algunos libros antes de continuar.");
    }
}

function initCartListeners() {

    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.currentTarget.getAttribute('data-product-id');
            addToCart(productId, false); 
        });
    });

    document.querySelectorAll('.btn-buy-now').forEach(button => {
         button.addEventListener('click', (e) => {
             const productId = e.currentTarget.getAttribute('data-product-id');
             addToCart(productId, true);
             





         });
    });

    const cartHeaderButton = document.getElementById('cart-icon-btn');
    if (cartHeaderButton) {
        cartHeaderButton.addEventListener('click', () => {
             window.location.href = CART_PAGE_URL; 
        });
    }

    const checkoutBtn = document.getElementById('btn-start-checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', startCheckout);
    }
}

document.addEventListener('DOMContentLoaded', () => {

    loadCart();
    updateCartCount();

    initCartListeners(); 

    if (window.location.pathname.includes(CART_PAGE_URL)) {
         renderCart();
    }

    window.calculateTotals = calculateTotals;
    window.updateItemQuantity = updateItemQuantity;
    window.removeItem = removeItem;
    window.loadCart = loadCart;
});