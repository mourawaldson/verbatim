var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-XXXXXXXX-X']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();

function trackLanguage() {
    _gaq.push(['_trackEvent', 'Language: ' + Core.getSelectedValue(document.querySelector('#languages')), 'changed']);
};

function trackViewMode(value) {
    _gaq.push(['_trackEvent', 'View Mode: ' + Core.getSelectedTextContent(document.querySelector('#view-mode')), 'changed']);
};