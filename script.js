// Load iframe content and translate it
async function translateIframeContent() {
    const iframe = document.getElementById('myIframe');
    iframe.onload = async function() {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const text = iframeDoc.documentElement.textContent;

        try {
            const response = await fetch("https://libretranslate.com/translate", {
                method: "POST",
                body: JSON.stringify({
                    q: text,
                    source: "fa", // Persian
                    target: "ar", // Arabic
                    format: "text",
                    alternatives: 3,
                    api_key: ""
                }),
                headers: { "Content-Type": "application/json" }
            });

            if (response.ok) {
                const data = await response.json();
                const translatedText = data.translatedText;
                console.log(`Translated text: ${translatedText}`);
                iframeDoc.documentElement.innerHTML = translatedText;
            } else {
                console.error(`Error translating text: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Error translating text: ${error.message}`);
        }
    };
}

// Start the translation process
translateIframeContent();
