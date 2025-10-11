// Archivo: Js/filterSidebar.js
// Maneja la animación del sidebar de filtros y la lógica de actualización en tiempo real.

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. ELEMENTOS DEL DOM ---
    const sidebar = document.getElementById('filter-sidebar');
    const toggleButton = document.getElementById('filter-toggle');
    const closeButton = document.getElementById('sidebar-close-btn');
    
    // Elementos de Precio
    const priceRangeInput = document.getElementById('price-range-input');
    const priceMinDisplay = document.getElementById('price-min-display'); 
    const priceMaxDisplay = document.getElementById('price-max-display');

    // Elementos de Páginas
    const pagesRangeInput = document.getElementById('pages-range-input');
    const pagesMinDisplay = document.getElementById('pages-min-display');
    const pagesMaxDisplay = document.getElementById('pages-max-display');

    // Otros Filtros
    const filterOptions = document.querySelectorAll('.filter-options input[type="checkbox"], .filter-options input[type="radio"]');
    const colorSwatches = document.querySelectorAll('.color-swatch'); // Elementos de color
    const activeFiltersContainer = document.getElementById('active-filters-tags');
    
    let activeFilters = {}; // Objeto para almacenar todos los filtros activos {tipo: valor}

    // --- 2. LÓGICA DEL SIDEBAR (Para móvil y tablet) ---

    function toggleSidebar() {
        sidebar.classList.toggle('active');
    }

    if (toggleButton) {
        toggleButton.addEventListener('click', toggleSidebar);
    }
    if (closeButton) {
        closeButton.addEventListener('click', toggleSidebar);
    }
    
    // --- 3. LÓGICA DE ACTUALIZACIÓN DE RANGOS ---
    
    // Función genérica para actualizar rangos
    function updateRangeDisplay(input, minDisplay, maxDisplay, unit = '') {
        const minValue = parseInt(input.min);
        const currentValue = parseInt(input.value);
        
        minDisplay.textContent = `${minValue}${unit}`; 
        maxDisplay.textContent = `${currentValue}${unit}`;
        
        // Disparar la actualización global de filtros
        updateActiveFilters();
    }

    // Event Listeners para Precio
    if (priceRangeInput) {
        priceRangeInput.addEventListener('input', () => {
            updateRangeDisplay(priceRangeInput, priceMinDisplay, priceMaxDisplay, '$');
        });
        // Inicialización
        updateRangeDisplay(priceRangeInput, priceMinDisplay, priceMaxDisplay, '$');
    }
    
    // Event Listeners para Páginas
    if (pagesRangeInput) {
        pagesRangeInput.addEventListener('input', () => {
            updateRangeDisplay(pagesRangeInput, pagesMinDisplay, pagesMaxDisplay, ' págs');
        });
        // Inicialización
        updateRangeDisplay(pagesRangeInput, pagesMinDisplay, pagesMaxDisplay, ' págs');
    }


    // --- 4. LÓGICA DE FILTROS ACTIVOS (Visual y Objeto de Filtros) ---

    function updateActiveFilters() {
        activeFiltersContainer.innerHTML = ''; // Limpia los tags existentes
        activeFilters = {}; // Resetea el objeto de filtros

        // A. Recoger filtros de Checkboxes/Radio Buttons
        filterOptions.forEach(input => {
            if (input.checked) {
                const filterValue = input.getAttribute('data-filter') || input.value;
                const filterKey = input.name || 'Generos'; // Usa el nombre del input o 'Generos'
                
                // Simulación de agregación a objeto: Generos: [Terror, Fantasia], Edad: [JovenAdulto]
                activeFilters[filterKey] = activeFilters[filterKey] || [];
                activeFilters[filterKey].push(filterValue);
            }
        });
        
        // B. Recoger filtros de Colores
        document.querySelectorAll('.color-swatch.selected').forEach(swatch => {
            const color = swatch.getAttribute('data-filter');
             activeFilters['Color'] = color;
        });

        // C. Recoger filtro de Precio
        const priceValue = parseInt(priceRangeInput ? priceRangeInput.value : priceRangeInput.max);
        if (priceRangeInput && priceValue < parseInt(priceRangeInput.max)) {
             activeFilters['Precio_Max'] = priceValue;
        }

        // D. Generar Tags Visuales
        let visualTags = [];
        for (const key in activeFilters) {
            const values = Array.isArray(activeFilters[key]) ? activeFilters[key] : [activeFilters[key]];
            
            values.forEach(value => {
                 const tag = document.createElement('span');
                 tag.className = 'tag selected active-filter';
                 tag.innerHTML = `${value} <i class="fa-solid fa-xmark" data-filter-type="${key}" data-filter-value="${value}"></i>`;
                 activeFiltersContainer.appendChild(tag);
            });
        }
        
        console.log("Objeto de Filtros Activos:", activeFilters);

        // Volver a enlazar el evento de eliminación de tags (si haces clic en la X)
        document.querySelectorAll('.active-filter i').forEach(closeIcon => {
            closeIcon.addEventListener('click', (e) => {
                const type = e.target.getAttribute('data-filter-type');
                const value = e.target.getAttribute('data-filter-value');
                
                // Lógica de eliminación (Simulación)
                if (type === 'Precio_Max') {
                    priceRangeInput.value = priceRangeInput.max; // Resetea el slider al máximo
                } else if (type === 'Color') {
                     document.querySelector('.color-swatch.selected').classList.remove('selected'); // Deselecciona el color
                } else {
                     // Desmarca el checkbox asociado
                     const checkbox = document.querySelector(`input[data-filter="${value}"]`);
                     if (checkbox) { checkbox.checked = false; }
                }

                // Vuelve a cargar los filtros
                updateActiveFilters(); 
            });
        });
    }

    // --- 5. LISTENERS GLOBALES ---
    
    // Escucha el cambio en cualquier input de filtro
    filterOptions.forEach(input => {
        input.addEventListener('change', updateActiveFilters);
    });

    // Escucha el clic en los swatches de color
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', (e) => {
            // Lógica de selección única (deselecciona todos antes)
            colorSwatches.forEach(s => s.classList.remove('selected'));
            e.target.classList.add('selected');
            updateActiveFilters();
        });
    });

    // Inicializa los filtros al cargar
    updateActiveFilters();
    // Nota: Aquí se llamaría a la base de datos con los filtros actualizados
});