// Product Page
function monitorCustomizationRequirement() {
    const targetElement = document.querySelector('.hulkapps_option_set');

    if (!targetElement) {
        console.error('Target element with class "custom-requirement" not found.');
        return;
    }

    const addToCartButton = document.getElementById('add-to-cart');
    if (!addToCartButton) {
        console.error('Add to Cart button not found.');
        return;
    }

    const observerCallback = () => {
        const customizationRequirementInput = document.querySelector('input[name="properties[Customisation Required?]"]');
        
        if (customizationRequirementInput) {
            const customizationRequirementValue = customizationRequirementInput.value;
            const requestQuoteButton = document.querySelector('.btn.hulk-quote');
            const customizationPosition = document.querySelector('input[name="properties[Customisation Position]"]');
              
            if (customizationRequirementValue == 'Yes') {
                addToCartButton.style.display = 'none';
                requestQuoteButton.style.display = 'block';
            } else {
                addToCartButton.style.display = '';
                requestQuoteButton.style.display = 'none';
            }
        }
    };

    const observer = new MutationObserver(observerCallback);

    const config = { childList: true, subtree: true, attributes: true };

    observer.observe(targetElement, config);

    observerCallback();
}

document.addEventListener("DOMContentLoaded", (event) => {
  setTimeout(()=> {
    monitorCustomizationRequirement();
  }, 1000);
    
});

function logImageSrc() {
    const productImageElement = document.querySelector('.product__image');

    if (productImageElement) {
        const imageElement = productImageElement.querySelector('.image');
        if (imageElement) {
            const imgElement = imageElement.querySelector('img');
            const imgSrc = imgElement ? imgElement.src : null;

            if (imgSrc) {
                console.log('Updated Image src URL:', imgSrc);

                const hiddenInput = document.querySelector('.cart-helper[name="properties[Color Image]"]');
                if (hiddenInput) {
                    hiddenInput.value = imgSrc;
                } else {
                    console.log('Hidden input not found.');
                }
            } else {
                console.log('No img found or no src available.');
            }
        } else {
            console.log('No .image element found inside .product__image.');
        }
    } else {
        console.log('No .product__image element found.');
    }
}

logImageSrc();

const productImageElement = document.querySelector('.product__image');

if (productImageElement) {
    const observer = new MutationObserver(() => {
        logImageSrc(); 
    });
    
    observer.observe(productImageElement, {
        childList: true,
        attributes: true,
        subtree: true
    });

} else {
    console.log('No .product__image element found to observe.');
}


const requestQuoteButton = document.querySelector('.btn.hulk-quote');
const popupOverlay = document.querySelector('.custom-popup-overlay');
const closeButton = document.querySelector('.custom-popup-close');

let hulk_flag_custom = 0;

requestQuoteButton.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (hulk_flag_custom === 0) {
        const validateObjectData = await validate_options(window.hulkapps.product_id);

        if (!validateObjectData) {
            console.warn('Validation failed. Modal will not open.');
            return;
        }

        hulk_flag_custom = 1;
        popupOverlay.style.display = 'flex';
        sendPropertiesToIframe();

        hulk_flag_custom = 0;
    }
});

closeButton.addEventListener('click', () => {
    popupOverlay.style.display = 'none';
});

popupOverlay.addEventListener('click', (event) => {
    if (event.target === popupOverlay) {
        popupOverlay.style.display = 'none';
    }
});

