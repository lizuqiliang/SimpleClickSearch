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
	var str = "<li class='has-sub '>"
	$(".createAtoZ").append(str.concat(text).concat("<ul class='List").concat(num.toString()).concat("'></ul></li>"));
}

function AtoZItemsGenerator(num, list) {
	var selector = ".List";
	selector=selector.concat(num);
    var li = "<li onclick='set()'>";
	for (var i = 0; i < list.length; i++) {
		$(selector).append(li.concat(list.charAt(i)).concat("</li>"));
    };
};

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
