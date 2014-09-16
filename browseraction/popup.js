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
		var searchEngine = searchEngineFind(listStr);
		$(".output").text("\"" + key + "\" key set for " + searchEngine + "!");
	});
});

function searchEngineFind(str) {
    var i;
    for(i = 0; i < str.length; i++) {
        if(str[i] == '\n') {
            break;
        }
    }
    return str.substring(0,i);
}
/*
window.onload = function() {
    document.getElementById("button").onclick = function() {
        chrome.extension.sendMessage({
            saveChanges();
        });
    }
}

function saveChanges() {
    // Get a value saved in a form.
    var theValue = textarea.value;
    // Check that there's some code there.
    if (!theValue) {
        message('Error: No value specified');
        return;
    }
    // Save it using the Chrome extension storage API.
    chrome.storage.sync.set({'value': theValue}, function() {
        // Notify that we saved.
        message('Settings saved');
    });
}
*/
