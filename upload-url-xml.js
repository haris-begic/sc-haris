let uploadedFileUrls = [];

(function(send) {
    XMLHttpRequest.prototype.send = function() {

        this.addEventListener('load', function() {
            try {
                let jsonResponse = JSON.parse(this.responseText);

                // Ensure jsonResponse is always treated as an array
                let fileArray = Array.isArray(jsonResponse) ? jsonResponse : [jsonResponse];

                fileArray.forEach(item => {
                    if (item.file?.url) {

                        if (!uploadedFileUrls.includes(item.file.url)) {
                            uploadedFileUrls.push(item.file.url);
                        }
                    }
                });

                if (uploadedFileUrls.length) {
                    // Find the latest input field dynamically
                    let lastInputField = $('input[id^="form_input_"]').last();

                    if (lastInputField.length) {
                        let existingValue = lastInputField.val().trim();

                        // Filter new URLs that aren't already in the input field
                        let newUrls = uploadedFileUrls.filter(url => !existingValue.includes(url));

                        if (newUrls.length) {
                            let updatedValue = existingValue ? existingValue + ', ' + newUrls.join(', ') : newUrls.join(', ');
                            lastInputField.val(updatedValue);
                        } 
                    } 
                } 
            } catch (e) {
                console.error('JSON Parsing Failed:', e);
            }
        });

        return send.apply(this, arguments);
    };
})(XMLHttpRequest.prototype.send);
