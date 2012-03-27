var Core = {
    openUrl: function(url, selected) {
        chrome.tabs.create({
            "url": url,
            "selected": selected
        });
    },
    getSelectedValue: function(select) {
        return select.children[select.selectedIndex].value;
    },
    setSelectedValue: function(select, value) {
        for (var i = 0; i < select.children.length; i++) {
            var child = select.children[i];
            if (child.value == value) {
                child.selected = true;
                break;
            }
        }
    },
    translate: function(info) {
        var dl = Core.localStorage.getValue('dl');
        var vm = Core.localStorage.getValue('vm');

        if (vm != 'tt') {
            var url = "http://translate.google.com/#auto|" + dl + "|" + encodeURI(info.selectionText);
            Core.openUrl(url, (vm == 'ognt') ? true : false);
        }
    },
    createContextMenu: function() {
        chrome.contextMenus.create({
            "title": chrome.i18n.getMessage('translate') + " '%s'",
            "contexts": ["selection"],
            "onclick": Core.translate
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

            if (!Core.localStorage.exists('ft')) {
                Core.localStorage.save('ft', ft);
                ft = true;
            }

            if (ft) {
                Core.openUrl('./content/settings.html', true);
            }
        },
        supportedLanguage: function(code) {
            var SUPPORTED_LOCALES = ['af', 'ar', 'az', 'be', 'bg', 'bn', 'ca', 'cs', 'cy', 'da', 'de', 'el', 'en', 'en-GB', 'es', 'et', 'eu', 'fa', 'fi', 'fil', 'fr', 'ga', 'gl', 'gu', 'hi', 'hr', 'ht', 'hu', 'hy', 'id', 'is', 'it', 'iw', 'ja', 'ka', 'kn', 'ko', 'lt', 'lv', 'mk', 'ms', 'mt', 'nl', 'no', 'pl', 'pt-BR', 'pt-PT', 'ro', 'ru', 'sk', 'sl', 'sq', 'sr', 'sv', 'sw', 'ta', 'te', 'th', 'tl', 'tr', 'uk', 'ur', 'vi', 'yi', 'zh-CN', 'zh-TW'];

            return SUPPORTED_LOCALES.indexOf(code) != -1;
        },
        normalizeLangcode: function(code) {
            if (code.toLowerCase() == 'zh-tw') return 'zh-TW';
            if (code.toLowerCase() == 'zh-cn') return 'zh-CN';
            if (code.toLowerCase() == 'pt-pt') return 'pt-PT';
            if (code.toLowerCase() == 'pt-br') return 'pt-BR';
            if (code.length >= 2 && Core.settings.supportedLanguage(code)) return code.substr(0, 2);
            else return 'en';
        },
        loadSupportedLanguages: function() {
            var displayLang = Core.settings.normalizeLangcode(window.navigator.language);

            var s = document.createElement('script');
            s.src = 'http://translate.google.com/translate_a/l?client=es' + '&cb=Core.settings.supportedLanguagesCallback&hl=' + displayLang;
            document.querySelector('head').appendChild(s);
        },
        supportedLanguagesCallback: function(langs) {
            var selector = document.querySelector('#languages');

            if ('tl' in langs) {
                selector.innerHTML = '';

                for (var langCode in langs['tl']) {
                    var newOption = document.createElement('option');
                    newOption.value = langCode;
                    newOption.textContent = langs['tl'][langCode];
                    selector.appendChild(newOption);
                }

                var lang = localStorage['dl'];
                if (!lang) lang = normalizeLangcode(window.navigator.language);
                Core.setSelectedValue(selector, lang);
            }
        },
        init: function() {
            //Core.settings.loadSupportedLanguages();

            var title = chrome.i18n.getMessage('name') + ' - ' + chrome.i18n.getMessage('settings');

            document.title = title;

            var content_title = document.querySelector('#title');
            content_title.innerHTML = title;

            var lb_view_mode = document.querySelector('#lb_view-mode');
            lb_view_mode.innerHTML = chrome.i18n.getMessage('view_mode');

            var lb_translate_to = document.querySelector('#lb_translate_to');
            lb_translate_to.innerHTML = chrome.i18n.getMessage('translate_to');

            var sl = document.querySelector('#languages');
            var dl = Core.localStorage.getValue('dl');
            if (!dl) dl = Core.settings.normalizeLangcode(window.navigator.language);
            Core.setSelectedValue(sl, dl);

            var svm = document.querySelector('#view-mode');
            var vm = Core.localStorage.getValue('vm');

            var tt_value = 'tt';
            var tt_selected = (vm == tt_value) ? true : false;
            var ont_value = 'ont';
            var ont_selected = (vm == ont_value) ? true : false;
            var ognt_value = 'ognt';
            var ognt_selected = (vm == ognt_value || !vm) ? true : false;

            svm.options[0] = new Option(chrome.i18n.getMessage('view_mode_tt'), tt_value, false, tt_selected);
            svm.options[1] = new Option(chrome.i18n.getMessage('view_mode_ont'), ont_value, false, ont_selected);
            svm.options[2] = new Option(chrome.i18n.getMessage('view_mode_ognt'), ognt_value, false, ognt_selected);
        },
        save: function() {
            var sl = document.querySelector('#languages');
            Core.localStorage.save('dl', Core.getSelectedValue(sl));

            var svm = document.querySelector('#view-mode');
            Core.localStorage.save('vm', Core.getSelectedValue(svm));

            var message = document.querySelector('#message');
            message.innerHTML = chrome.i18n.getMessage('automatic_save');

            setTimeout(function() {
                message.innerHTML = '';
            }, 1200);
        }

    }
}