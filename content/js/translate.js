var Verbatim = {
    openUrl: function (url, selected) {
        chrome.tabs.create({
            "url": url,
            "selected": selected
        });
    },
    translate: function (info) {
        var dl = localStorage.getItem('dl');
        var url = "http://translate.google.com/#auto|" + dl + "|" + info.selectionText;
        Verbatim.openUrl(url, true);
    },
    createContextMenu: function () {
        chrome.contextMenus.create({
            "title": chrome.i18n.getMessage('translate') + " '%s'",
            "contexts": ["selection"],
            "onclick": Verbatim.translate
        });
    },
    settings: {
        setDefault: function () {
            localStorage['dl'] = 'pt';
            localStorage['vm'] = 'tc';

            var ft = false;

            if (!localStorage['ft']) {
                localStorage['ft'] = ft;
                ft = true;
            }

            if (ft) {
                Verbatim.openUrl('./content/settings.html', true);
            }
        },
        load: function () {
            var sl = document.getElementById('languages');
            var dl = localStorage.getItem('dl');

            for (var i = 0; i < sl.options.length; i++) {
                if (sl.options[i].value == dl) {
                    sl.options[i].selected = true;
                    break;
                }
            }

            var svm = document.getElementById('view-mode');
            var vm = localStorage.getItem('vm');

            for (var i = 0; i < svm.options.length; i++) {
                if (svm.options[i].value == vm) {
                    svm.options[i].selected = true;
                    break;
                }
            }
        },
        save: function () {
            var sl = document.getElementById('languages');
            localStorage['dl'] = sl.options[sl.selectedIndex].value;

            var svm = document.getElementById('view-mode');
            localStorage['vm'] = svm.options[svm.selectedIndex].value;

            var message = document.getElementById('message');
            message.innerHTML = chrome.i18n.getMessage('automatic_save');

            setTimeout(function () {
                message.innerHTML = '';
            }, 1000);
        }

    }
}