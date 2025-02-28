// BOLD customization Collab with Demir P.
// Options grouped into three sections which are placed next to one another and slided into view when selected

const boldOptions = document.querySelector(".bold_options.bold_options_loaded");

const loader = document.createElement("div");
loader.className = "options-loader";
boldOptions.appendChild(loader);

window.addEventListener("load", () => {
    loader.style.display = "none";

    const optionSet = boldOptions.querySelector(".bold_option_set");
    optionSet.style.display = "block";
  
    // get DOM rendered options
    const optionsNodeList = optionSet.querySelectorAll(".bold_option");
    const options = Array.from(optionsNodeList);
    const optionsLen = options.length;

    // get BOLD object stored options to loop through and see which option belongs to which group
    const boldOptionsTemplate = BOLD.options.app.optionProducts[0].optionSets[0].options;

    // firstGroup includes options: shaft, flex, club length
    const firstGroup = document.createElement("div");
    firstGroup.classList.add("first-group", "bold-tabcontent");

    // secondGroup includes options: loft, lie
    const secondGroup = document.createElement("div");
    secondGroup.classList.add("second-group", "bold-tabcontent");

    // thirdGroup includes options: grip, color, size
    const thirdGroup = document.createElement("div");
    thirdGroup.classList.add("third-group", "bold-tabcontent");

    // stockGroup includes stock elements
    const stockGroup = document.createElement("div");
    stockGroup.classList.add("stock-group");

    // loop through BOLD object options and check which option belongs where
    // add DOM options to the appropriate group
    for (let i = 1; i < optionsLen; i++) {
        const boldInternalName = boldOptionsTemplate[i].fields.optionTitle.toLowerCase();
        if (!boldInternalName.includes("stock") && (boldInternalName.includes("shaft") || boldInternalName.includes("flex") || boldInternalName.includes("length"))) {
            firstGroup.appendChild(options[i]);
        } else if (!boldInternalName.includes("stock") && (boldInternalName.includes("loft") || boldInternalName.includes("lie"))) {
            secondGroup.appendChild(options[i]);
        } else if (!boldInternalName.includes("stock") && (boldInternalName.includes("grip") || boldInternalName.includes("color") || boldInternalName.includes("loft") || boldInternalName.includes("size"))) {
            thirdGroup.appendChild(options[i]);
        } else {
            stockGroup.appendChild(options[i]);
        }

        if (i === optionsLen - 1) {
            firstGroup.appendChild(createButton("Next", false, "second-group"));
            secondGroup.appendChild(createButton("Next", false, "third-group"));
            thirdGroup.appendChild(createButton("Add to Cart", false, "atc"));
        }
    }

    // Container for tab navigation buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add("bold-button-container");

    buttons.forEach(button => buttonContainer.appendChild(button));

    const customizeContainer = document.createElement("div");
    customizeContainer.classList.add("bold-customize-container");

    optionSet.appendChild(options[0]);
    customizeContainer.appendChild(buttonContainer);
    customizeContainer.appendChild(firstGroup);
    customizeContainer.appendChild(secondGroup);
    customizeContainer.appendChild(thirdGroup);
    customizeContainer.appendChild(stockGroup);
    optionSet.appendChild(customizeContainer);

    secondGroup.style.display = "none";
    thirdGroup.style.display = "none";

    // Radio buttons customization
    const radioContainer = optionSet.querySelector(".bold_option_radio .bold_option_element");
    const radioIndicator = document.createElement("div");
    radioIndicator.className = "radio-indicator";
    const selectedInput = optionSet.querySelector(".bold_option.bold_option_radio input:checked").value;
    radioIndicator.setAttribute("data-value", selectedInput);
    const stockLabel = radioContainer.querySelector("span:nth-child(1) > label");
    const customizeLabel = radioContainer.querySelector("span:nth-child(2) > label");
    if (selectedInput === "CUSTOMIZE") {
      radioIndicator.classList.add("right");
      customizeLabel.style.color = "#fff";
    }
    radioContainer.appendChild(radioIndicator);

    const stockRadio = optionSet.querySelector("[value='STOCK']");
    const customizeRadio = optionSet.querySelector("[value='CUSTOMIZE']");
    stockRadio.addEventListener("change", () => {
        radioIndicator.classList.remove("right");
        stockLabel.style.color = "#fff";
        customizeLabel.style.color = "#000";
        buttonContainer.style.display = "none";
        firstGroup.style.display = "none";
        secondGroup.style.display = "none";
        thirdGroup.style.display = "none";
        document.querySelector(".bold_clone").style.display = "block";
    });
    customizeRadio.addEventListener("change", () => {
        radioIndicator.classList.add("right");
        stockLabel.style.color = "#000";
        customizeLabel.style.color = "#fff";
        buttonContainer.style.display = "flex";
        openGroup("first-group");
        document.querySelector(".bold_clone").style.display = "none";
    });
});

