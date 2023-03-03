let table = document.getElementById("table");
let thead = document.createElement("thead");
let tbody = document.createElement("tbody");
let addButton = document.getElementById("add-butto");
let cancelButton = document.getElementById("cancel-button");
let saveButton = document.getElementById("save-button");
let form = document.getElementById("form");

let headers = {
    id: "ID",
    name: "NAME",
    description: "DESCRIPTION",
    status: "STATUS",
    rate: "RATE",
    balance: "BALANCE",
    deposite: "DEPOSITE"
}

function tHeasd() {

    table.appendChild(thead);
    let headRow = document.createElement("tr");
    thead.appendChild(headRow);
    for (const key in headers) {
        let th = document.createElement('th');
        let thText = document.createTextNode(headers[key]);
        th.appendChild(thText);
        headRow.appendChild(th);
    }
}

function createTableBody() {
    tbody.innerHTML = " ";
    table.appendChild(tbody);
    fetch('http://localhost:3000/employee')
        .then(response => response.json())
        .then(data => {
            // //TBody
            for (const iterator of data) {
                let bodyRow = document.createElement("tr");
                tbody.appendChild(bodyRow);
                for (const key in headers) {
                    let td = document.createElement('td');
                    let thText = document.createTextNode(iterator[key]);
                    td.appendChild(thText);
                    bodyRow.appendChild(td);
                }
            }
        }).catch(error => console.error(error));
}

function sendData() {
    let name = document.getElementById("name").value;
    let description = document.getElementById("discription").value;
    let status = document.getElementById("status").value;
    let rate = document.getElementById("rate").value;
    let balance = document.getElementById("balance").value;
    let deposite = document.getElementById("deposite").value;

    let request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: name,
            description: description,
            status: status,
            rate: rate,
            balance: balance,
            deposite: deposite

        }),
    };
    fetch('http://localhost:3000/employee', request).then(res => res).then(data => console.log(data))
        .catch(error => console.error(error));
}

tHeasd();

addButton.addEventListener("click", (e) => {
    e.preventDefault();
    form.style.display = "flex";
});

cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    form.style.display = "none";
});

saveButton.addEventListener("click", (e) => {
    e.preventDefault();
    sendData();
    createTableBody();
});
window.addEventListener("load", (e) => {
    createTableBody();
})