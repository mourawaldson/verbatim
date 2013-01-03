var Core = {
    createContextMenu: function() {
        chrome.contextMenus.create({
            "title": chrome.i18n.getMessage('translate') + " '%s'",
            "contexts": ["selection"],
            "onclick": Core.translate
        });
    },
    openUrl: function(url, selected) {
        chrome.tabs.create({
            "url": url,
            "selected": selected
        });
    },
    getSelectedValue: function(select) {
        return select.children[select.selectedIndex].value;
    },
    getSelectedTextContent: function(select) {
        return select.children[select.selectedIndex].textContent;
    },
    setSelectedValue: function(select, value) {
        for (var i = 0; i < select.children.length; i++) {
            var child = select.children[i];
            if (child.value === value) {
                child.selected = true;
                break;
            }
        }
    },
    populateSelect: function(select, options) {
        for (var value in options) {
            var option = document.createElement('option');
            option.value = value;
            option.textContent = options[value];
            select.appendChild(option);
        }

        return select;
    },
    changeElementsVisibility: function() {
        var selects = document.getElementsByTagName('select');
        var labels = document.getElementsByTagName('label');

        for (var i = 0; i < selects.length; i++) {
            selects[i].className = 'visible';
        }

        for (var j = 0; j < labels.length; j++) {
            labels[j].className = 'visible';
        }
    },
    translate: function(info) {
        var text = info.selectionText;

        var vm = Core.settings.getViewMode();
        var from = (text.toLowerCase() !== chrome.i18n.getMessage('name').toLowerCase()) ? 'auto' : 'la';

        if (vm !== 'tt') {
            var url = "http://translate.google.com/#" + from + "|" + Core.settings.getTranslateToLanguage() + "|" + encodeURIComponent(text);
            Core.openUrl(url, (vm === 'ognt') ? true : false);
        }

        trackTranslate();
    },
    localStorage: {
        saveTranslateToLanguage: function(value) {
            Core.localStorage.save('tl', value);
        },
        saveViewMode: function(value) {
            Core.localStorage.save('vm', value);
        },
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
        save: function() {
            Core.localStorage.saveTranslateToLanguage(Core.getSelectedValue(document.querySelector('#languages')));
            Core.localStorage.saveViewMode(Core.getSelectedValue(document.querySelector('#view-mode')));

            var message = document.querySelector('#message');
            message.innerHTML = chrome.i18n.getMessage('automatic_save');
            setTimeout(function() {
                message.innerHTML = '';
            }, 1200);
        },
        getTranslateToLanguage: function() {
            return (Core.localStorage.exists('tl')) ? Core.localStorage.getValue('tl') : Core.settings.normalizeLanguageCode(window.navigator.language);
        },
        getViewMode: function() {
            return (Core.localStorage.exists('vm')) ? Core.localStorage.getValue('vm') : 'ognt';
        },
        supportedLocale: function(code) {
            var supported_locales = ['ar', 'bg', 'ca', 'cs', 'da', 'de', 'el', 'en', 'en-GB', 'en-US', 'es', 'es-419', 'et', 'fi', 'fil', 'fr', 'he', 'hi', 'hr', 'hu', 'id', 'it', 'ja', 'ko', 'lt', 'lv', 'nl', 'no', 'pl', 'pt-BR', 'pt-PT', 'ro', 'ru', 'sk', 'sl', 'sr', 'sv', 'th', 'tl', 'tr', 'uk', 'vi', 'zh-CN', 'zh-TW'];

            return supported_locales.indexOf(code) !== -1;
        },
        normalizeLanguageCode: function(code) {
            if (code.toLowerCase() === 'zh-tw') {
                return 'zh-TW';
            }

            if (code.toLowerCase() === 'zh-cn') {
                return 'zh-CN';
            }

            if (code.length >= 2 && Core.settings.supportedLocale(code)) {
                return code.substr(0, 2);
            }
            else {
                return 'en';
            }
        },
        loadSupportedLanguages: function() {
            var script = document.createElement('script');
            script.src = 'https://translate.google.com/translate_a/l?client=es&cb=Core.settings.supportedLanguagesCallback&hl=' + Core.settings.normalizeLanguageCode(window.navigator.language);
            document.querySelector('head').appendChild(script);
        },
        supportedLanguagesCallback: function(langs) {
            var sl = document.querySelector('#languages');

            if ('tl' in langs) {
                sl.innerHTML = '';
                Core.populateSelect(sl, langs['tl']);
                Core.setSelectedValue(sl, Core.settings.getTranslateToLanguage());
            }
        },
        loadSupportedViewModes: function() {
            var svm = document.querySelector('#view-mode');
            var options = {
                //'tt': chrome.i18n.getMessage('view_mode_tt'),
                'ont': chrome.i18n.getMessage('view_mode_ont'),
                'ognt': chrome.i18n.getMessage('view_mode_ognt')
            };

            Core.populateSelect(svm, options);
            Core.setSelectedValue(svm, Core.settings.getViewMode());
        }
    },
    init: function() {
        document.addEventListener("DOMContentLoaded", function() {
            Core.settings.loadSupportedLanguages();
            Core.settings.loadSupportedViewModes();

            var title = chrome.i18n.getMessage('name') + ' - ' + chrome.i18n.getMessage('settings');

            document.title = title;
            document.querySelector('#title').innerHTML = title;
            document.querySelector('#lb_translate_to').innerHTML = chrome.i18n.getMessage('translate_to');
            document.querySelector('#lb_view-mode').innerHTML = chrome.i18n.getMessage('view_mode');

            document.querySelector('#languages').addEventListener('change', function() {
                Core.settings.save();
                trackLanguage();
            });

            document.querySelector('#view-mode').addEventListener('change', function() {
                Core.settings.save();
                trackViewMode();
            });

            document.onreadystatechange = function() {
                if (document.readyState === 'complete') {
                    Core.changeElementsVisibility();
                }
            };
        });
    }
};

Core.init();