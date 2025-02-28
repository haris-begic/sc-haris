const productElement = document.querySelector('.js-product-inventory-data');

const productId = productElement ? productElement.getAttribute('data-product-id') : null;
const shopDomain = 'fws-rushking.myshopify.com';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpc3N1ZXJfbmFtZSIsImF1ZCI6ImNsaWVudCIsInRva2VuX25hbWUiOiJUZXN0IGtleSIsInNob3BfaWQiOjE2MTE5NSwiY3JlYXRlX3RpbWUiOiIyMDI0LTA3LTE1IDEwOjMwOjI3ICswMDAwIn0.3SPL3v2A8EQar-FhX334dmp_diBKA78yYtS4IyBUSIg'; // token
const apiUrl = `https://productoption.hulkapps.com/v1/products/?product_id=${productId}&shop_domain=${shopDomain}`;

const monitoredElements = []; // declare monitoredElements array
let totalQuantity = 0; // declare totalQuantity variable
let nonOneTimeChargeOptions = []; // to store non-one-time charge options

// API fetch
const fetchProductOptions = async () => {
try {
    const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
    }
    });
    
    if (!response.ok) {
    throw new Error(`Error fetching product options, status: ${response.status}`);
    }

    const data = await response.json();
    return data.relationship.options;
    
} catch (error) {
    console.error('API call failed:', error.message);
    return [];
}
};

// Observe and push elements
function observeElement(element) {
monitoredElements.push(element);

const observer = new MutationObserver(() => {
    logSelectedOptions(); // Log options when the value changes
});

observer.observe(element, { attributes: true, attributeFilter: ['value'] });
}

// input elements to be monitored
document.querySelectorAll('.hulkapps_option_value input[type="hidden"]').forEach(input => {
const classes = input.classList;

// check for specific classes in the input elements
if (
    classes.contains('other_options_prop_val') ||
    classes.contains('hulkapps_option_child') ||
    classes.contains('hulk_dropdown_hidden_prop') ||
    classes.contains('hulk_opt_prop')
) {
    observeElement(input); // Monitor the input
}
});

// reinvented wheel omitting dynamic .product__price element
function getPriceForQuantity(totalQuantity) {
    let basePrice = 0;

    // get all quantity thresholds from .row-1
    const quantityThresholds = [...document.querySelectorAll('.price-chart .row-1.cell')].map(cell => parseInt(cell.textContent.trim(), 10));

    // get all corresponding prices from .row-2
    const prices = [...document.querySelectorAll('.price-chart .row-2.cell')].map(cell => parseFloat(cell.textContent.replace(/[^\d.]/g, '').trim()));

    // handle cases where the quantity is below the first threshold
    if (totalQuantity < quantityThresholds[0]) {
        basePrice = prices[0]; // Use the first price
        return basePrice;
    }

    // loop through the quantity thresholds to find the matching price range
    for (let i = 0; i < quantityThresholds.length; i++) {
        const minQuantity = quantityThresholds[i];
        const maxQuantity = quantityThresholds[i + 1] || Infinity; // If it's the last range, assume infinity as max

        // Check if totalQuantity falls within the current range
    
        if (totalQuantity >= minQuantity && totalQuantity < maxQuantity) {
            basePrice = prices[i]; // Assign base price from the correct range
            break;
        }

    // Changed approach to find the appropriate price bracket - 29 October '24
        // if (totalQuantity < quantityThresholds[0]) {
        //   basePrice = prices[0];
        // } else if (totalQuantity >= quantityThresholds[quantityThresholds.length - 1]) {
        //   basePrice = prices[quantityThresholds.length - 1];
        // } else {
        //   let val = quantityThresholds.filter((threshold, i) => totalQuantity >= threshold && totalQuantity < quantityThresholds[(i + 1)]);
        //   let price = prices[quantityThresholds.indexOf(val[0])];
        //   basePrice = price;
        // }
    }

    console.log('base ' + basePrice);
    return basePrice;
}

// calculate the final price based on size and total quantity
function calculateFinalPrice(totalQuantity, sizeExtras = 0) {
    let basePrice = getPriceForQuantity(totalQuantity);

    const finalPrice = basePrice + sizeExtras;

    // return the final price
    return finalPrice;
}

// handle single total quantity scenario
function handleCustomQuantity() {
const customQuantityInput = document.querySelector('.js-qty__num--custom');
if (customQuantityInput) {
    totalQuantity = parseInt(customQuantityInput.value, 10) || 0;
    customQuantityInput.addEventListener('input', function () {
    totalQuantity = parseInt(this.value, 10) || 0;
    logSelectedOptions(); // Recalculate and log on input change
    });
}
}