function sendPropertiesToIframe() {
    const iframe = document.getElementById('frame_g8v4tXX3OdiSl0cztwtukQ');

    if (!iframe) {
        console.error('Target iframe not found.');
        return;
    }

    const selectColour = document.querySelector('input[name="properties[Select Colour]"]')?.value || '';
    const prodQuantity = document.querySelector('input[name="quantity"]')?.value || '';
    const selectSize = document.querySelector('select[id="product-select-option-0"]')?.value || '';
    const personaliseColour = document.querySelector('input[name="properties[Personalise Colour]"]')?.value || '';
    const specifyColour = document.querySelector('input[name="properties[Specify a Colour]"]')?.value || '';
    const personaliseFont = document.querySelector('input[name="properties[Personalise Font]"]')?.value || '';
    const specifyFont = document.querySelector('input[name="properties[Specify a Font]"]')?.value || '';
    const customisationPosition = document.querySelector('input[name="properties[Customisation Position]"]')?.value || '';
    const additionalNotes = document.querySelector('input[name="properties[Add notes and information to help with your order:]"]')?.value || '';
    const hulkProduct = document.querySelector('h1.title[itemprop="name"]').textContent.trim();

    // Extract customer data from window.customerData
    const {
        customerName = '',
        customerEmail = '',
        customerPhone = '',
        customerAddress: addressObj = null,
        customerCompany = ''
    } = window.customerData || {};

console.log(customerCompany);

    // Format customer address (first line, city, and postal code)
    const customerAddress = addressObj
        ? `${addressObj.address1}, ${addressObj.city}, ${addressObj.zip}`
        : '';

    // Post message to the iframe
    iframe.contentWindow.postMessage({
        'hulk-color': selectColour,
        'hulk-product': hulkProduct,
        'hulk-quantity': prodQuantity,
        'hulk-size': selectSize,
        'hulk-per-colour': personaliseColour,
        'hulk-colour': specifyColour,
        'hulk-per-font': personaliseFont,
        'hulk-font': specifyFont,
        'hulk-position': customisationPosition,
        'hulk-note': additionalNotes,
        'hulk-name': customerName,
        'hulk-email': customerEmail,
        'hulk-phone': customerPhone,
        'hulk-address': customerAddress,
        'hulk-company': customerCompany,
    }, '*');
}

// Cart page
function updateColorImageURLs() {
    const rows = document.querySelectorAll('tbody tr[data-hulkapps-lineitem]');

    rows.forEach((row) => {
        const smallElement = row.querySelector('td.item small');

        if (smallElement) {
            const smallText = smallElement.textContent;

            const colorImageMatch = smallText.match(/Color Image:\s*(https?:\/\/[^\s<]+)/);

            if (colorImageMatch && colorImageMatch[1]) {
                const colorImageURL = colorImageMatch[1];

                const standardImage = row.querySelector('.image .standard');

                if (standardImage) {
                    standardImage.setAttribute('src', colorImageURL);
                } else {
                    console.log('No .standard image found in this row.');
                }
            } else {
                console.log('No Color Image URL found in this row.');
            }
        } else {
            console.log('No <small> element found in this row.');
        }
    });
}

updateColorImageURLs();

document.addEventListener("DOMContentLoaded", (event) => {
    document.querySelectorAll("small").forEach((smallElement) => {
        const content = smallElement.innerHTML;
        const regex = /Color Image:\s*https:\/\/[^\s<]+/g; // Regex to match "Color Image: [URL]"
        
        if (regex.test(content)) {
            // Replace all occurrences of "Color Image: [URL]" with an empty string
            smallElement.innerHTML = content.replace(regex, "").replace(/<br>\s*Color Image:.*?<br>/g, "");
        }
    });
});

// Form Code
window.addEventListener('message', (event) => {

    // Mapping of classes to data keys
    const mappings = {
        'hulk-quantity': 'hulk-quantity',
        'hulk-product': 'hulk-product',
        'hulk-size': 'hulk-size',
        'hulk-per-colour': 'hulk-per-colour',
        'hulk-colour': 'hulk-colour',
        'hulk-per-font': 'hulk-per-font',
        'hulk-font': 'hulk-font',
        'hulk-position': 'hulk-position',
        'hulk-note': 'hulk-note',
        'hulk-name': 'hulk-name',
        'hulk-email': 'hulk-email',
        'hulk-address': 'hulk-address',
        'hulk-company': 'hulk-company',
    };

    // Populate each element in the iframe with the received data
    for (const [className, key] of Object.entries(mappings)) {
        if (event.data[key]) {
            const targetElement = document.querySelector(`.${className}`);
            
            if (targetElement) {
                console.log(`Populating element with class "${className}" with value "${event.data[key]}"`);
                
                if (targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA') {
                    targetElement.value = event.data[key];
                } else {
                    targetElement.textContent = event.data[key];
                }
            } else {
                console.error(`Element with class "${className}" not found in iframe.`);
            }
        } else {
            console.warn(`No data found for key "${key}"`);
        }
    }
    // Special case: Handle 'hulk-phone' using name attribute
    if (event.data['hulk-phone']) {
        const phoneElement = document.querySelector('[name="Phone Number"]');
        
        if (phoneElement) {
            
            if (phoneElement.tagName === 'INPUT' || phoneElement.tagName === 'TEXTAREA') {
                phoneElement.value = event.data['hulk-phone'];
            } else {
                phoneElement.textContent = event.data['hulk-phone'];
            }
        }
    }
});