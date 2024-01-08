//validar formulario

function validateForm() {

    //obtengo los valores de los campos

    let name = document.getElementById('inputName').value;
    let email = document.getElementById('inputEmail').value;
    let phone = document.getElementById('inputPhone').value;

    //Validar Campo correo

    if (email == "") {
        alert('*El correo es requerido');
        return false;
    } else if (!email.includes("@")) {
        alert('*Este correo no es valido  ');
        return false;
    }
    //validar campo nombre

    if (name == "") {
        alert("*Nombre Completo* este campo es obligatorio");
        return false
    }
    //validar campo de telefono

    if (phone == "") {
        alert("*Número de telefono* Este campo es obligatorio");
        return false
    }
    //si pasa las validaciones

    return true;
}

function addData() {
    if (validateForm() == true) {

        //obtengo los valores de los campos


        let name = document.getElementById('inputName').value;
        let email = document.getElementById('inputEmail').value;
        let phone = document.getElementById('inputPhone').value;

        let listPeople;
        if (localStorage.getItem('listPeople') == null) {
            listPeople = [];
        } else {
            listPeople = JSON.parse(localStorage.getItem('listPeople'));
        }
        listPeople.push({
            name: name,
            email: email,
            phone: phone
        });

        //agregamos al local estorage

        localStorage.setItem('listPeople', JSON.stringify(listPeople));
        //mostramos la data

        showData();

        limpiarData();

    }
}

function showData() {
    let listPeople;

    if (localStorage.getItem('listPeople') == null) {
        listPeople = [];

    } else {
        listPeople = JSON.parse(localStorage.getItem('listPeople'));
    }

    let html = "";
    listPeople.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.phone + "</td>";
        html += '<td><button onclick="updateData(' + index + ')" class="btn btn-secondary btn-sm">Editar Datos</button> <button onclick="deleteData(' + index + ')" class="btn btn-danger btn-sm" id="btnDelete">Borrar Datos</button></td>';
        html += "</tr>";

    })

    document.querySelector('#tableData tbody').innerHTML = html;

}
//crear

document.onload = showData();

function deleteData(index) {
    let listPeople
    if (localStorage.getItem('listPeople') == null) {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem('listPeople'));
    }
    listPeople.splice(index, 1);
    localStorage.setItem('listPeople', JSON.stringify(listPeople));
    showData();

}

function updateData(index) {

    //cambiar visibilidad de botones

    document.getElementById("btnAdd").style.display = 'none';
    document.getElementById("btnDelete").style.display = 'none';
    document.getElementById("btnUpdate", btnAdd).style.display = 'block';
    btnDelete

    let listPeople
    if (localStorage.getItem('listPeople') == null) {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem('listPeople'));
    }

    //rellenar el formulario con la data

    document.getElementById('inputEmail').value = listPeople[index].email;
    document.getElementById('inputName').value = listPeople[index].name;
    document.getElementById('inputPhone').value = listPeople[index].phone;

    //actualizamos

    document.querySelector("#btnUpdate").onclick = function () {
        if (validateForm() == true) {

            //actualizar datos

            listPeople[index].email = document.getElementById('inputEmail').value;
            listPeople[index].name = document.getElementById('inputName').value;
            listPeople[index].phone = document.getElementById('inputPhone').value;

            //guardar

            localStorage.setItem('listPeople', JSON.stringify(listPeople));

            //actualizamos la tabla

            showData();

            limpiarData();

            //cambiar la visibilidad de botones

            document.getElementById("btnAdd").style.display = 'block';
            document.getElementById("btnDelete").style.display = 'block';
            document.getElementById("btnUpdate", btnAdd).style.display = 'none';

        }
    }

}
function limpiarData() {
    
    document.getElementById('inputEmail').value = "";
    document.getElementById('inputName').value = ""
    document.getElementById('inputPhone').value = ""
}