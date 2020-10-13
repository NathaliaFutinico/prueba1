var cliente = class {
    constructor() {
        this.get_clientes();
    }

    clear(){
        $("#nombre").val('');
        $("#apellido").val('');
        $("#tipo_doc").val('');
        $("#doc").val('');
        $("#direccion").val('');
        $("#mail").val('');
        document.getElementById("put_client").innerHTML = `<button class="btn btn-block btn-primary mb-2" type="button" onclick="post_cliente()">Registrar</button>`;
    }
    
    post_cliente(data) {
        $.ajax({
            type: "POST",
            url: `http://localhost:8000/cliente/viewset/cliente/`,
            dataType: 'json',
            data: data,
            success: function (formulario) {
                //
                clientes.get_clientes();
                alert("Se registro con exito");
                clientes.clear();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + XMLHttpRequest.responseJSON.detail);
            }
        });
    }

    get_clientes(){
        $.ajax({
            type: "GET",
            url: `http://localhost:8000/cliente/viewset/cliente/`,
            dataType: 'json',
            success: function (formulario) {
               let html = ""
               formulario.forEach(element => {

                html = html+`<tr>
                                <td>${element.nombres}</td>
                                <td>${element.apellidos}</td>
                                <td>${element.tipodocumento}</td>
                                <td>${element.numdocumento}</td>
                                <td>${element.direccion}</td>
                                <td>${element.email}</td>
                                <td><button class="btn btn-block btn-primary" type="button" onclick="detail_cliente(${element.id})">Editar</button></td>
                                <td><button class="btn btn-block btn-danger" type="button" onclick="delete_cliente(${element.id})">Eliminar</button></td>
                            </tr>`
               });

               document.getElementById('client_list').innerHTML = html;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + XMLHttpRequest.responseJSON.detail);
            }
        });
        
        
    }

    detail_cliente(id){
        $.ajax({
            type: "GET",
            url: `http://localhost:8000/cliente/viewset/cliente/${id}/`,
            dataType: 'json',
            success: function (formulario) {
               
                $("#nombre").val(formulario.nombres);
                $("#apellido").val(formulario.apellidos);
                $("#tipo_doc").val(formulario.tipodocumento);
                $("#doc").val(formulario.numdocumento);
                $("#direccion").val(formulario.direccion);
                $("#mail").val(formulario.email);   
                
                document.getElementById("put_client").innerHTML = `<button class="btn btn-block btn-warning" type="button" onclick="put_cliente(${formulario.id})">Modificar</button>`;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + XMLHttpRequest.responseJSON.detail);
            }
        });
    
    }


    put_cliente(id,data) {
        $.ajax({
            type: "PUT",
            url: `http://localhost:8000/cliente/viewset/cliente/${id}/`,
            dataType: 'json',
            data: data,
            success: function (formulario) {
                //
                clientes.get_clientes();
                alert("Se Actualizo con exito");
                clientes.clear();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + XMLHttpRequest.responseJSON.detail);
            }
        });
    }

    delete_cliente(id) {
        $.ajax({
            type: "DELETE",
            url: `http://localhost:8000/cliente/viewset/cliente/${id}/`,
            dataType: 'json',
            success: function (formulario) {
                //
                clientes.get_clientes();
                alert("Se Elimino con exito");

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + XMLHttpRequest.responseJSON.detail);
            }
        });
    }

}

var clientes = new cliente();


function post_cliente(){
    debugger;
    let data = {
        nombres: $("#nombre").val(),
        apellidos: $("#apellido").val(),
        tipodocumento: $("#tipo_doc").val(),
        numdocumento: $("#doc").val(),
        direccion: $("#direccion").val(),
        email: $("#mail").val(),
    }
    clientes.post_cliente(data);
}

function detail_cliente(id){
        clientes.detail_cliente(id);
}
function put_cliente(id){
    let data = {
        nombres: $("#nombre").val(),
        apellidos: $("#apellido").val(),
        tipodocumento: $("#tipo_doc").val(),
        numdocumento: $("#doc").val(),
        direccion: $("#direccion").val(),
        email: $("#mail").val(),
    }
    clientes.put_cliente(id,data);
}

function delete_cliente(id){
    
    clientes.delete_cliente(id);
}




