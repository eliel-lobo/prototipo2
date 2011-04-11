function desplegar_avanzada(){
    var interruptor = $('#avanzada-on-off').val();
    if(interruptor == "off") {
        $('#div_avanzada').slideDown('slow');
        interruptor = $('#avanzada-on-off').val("on");
        $('#but_desplegar').html("&nbsp;[-]&nbsp;");
    } else {
        $('#div_avanzada').slideUp('slow');
        interruptor = $('#avanzada-on-off').val("off");
        $('#but_desplegar').html("&nbsp;[+]");
    }
}

function buscar(){
    alert("buscando...?? :)");
}
