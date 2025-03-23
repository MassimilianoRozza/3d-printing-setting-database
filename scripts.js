let globalData = []; // Store loaded data
const printerFilter = document.getElementById('printerFilter');
const materialFilter = document.getElementById('materialFilter');
const brandFilter = document.getElementById('brandFilter');
const settingsTable = document.getElementById('settingsTable');
const noDataMessage = document.getElementById('noDataMessage');
const darkModeToggle = document.getElementById('darkModeToggle');

// Dark mode initialization
function initDarkMode() {
    // Set dark mode as default if no preference is stored
    const isDarkMode = localStorage.getItem('darkMode') !== null 
        ? localStorage.getItem('darkMode') === 'true'
        : true;
    
    document.documentElement.classList.toggle('dark', isDarkMode);
    darkModeToggle.checked = isDarkMode;
}

function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
}

function clearFilters() {
    [printerFilter, materialFilter, brandFilter].forEach(filter => {
        while (filter.options.length > 1) {
            filter.remove(1);
        }
    });
}

function populateFilters(data) {
    const uniquePrinters = [...new Set(data.map(item => item.printer))].sort();
    const uniqueMaterials = [...new Set(data.map(item => item.material))].sort();
    const uniqueManufacturers = [...new Set(data.map(item => item.manufacturer))].sort();

    // Add printer categories
    const printerCategories = {
        'ALL Printers': printer => true,
        'ALL Klipper': printer => printer.toUpperCase().includes('K1'),
        'ALL Ender': printer => printer.toUpperCase().includes('ENDER')
    };

    // Clear and populate printer filter
    while (printerFilter.firstChild) {
        printerFilter.removeChild(printerFilter.firstChild);
    }

    // Add default printer option
    const defaultPrinterOption = document.createElement('option');
    defaultPrinterOption.value = '';
    defaultPrinterOption.textContent = 'Select Printer';
    printerFilter.appendChild(defaultPrinterOption);

    // Add printer categories and items
    Object.entries(printerCategories).forEach(([categoryName, matcher]) => {
        const matchingPrinters = uniquePrinters.filter(matcher);
        
        if (matchingPrinters.length > 0) {
            // Add category option
            const categoryOption = document.createElement('option');
            categoryOption.value = `category_${categoryName}`;
            categoryOption.textContent = categoryName;
            printerFilter.appendChild(categoryOption);

            // Add individual printers
            matchingPrinters.forEach(printer => {
                const option = document.createElement('option');
                option.value = printer;
                option.textContent = `└ ${printer}`;
                printerFilter.appendChild(option);
            });
        }
    });

    // Material categories based on keywords
    const materialCategories = {
        'ALL PLA': material => material.toUpperCase().includes('PLA'),
        'ALL PETG': material => material.toUpperCase().includes('PETG'),
        'ALL ABS': material => material.toUpperCase().includes('ABS'),
        'ALL ASA': material => material.toUpperCase().includes('ASA'),
        'ALL TPU': material => material.toUpperCase().includes('TPU')
    };

    // Manufacturer categories based on brands
    const manufacturerCategories = {
        'ALL Manufacturers': manufacturer => true  // matches all manufacturers
    };

    // Clear and populate material filter
    while (materialFilter.firstChild) {
        materialFilter.removeChild(materialFilter.firstChild);
    }

    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'All Materials';
    materialFilter.appendChild(defaultOption);

    // Add material categories
    Object.entries(materialCategories).forEach(([categoryName, matcher]) => {
        const matchingMaterials = uniqueMaterials.filter(matcher);
        
        if (matchingMaterials.length > 0) {
            // Add category option
            const categoryOption = document.createElement('option');
            categoryOption.value = `category_${categoryName}`;
            categoryOption.textContent = categoryName;
            materialFilter.appendChild(categoryOption);

            // Add individual materials
            matchingMaterials.forEach(material => {
                const option = document.createElement('option');
                option.value = material;
                option.textContent = `└ ${material}`;
                materialFilter.appendChild(option);
            });
        }
    });

    // Add other materials that don't match any category
    const otherMaterials = uniqueMaterials.filter(material => 
        !Object.values(materialCategories).some(matcher => matcher(material))
    );

    if (otherMaterials.length > 0) {
        const otherGroup = document.createElement('optgroup');
        otherGroup.label = 'Other Materials';
        
        otherMaterials.forEach(material => {
            const option = document.createElement('option');
            option.value = material;
            option.textContent = material;
            materialFilter.appendChild(option);
        });
    }

    // Clear and populate manufacturer filter
    while (brandFilter.firstChild) {
        brandFilter.removeChild(brandFilter.firstChild);
    }

    // Add default manufacturer option
    const defaultManufacturerOption = document.createElement('option');
    defaultManufacturerOption.value = '';
    defaultManufacturerOption.textContent = 'Select Manufacturer';
    brandFilter.appendChild(defaultManufacturerOption);

    // Add manufacturer categories and items
    Object.entries(manufacturerCategories).forEach(([categoryName, matcher]) => {
        const matchingManufacturers = uniqueManufacturers.filter(matcher);
        
        if (matchingManufacturers.length > 0) {
            // Add category option
            const categoryOption = document.createElement('option');
            categoryOption.value = `category_${categoryName}`;
            categoryOption.textContent = categoryName;
            brandFilter.appendChild(categoryOption);

            // Add individual manufacturers
            matchingManufacturers.forEach(manufacturer => {
                const option = document.createElement('option');
                option.value = manufacturer;
                option.textContent = `└ ${manufacturer}`;
                brandFilter.appendChild(option);
            });
        }
    });

    // Update filterData function to handle all categories
    window.filterData = function(data) {
        const selectedPrinter = printerFilter.value;
        const selectedMaterial = materialFilter.value;
        const selectedManufacturer = brandFilter.value;

        return data.filter(item => {
            // Handle printer categories
            let matchesPrinter = !selectedPrinter || item.printer === selectedPrinter;
            if (selectedPrinter.startsWith('category_')) {
                const categoryName = selectedPrinter.replace('category_', '');
                matchesPrinter = printerCategories[categoryName]?.(item.printer) || false;
            }
            
            // Handle material categories
            let matchesMaterial = !selectedMaterial || item.material === selectedMaterial;
            if (selectedMaterial.startsWith('category_')) {
                const categoryName = selectedMaterial.replace('category_', '');
                matchesMaterial = materialCategories[categoryName]?.(item.material) || false;
            }

            // Handle manufacturer categories
            let matchesManufacturer = !selectedManufacturer || item.manufacturer === selectedManufacturer;
            if (selectedManufacturer.startsWith('category_')) {
                const categoryName = selectedManufacturer.replace('category_', '');
                matchesManufacturer = manufacturerCategories[categoryName]?.(item.manufacturer) || false;
            }

            return matchesPrinter && matchesMaterial && matchesManufacturer;
        });
    };

    // Populate other filters
    [
        { element: printerFilter, values: uniquePrinters },
        { element: brandFilter, values: uniqueManufacturers }
    ].forEach(({ element, values }) => {
        // Keep first option (All...)
        const firstOption = element.firstChild;
        element.innerHTML = '';
        element.appendChild(firstOption);

        values.forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            element.appendChild(option);
        });
    });
}

