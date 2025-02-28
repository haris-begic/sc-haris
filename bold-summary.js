function updatePriceDisplay() {
    document.querySelectorAll("select").forEach(function (selectElement) {
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        const priceMatch = selectedOption.text.match(/\[\+£([0-9.,]+)\]/);

        let priceDisplay = selectElement.parentElement.querySelector(".price-display");
        if (!priceDisplay) {
            priceDisplay = document.createElement("span");
            priceDisplay.classList.add("price-display");
            priceDisplay.style.display = "none";
            selectElement.parentElement.appendChild(priceDisplay);
        }

        if (priceMatch) {
            const price = priceMatch[1];
            priceDisplay.textContent = `+£${price}`;
            priceDisplay.style.display = "inline-block";
        } else {
            priceDisplay.textContent = "";
            priceDisplay.style.display = "none";
        }
    });

    document.querySelectorAll("input[type='checkbox']").forEach(function (checkboxElement) {
        if (checkboxElement.checked) {
            const labelElement = checkboxElement.closest("label");
            if (!labelElement) return;

            const priceMatch = labelElement.textContent.match(/\[\+£([0-9.,]+)\]/);

            let priceDisplay = labelElement.querySelector(".price-display");
            if (!priceDisplay) {
                priceDisplay = document.createElement("span");
                priceDisplay.classList.add("price-display");
                priceDisplay.style.display = "none";
                labelElement.appendChild(priceDisplay);
            }

            if (priceMatch) {
                const price = priceMatch[1];
                priceDisplay.textContent = `+£${price}`;
                priceDisplay.style.display = "inline-block";
            } else {
                priceDisplay.textContent = "";
                priceDisplay.style.display = "none";
            }
        }
    });
}

function createGrandTotalDisplay() {
    const boldOptionTotalElement = document.querySelector(".bold_option_total");
    if (boldOptionTotalElement && !document.querySelector(".grand-total-display")) {
        const grandTotalDisplay = document.createElement("span");
        grandTotalDisplay.classList.add("grand-total-display");
        grandTotalDisplay.textContent = "Grand total: £0.00"; // Initial placeholder text
        boldOptionTotalElement.appendChild(grandTotalDisplay);
    }
}

function updateGrandTotal() {
    const priceElement = document.querySelector("input[name='properties[_boldVariantPrices]']");
    const priceCurrentElement = document.querySelector(".price__current");
    const grandTotalDisplay = document.querySelector(".grand-total-display");

    let grandTotal = 0;

    // Add base price from .price__current
    if (priceCurrentElement && priceCurrentElement.textContent) {
        const basePrice = parseFloat(
            priceCurrentElement.textContent
                .replace('£', '')
                .replace(',', '')
        );
        if (!isNaN(basePrice)) {
            grandTotal += basePrice;
        }
    }

    // Add prices from input[name='properties[_boldVariantPrices]']
    if (priceElement && priceElement.value) {
        const prices = priceElement.value.split(',').map(price => parseFloat(price) / 100);
        grandTotal += prices.reduce((sum, price) => sum + price, 0);
    }

    if (grandTotalDisplay) {
        grandTotalDisplay.textContent = `Grand total: £${grandTotal.toFixed(2)}`;
    }
}

const observePriceElement = () => {
    const priceElement = document.querySelector("input[name='properties[_boldVariantPrices]']");
    if (priceElement) {
        const priceObserver = new MutationObserver(() => {
            updateGrandTotal();
        });

        priceObserver.observe(priceElement, { attributes: true, attributeFilter: ['value'] });
    }
};

const boldOptionTotalObserver = new MutationObserver(function (mutations, observer) {
    const boldOptionTotalElement = document.querySelector(".bold_option_total");
    if (boldOptionTotalElement) {
        createGrandTotalDisplay();
        updateGrandTotal();
        observePriceElement(); // Ensure the price element is being observed
        observer.disconnect(); // Stop observing once the element is found and updated
    }
});

const boldOptionTotalElement = document.querySelector(".bold_option_total");
if (boldOptionTotalElement) {
    createGrandTotalDisplay();
    updateGrandTotal();
    observePriceElement(); // Observe price element directly
} else {
    boldOptionTotalObserver.observe(document.body, { childList: true, subtree: true });
}

document.querySelectorAll("select, input[type='checkbox']").forEach(function (element) {
    element.addEventListener("change", () => {
        updatePriceDisplay();
        updateGrandTotal();
    });
});

updatePriceDisplay();
updateGrandTotal();