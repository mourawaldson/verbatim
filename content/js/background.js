var Background = {
    init: function() {
        document.addEventListener("DOMContentLoaded", function() {
            Core.settings.open();
            Core.createContextMenu();
        });
    }
};

Background.init();