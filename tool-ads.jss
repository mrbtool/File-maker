// tool-ads.js - Injects Top Banner and Bottom Native Ads
(function() {
    
    // --- 1. TOP AD: 320x50 Banner (Below Header) ---
    var topWrapper = document.createElement('div');
    topWrapper.id = 'top-banner-wrapper';
    topWrapper.style.cssText = 'width:100%; display:flex; justify-content:center; margin-top:15px; margin-bottom:10px; clear:both;';

    // Set options for the top banner
    window.atOptions = {
        'key' : 'c1d577c74875916be469e70c0be2a659',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
    };

    var topScript = document.createElement('script');
    topScript.type = 'text/javascript';
    topScript.src = 'https://summonteacherjunction.com/c1d577c74875916be469e70c0be2a659/invoke.js';

    // Insert top ad below header
    var headerElement = document.querySelector('header');
    if (headerElement) {
        headerElement.parentNode.insertBefore(topWrapper, headerElement.nextSibling);
    } else {
        document.body.prepend(topWrapper);
    }
    topWrapper.appendChild(topScript);


    // --- 2. BOTTOM AD: Native Container (End of Body) ---
    var bottomWrapper = document.createElement('div');
    bottomWrapper.id = 'bottom-native-wrapper';
    bottomWrapper.style.cssText = 'width:100%; display:flex; justify-content:center; margin-top:40px; padding-bottom:30px; clear:both;';

    // Create the required container DIV
    var adDiv = document.createElement('div');
    adDiv.id = 'container-91e471e76cd27ae162946760c03872a2';
    
    // Create the required script
    var bottomScript = document.createElement('script');
    bottomScript.type = 'text/javascript';
    bottomScript.async = "async";
    bottomScript.setAttribute('data-cfasync', 'false');
    bottomScript.src = '//summonteacherjunction.com/91e471e76cd27ae162946760c03872a2/invoke.js';

    // Append bottom ad elements to the end of the body
    bottomWrapper.appendChild(adDiv);
    document.body.appendChild(bottomWrapper);
    document.body.appendChild(bottomScript);

})();
