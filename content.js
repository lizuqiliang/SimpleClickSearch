var googleKey = 71;	//default to g
var SOKey = 83;		//edfault to x
var WikiKey = 87;	//default to c

var googleSelect = false;
var SOSelect = false;
var WikiSelect = false;

$("body").click(function(e) {
	if (googleSelect) {
		googleSelect = false;
		go2Google(getSelectedText());
	} else if (SOSelect) {
		SOSelect = false;
		go2SO(getSelectedText());
	} else if (WikiSelect) {
		WikiSelect = false;
		go2Wiki(getSelectedText());
	}
});

function getSelectedText() {
	var selectedText = '';
	var selection = window.getSelection();
	if (selection.isCollapsed) {
	    selection.modify('move', 'forward', 'character');
	    selection.modify('move', 'backward', 'word');
	    selection.modify('extend', 'forward', 'word');
	    selectedText = selection.toString();
		selectedText = fixWord(selectedText);
	    selection.modify('move', 'forward', 'character');
	}
	else {
	    selectedText = selection.toString();
	}
	return selectedText;
}

function fixWord(selectedText) {
    var punctuation = "\n\t `~!@#$%^&*()-_=+[{]}\|;:'\",<.>/?";
    for(var i=0;i<selectedText.length;i++) {
        if(punctuation.indexOf(selectedText.charAt(selectedText.length-1)) > -1) {
            selectedText=selectedText.slice(0, - 1);
        } else {
            break;
        }
    }
   return(selectedText);
}

$(window).keydown(function(e) {
	if (e.which == googleKey) {
		googleSelect = true;
	} else if (e.which == SOKey) {
		SOSelect = true;
	} else if (e.which == WikiKey) {
		WikiSelect = true;
	}
}).keyup(function(e) {
	if (e.which == googleKey) { 
		googleSelect = false;
	} else if (e.which == SOKey) {
		SOSelect = false;
	} else if (e.which == WikiKey) {
		WikiSelect = false;
	}
});

function go2Google(searchItem) {
	var words = searchItem.split(' ');
	searchURL = "http://www.google.ca/search?q=";
	for(var i=0;i<words.length;i++) {
		searchURL+=words[i]+"+";
	}
	window.open(searchURL);
}

function go2SO(searchItem) {
	var words = searchItem.split(' ');
	searchURL = "http://stackoverflow.com/search?q=";
	for(var i=0;i<words.length;i++) {
		searchURL+=words[i]+"+";
	}
	window.open(searchURL);
}

function go2Wiki(searchItem) {
	var words = searchItem.split(' ');
	searchURL = "http://en.wikipedia.org/w/index.php?search=";
	for(var i=0;i<words.length;i++) {
		searchURL+=words[i]+"+";
	}
	window.open(searchURL);
}
