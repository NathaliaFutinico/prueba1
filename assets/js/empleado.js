let employee = class {
    constructor() {
        this.get_employee();
    }

    clear(){
        $("#first_name").val('');
        $("#last_name").val('');
        $("#document_type").val('');
        $("#document").val('');
        $("#hour").val('');
        $("#put_employee").html(`<button class="btn btn-block btn-primary mb-2" type="button" onclick="post_cliente()">Registrar</button>`);
    }

    post_employee(data){
        $.ajax({
            type: 'POST',
            url: `http://localhost:8000/empleado/viewset/empleado/`,
            dataType: 'json',
            data: data,
            success: (form) =>{
                obj.get_employee();
                alert('Registro Exitoso');
            },
            error: (XMLHttpRequest, textStatus, errorThorwn) =>{
                alert('Status:' + XMLHttpRequest.responseJSON.detail);
            }
        });
    }

    get_employee(){
        $.ajax({
            type: "GET",
            url: `http://localhost:8000/empleado/viewset/empleado/`,
            dataType: 'json',
            success: (form) => {
               let html = ""
               form.forEach(e => {

                html = html + `<tr>
                                <td>${e.nombres}</td>
                                <td>${e.apellidos}</td>
                                <td>${e.tipodocumento}</td>
                                <td>${e.numdocumento}</td>
                                <td>${e.horario}</td>
                                <td><button class="btn btn-block btn-primary" type="button" onclick="detail_emp(${e.id})">Editar</button></td>
                                <td><button class="btn btn-block btn-danger" type="button" onclick="delete_emp(${e.id})">Eliminar</button></td>
                            </tr>`
               });

               $('#list_employee').html(html);
            },
            error: (XMLHttpRequest, textStatus, errorThrown) => {
                alert("Status: " + XMLHttpRequest.responseJSON.detail);
            }
        });
    }

    detail_employee(id){
        $.ajax({
            type: "GET",
            url: `http://localhost:8000/empleado/viewset/empleado/${id}/`,
            dataType: 'json',
            success: (form) => {
               
                $("#first_name").val(form.nombres);
                $("#last_name").val(form.apellidos);
                $("#document_type").val(form.tipodocumento);
                $("#document").val(form.numdocumento);
                $("#hour").val(form.horario);
                
                $("#put_employee").html(`<button class="btn btn-block btn-warning" type="button" onclick="put_emp(${form.id})">Modificar</button>`);
            },
            error: (XMLHttpRequest, textStatus, errorThrown) => {
                alert("Status: " + XMLHttpRequest.responseJSON.detail);
            }
        });
    }

    put_employee(id,data) {
        $.ajax({
            type: "PUT",
            url: `http://localhost:8000/empleado/viewset/empleado/${id}/`,
            dataType: 'json',
            data: data,
            success: (form) => {
                //
                obj.get_employee();
                alert("Actualizado Exitoso");
                obj.clear();
            },
            error: (XMLHttpRequest, textStatus, errorThrown) => {
                alert("Status: " + XMLHttpRequest.responseJSON.detail);
            }
        });
    }

    delete_employee(id) {
        $.ajax({
            type: "DELETE",
            url: `http://localhost:8000/empleado/viewset/empleado/${id}/`,
            dataType: 'json',
            success: (form) => {
                //
                obj.get_employee();
                alert("Eliminado Exitoso");
            },
            error: (XMLHttpRequest, textStatus, errorThrown) => {
                alert("Status: " + XMLHttpRequest.responseJSON.detail);
            }
        });
    }
}

let obj = new employee();

const post_emp = () =>{
    debugger;
    let data = {
        nombres: $('#first_name').val(),
        apellidos: $('#last_name').val(),
        tipodocumento: $('#document_type').val(),
        numdocumento: $('#document').val(),
        horario: $('#hour').val(),
    }
    obj.post_employee(data);
}

const detail_emp = (id) =>{
    obj.detail_employee(id);
}

const put_emp = (id) =>{
    let data = {
        nombres: $('#first_name').val(),
        apellidos: $('#last_name').val(),
        tipodocumento: $('#document_type').val(),
        numdocumento: $('#document').val(),
        horario: $('#hour').val(),
    }
    obj.put_employee(id, data);
}

const delete_emp = (id) =>{
    obj.delete_employee(id);
}