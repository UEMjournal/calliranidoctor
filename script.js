// Load iframe content and translate it
async function translateIframeContent() {
    const iframe = document.getElementById('myIframe');
    iframe.onload = async function() {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const text = iframeDoc.documentElement.textContent;

        // Create a hidden div to hold the translated text
        const hiddenDiv = document.createElement('div');
        hiddenDiv.style.display = 'none';
        document.body.appendChild(hiddenDiv);

        // Translate the text using Google Translate
        hiddenDiv.innerHTML = `
            <script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
            <script>
                function googleTranslateElementInit() {
                    new google.translate.TranslateElement({pageLanguage: 'auto', layout: google.translate.TranslateElement.FloatPosition.TOP_LEFT}, 'google_translate_element');
                }
            </script>
            <div id="google_translate_element"></div>
            <script>
                googleTranslateElementInit();
                function translateText() {
                    var textToTranslate = document.getElementById('text-to-translate').textContent;
                    var targetLang = 'ar'; // Arabic
                    var sourceLang = 'fa'; // Persian
                    var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURIComponent(textToTranslate);
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', url, true);
                    xhr.onload = function() {
                        if (xhr.status === 200) {
                            var response = JSON.parse(xhr.responseText);
                            document.getElementById('text-to-translate').textContent = response[0][0][0];
                        }
                    };
                    xhr.send();
                }
                translateText();
            </script>
            <p id="text-to-translate">${text}</p>
        `;

        // Wait for the translation to complete
        await new Promise(resolve => {
            const intervalId = setInterval(() => {
                const translatedText = document.querySelector('#text-to-translate').textContent;
                if (translatedText && translatedText!== text) {
                    clearInterval(intervalId);
                    resolve(translatedText);
                }
            }, 100);
        });

        // Replace original content with translated content
        iframeDoc.documentElement.innerHTML = document.querySelector('#text-to-translate').textContent;

        // Remove the hidden div
        document.body.removeChild(hiddenDiv);
    };
}

// Start the translation process
translateIframeContent();
