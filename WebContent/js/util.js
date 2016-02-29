var xhrTool = function(method,url, callback, object){
var xhr = new XMLHttpRequest();
console.log(object);
xhr.open(method, "http://nayrdnt.com:8080/EventTracker/"+url);
xhr.onreadystatechange = function(){
  if(xhr.readyState == 4 && xhr.status < 400)
  {
        if(method === "GET"){
        callback(xhr.responseText);
      }
      else if(url === "rest/event/search"){
        callback(xhr.responseText);
      }
      else{
        xhrTool("GET", "rest/grabAll",createTable);
      }
  }
};
  if(object !== null)
  {
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.send(JSON.stringify(object));
  }
  else{
    xhr.send(null);
  }

};

function events(itemName, place, quantity) {
    this.itemName = itemName;
    this.place = place;
    this.quantity = quantity;
}

function createnewevent(e){
  var form = document.getElementById("creating")
  e.preventDefault();
  console.log(form.itemName.value);
  console.log(form.place.value);

  var evnt = {};
  evnt.itemName = form.itemName.value;
  evnt.place = form.place.value;
  evnt.quantity = form.quantity.value;
  console.log(evnt.itemName.value);
    xhrTool("PUT", "rest/createEvent", createTable, evnt);

};
function newsearch(e){
  var form = document.getElementById("searchbar");
  e.preventDefault();
  var searchby = {};
for (var i = 0; i < form.childNodes.length; i++) {

  if(form.childNodes[0].checked === true)
  {
    searchby.limit = form.childNodes[0].value;
  }
  else{
    searchby.limit = form.childNodes[2].value;
  }

}
  searchby.text = form.childNodes[4].value;
    if(searchby.text !== "" && searchby.limit !== false)
    {
      form.childNodes[0].innerHTML = "";
      xhrTool("PUT", "rest/event/search", createTable, searchby);
    }
    else{
      if(searchby.text.value === "")
      {
      form.childNodes[0].innerHTML = "Search text cant be blank!";
    }
    else{
      form.childNodes[0].innerHTML="You need to select either place or item!";
    }
    }
};
