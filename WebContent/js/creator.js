var createTable = function(data){
  if(data !== "[]")
  {
    console.log("hello");
  var json = JSON.parse(data);
  console.log(data);
  var results = document.getElementById("results");
  results.innerHTML="";
  var table = document.createElement("table");
  table.id="myTable";
  var trh = document.createElement("tr");
  for (var head in json[0]) {
    if(head === "id")
    {
      var thc= document.createElement("th");
      trh.appendChild(thc);
    }
    else{
      var thc= document.createElement("th");
      thc.innerHTML = head;
      trh.appendChild(thc);
    }
  }
  table.appendChild(trh);
  for (var i = 0; i < json.length; i++) {
  var tr = document.createElement("tr");
  tr.id=i;
  for (var key in json[i]) {
  var td = document.createElement("td");
  tr.appendChild(td);
    if(key === "id" || key === "bought"){
      var input = document.createElement("input");
      input.type ="hidden";
      td.appendChild(input);
      if(key === "bought")
      {
        input.type="checkbox";

        input.addEventListener("change", onchanges);
        input.checked = json[i].bought;
        if (input.checked === true)
        {
          var classtar = document.createAttribute("class");
          classtar.value = "strikeout";
            // target.class="strikeout";

           input.parentNode.parentNode.setAttributeNode(classtar);
        }
        input.name="bought";
      }
      else{
        input.value = json[i][key];
        input.name = "id";
      }



    }
    else{
      td.innerHTML= json[i][key];
    }

  }
  table.appendChild(tr);
  results.appendChild(table);
  }
}
else{
  var results = document.getElementById("results");
  results.innerHTML="";
  var h3 = document.createElement("h3");
  h3.innerHTML = "Error/Results not found!";
  results.appendChild(h3);
}
};
var onchanges = function(e){
  var evnt ={};

    for (var i = 0; i < 5; i++) {
      if(i === 0 || i === 4)
      {
        if(i=== 0){
          evnt.id = e.target.parentNode.parentNode.childNodes[i].childNodes[0].value;
      }
      else{
         evnt.bought = e.target.checked;
      }
      }
      else{
        if(i === 1){
          evnt.itemName = e.target.parentNode.parentNode.childNodes[i].innerHTML;
        }
        else if (i === 2) {
          evnt.place = e.target.parentNode.parentNode.childNodes[i].innerHTML;

        }
        else{
          evnt.quantity = e.target.parentNode.parentNode.childNodes[i].innerHTML;

        }
      }

  }
  // console.log(evnt);
  xhrTool("POST", "rest/editEvent", createTable, evnt);
};
var createsearchbar = function(){
    var search = document.getElementById("searcher");
    var form = document.createElement("form");
    var failmessage = document.createElement("p");
    form.action="search";
    form.id="searchbar";
    var arr = ["itemName", "place", "searchtext"];
    var radio1 = document.createElement("input");
    radio1.type="radio";
    radio1.value=arr[0];
    radio1.name="searchlimiter";
    var label1 = document.createElement("label");
    label1.innerHTML=arr[0];
    var radio2 = document.createElement("input");
    radio2.type="radio";
    radio2.value=arr[1];
    radio2.name="searchlimiter";
    var label2 = document.createElement("label");
    label2.innerHTML=arr[1];
    var textbox = document.createElement("input");
    textbox.type="text";
    textbox.name=arr[2];
    var submitButton = document.createElement("input");
    submitButton.type = "submit";
    submitButton.value = "submit";
    submitButton.addEventListener("click", newsearch);
    form.appendChild(radio1);
    form.appendChild(label1);
    form.appendChild(radio2);
    form.appendChild(label2);
    form.appendChild(textbox);
    form.appendChild(submitButton);
    search.appendChild(failmessage);
    search.appendChild(form);


};
var creatorForm = function(){
  var creator = document.getElementById("creator");
  var form = document.createElement("form");
  form.action="creating";
  form.id="creating";
  var arr = ["itemName",	"place",	"quantity"];
  for (var i = 0; i < arr.length; i++) {
    var label = document.createElement("label");
    label.for = arr[i];
    if(i === 0){
      label.innerHTML = "item name <br/>";
    }
    else{
      label.innerHTML = arr[i] + "<br/>";
    }

    var input = document.createElement("input");
    input.type="text";
    input.name = arr[i];
    form.appendChild(input);
    form.appendChild(label);

  }
  var input = document.createElement("input");
  input.type = "submit";
  input.value = "submit";

      input.addEventListener("click", createnewevent);
  form.appendChild(input);
  creator.appendChild(form);
}
function createEventListeners(){
  var div = document.getElementById("createform");
  div.addEventListener("click", formopen);
  var div2 = document.getElementById("searchfunction");
  div2.addEventListener("click", searchopen);
  var div3 = document.getElementById("deleteAll");
  div3.setAttribute("tag","hello");
  div3.addEventListener("click", function(){
    xhrTool("DELETE", "rest/deleteAllEvents");
  });
  var div4 = document.getElementById("selectall");
  div4.addEventListener("click", function(){
    xhrTool("GET", "rest/grabAll",createTable);
  });
}
var formopen = function (e){
  e.preventDefault;
  var div = document.getElementById("createform");
  div.removeEventListener("click", formopen);
  div.childNodes[0].innerHTML = "Close Creator";
  creatorForm();
  div.addEventListener("click", formclose);
}
var formclose = function (e){
  e.preventDefault;
  var div = document.getElementById("createform");
  var div2 = document.getElementById("creator");
  div2.innerHTML = "";
  div.removeEventListener("click", formclose);
  div.childNodes[0].innerHTML = "New Item";
  div.addEventListener("click", formopen);
};

var searchopen = function(e){
  e.preventDefault;
  var div = document.getElementById("searchfunction");
  createsearchbar();
  div.removeEventListener("click", searchopen);
  div.childNodes[0].innerHTML = "Close Search";
  div.addEventListener("click", searchclose);
};
var searchclose = function(e){
  e.preventDefault;
  var div = document.getElementById("searchfunction");
  var div2 = document.getElementById("searcher");
  div2.innerHTML = "";
  div.removeEventListener("click", searchclose);
  div.childNodes[0].innerHTML = "Search";
  div.addEventListener("click", searchopen);
};
