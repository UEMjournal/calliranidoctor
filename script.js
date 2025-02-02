// Load iframe content and translate it
async function translateIframeContent() {
    const iframe = document.getElementById('myIframe');
    iframe.onload = async function() {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const text = iframeDoc.documentElement.textContent;

        // Translate the text using LibreTranslate API
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

        const data = await response.json();
        const translatedText = data.translatedText;

        // Replace original content with translated content
        iframeDoc.documentElement.innerHTML = translatedText;
    };
}

// Start the translation process
translateIframeContent();