// Function to log and display selected options
async function logSelectedOptions() {
    const productOptions = await fetchProductOptions(); // Fetch options via API
    totalQuantity = 0;
    let sizeExtras = 0;
    nonOneTimeChargeOptions = [];
    const sizesData = [];

    if (!document.querySelector('.hulk_multi_qty_main')) {
        // If there's no multiple quantity selector, use custom quantity input
        const customQuantityInput = document.querySelector('.js-qty__num--custom');
        if (customQuantityInput) {
            totalQuantity = parseInt(customQuantityInput.value, 10) || 0;
            customQuantityInput.addEventListener('input', function () {
                totalQuantity = parseInt(this.value, 10) || 0; 
                logSelectedOptions();
            });
        }

        if (totalQuantity === 0) {
            totalQuantity = 1; // Default to 1 if no quantity is provided
        }

        // Handle the display for a single custom quantity scenario
        sizesData.push({
            size: 'Quantity',
            pricePerPiece: getPriceForQuantity(totalQuantity),
            quantity: totalQuantity
        });
    } else {
        // Calculate total cumulative quantity first
        let totalSizeQuantity = 0;
        monitoredElements.forEach(input => {
            const optionName = input.name ? input.name.replace(/^properties\[(.*)\]$/, '$1') : 'Unknown Option';
            const optionValue = input.value.trim();

            if (optionValue && optionName === 'Sizes') {
                const sizes = optionValue.split(',').map(sizeStr => sizeStr.trim());

                sizes.forEach(sizeStr => {
                    const sizeDetails = sizeStr.match(/(.+?)\s*(?:\[\s*\$\s*(\d+(?:\.\d{2})?)\s*\])?\s*\|\s*(\d+)/);

                    if (sizeDetails) {
                        const quantity = parseInt(sizeDetails[3].trim(), 10);
                        totalSizeQuantity += quantity; // Accumulate total quantity
                    }
                });
            }
        });

        // Determine base price using total cumulative quantity
        const basePrice = getPriceForQuantity(totalSizeQuantity);
        console.log(`Total Quantity: ${totalSizeQuantity}, Base Price: $${basePrice}`); // Debug log

        // Process sizes with consistent base price
        monitoredElements.forEach(input => {
            const optionName = input.name ? input.name.replace(/^properties\[(.*)\]$/, '$1') : 'Unknown Option';
            const optionValue = input.value.trim();
        
            if (optionValue && optionName === 'Sizes') {
                const sizes = optionValue.split(',').map(sizeStr => sizeStr.trim());
        
                // Step 1: Calculate total cumulative quantity first
                let totalSizeQuantity = 0;
                sizes.forEach(sizeStr => {
                    const sizeDetails = sizeStr.match(/(.+?)\s*(?:\[\s*\$\s*(\d+(?:\.\d{2})?)\s*\])?\s*\|\s*(\d+)/);
                    if (sizeDetails) {
                        const quantity = parseInt(sizeDetails[3].trim(), 10);
                        totalSizeQuantity += quantity; // Accumulate total quantity
                    }
                });
        
                // Step 2: Calculate the base price once using total cumulative quantity
                const basePrice = getPriceForQuantity(totalSizeQuantity);
                console.log(`Total Quantity: ${totalSizeQuantity}, Base Price: $${basePrice}`); // Debug log
        
                // Step 3: Process each size with the consistent base price
                sizes.forEach(sizeStr => {
                    const sizeDetails = sizeStr.match(/(.+?)\s*(?:\[\s*\$\s*(\d+(?:\.\d{2})?)\s*\])?\s*\|\s*(\d+)/); 
                    if (sizeDetails) {
                        const size = sizeDetails[1].trim(); // Capture size name
                        const extraPrice = sizeDetails[2] ? parseFloat(sizeDetails[2]) : 0; // Capture extra price
                        const quantity = parseInt(sizeDetails[3].trim(), 10); // Capture quantity
        
                        console.log(`Size: ${size}, Base Price: $${basePrice}, Extra: $${extraPrice}, Quantity: ${quantity}`); // Debug log
        
                        // Push size details to sizesData array
                        sizesData.push({
                            size: size,
                            pricePerPiece: basePrice + extraPrice,
                            quantity: quantity
                        });
        
                        totalQuantity += quantity; // Update total quantity globally
                        sizeExtras += extraPrice; // Accumulate extra charges
                    }
                });
            }
        });

    }

    // Process other options
    monitoredElements.forEach(input => {
        const optionName = input.name ? input.name.replace(/^properties\[(.*)\]$/, '$1') : 'Unknown Option';
        const optionValue = input.value.trim();

        if (optionValue && optionName !== 'Sizes') {
            const matchedOption = productOptions.find(option => option.option_name === optionName);
            const isOneTimeCharge = matchedOption ? matchedOption.is_one_time_charge : false;
            const priceMatch = optionValue.match(/\[\s*\$\d+(\.\d{2})?\s*\]/);
            const price = priceMatch ? parseFloat(priceMatch[0].replace(/[\[\]$]/g, '').trim()) : 0;

            if (price) {
                nonOneTimeChargeOptions.push({
                    name: optionName,
                    price: price,
                    isOneTimeCharge: isOneTimeCharge
                });
            }
        }
    });

    // Update the UI with calculated data
    updateSizesTable(sizesData);
    updateOptionsList(nonOneTimeChargeOptions);
    const finalPrice = calculateFinalPrice(totalQuantity, sizeExtras);
    updateGrandTotal(finalPrice * totalQuantity);
}


