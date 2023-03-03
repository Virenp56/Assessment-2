let table = document.getElementById("table");
let thead = document.createElement("thead");
let tbody = document.createElement("tbody");
let addButton = document.getElementById("add-button");
let cancelButton = document.getElementById("cancel-button");
let saveButton = document.getElementById("save-button");
let updateButton = document.getElementById("update-button");
let filter = document.getElementById("filter");
let form = document.getElementById("form");

//header object
let headers = {
    id: "#",
    name: "NAME",
    description: "DESCRIPTION",
    status: "STATUS",
    rate: "RATE",
    balance: "BALANCE",
    deposite: "DEPOSITE"
}

//create Table Header
function tHead() {

    table.appendChild(thead);
    let headRow = document.createElement("tr");
    thead.appendChild(headRow);
    for (const key in headers) {
        let th = document.createElement('th');
        let thText = document.createTextNode(headers[key]);
        th.appendChild(thText);
        headRow.appendChild(th);
    }
    let action = document.createElement('th');
    let actionText = document.createTextNode('ACTION');
    action.appendChild(actionText);
    headRow.appendChild(action);
}

//get Table for Tbody
function getTableData() {
    let name = document.getElementById("name");
    let description = document.getElementById("discription");
    let status = document.getElementById("status");
    let rate = document.getElementById("rate");
    let balance = document.getElementById("balance");
    let deposite = document.getElementById("deposite");

    name.value = "";
    description.value = "";
    status.value = "";
    rate.value = "";
    balance.value = "";
    deposite.value = "";
    tbody.innerHTML = "";
    table.appendChild(tbody);
    fetch('http://localhost:3000/employee')
        .then(response => response.json())
        .then(data => {
            // //TBody
            createTableBody(data)
        }).catch(error => console.error(error));
}

//create Tbody
function createTableBody(data) {
    for (const iterator of data) {
        let bodyRow = document.createElement("tr");
        tbody.appendChild(bodyRow);
        for (const key in headers) {
            let td = document.createElement('td');
            let thText = document.createTextNode(iterator[key]);
            td.appendChild(thText);
            bodyRow.appendChild(td);
        }
        let td = document.createElement('td');
        let deleteButton = document.createElement('button');
        let deleteText = document.createTextNode('Delete');
        deleteButton.appendChild(deleteText);
        deleteButton.className = "deleteButton";
        deleteButton.addEventListener("click", (event) => {
            event.preventDefault();
            deleteEmpolyee(iterator.id);
            table.deleteRow(bodyRow.rowIndex);
        });
        td.appendChild(deleteButton);

        let editButton = document.createElement('button');
        let editText = document.createTextNode('Edit');
        editButton.appendChild(editText);
        editButton.className = "editButton";
        editButton.addEventListener("click", (event) => {
            event.preventDefault();
            editEmployee(iterator);
        }
        )
        td.appendChild(editButton);
        bodyRow.appendChild(td);
    }
}

//send Data
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
    fetch('http://localhost:3000/employee', request)
        .catch(error => console.error(error));
}

//To Delete Employee
function deleteEmpolyee(id) {
    fetch(`http://localhost:3000/employee/${id}`, { method: 'DELETE' })
        .catch(error => console.error(error));
}

