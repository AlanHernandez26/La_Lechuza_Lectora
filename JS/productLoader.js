// Archivo: Js/productLoader.js
// Maneja la carga simulada de productos y la funcionalidad de paginación avanzada.

let currentPage = 1;
const totalPages = 68;
const MAX_PAGES_VISIBLE = 7; // Número máximo de páginas mostradas en la barra

document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');
    const paginationContainer = document.querySelector('.carousel-nav.catalog-pagination');

    if (!productsContainer || !paginationContainer) {
        console.error("No se encontraron los contenedores de productos o paginación.");
        return;
    }
    
    const prevBtn = paginationContainer.querySelector('#prev-page-btn');
    const nextBtn = paginationContainer.querySelector('#next-page-btn');
    const paginationDiv = paginationContainer.querySelector('.pagination');

    // --- FUNCIONES DE CARGA Y SIMULACIÓN ---

    function loadProducts(page) {
        if (page < 1 || page > totalPages) return;

        currentPage = page;
        productsContainer.innerHTML = `
            <div class="loading-message">
                <h2>Cargando productos...</h2>
                <p>Simulación: Cargando página ${page} de la base de datos.</p>
            </div>
        `;
        
        // Simulación de delay de carga
        setTimeout(() => {
            productsContainer.innerHTML = generateMockProducts(page);
            updatePaginationView();
        }, 300);
    }
    
    function generateMockProducts(page) {
        // (Usamos la función que ya tienes para generar tarjetas mock)
        let html = '';
        const itemsPerPage = 12;
        const start = (page - 1) * itemsPerPage;
        
        for (let i = 0; i < itemsPerPage; i++) {
            const mockId = start + i + 1;
            html += `
                <div class="book-product-card">
                    <span class="book-tag-grid" style="background-color: var(--color-secondary);">Oferta</span>
                    <img src="../../Imagenes/mock_portada${(mockId % 5) + 1}.jpg" alt="Libro #${mockId}"> 
                    <p class="book-title-grid">Título Simulado del Libro #${mockId}</p>
                    <div class="rating-small">
                        <i class="fa-solid fa-star"></i> 4.${(mockId % 9)}
                    </div>
                    <span class="book-price-grid">$${(399 + mockId * 5)}</span>
                </div>
            `;
        }
        return html;
    }
    
    // --- LÓGICA AVANZADA DE PAGINACIÓN ---

    /**
     * Calcula el rango de páginas a mostrar (ej: 3, 4, [5], 6, 7).
     */
    function calculatePaginationRange() {
        const range = [];
        const middle = Math.floor(MAX_PAGES_VISIBLE / 2);

        let startPage = Math.max(2, currentPage - middle);
        let endPage = Math.min(totalPages - 1, currentPage + middle);

        // Ajuste para el inicio: si estamos cerca del final, llenamos el rango
        if (endPage - startPage < MAX_PAGES_VISIBLE - 3) {
            startPage = Math.max(2, endPage - (MAX_PAGES_VISIBLE - 3));
        }

        // Ajuste para el final
        if (startPage === 2 && endPage < MAX_PAGES_VISIBLE - 1) {
             endPage = Math.min(totalPages - 1, MAX_PAGES_VISIBLE - 1);
        }

        // 1. Añadir la página 1 (siempre)
        range.push(1);

        // 2. Añadir '...' al inicio
        if (startPage > 2) {
            range.push('...');
        }

        // 3. Añadir el rango intermedio
        for (let i = startPage; i <= endPage; i++) {
            range.push(i);
        }

        // 4. Añadir '...' al final
        if (endPage < totalPages - 1) {
            range.push('...');
        }
        
        // 5. Añadir la última página (si no está ya incluida)
        if (!range.includes(totalPages)) {
             range.push(totalPages);
        }
        
        return Array.from(new Set(range.filter(p => p !== '...')));
    }

    /**
     * Reconstruye y actualiza visualmente la paginación.
     */
    function updatePaginationView() {
        const pages = calculatePaginationRange();
        let html = '';
        
        pages.forEach(p => {
            if (p === '...') {
                html += `<span class="page-ellipsis">...</span>`;
            } else {
                const isActive = (p == currentPage) ? 'active' : '';
                html += `<span class="page-number ${isActive}" data-page="${p}">${p}</span>`;
            }
        });

        paginationDiv.innerHTML = html;
        attachPaginationListeners();
    }

    /**
     * Maneja la entrada de página personalizada al hacer doble clic en el último número.
     */
    function handleCustomPageInput(span) {
        const input = document.createElement('input');
        input.type = 'number';
        input.min = 1;
        input.max = totalPages;
        input.value = currentPage;
        input.className = 'custom-page-input';
        
        // Reemplaza el span por el input
        span.parentNode.replaceChild(input, span);
        input.focus();

        const finalizeInput = () => {
            const newPage = parseInt(input.value);
            if (!isNaN(newPage) && newPage >= 1 && newPage <= totalPages) {
                loadProducts(newPage);
            } else {
                // Si la entrada es inválida, simplemente recargamos la vista actual
                updatePaginationView();
            }
        };

        input.addEventListener('blur', finalizeInput);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                finalizeInput();
            }
        });
    }


    /**
     * Adjunta los listeners de click a todos los elementos de paginación.
     */
    function attachPaginationListeners() {
        // Clicks en números de página
        document.querySelectorAll('.page-number').forEach(span => {
            span.addEventListener('click', () => {
                const page = parseInt(span.getAttribute('data-page'));
                loadProducts(page);
            });
            
            // Doble Clic en el último número para entrada personalizada
            if (parseInt(span.getAttribute('data-page')) === totalPages) {
                 span.addEventListener('dblclick', () => handleCustomPageInput(span));
            }
        });

        // Clicks en Previous/Next
        if (prevBtn) prevBtn.onclick = () => loadProducts(currentPage - 1);
        if (nextBtn) nextBtn.onclick = () => loadProducts(currentPage + 1);

        // Actualizar el estado disabled de los botones
        if (prevBtn) prevBtn.disabled = currentPage === 1;
        if (nextBtn) nextBtn.disabled = currentPage === totalPages;
    }

    // --- INICIALIZACIÓN ---
    loadProducts(1);
});