// update the Sizes table
function updateSizesTable(sizesData) {
    const sizesContainer = document.querySelector('.sizes-container');
    if (!document.querySelector('.hulk_multi_qty_main')) {
    sizesContainer.innerHTML = `
    <table class="sizes-table">
        <tr>
            <th>Size</th>
            <th>Price/piece</th>
            <th>Quantity</th>
            <th>Price</th>
        </tr>
        ${sizesData.map(size => `
            <tr>
                <td>${size.size}</td>
                <td>$${size.pricePerPiece.toFixed(2)}</td>
                <td>${size.quantity}</td>
                <td class="hulk-price">$${(size.pricePerPiece * size.quantity).toFixed(2)}</td>
            </tr>
        `).join('')}
    </table>
    `;
    }
    else {
    sizesContainer.innerHTML = `
    <table class="sizes-table">
        <tr>
            <th>Size</th>
            <th>Price/piece</th>
            <th>Quantity</th>
            <th>Price</th>
        </tr>
        ${sizesData.map(size => `
            <tr>
                <td>${size.size}</td>
                <td>$${size.pricePerPiece.toFixed(2)}</td>
                <td>${size.quantity}</td>
                <td class="hulk-price">$${(size.pricePerPiece * size.quantity).toFixed(2)}</td>
            </tr>
        `).join('')}
            <tr>
            <td colspan="2">Total</td>
            <td>${sizesData.reduce((sum, size) => sum + size.quantity, 0)}</td>
            <td class="hulk-total-price">$${sizesData.reduce((sum, size) => sum + size.pricePerPiece * size.quantity, 0).toFixed(2)}</td>
        </tr>
    </table>
    `;
    }
}

// update the Options list
function updateOptionsList(optionsData) {
    const optionsContainer = document.querySelector('.option-container');
    optionsContainer.innerHTML = optionsData.map(option => {
        const calculatedPrice = option.isOneTimeCharge ? option.price : option.price * totalQuantity;
        return `
            <div class="option-item">
                <div class="hulk-option">${option.name} ${option.isOneTimeCharge ? '' : `($${option.price}/piece)`}</div>
                <div class="hulk-price">$${calculatedPrice.toFixed(2)}</div>
            </div>
        `;
    }).join('');
}

function updateGrandTotal() {
    let grandTotalElement = document.querySelector('.grand-total .hulk-price');

    const totalPrice = Array.from(document.querySelectorAll('.hulk-price'))
        .filter(priceElement => !priceElement.closest('.grand-total')) // Exclude grand total itself
        .reduce((sum, priceElement) => {
            const price = parseFloat(priceElement.textContent.replace('$', '')) || 0;
            return sum + price;
        }, 0);

    // If the grand total element doesn't exist, create it
    if (!grandTotalElement) {
        const optionContainer = document.querySelector('.option-container');
        const shippingContainer = document.createElement('div');
        shippingContainer.classList.add('shipping-row', 'option-item')
        shippingContainer.innerHTML = '<div class="hulk-option">Shipping</div><div class="hulk-price">Additional shipping fee may apply</div>';
        const grandTotalContainer = document.createElement('div');
        grandTotalContainer.classList.add('grand-total', 'option-item');
        grandTotalContainer.innerHTML = `
            
            <div class="hulk-option">Total</div>
            <div class="hulk-price">$0.00</div>
        `;
        optionContainer.appendChild(shippingContainer);
        optionContainer.appendChild(grandTotalContainer);
        grandTotalElement = grandTotalContainer.querySelector('.hulk-price');
    }

    // Update the grand total with the calculated sum
    grandTotalElement.textContent = `$${totalPrice.toFixed(2)}`;
}

logSelectedOptions();



