localStorage['dl'] = 'en';
localStorage['gtnt'] = true;

var ft = false;

if (!localStorage['ft']) {
    localStorage['ft'] = ft;
    ft = true;
}

if (ft) {
    openUrl('options.html', true);
}

function openUrl(url, selected) {
    chrome.tabs.create({"url":url, "selected": selected});
}

function translate(info) {
    var dl = localStorage.getItem('dl');
    var url = "http://translate.google.com/#auto|" + dl + "|" + info.selectionText;
    openUrl(url, true);
}

chrome.contextMenus.create({"title": "Google Translate '%s'", "contexts":["selection"], "onclick": translate});