var Verbatim = {
	setDefaultSettings: function () {
		localStorage['dl'] = 'pt';
		localStorage['vm'] = 'tc';

		var ft = false;

		if (!localStorage['ft']) {
		    localStorage['ft'] = ft;
		    ft = true;
		}

		if (ft) {
		    Verbatim.openUrl('../settings.html', true);
		}
	},
	openUrl: function(url, selected) {
	    chrome.tabs.create({"url":url, "selected": selected});
	},
	translate: function(info) {
	    var dl = localStorage.getItem('dl');
	    var url = "http://translate.google.com/#auto|" + dl + "|" + info.selectionText;
	    Verbatim.openUrl(url, true);
	}
}

document.addEventListener("DOMContentLoaded", function () {
	Verbatim.setDefaultSettings();
	chrome.contextMenus.create({"title": "Translate '%s'", "contexts":["selection"], "onclick": translate});
});