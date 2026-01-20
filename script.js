const form = document.getElementById('formRegister');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const tableBody = document.getElementById('tableBody');

let data = JSON.parse(localStorage.getItem('formData')) || [];

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = nameInput.value;
    const email = emailInput.value;

    if (name && email) {
        const newData = {name, email};
        data.push(newData);
        saveDataToLocalStorage();
        renderTable();
        form.reset();
    }
})

function saveDataToLocalStorage() {
    localStorage.setItem('formData', JSON.stringify(data));
}

function renderTable() {
    tableBody.innerHTML = '';

    data.forEach(function (item, index){
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const emailCell = document.createElement('td');
        const actionCell = document.createElement('td');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        nameCell.textContent = item.name;
        emailCell.textContent = item.email;
        editButton.textContent = 'Editar';
        deleteButton.textContent = 'Eliminar';

        editButton.classList.add('button', 'button-secondary');
        deleteButton.classList.add('button', 'button-tertiary');

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
    })
}

renderTable();