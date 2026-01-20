// 1. Selección de elementos del DOM
const form = document.getElementById('formRegister');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const tableBody = document.getElementById('tableBody');

// 2. Cargar datos desde el LocalStorage
//localStorage.getItem('formData') ---> Intenta obtener datos guardados previamente
//JSON.parse(...) ---> Convierte el texto guardado en un array de objetos
// || [] ---> Si no hay datos, usa un array vacío
let data = JSON.parse(localStorage.getItem('formData')) || [];

// 3. Evento submit del formulario (CREAR)
//submit se ejecuta al hacer clic en Guardar
form.addEventListener('submit', function (event) {
    event.preventDefault(); //event.preventDefault() ---> evita que la página se recargue

    //Obtener valores del formulario - Aquí lees lo que el usuario escribió en los inputs.
    const name = nameInput.value;
    const email = emailInput.value;

    //Validación básica - Verifica que ambos campos tengan contenido - Si uno está vacío → error
    if (name && email) {

        //Alerta de éxito
        Swal.fire({
            title: "¡Guardado!",
            text: "Información guardada adecuadamente.",
            icon: "success"
        });

        //Guardar datos
        const newData = {name, email}; //Se crea un objeto con los datos traídos del input
        data.push(newData); //El objeto se guarda en el array 'data'
        saveDataToLocalStorage(); // Dicho array se guarda en el LocalStorage
        renderTable(); //Se actualiza la tabla
        form.reset(); //Se limpian los inputs
    } else {
        // Si los inputs están vacíos, alerta de error
        Swal.fire({
            title: "¡Error!",
            text: "Debe escribir los datos, intente nuevamente.",
            icon: "error"
        });
    }
})

// 4. Función que guarda el array de los datos en el LocalStorage
function saveDataToLocalStorage() {
    localStorage.setItem('formData', JSON.stringify(data)); //JSON.stringify() ---> convierte el array en texto
}

// 5. Renderizar la tabla (LEER)
function renderTable() {
    tableBody.innerHTML = ''; //Limpia la tabla antes de volver a dibujarla - Evita duplicados

    data.forEach(function (item, index){ //Iterador que recorre cada posición del array 'data' - item: cada usuario - index: posición en el array
        //Crear elementos - estás creando la fila y las columnas desde JavaScript.
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const emailCell = document.createElement('td');
        const actionCell = document.createElement('td');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');
        //
        nameCell.textContent = item.name;
        emailCell.textContent = item.email;
        editButton.textContent = 'Editar';
        deleteButton.textContent = 'Eliminar';

        editButton.classList.add('button', 'button-secondary');
        deleteButton.classList.add('button', 'button-tertiary');

        editButton.addEventListener('click', function(){
            editData(index)
        })

        deleteButton.addEventListener('click', function(){
            deleteData(index)
        })

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
    })
}

function editData(index) {
    const item = data[index];
    nameInput.value = item.name;
    emailInput.value = item.email;
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

function deleteData(index) {
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

renderTable();
