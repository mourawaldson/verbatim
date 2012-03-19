function save() {
    var sl = document.getElementById('languages');
        localStorage['dl'] = sl.options[sl.selectedIndex].value;
    var svm = document.getElementById('languages');
        localStorage['vm'] = svm.options[svm.selectedIndex].value;

    
}

function load() {
    var sl = document.getElementById('languages');
    var dl = localStorage.getItem('dl');

    for (var i=0; i < sl.options.length; i++) {
        if (sl.options[i].value == dl) {
            sl.options[i].selected = true;
            break;
        }
    }
    
    var svm = document.getElementById('view-mode');
    var vm = localStorage.getItem('vm');

    for (var i=0; i < svm.options.length; i++) {
        if (svm.options[i].value == vm) {
            svm.options[i].selected = true;
            break;
        }
    }
}