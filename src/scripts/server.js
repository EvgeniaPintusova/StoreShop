function getData() {
  
  fetch("http://localhost:3000/api/Stores", {
    method: "GET",
  })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      let stores = [];
      data.forEach((element) => {
        element = new Store(element);
        stores.push(element);
      });
      application.renderStoresList(stores);
      // console.log(data);
    });
}
//getData();

function getURL(url = "http://localhost:3000/api/Stores/", callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.status < 400) {
      callback(this.response);
    } else {
      callback(null, new Error("Request failed: " + this.statusText));
    }
  };
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.send(null);
}
//callback function
function printData(data, error) {
  //application.renderStoresList(data);
  console.log(data);
  // application.renderStoresList(list);
}
getURL("http://localhost:3000/api/Stores", printData);
