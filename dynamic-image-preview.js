<div class="image-preview">
    <img alt="Desert"
        src="https://cdn.shopify.com/s/files/1/0669/9709/2636/files/iPhone_16_Pro_Max_Desert_Titanium_PDP_Image_Position_1__GBEN_1.png?v=1726744419" />
    <img alt="Black"
        src="https://cdn.shopify.com/s/files/1/0669/9709/2636/files/iPhone_16_Pro_Max_Black_Titanium_PDP_Image_Position_1__GBEN_2.png?v=1726743435" />
    <img alt="Natural"
        src="https://cdn.shopify.com/s/files/1/0669/9709/2636/files/iPhone_16_Pro_Max_Natural_Titanium_PDP_Image_Position_1__GBEN.png?v=1726743395" />
    <img alt="White"
        src="https://cdn.shopify.com/s/files/1/0669/9709/2636/files/iPhone_16_Pro_Max_White_Titanium_PDP_Image_Position_1__GBEN.png?v=1726743394" />
    <img alt="Teal"
        src="https://cdn.shopify.com/s/files/1/0669/9709/2636/files/iPhone_16_Teal_PDP_Image_Position_1__WWEN.png?v=1726742626" />
    <img alt="Pink"
        src="https://cdn.shopify.com/s/files/1/0669/9709/2636/files/iPhone_16_Pink_PDP_Image_Position_1__WWEN.png?v=1726742589" />
    <img alt="Ultramarine"
        src="https://cdn.shopify.com/s/files/1/0669/9709/2636/files/iPhone_16_Teal_PDP_Image_Position_1__WWEN.png?v=1726742626" />
</div>

/*
JavaScript Functions:

Image Update Logic: The updateImage() function hides all images in the .image-preview container and then displays the image corresponding to the selected color.
*/


function updateImage(selectedColor) {
    document.querySelectorAll('.image-preview img').forEach(function(img) {
        img.style.display = 'none';
    });
    const matchingImage = document.querySelector(`.image-preview img[alt="${selectedColor}"]`);
    if (matchingImage) {
        matchingImage.style.display = 'block';
        // Display color name as an overlay
        const altText = matchingImage.getAttribute('alt');
        const textElement = document.createElement('div');
        textElement.textContent = altText + " Titanium";
        textElement.classList.add('text-overlay');
        // Append overlay text to the image preview container
        const imagePreview = document.querySelector('.image-preview');
        imagePreview.style.position = 'relative';
        imagePreview.appendChild(textElement);
    }
}

/* 
Event Listener for Color Selection: The script attaches event listeners to all radio button labels within the form, updating the displayed image when a new color is selected.
*/


document.querySelectorAll('.formElement_5 .radio-list > label').forEach(function(label) {
    label.addEventListener('click', function() {
        const selectedLabel = this.getAttribute('aria-label');
        updateImage(selectedLabel);
    });
});

/* 
Color Indicator for Radio Buttons: For each radio button, a rounded color indicator is generated based on the selected color's hex code.
*/


function colorNameToHex(color) {
    const colors = {
        "Black": "#000000",
        "White": "#FFFFFF",
        "Natural": "#B3A091",
        "Ultramarine": "#5865F2",
        "Teal": "#008080",
        "Pink": "#f5c6d9",
        "Desert": "#D1C0B8",
    };
    return colors[color] || '#000000';
}
document.querySelectorAll('.formElement_5 .radio-list > label').forEach(parentLabel => {
    const radioInput = parentLabel.querySelector('input[type="radio"]');
    if (radioInput) {
        const colorValue = radioInput.value;
        const hexColor = colorNameToHex(colorValue);
        const roundedColorElement = document.createElement('div');
        roundedColorElement.style.backgroundColor = hexColor;
        parentLabel.appendChild(roundedColorElement);
    }
});