//To Update Employee
function editEmployee(empData) {

    if (form.style.display = "none") {
        form.style.display = "flex"
    }
    let name = document.getElementById("name");
    let description = document.getElementById("discription");
    let status = document.getElementById("status");
    let rate = document.getElementById("rate");
    let balance = document.getElementById("balance");
    let deposite = document.getElementById("deposite");

    name.value = empData.name;
    description.value = empData.description;
    status.value = empData.status;
    rate.value = empData.rate;
    balance.value = empData.balance;
    deposite.value = empData.deposite;


    updateButton.removeAttribute("disabled");
    cancelButton.setAttribute("disabled", "disabled");
    saveButton.setAttribute("disabled", "disabled");

    updateButton.addEventListener("click", (event) => {
        event.preventDefault();
        let name = document.getElementById("name").value;
        let description = document.getElementById("discription").value;
        let status = document.getElementById("status").value;
        let rate = document.getElementById("rate").value;
        let balance = document.getElementById("balance").value;
        let deposite = document.getElementById("deposite").value;

        let updatedEmpData = {
            name: name,
            description: description,
            status: status,
            rate: rate,
            balance: balance,
            deposite: deposite
        };

        fetch(`http://localhost:3000/employee/${empData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedEmpData)
        }).catch(error => console.error(error));
        updateButton.setAttribute("disabled", "disabled");
        cancelButton.removeAttribute("disabled");
        saveButton.removeAttribute("disabled");
        getTableData();
    })
}

//get Filter Options
function getFilterOptions() {
    fetch('http://localhost:3000/employee')
        .then(response => response.json())
        .then(data => {
            // //TBody
            let newData = data.map(element => element.status);
            // console.log(newData);
            let options = new Set(newData)
            // console.log(options);
            for (const iterator of options) {
                let option = document.createElement("option");
                let text = document.createTextNode(iterator);
                option.appendChild(text);
                filter.append(option);
            }
        }).catch(error => console.error(error));
}

//filter table
function filterTableData() {
    tbody.innerHTML = " ";
    table.appendChild(tbody);
    let filterValue = filter.value;
    console.log(filterValue);
    fetch('http://localhost:3000/employee')
        .then(response => response.json())
        .then(data => {
            for (const iterator of data) {
                if (filterValue == "all" || iterator.status == filterValue) {
                    let bodyRow = document.createElement("tr");
                    tbody.appendChild(bodyRow);
                    for (const key in headers) {
                        let td = document.createElement('td');
                        let thText = document.createTextNode(iterator[key]);
                        td.appendChild(thText);
                        bodyRow.appendChild(td);
                    }
                    let td = document.createElement('td');
                    let deleteButton = document.createElement('button');
                    let deleteText = document.createTextNode('Delete');
                    deleteButton.appendChild(deleteText);
                    deleteButton.className = "deleteButton";
                    deleteButton.addEventListener("click", (event) => {
                        event.preventDefault();
                        deleteEmpolyee(iterator.id);
                        table.deleteRow(bodyRow.rowIndex);
                    });
                    td.appendChild(deleteButton);

                    let editButton = document.createElement('button');
                    let editText = document.createTextNode('Edit');
                    editButton.appendChild(editText);
                    editButton.className = "editButton";
                    editButton.addEventListener("click", (event) => {
                        event.preventDefault();
                        editEmployee(iterator);
                    }
                    )
                    td.appendChild(editButton);
                    bodyRow.appendChild(td);
                }
            }
        }).catch(error => console.error(error));
}

tHead();


addButton.addEventListener("click", (e) => {
    e.preventDefault();
    form.style.display = "flex";
    addButton.setAttribute("disabled", "disabled");
});

cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    form.style.display = "none";
    addButton.removeAttribute("disabled");
});



filter.addEventListener("change", (e) => {
    e.preventDefault();
    filterTableData()
});

let name = document.getElementById("name");
name.addEventListener("keyup", (e) => {
    e.preventDefault();
    validateName(name.value)

})
function validateName(value) {
    if (value.length <= 3) {
        name.style.border = "1px solid red"
    } else if (value.length >= 25) {
        name.style.border = "1px solid red"
    } else if (!value.trim().match(/^[a-zA-Z]*$/)) {
        name.style.border = "1px solid red"
    } else {
        name.style.border = "1px solid green"
        return true
    }
}


let description = document.getElementById("discription");
description.addEventListener("keyup", (e) => {
    e.preventDefault();
    validateDescription(description.value)

})
function validateDescription(value) {
    if (value.length <= 3) {
        description.style.border = "1px solid red"
    } else if (value.length >= 150) {
        description.style.border = "1px solid red"
    } else if (!value.trim().match(/^[a-zA-Z\s]*$/)) {
        description.style.border = "1px solid red"
    } else {
        description.style.border = "1px solid green"
        return true
    }
}

let status1 = document.getElementById("status");
status1.addEventListener("change", (e) => {
    e.preventDefault();
    validateStatus(status1.value)

})
function validateStatus(value) {
    if (value.length == "") {
        status1.style.border = "1px solid red"
    } else {
        status1.style.border = "1px solid green"
        return true
    }
}


let rate = document.getElementById("rate");
rate.addEventListener("keyup", (e) => {
    e.preventDefault();
    validateRate(rate.value)

})
function validateRate(value) {
    if (value.length < 1) {
        rate.style.border = "1px solid red"
    } else if (!value.trim().match(/^\d*\.?\d+$/)) {
        rate.style.border = "1px solid red"
    } else {
        rate.style.border = "1px solid green"
        return true
    }
}

let balance = document.getElementById("balance");
balance.addEventListener("keyup", (e) => {
    e.preventDefault();
    validateBalance(balance.value)

})
function validateBalance(value) {
    if (value.length < 1) {
        balance.style.border = "1px solid red"
    } else if (!value.trim().match(/^-?\d*\.{0,1}\d+$/)) {
        balance.style.border = "1px solid red"
    } else {
        balance.style.border = "1px solid green"
        return true
    }
}

let deposite = document.getElementById("deposite");
deposite.addEventListener("keyup", (e) => {
    e.preventDefault();
    validateDeposite(deposite.value)

})
function validateDeposite(value) {
    if (value.length < 1) {
        deposite.style.border = "1px solid red"
    } else if (!value.trim().match(/^\d*\.?\d+$/)) {
        deposite.style.border = "1px solid red"
    } else {
        deposite.style.border = "1px solid green"
        return true
    }
}

saveButton.addEventListener("click", (e) => {
    e.preventDefault();
    let name = document.getElementById("name");
    let description = document.getElementById("discription");
    let status1 = document.getElementById("status");
    let rate = document.getElementById("rate");
    let balance = document.getElementById("balance");
    let deposite = document.getElementById("deposite");
    if ((validateName(name.value)) && validateDescription(description.value) && validateStatus(status1.value) && validateRate(rate.value) && validateBalance(balance.value) && validateDeposite(deposite.value)) {
        sendData();
        getTableData();
    } else {
        alert("Enter Valied Data")
    }
});

window.addEventListener("load", (e) => {
    addButton.setAttribute("disabled", "disabled");
    getFilterOptions();
    getTableData();

})