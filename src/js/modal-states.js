$(document).ready(function() {
	$.ajaxSetup({
		timeout: 20000,
		error: function( objAJAXRequest, strError ){
			if (strError == "timeout"){
				modalPetitionError();
			}
		}
	});
});

function modalPetitionError(){
	$("#loading-title").empty();
	$("#loading-title").append('<i class="icon-warning-sign"></i> No se pudo resolver la petición');
	$("#loading-text").text('Revise el estado de su conexión e intente de nuevo');
}

function modalLoading(){
	$("#loading-title").empty();
	$("#loading-title").append('<i class="icon-spinner icon-spin"></i> Cargando');
	$("#loading-text").text('Por favor espere mientras buscamos los mejores precios');
}