function displayTable(data) {
    const filteredData = filterData(data);
    const tbody = settingsTable.querySelector('tbody');
    tbody.innerHTML = '';

    if (filteredData.length === 0) {
        noDataMessage.classList.remove('hidden');
        settingsTable.classList.add('hidden');
        return;
    }

    noDataMessage.classList.add('hidden');
    settingsTable.classList.remove('hidden');

    filteredData.forEach(item => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50';
        
        const fields = [
            'printer',
            'manufacturer',
            'material',
            'color',
            'diameter_mm',
            'nozzle_temp_first_layer_c',
            'nozzle_temp_c',
            'bed_type',
            'bed_temp_first_layer_c',
            'bed_temp_c',
            'flowrate',
            'pressure_advance',
            'max_mm3_s',
            'retraction_mm',
            'tested'
        ];

        fields.forEach(field => {
            const td = document.createElement('td');
            td.className = 'px-4 py-2';
            
            // Special handling for tested field
            if (field === 'tested') {
                td.textContent = item[field] || '❌';
                td.className += ' text-center text-xl'; // Make emoji bigger and centered
            } else {
                td.textContent = item[field] || '-';
            }
            
            row.appendChild(td);
        });

        tbody.appendChild(row);
    });
}

async function fetchData() {
    try {
        const manifestResponse = await fetch('data-manifest.json');
        if (!manifestResponse.ok) throw new Error('Manifest not found');
        
        const manifest = await manifestResponse.json();
        
        // Fetch all JSON files listed in manifest
        const fetchPromises = manifest.files.map(async file => {
            try {
                const response = await fetch(file);
                if (!response.ok) throw new Error(`Failed to load ${file}`);
                return response.json();
            } catch (error) {
                console.warn(`Error loading ${file}:`, error);
                return [];
            }
        });

        const results = await Promise.all(fetchPromises);
        globalData = results.flat();
        
        clearFilters();
        populateFilters(globalData);
        displayTable(globalData);
    } catch (error) {
        console.error('Error fetching data:', error);
        noDataMessage.textContent = 'Error loading data. Please try again later.';
        noDataMessage.classList.remove('hidden');
        settingsTable.classList.add('hidden');
    }
}

function handleFilterChange() {
    displayTable(globalData);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    fetchData();
});

darkModeToggle.addEventListener('change', toggleDarkMode);

[printerFilter, materialFilter, brandFilter].forEach(filter => {
    filter.addEventListener('change', handleFilterChange);
});