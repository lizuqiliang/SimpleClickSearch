var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
$(document).ready(function() {
    var Google = document.getElementById("Google");
    var Wiki = document.getElementById("Wiki");
    var SO = document.getElementById("SO");
    var Bing = document.getElementById("Bing");
    var Yahoo = document.getElementById("Yahoo");
    var Baidu = document.getElementById("Baidu");
    selectGenerator(Google);
    selectGenerator(Wiki);
    selectGenerator(SO);
    selectGenerator(Bing);
    selectGenerator(Yahoo);
    selectGenerator(Baidu);
});

function selectGenerator(selectId) {
    optionGenerator(selectId,"SHIFT");
    optionGenerator(selectId,"CTRL");
    optionGenerator(selectId,"ALT");
    for (var i = 0; i < alpha.length ; i++) { 
        var optText = alpha.charAt(i);
        optionGenerator(selectId,optText);
    };
}

function optionGenerator(selectId,optText) {
    var optionInstance = document.createElement("option");
    optionInstance.text = optText;
    selectId.options.add(optionInstance);
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
