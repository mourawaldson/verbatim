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

function trackTranslate(url, text) {
    _gaq.push(['_trackEvent', 'Url - ' + url, 'used']);
    _gaq.push(['_trackEvent', 'Text - ' + text, 'selected']);
};

function trackLanguage(value) {
    _gaq.push(['_trackEvent', 'Language - ' + value, 'changed']);
};

function trackViewMode(value) {
    if (value == 'tt') {
        value = 'Tooltip';
    }
    else if (value == 'ont') {
        value = 'Open a new tab';
    }
    else if (value == 'ognt') {
        value = 'Open and go to a new tab';
    }

    _gaq.push(['_trackEvent', 'View Mode - ' + value, 'changed']);
};