const buttons = [
    createButton('Shaft/Flex/Length', true, 'first-group'),
    createButton('Loft/Lie', true, 'second-group'),
    createButton('Grip/Color/Size', true, 'third-group'),
];

function openGroup(groupName) {
    if (groupName === "atc") {
        const atc = document.querySelectorAll(`.bold-next-button`)[2];
        const atcBoldClone = document.querySelector(".bold_clone");
        if (!atcBoldClone.disabled) {
            atcBoldClone.click();
            const errors = document.querySelectorAll(".bold_error_message");
            const customErrorMessage = document.querySelector(".bold-custom-error");
            const errorMessage = document.createElement("div");
            if (errors.length > 0 && !customErrorMessage) {
                errorMessage.className = "bold-custom-error";
                errorMessage.textContent = "Please fill in the required fields";
                errorMessage.style.textAlign = "center";
                errorMessage.style.fontSize = "16px";
                errorMessage.style.color = "red";
                document.querySelector(".third-group.bold-tabcontent").appendChild(errorMessage);
            } else {
                atc.textContent = "Loading...";
            }
            
            return;
        } else {
            atc.textContent = "Sold out";
            return;
        }
    }

    const tabcontent = document.getElementsByClassName("bold-tabcontent");
    const buttons = document.getElementsByClassName("bold-tablink");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    for (i = 0; i < buttons.length; i++) {
        buttons[i].style.borderBottom = "5px solid rgba(0, 0, 0, 0)";
        buttons[i].style.fontWeight = "300";
    }

    document.querySelector(`.${groupName}`).style.display = "block";
    const selectedButton = document.querySelector(`[onclick="openGroup('${groupName}')"]`);
    selectedButton.style.borderBottom = "5px solid #c6a647";
    selectedButton.style.fontWeight = "900";
}

function createButton(label, isTab, groupName = "") {
    const button = document.createElement('button');
    button.type = "button";
    button.textContent = label;
    button.setAttribute('onclick', `openGroup('${groupName}')`);
    if (isTab) {
        button.className = 'bold-tablink';
    } else {
        button.className = "bold-next-button";
    }
    return button;
}

const selectElement = document.querySelector('select[name="properties[Select Shaft]"]');

// imageMap has many values, but left 3 as a placeholder
const imageMap = {
    "[Nippon Shaft] N.S. PRO 950GH - Recommended  (plus $0)": "https://cdn.shopify.com/s/files/1/0529/1448/7471/files/ns_pro_950gh_r.jpg?v=1734702481",
    "[Nippon Shaft] N.S. PRO 950GH neo": "https://cdn.shopify.com/s/files/1/0529/1448/7471/files/ns_pro_950gh_neo.jpg?v=1734702481",
    "[Nippon Shaft] N.S. PRO ZELOS 8": "https://cdn.shopify.com/s/files/1/0529/1448/7471/files/ns_pro_zero_8.jpg?v=1734702481",
};

const imageDiv = document.createElement('div');
imageDiv.id = 'selected-option-image';
selectElement.insertAdjacentElement('afterend', imageDiv);

function updateSelectedOptionImage() {
    const selectedOption = selectElement.querySelector('option[aria-selected="true"]');
    if (selectedOption) {
        const optionValue = selectedOption.getAttribute('value');
        const imageSrc = imageMap[optionValue];

        if (imageSrc) {
            imageDiv.innerHTML = `
                <img src="${imageSrc}" alt="Selected Shaft Image" style="height: auto">
            `;
        } else {
            imageDiv.innerHTML = `<p>No image available for the selected option: ${optionValue}</p>`;
        }
    } else {
        imageDiv.innerHTML = `<p>No option selected.</p>`;
    }
}

window.addEventListener("load", () => {

  const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
          if (mutation.type === "attributes" && mutation.attributeName === "aria-selected") {
              updateSelectedOptionImage();
          }
      });
  });
  
  selectElement.querySelectorAll('option').forEach((option) => {
      observer.observe(option, { attributes: true });
  });
  setTimeout(()=>{
    updateSelectedOptionImage();
  }, 300);
  

});