//Custom icons append and deselect option for radio options
const iconMapping = [
    { imageUrl: "https://cdn.shopify.com/s/files/1/0592/3569/6736/files/pillow-91234.png?v=1736914257", ariaLabel: "Quilt Cover" },
    { imageUrl: "https://cdn.shopify.com/s/files/1/0592/3569/6736/files/pillow-91234.png?v=1736914257", ariaLabel: "Colour" },
    { imageUrl: "https://cdn.shopify.com/s/files/1/0592/3569/6736/files/pillow-91234.png?v=1736914257", ariaLabel: "Fitted Sheet" },
    { imageUrl: "https://cdn.shopify.com/s/files/1/0592/3569/6736/files/pillow-91234.png?v=1736914257", ariaLabel: "Flat Sheet" },
    { imageUrl: "https://cdn.shopify.com/s/files/1/0592/3569/6736/files/pillow-91234.png?v=1736914257", ariaLabel: "Pillowcases" },
    { imageUrl: "https://cdn.shopify.com/s/files/1/0592/3569/6736/files/pillow-91234.png?v=1736914257", ariaLabel: "European Pillowcase" },
    { imageUrl: "https://cdn.shopify.com/s/files/1/0592/3569/6736/files/pillow-91234.png?v=1736914257", ariaLabel: "Duvet Cover" }
];

// Function to update icons
const updateIcons = () => {
    iconMapping.forEach(({ imageUrl, ariaLabel }) => {
        const targetElement = document.querySelector(`[aria-label="${ariaLabel}"]`);
        if (targetElement) {
            // Remove any existing image directly before the target element to avoid duplicates
            const existingImg = targetElement.previousElementSibling;
            if (existingImg?.tagName === "IMG") {
                existingImg.remove();
            }

            // Create a new img element for the icon
            const imgElement = document.createElement("img");
            imgElement.src = imageUrl;
            imgElement.alt = ariaLabel;
            imgElement.style.width = "20px";
            imgElement.style.height = "20px";

            // Insert the new image before the target element
            targetElement.parentNode.insertBefore(imgElement, targetElement);
        } 
    });
};

// Function to update option displays
const updateOptionDisplay = () => {
    const optionGroups = document.querySelectorAll(".hulkapps_option");
    optionGroups.forEach((group) => {
        const optionNameElement = group.querySelector(".hulkapps_option_name");
        const hiddenInput = group.querySelector("input.hulk_swatch_hidden_prop, input.hulk_button_hidden_prop, input.hulk_radiobutton_hidden_prop");

        if (optionNameElement && hiddenInput) {
            const selectedValue = hiddenInput.value;
            const priceMatch = selectedValue.match(/\[\s*\$(\d+(\.\d{1,2})?)\s*\]/);
            const price = priceMatch ? parseFloat(priceMatch[1]) : 0.0;

            let displaySpan = optionNameElement.querySelector(".selected-option-display");
            if (!displaySpan) {
                displaySpan = document.createElement("span");
                displaySpan.className = "selected-option-display";
                displaySpan.style.marginLeft = "10px";
                optionNameElement.appendChild(displaySpan);
            }

            const valueDisplay = selectedValue.split("[")[0].trim();
            displaySpan.textContent = ` ${valueDisplay || "Not selected"}, $${price.toFixed(2)}`;
        }
    });

    updateIcons();
};

// MO with debouncing
const container = document.querySelector(".hulkapps_option_set");
if (container) {
    let timeout;
    const observer = new MutationObserver(() => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            updateOptionDisplay();
            updateIcons();
        }, 100); // Debounce updates
    });
    observer.observe(container, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["value"]
    });
}

updateOptionDisplay();
