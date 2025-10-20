
document.addEventListener('DOMContentLoaded', () => {

    const sidebar = document.getElementById('filter-sidebar');
    const toggleButton = document.getElementById('filter-toggle');
    const closeButton = document.getElementById('sidebar-close-btn');

    const priceRangeInput = document.getElementById('price-range-input');
    const priceMinDisplay = document.getElementById('price-min-display'); 
    const priceMaxDisplay = document.getElementById('price-max-display');

    const pagesRangeInput = document.getElementById('pages-range-input');
    const pagesMinDisplay = document.getElementById('pages-min-display');
    const pagesMaxDisplay = document.getElementById('pages-max-display');

    const filterOptions = document.querySelectorAll('.filter-options input[type="checkbox"], .filter-options input[type="radio"]');
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const activeFiltersContainer = document.getElementById('active-filters-tags');
    
    let activeFilters = {};

    function toggleSidebar() {
        sidebar.classList.toggle('active');
    }

    if (toggleButton) {
        toggleButton.addEventListener('click', toggleSidebar);
    }
    if (closeButton) {
        closeButton.addEventListener('click', toggleSidebar);
    }

    function updateRangeDisplay(input, minDisplay, maxDisplay, unit = '') {
        const minValue = parseInt(input.min);
        const currentValue = parseInt(input.value);
        
        minDisplay.textContent = `${minValue}${unit}`; 
        maxDisplay.textContent = `${currentValue}${unit}`;

        updateActiveFilters();
    }

    if (priceRangeInput) {
        priceRangeInput.addEventListener('input', () => {
            updateRangeDisplay(priceRangeInput, priceMinDisplay, priceMaxDisplay, '$');
        });

        updateRangeDisplay(priceRangeInput, priceMinDisplay, priceMaxDisplay, '$');
    }

    if (pagesRangeInput) {
        pagesRangeInput.addEventListener('input', () => {
            updateRangeDisplay(pagesRangeInput, pagesMinDisplay, pagesMaxDisplay, ' págs');
        });

        updateRangeDisplay(pagesRangeInput, pagesMinDisplay, pagesMaxDisplay, ' págs');
    }

    function updateActiveFilters() {
        activeFiltersContainer.innerHTML = '';
        activeFilters = {};

        filterOptions.forEach(input => {
            if (input.checked) {
                const filterValue = input.getAttribute('data-filter') || input.value;
                const filterKey = input.name || 'Generos';

                activeFilters[filterKey] = activeFilters[filterKey] || [];
                activeFilters[filterKey].push(filterValue);
            }
        });

        document.querySelectorAll('.color-swatch.selected').forEach(swatch => {
            const color = swatch.getAttribute('data-filter');
             activeFilters['Color'] = color;
        });

        const priceValue = parseInt(priceRangeInput ? priceRangeInput.value : priceRangeInput.max);
        if (priceRangeInput && priceValue < parseInt(priceRangeInput.max)) {
             activeFilters['Precio_Max'] = priceValue;
        }

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

        document.querySelectorAll('.active-filter i').forEach(closeIcon => {
            closeIcon.addEventListener('click', (e) => {
                const type = e.target.getAttribute('data-filter-type');
                const value = e.target.getAttribute('data-filter-value');

                if (type === 'Precio_Max') {
                    priceRangeInput.value = priceRangeInput.max; 
                } else if (type === 'Color') {
                     document.querySelector('.color-swatch.selected').classList.remove('selected');
                } else {

                     const checkbox = document.querySelector(`input[data-filter="${value}"]`);
                     if (checkbox) { checkbox.checked = false; }
                }

                updateActiveFilters(); 
            });
        });
    }

    filterOptions.forEach(input => {
        input.addEventListener('change', updateActiveFilters);
    });

    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', (e) => {

            colorSwatches.forEach(s => s.classList.remove('selected'));
            e.target.classList.add('selected');
            updateActiveFilters();
        });
    });

    updateActiveFilters();

});