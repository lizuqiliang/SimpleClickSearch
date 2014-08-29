function searchEngine(key, URL) {
	this._key = key;
	this._select = false;
	this._URL = URL;
}

searchEngine.prototype = {
	getKey: function() { return this._key; },
	getSelect: function() { return this._select; },
	setSelect: function (select) {this._select = select;},
	search: function(searchItem) {
		var words = searchItem.split(' ');
		searchURL=this._URL;
		for(var i=0;i<words.length;i++) {
			searchURL+=words[i]+"+";
		}
		window.open(searchURL);
	}
};
var searchEngines = new Array();

var Google = new searchEngine(71, "http://www.google.ca/search?q=");
var SO = new searchEngine(83, "http://stackoverflow.com/search?q=");
var Wiki = new searchEngine(87, "http://en.wikipedia.org/w/index.php?search=");

searchEngines.push(Google);
searchEngines.push(SO);
searchEngines.push(Wiki);

$("body").click(function(e) {
	for(var i=0;i<searchEngines.length;i++) {
		if(searchEngines[i].getSelect()) {
			searchEngines[i].setSelect(false);
			searchEngines[i].search(getSelectedText());
		}
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
	for(var i=0;i<searchEngines.length;i++) {
		if(e.which==searchEngines[i].getKey()) {
			searchEngines[i].setSelect(true);
		}
	}
}).keyup(function(e) {
	for(var i=0;i<searchEngines.length;i++) {
		if(e.which==searchEngines[i].getKey()) {
			searchEngines[i].setSelect(false);
		}
	}
});