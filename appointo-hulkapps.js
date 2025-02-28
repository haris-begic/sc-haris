/* 

INTEGRATION with Appointo Booking App
Along with some specifics for the prices of the business

Appointo custom count as a line-item property for custom hours (counted from the app)

*/
let count = 0;

function updateCount() {
    count = 0;

    // Count Bathrooms (update from 0.75 to 0.5)
    const properties = document.querySelectorAll('input[type="hidden"][name^="properties["]');
    properties.forEach(input => {
        const value = input.value;
        if (value) { // Ensure value is non-empty
            // Match the value pattern "N [ $X.XX ]"
            const match = value.match(/^(\d+) \[ \$\d+\.\d{2} \]$/);
            if (match) {
                const quantity = parseInt(match[1], 10);
                if (!isNaN(quantity) && quantity > 0) {
                    // Bathrooms counted as 0.5 each
                    if (input.name.includes('Bathroom')) {
                        count += quantity * 0.5;
                    } else {
                        count += quantity * 0.75; // Default rate for others
                    }
                }
            }
        }
    });

    // Count Additional Services (update from 0.75 to 1, excluding Bring Cleaning Detergents)
    const additionalServicesInput = document.querySelector('input[name="properties[Additional services]"]');
    if (additionalServicesInput) {
        const additionalServices = additionalServicesInput.value.split(',')
            .map(service => service.trim())
            .filter(service => service !== '' && !service.includes('Bring Cleaning Detergents [ $15.00 ]'));
        
        count += additionalServices.length * 1;
    }

    // Update duration value in minutes
    const counterElement = document.querySelector('[name="properties[_appointo_duration]"]');
    if (counterElement) {
        counterElement.value = count * 45; // Convert to 45 minutes per quantity
    }

    console.log('Updated count (in minutes):', count * 45);
}

function handleInputChange() {
    setTimeout(updateCount, 50);
}

// Set up a MutationObserver to watch for changes in properties
const propertiesContainer = document.querySelector('.hulkapps_option_set');
if (propertiesContainer) {
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.target.name.startsWith('properties[')) {
                handleInputChange();
            }
        }
    });

    // Start observing the propertiesContainer for attribute changes
    observer.observe(propertiesContainer, {
        attributes: true,
        attributeFilter: ['value'],
        subtree: true,
    });
}

const additionalServicesInput = document.querySelector('input[name="properties[Additional services]"]');
if (additionalServicesInput) {
    additionalServicesInput.addEventListener('change', handleInputChange);
}

updateCount();


// Function to update the duration in .appointo-duration, .hulk-duration, and the hidden input element
function updateDurationText() {
    const durationElement = document.querySelector('input[name="properties[_appointo_duration]"]');
    const appointoDurationTextElement = document.querySelector('.appointo-duration');
    const hulkDurationElement = document.querySelector('.hulk-duration');
    const hiddenDurationInput = document.querySelector('input[name="properties[Duration]"].hulk_radiobutton_hidden_prop');

    const phoneNumberElement = document.getElementById('appointo-phone-number');

    if (phoneNumberElement) {
        phoneNumberElement.value = '+961';
        
        const optionElement = phoneNumberElement.querySelector('option[value="961"]');
        if (optionElement) {
            optionElement.selected = true;
        }
    }

    if (durationElement && appointoDurationTextElement) {
        const durationInMinutes = parseInt(durationElement.value, 10);
        const durationInHours = (durationInMinutes / 60);
        const formattedDuration = `${durationInHours} hours`;

        appointoDurationTextElement.childNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.includes("hours")) {
                node.textContent = formattedDuration;

                if (hulkDurationElement) {
                    hulkDurationElement.textContent = formattedDuration;
                }

                if (hiddenDurationInput) {
                    hiddenDurationInput.value = formattedDuration;
                }
            }
        });
    }
}

// Function to handle the logic when the #appointo-next button is found
function handleAppointoNextButton() {
    const appointoNextButton = document.querySelector('#appointo-next');
    
    if (appointoNextButton) {
        appointoNextButton.addEventListener('click', function() {
            observeAppointoDuration();
        });
    }
}

// Set up a MutationObserver to watch for the .appointo-duration element
function observeAppointoDuration() {
    const appointoDurationObserver = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const appointoDurationTextElement = document.querySelector('.appointo-duration');
                if (appointoDurationTextElement) {
                    updateDurationText();
                    observer.disconnect(); // Stop observing after the element is found and updated
                    break;
                }
            }
        }
    });

    // Start observing the document body for changes
    appointoDurationObserver.observe(document.body, { childList: true, subtree: true });
}

// Set up the MutationObserver to watch for the #appointo-next button
const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            const appointoNextButton = document.querySelector('#appointo-next');
            if (appointoNextButton) {
                handleAppointoNextButton();
                observer.disconnect(); // Stop observing after the button is found
                break;
            }
        }
    }
});

// Start observing the document body for changes
observer.observe(document.body, { childList: true, subtree: true });

document.querySelectorAll('.radio_div').forEach(element => {
    element.textContent = element.textContent.replace(/\s*\(.*?\)/g, '');
});