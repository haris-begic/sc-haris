// Limit to one swatch selecto to the entire set
var lastActiveSwatch = null;
var lastActiveHidden = null;

// ensure the most recent swatch has the 'swatch_selected' class
function enforceUniqueSwatch() {
  var activeSwatches = document.querySelectorAll('.hulk_po_radio.swatch_selected');
  activeSwatches.forEach(function(swatch) {
    if (swatch !== lastActiveSwatch) {
      swatch.classList.remove('swatch_selected');
    }
  });
}

// the most recent hidden input retains a non‑empty value
function enforceUniqueHidden() {
  var allHidden = document.querySelectorAll('.hulk_swatch_hidden_prop');
  allHidden.forEach(function(input) {
    if (input !== lastActiveHidden && input.value.trim() !== "") {
      input.value = "";
    }
  });
}

// MutationObserver for swatch elements (observing changes to the class attribute)
var swatchObserver = new MutationObserver(function(mutationsList) {
  enforceUniqueSwatch();
});
document.querySelectorAll('.hulk_po_radio').forEach(function(node) {
  swatchObserver.observe(node, { attributes: true, attributeFilter: ['class'] });
});

// MutationObserver for hidden inputs (observing changes to the value attribute)
var hiddenObserver = new MutationObserver(function(mutationsList) {
  enforceUniqueHidden();
});
document.querySelectorAll('.hulk_swatch_hidden_prop').forEach(function(node) {
  hiddenObserver.observe(node, { attributes: true, attributeFilter: ['value'] });
});

function initSwatchSelector() {
  var swatches = document.querySelectorAll('.hulk_po_radio');
  console.log("Swatch Debug: Found " + swatches.length + " swatches.");

  swatches.forEach(function(swatch) {
    swatch.addEventListener('click', function(e) {
      e.preventDefault();
      var optionContainer = swatch.closest('.hulkapps_option');
      // If the swatch is already selected, deselect it.
      if (swatch.classList.contains('swatch_selected')) {
        swatch.classList.remove('swatch_selected');
        if (optionContainer) {
          var hiddenInput = optionContainer.querySelector('.hulk_swatch_hidden_prop');
          if (hiddenInput) {
            hiddenInput.value = "";
            lastActiveHidden = null;
          }
        }
        lastActiveSwatch = null;
        return;
      }
      // Otherwise, update the container's hidden input and mark this swatch as active.
      if (optionContainer) {
        var groupSwatches = optionContainer.querySelectorAll('.hulk_po_radio');
        groupSwatches.forEach(function(item) {
          item.classList.remove('swatch_selected');
        });
        var hiddenInput = optionContainer.querySelector('.hulk_swatch_hidden_prop');
        if (hiddenInput) {
          hiddenInput.value = swatch.getAttribute('value');
          lastActiveHidden = hiddenInput;
        }
      }
      swatch.classList.add('swatch_selected');
      lastActiveSwatch = swatch;
      console.log("Swatch Debug: Active swatch set with value: " + swatch.getAttribute('value'));
    });
  });
}

// Ensure the DOM is fully loaded.
if (document.readyState === "complete" || document.readyState === "interactive") {
  setTimeout(initSwatchSelector, 0);
} else {
  document.addEventListener("DOMContentLoaded", initSwatchSelector);
}

