// Wait for the iframe to load
document.getElementById('myIframe').onload = function() {
    // Get the iframe's content document
    var iframe = document.getElementById('myIframe');
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    
    // Find the specific element
    var targetElement = innerDoc.querySelector('.ant-col.ant-col-24.bg-[#EBECF2].pt-[16px].px-[16px].ant-col-rtl');
    
    // If the element exists
    if (targetElement) {
        // You could then manipulate this element, or extract its content
        console.log(targetElement.innerHTML);
        // To show only this element, you might remove all other content, but this is complex and generally not advisable
    }
};
