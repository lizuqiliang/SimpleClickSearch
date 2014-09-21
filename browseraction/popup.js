var lists = [
	"ABCDEFG",
	"HIJKLMN",
	"OPQRST",
	"UVWXYZ"];

$(document).ready(function() {
	AtoZMenuGenerator();
});

function AtoZMenuGenerator() {
	AtoZListGenerator(0,"A~G");
	AtoZListGenerator(1,"H~N");
	AtoZListGenerator(2,"O~T");
	AtoZListGenerator(3,"U~Z");
	for (var i = 0; i < lists.length; i++) { 
        AtoZItemsGenerator(i.toString(), lists[i]);
    };
}

function AtoZListGenerator(num, text) {
	var str = "<li>"
	$(".createAtoZ").append(str.concat(text).concat("<ul class='list").concat(num.toString()).concat("'></ul></li>"));
}

function AtoZItemsGenerator(num, list) {
	var selector = ".list";
	selector=selector.concat(num);
    var li = "<li class='click'>";
	for (var i = 0; i < list.length; i++) {
		$(selector).append(li.concat(list.charAt(i)).concat("</li>"));
    };
}

$(function(){
	$( ".click" ).click(function() {
		var key = $(this).text();
		var listStr=$(this).parent().parent().parent().parent().text();
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