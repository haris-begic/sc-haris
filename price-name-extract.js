// Unique selector for getting to the element holding value and data-price attributes
document.querySelectorAll('.hulkapps_option_value .hulkapps_swatch_option .hulk_po_radio, .hulkapps_mswatch_option .hulkapps-tooltip div .hulk_po_checkbox').forEach((element) => {
    // Get the value attribute from the current .hulk_po_radio element
    const value = element.getAttribute('value');
    const price = element.getAttribute('data-price');
    // Create a new div element to display the value with innerHTML
    const valueDisplay = document.createElement('div');
    valueDisplay.innerHTML = `<div>${value}</div><b><div>$${price}</div></b>`;
    valueDisplay.style.marginTop = '10px';
    valueDisplay.style.fontSize = '14px';
    valueDisplay.style.textAlign = "center";
    // Append the new div right after the current .hulk_po_radio element
    element.parentNode.insertBefore(valueDisplay, element.nextSibling);
});
