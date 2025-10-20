let currentPage = 1;
const totalPages = 68;
const MAX_PAGES_VISIBLE = 7;

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

        function loadProducts(page) {
        if (page < 1 || page > totalPages) return;

        currentPage = page;
        productsContainer.innerHTML = `
            <div class="loading-message">
                <h2>Cargando productos...</h2>
                <p>Simulación: Cargando página ${page} de la base de datos.</p>
            </div>
        `;

        setTimeout(() => {
            productsContainer.innerHTML = generateMockProducts(page);
            updatePaginationView();

            if (typeof initCartListeners === 'function') {
                initCartListeners(); 
            }
        }, 300);
    }
    
    function generateMockProducts(page) {

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
                    
                    <!-- INICIO DEL CÓDIGO DE BOTONES DE CARRITO -->
                    <div class="product-actions">
                        <button class="btn-primary btn-add-to-cart" data-product-id="${mockId}">
                            Añadir al Carrito
                        </button>
                        <button class="btn-secondary btn-buy-now">
                            Comprar
                        </button>
                    </div>
                    <!-- FIN DEL CÓDIGO DE BOTONES -->
                </div>
            `;
        }
        return html;
    }

    function calculatePaginationRange() {
        const pages = [];
        const delta = 2; 
        const start = Math.max(2, currentPage - delta);
        const end = Math.min(totalPages - 1, currentPage + delta);

        pages.push(1);
        if (start > 2) { pages.push('...'); }
        for (let i = start; i <= end; i++) {
            if (i !== 1 && i !== totalPages) { pages.push(i); }
        }
        if (end < totalPages - 1) { pages.push('...'); }
        if (totalPages > 1 && !pages.includes(totalPages)) { pages.push(totalPages); }
        
        const uniquePages = Array.from(new Set(pages));
        const finalPages = uniquePages.filter((p, index) => {
            if (p === '...' && uniquePages[index - 1] === 1) return false;
            return true;
        });
        return finalPages;
    }

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

    function handleCustomPageInput(span) {
        const input = document.createElement('input');
        input.type = 'number';
        input.min = 1;
        input.max = totalPages;
        input.value = span.getAttribute('data-page');
        input.className = 'custom-page-input';
        
        span.parentNode.replaceChild(input, span);
        input.focus();

        const finalizeInput = () => {
            const newPage = parseInt(input.value);
            if (!isNaN(newPage) && newPage >= 1 && newPage <= totalPages) {
                loadProducts(newPage);
            } else {
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


    function attachPaginationListeners() {
        document.querySelectorAll('.page-number').forEach(span => {
            const page = parseInt(span.getAttribute('data-page'));
            
            span.addEventListener('click', () => {
                loadProducts(page);
            });
            
            if (page === totalPages) {
                 span.addEventListener('dblclick', () => handleCustomPageInput(span));
            }
        });

        if (prevBtn) prevBtn.onclick = () => loadProducts(currentPage - 1);
        if (nextBtn) nextBtn.onclick = () => loadProducts(currentPage + 1);

        if (prevBtn) prevBtn.disabled = currentPage === 1;
        if (nextBtn) nextBtn.disabled = currentPage === totalPages;
    }

    loadProducts(1);
});