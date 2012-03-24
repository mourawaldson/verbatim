var Verbatim = {
    openUrl: function(url, selected) {
        chrome.tabs.create({
            "url": url,
            "selected": selected
        });
    },
    getElement: function(id) {
        return document.getElementById(id);
    },
    getSelectedValue: function(select) {
        return select.options[select.selectedIndex].value
    },
    setSelectedValue: function(select, value) {
        for (var i = 0; i < select.options.length; i++) {
            if (select.options[i].value == value) {
                select.options[i].selected = true;
                break;
            }
        }
    },
    translate: function(info) {
        var dl = Verbatim.localStorage.getValue('dl');
        var url = "http://translate.google.com/#auto|" + dl + "|" + info.selectionText;
        Verbatim.openUrl(url, true);
    },
    createContextMenu: function() {
        chrome.contextMenus.create({
            "title": chrome.i18n.getMessage('translate') + " '%s'",
            "contexts": ["selection"],
            "onclick": Verbatim.translate
        });
    },
    localStorage: {
        save: function(key, value) {
            localStorage.setItem(key, value);
        },
        getValue: function(key) {
            return localStorage.getItem(key);
        },
        exists: function(key) {
            return (localStorage[key]) ? true : false;
        }
    },
    settings: {
        open: function() {
            var ft = false;

            if (!Verbatim.localStorage.exists('ft')) {
                Verbatim.localStorage.save('ft', ft);
                ft = true;
            }

            if (ft) {
                Verbatim.openUrl('./content/settings.html', true);
            }
        },
        load: function() {
            var sl = Verbatim.getElement('languages');
            var dl = Verbatim.localStorage.getValue('dl');

            var svm = Verbatim.getElement('view-mode');
            var vm = Verbatim.localStorage.getValue('vm');

            if (!dl) dl = 'pt';
            if (!vm) vm = 'ognt';

            Verbatim.setSelectedValue(sl, dl);
            Verbatim.setSelectedValue(svm, vm);
        },
        save: function() {
            var sl = Verbatim.getElement('languages');
            Verbatim.localStorage.save('dl', Verbatim.getSelectedValue(sl));

            var svm = Verbatim.getElement('view-mode');
            Verbatim.localStorage.save('vm', Verbatim.getSelectedValue(svm));

            var message = Verbatim.getElement('message');
            message.innerHTML = chrome.i18n.getMessage('automatic_save');

            setTimeout(function() {
                message.innerHTML = '';
            }, 1000);
        }

    }
}