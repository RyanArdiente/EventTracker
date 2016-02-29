window.onload = function(){
    init();
}
function init(){
    var body = document.querySelector("body");
    var results = document.getElementById("results");
    xhrTool("GET", "rest/grabAll",createTable);
    createEventListeners();
}
