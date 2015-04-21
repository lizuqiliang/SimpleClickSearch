var searchEngineList = [
	"Google",
	"Youtube",
	"Wikipedia",
	"Stack Overflow",
	"Baidu",
	"Bing",
	"Yahoo"
];

var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

$(document).ready(function() {
	makeMenus();
});

function menuAlphabetBuilder() {
	var str = "";
	for (var i = 0, len = alphabet.length; i < len; i++) {
		str += "<li><a class=\"click\" href=\"#\">" + alphabet[i] + "</a></li>";
	}
	return str;
}

function menuStringBuilder(searchEngine) {
	return "<div class=\"dropdown custom-dropdown\"><button class=\"btn btn-default dropdown-toggle custom-button\" type=\"button\" data-toggle=\"dropdown\">" + 
		searchEngine +
		"<span class=\"caret\"></span></button><ul class=\"dropdown-menu scrollable-menu\" value=\"" +
		searchEngine + 
		"\" aria-labelledby=\"" +
		searchEngine +
		"\">" + menuAlphabetBuilder();
}

function makeMenus() {
	for (var i = 0; i < searchEngineList.length; i++) {
		$(".menus").append(menuStringBuilder(searchEngineList[i]));
    }
}

$(function(){
	$( ".click" ).click(function() {
		var key = $(this).text();
		var searchEngine=$(this).parent().parent().attr("value");
		saveChanges(searchEngine, key);
		$(".output").text("\"" + key + "\" key set for " + searchEngine + "!");
		$(".notice").text("Please refresh browser!");
	});
});

function saveChanges(searchEngine, key) {
	var setting= {};
	setting[searchEngine]=key;
    chrome.storage.local.set(setting, function() {
        message('Settings saved');
    });
}