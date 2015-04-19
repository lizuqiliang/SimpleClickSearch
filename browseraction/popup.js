var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

$(document).ready(function() {
	AtoZMenuGenerator();
});

function AtoZMenuGenerator() {
	AtoZItemsGenerator()
}

function AtoZItemsGenerator() {
	var selector = ".createAtoZ";
    var li = "<li class='click'>";
	for (var i = 0; i < alphabet.length; i++) {
		$(selector).append(li.concat(alphabet.charAt(i)).concat("</li>"));
    };
}

$(function(){
	$( ".click" ).click(function() {
		var key = $(this).text();
		var listStr=$(this).parent().parent().text();
		var searchEngine = searchEngineFilter(listStr);
		saveChanges(searchEngine, key);
		$(".output").text("\"" + key + "\" key set for " + searchEngine + "!");
		$(".notice").text("Please refresh browser!");
	});
});

function searchEngineFilter(str) {
    var i;
    for(i = 0; i < str.length; i++) {
        if(str[i] == '\n') {
            break;
        }
    }
    return str.substring(0,i);
}

function saveChanges(searchEngine, key) {
	var setting= {};
	setting[searchEngine]=key;
    chrome.storage.local.set(setting, function() {
        message('Settings saved');
    });
}