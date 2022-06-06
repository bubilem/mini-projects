console.log("Departures");
const tableBodyElem = document.getElementById("data");
let flights;
const states = {
  ONT: "ON TIME",
  DEL: "DELAYED",
  CAN: "CANCELLED",
  EXP: "EXPLODED",
};
let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    flights = JSON.parse(xhttp.responseText);
    tableBodyElem.innerHTML = "";
    for (let flight of flights) {
      let trEle = document.createElement("tr");
      trEle.innerHTML = `<td>${flight.time}</td><td>${
        flight.destination
      }</td><td>${flight.flight}</td><td>${flight.gate}</td><td>${
        states[flight.state]
      }</td>`;
      tableBodyElem.appendChild(trEle);
    }
  }
};
let interval = setInterval(function () {
  xhttp.open("GET", "departures.php", true);
  xhttp.send();
}, 1000);
