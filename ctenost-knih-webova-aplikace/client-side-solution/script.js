let data = {};
let table = document.getElementById("table");
let form = document.getElementById("form");
form.onsubmit = (e) => {
  e.preventDefault();
  let age = parseInt(document.getElementById("age").value);
  let books = parseInt(document.getElementById("books").value);
  if (data[age] == undefined) {
    data[age] = { age: age, books: books, count: 1 };
  } else {
    data[age].books += books;
    data[age].count++;
  }
  table.innerHTML =
    "<tr><th>věk</th><th>lidí</th><th>knih</th><th>knih na člověka</th></tr>";
  for (let age in data) {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.innerText = age;
    tr.appendChild(td);
    td = td.cloneNode();
    td.innerText = data[age].count;
    tr.appendChild(td);
    td = td.cloneNode();
    td.innerText = data[age].books;
    tr.appendChild(td);
    td = td.cloneNode();
    td.innerText = Math.round((data[age].books / data[age].count) * 10) / 10;
    tr.appendChild(td);
    table.appendChild(tr);
  }
};
