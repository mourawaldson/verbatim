function save() {
    var s = document.getElementById('languages');
        localStorage['dl'] = s.options[s.selectedIndex].value;
    var c = document.getElementById('gtnt');
        localStorage['gtnt'] = c.checked;

    alert('Configurations saved!');
}

function loadConfig() {
    var s = document.getElementById('languages');
    var dl = localStorage.getItem('dl');

    for (var i=0; i < s.options.length; i++) {
        if (s.options[i].value == dl) {
            s.options[i].selected = true;
            break;
        }
    }
    
    var gtnt = localStorage.getItem('gtnt');
    
    document.getElementById('gtnt').checked = (gtnt == "true");
}