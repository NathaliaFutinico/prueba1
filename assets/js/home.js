const img = document.getElementById('img');

img.addEventListener('click', ()=>{
    img.classList.remove('chat__container__show');
    img.classList.add('chat__container__hide');
    img.style.diplay = 'none';
});



let Go = (page) =>{
    switch (page) {
        case 'Clientes':
            $("#contenedor").load("clientes.html");
            $.getScript('assets/js/cliente.js');
            break;
        case 'Empleados':
            $("#contenedor").load("empleado.html");
            $.getScript('assets/js/empleado.js');
            break;
        default:
            break;
    }
}