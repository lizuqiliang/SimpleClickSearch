function searchEngine(defaultKey ,name, URL) {
	this._name = name;
	this._key = defaultKey;
	this._select = false;
	this._URL = URL;
	this._active = true;
}

searchEngine.prototype = {
	getName: function() { return this._name; },
	getKey: function() { return this._key; },
	setKey: function(key) { this._key = key; },
	getSelect: function() { return this._select; },
	setSelect: function (select) {this._select = select; },
	search: function(searchItem) {
		var words = searchItem.split(' ');
		searchURL=this._URL;
		for(var i=0;i<words.length;i++) {
			searchURL+=words[i]+"+";
		}
		window.open(searchURL);
	}
};

var activeSearchEngines = new Array();

var Google = new searchEngine(71, "Google","http://www.google.com/search?q=");
var SO = new searchEngine(83, "Stack Overflow", "http://stackoverflow.com/search?q=");
var Wiki = new searchEngine(87, "Wikipedia", "http://en.wikipedia.org/w/index.php?search=");
var Bing = new searchEngine(66, "Bing", "http://www.bing.com/search?q=");
var Youtube = new searchEngine(89, "Youtube", "https://www.youtube.com/results?search_query=");
var Baidu = new searchEngine(68, "Baidu", "http://www.baidu.com/s?ie=utf-8&f=8&tn=baidu&wd=");
var Yahoo = new searchEngine(72, "Yahoo", "https://search.yahoo.com/search;_ylt=ApVdv9lTmoX7O37NL_djGSct17V_?p=");
var Custom = new searchEngine(0, "Custom", "");

activeSearchEngines.push(Google);
activeSearchEngines.push(Youtube);
activeSearchEngines.push(Wiki);
activeSearchEngines.push(SO);
activeSearchEngines.push(Baidu);
activeSearchEngines.push(Bing);
activeSearchEngines.push(Yahoo);
activeSearchEngines.push(Custom);

chrome.storage.local.get(null, function(result) {
	for(var i=0;i<7;i++) {
		if(chrome.runtime.lastError) {
			activeSearchEngines[i].setKey(activeSearchEngines[i].getKey());
		}
		activeSearchEngines[i].setKey(result[activeSearchEngines[i].getName()].charCodeAt(0));
	}
});

$("body").click(function(e) {
	var selectedText;
	for(var i=0;i<activeSearchEngines.length;i++) {
		if(activeSearchEngines[i].getSelect()) {
			if(!selectedText) {
				selectedText=getSelectedText();
			}
			activeSearchEngines[i].setSelect(false);
			activeSearchEngines[i].search(selectedText);
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
	    selection.empty();
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
	for(var i=0;i<activeSearchEngines.length;i++) {
		if(e.which==activeSearchEngines[i].getKey()) {
			activeSearchEngines[i].setSelect(true);
		}
	}
}).keyup(function(e) {
	for(var i=0;i<activeSearchEngines.length;i++) {
		if(e.which==activeSearchEngines[i].getKey()) {
			activeSearchEngines[i].setSelect(false);
		}
	}
});
