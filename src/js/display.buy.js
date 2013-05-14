var totalEdits = 0;

$(document).ready(function() {
//	var adults = $.cookie('adults');
//	var children = $.cookie('children');
//	var infants = $.cookie('infants');
	
	var state = "pasajeros";
	var adults = 10;
	var children = 1;
	var infants = 1;
	
	
	$(".credit_card").hide();
	$("#edit_credit_card_span").hide();
	$("#edit_contact_information_span").hide();
	$("#edit_titular_information_span").hide();
	
	for(var i = 0; i < adults; i++) {
		$("#content_div").append('<div id="well_passenger_adults_' + (i + 1) + '" class="well clearfix passenger"><div class="span12"><legend><i class="icon-user"></i> Pasajero ' + (i + 1) + ' (Adulto)</legend><div class="row-fluid"><div class="span6"><label>Nombre</label><input class="fill_in span12" type="text" placeholder="Ingrese el nombre del pasajero"></div><div class="span6"><label>Apellido</label><input class="fill_in span12" type="text" placeholder="Ingrese el apellido del pasajero"></div></div><div class="row-fluid"><div class="span6"><label>DNI</label><input class="fill_in span12" type="text" placeholder="Ingrese el DNI del pasajero"></div><div class="span6"><label>Sexo</label><select class="fill_in span12"><option>Masculino</option><option>Femenino</option></select></div></div><div class="row-fluid"><div class="span6"><label>Fecha de nacimiento</label><input type="text" placeholder="dd" class="fill_in span3"><input type="text" placeholder="mm" class="fill_in span3"><input type="text" placeholder="aaaa" class="fill_in span3"></div></div><div class="row-fluid"><div id="edit_passenger_adults_' + (i + 1) + '_span" class="span12"><a id="edit_passenger_adults_' + (i + 1) + '" type="button" class="btn pull-right thin-font">Editar <i class="icon-pencil"></i></a></div></div></div></div>');
		$("#edit_passenger_adults_" + (i + 1) + "_span").hide();
	}
	
	for(var i = 0; i < children; i++) {
		$("#content_div").append('<div id="well_passenger_children_' + (i + 1) + '" class="well clearfix passenger"><div class="span12"><legend><i class="icon-user"></i> Pasajero ' + (i + adults + 1) + ' (Ni�o)</legend><div class="row-fluid"><div class="span6"><label>Nombre</label><input class="fill_in span12" type="text" placeholder="Ingrese el nombre del pasajero"></div><div class="span6"><label>Apellido</label><input class="fill_in span12" type="text" placeholder="Ingrese el apellido del pasajero"></div></div><div class="row-fluid"><div class="span6"><label>DNI</label><input class="fill_in span12" type="text" placeholder="Ingrese el DNI del pasajero"></div><div class="span6"><label>Sexo</label><select class="fill_in span12"><option>Masculino</option><option>Femenino</option></select></div></div><div class="row-fluid"><div class="span6"><label>Fecha de nacimiento</label><input type="text" placeholder="dd" class="fill_in span3"><input type="text" placeholder="mm" class="fill_in span3"><input type="text" placeholder="aaaa" class="fill_in span3"></div></div><div class="row-fluid"><div id="edit_passenger_children_' + (i + 1) + '_span" class="span12"><a id="edit_passenger_children_' + (i + 1) + '" type="button" class="btn pull-right thin-font">Editar <i class="icon-pencil"></i></a></div></div></div></div>');
		$("#edit_passenger_children_" + (i + 1) + "_span").hide();
	}
	
	for(var i = 0; i < infants; i++) {
		$("#content_div").append('<div id="well_passenger_infants_' + (i + 1) + '" class="well clearfix passenger"><div class="span12"><legend><i class="icon-user"></i> Pasajero ' + (i + adults + children + 1) + ' (Infante)</legend><div class="row-fluid"><div class="span6"><label>Nombre</label><input class="fill_in span12" type="text" placeholder="Ingrese el nombre del pasajero"></div><div class="span6"><label>Apellido</label><input class="fill_in span12" type="text" placeholder="Ingrese el apellido del pasajero"></div></div><div class="row-fluid"><div class="span6"><label>DNI</label><input class="fill_in span12" type="text" placeholder="Ingrese el DNI del pasajero"></div><div class="span6"><label>Sexo</label><select class="fill_in span12"><option>Masculino</option><option>Femenino</option></select></div></div><div class="row-fluid"><div class="span6"><label>Fecha de nacimiento</label><input type="text" placeholder="dd" class="fill_in span3"><input type="text" placeholder="mm" class="fill_in span3"><input type="text" placeholder="aaaa" class="fill_in span3"></div></div><div class="row-fluid"><div id="edit_passenger_infants_' + (i + 1) + '_span" class="span12"><a id="edit_passenger_infants_' + (i + 1) + '" type="button" class="btn pull-right thin-font">Editar <i class="icon-pencil"></i></a></div></div></div></div>');
		$("#edit_passenger_infants_" + (i + 1) + "_span").hide();
	}
	
	
	
	$("#next_button").click(function() {
		if(state == "pasajeros") { //pasamos al pago
			state = "tarjeta";
			$(".passenger").slideUp(500);
			$(".credit_card").slideDown(500);
			
			//cambia los titulos y los botones
			$("#title_text").text(" Informacion de pago");
			$("#prev_button_text").text(" Pasajeros");
			$("#next_button_text").text("Confirmacion ");
		} else if(state == "tarjeta") { //pasamos a la confirmacion
			state = "confirmacion";
			$(".credit_card").slideUp(500);
			$(".fill_in").prop('disabled',true);
			
			//muestra los botones editar de la tarjeta
			$("#edit_credit_card_span").show();
			$("#edit_contact_information_span").show();
			$("#edit_titular_information_span").show();
			
			//muestra los botontes editar de los pasajeros
			for(var i = 0; i < adults; i++) {
				$("#edit_passenger_adults_" + (i + 1) + "_span").show();
			}
			for(var i = 0; i < children; i++) {
				$("#edit_passenger_children_" + (i + 1) + "_span").show();
			}
			for(var i = 0; i < infants; i++) {
				$("#edit_passenger_infants_" + (i + 1) + "_span").show();
			}
			
			$(".passenger").slideDown(500);
			$(".credit_card").slideDown(500);
			
			//cambia los titulos y los botones
			$("#title_text").text(" Confirmacion");
			$("#prev_button_text").text(" Pago");
			$("#next_button_text").text("Confirmar ");
			
			//creamos todos los eventos de los botones editar
			for(var i = 0; i < adults; i++) {
				enableButtons("#well_passenger_adults_" + (i + 1), "#edit_passenger_adults_" + (i + 1));
			}
			for(var i = 0; i < children; i++) {
				enableButtons("#well_passenger_children_" + (i + 1), "#edit_passenger_children_" + (i + 1));
			}
			for(var i = 0; i < infants; i++) {
				enableButtons("#well_passenger_infants_" + (i + 1), "#edit_passenger_infants_" + (i + 1));
			}
		}
	});
	
	
	
	
	
	
	

		
	$("#prev_button").click(function() {
		$("#prev_button").attr("href", "results.html");
	});
});

function enableButtons(idWell, idButton) {
	$(idButton).click(function() {
		console.log($(idWell).find("input")[0].hasOwnProperty("disabled"));
		if($(idWell).find("input")[0].hasOwnProperty("disabled")) {
			$(idWell).find("input").prop('disabled',false);
			$(idButton).text(" Guardar");
			totalEdits++;
			console.log(totalEdits);
		} else {
			$(idWell).find("input").prop('disabled',true);
			$(idButton).text(" Editar");
			totalEdits--;
			console.log(totalEdits);
			// !!!!!!!!!!!!!!!!!!!!!!!FLATA VALIDAR BIEN!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			
		}
	});
}