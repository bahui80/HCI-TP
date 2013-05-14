var totalEdits = 0;

$(document).ready(function() {
//	var adults = $.cookie('adults');
//	var children = $.cookie('children');
//	var infants = $.cookie('infants');
	
	var state = "pasajeros";
	var adults = 1;
	var children = 1;
	var infants = 1;
	var firstTime = 1; // variable que me dice si ya se creo el evento para los botones editar
	
	$(".credit_card").hide();
	$("#edit_credit_card_span").hide();
	$("#edit_contact_information_span").hide();
	$("#edit_titular_information_span").hide();
	
	
	//revisar que no deja espacio entre dia mes y anio
	for(var i = 0; i < adults; i++) {
		$("#content_div").append('<div id="well_passenger_adults_' + (i + 1) + '" class="well clearfix passenger"><div class="span12"><legend><i class="icon-user"></i> Pasajero ' + (i + 1) + ' (Adulto)</legend><div class="row-fluid"><div class="span6"><label>Nombre</label><input class="fill_in span12" type="text" placeholder="Ingrese el nombre del pasajero"></div><div class="span6"><label>Apellido</label><input class="fill_in span12" type="text" placeholder="Ingrese el apellido del pasajero"></div></div><div class="row-fluid"><div class="span6"><label>DNI</label><input class="fill_in span12" type="text" placeholder="Ingrese el DNI del pasajero"></div><div class="span6"><label>Sexo</label><select class="fill_in span12"><option>Masculino</option><option>Femenino</option></select></div></div><div class="row-fluid"><div class="span6"><label>Fecha de nacimiento</label><input type="text" placeholder="dd" class="fill_in span3"><input type="text" placeholder="mm" class="fill_in span3"><input type="text" placeholder="aaaa" class="fill_in span3"></div></div></div><div class="row-fluid"><div id="edit_passenger_adults_' + (i + 1) + '_span" class="span12"><a id="edit_passenger_adults_' + (i + 1) + '" type="button" class="btn pull-right thin-font">Editar <i class="icon-pencil"></i></a></div></div></div>');
		$("#edit_passenger_adults_" + (i + 1) + "_span").hide();
	}
	
	for(var i = 0; i < children; i++) {
		$("#content_div").append('<div id="well_passenger_children_' + (i + 1) + '" class="well clearfix passenger"><div class="span12"><legend><i class="icon-user"></i> Pasajero ' + (i + adults + 1) + ' (Niño)</legend><div class="row-fluid"><div class="span6"><label>Nombre</label><input class="fill_in span12" type="text" placeholder="Ingrese el nombre del pasajero"></div><div class="span6"><label>Apellido</label><input class="fill_in span12" type="text" placeholder="Ingrese el apellido del pasajero"></div></div><div class="row-fluid"><div class="span6"><label>DNI</label><input class="fill_in span12" type="text" placeholder="Ingrese el DNI del pasajero"></div><div class="span6"><label>Sexo</label><select class="fill_in span12"><option>Masculino</option><option>Femenino</option></select></div></div><div class="row-fluid"><div class="span6"><label>Fecha de nacimiento</label><input type="text" placeholder="dd" class="fill_in span3"><input type="text" placeholder="mm" class="fill_in span3"><input type="text" placeholder="aaaa" class="fill_in span3"></div></div><div class="row-fluid"><div id="edit_passenger_children_' + (i + 1) + '_span" class="span12"><a id="edit_passenger_children_' + (i + 1) + '" type="button" class="btn pull-right thin-font">Editar <i class="icon-pencil"></i></a></div></div></div></div>');
		$("#edit_passenger_children_" + (i + 1) + "_span").hide();
	}
	
	for(var i = 0; i < infants; i++) {
		$("#content_div").append('<div id="well_passenger_infants_' + (i + 1) + '" class="well clearfix passenger"><div class="span12"><legend><i class="icon-user"></i> Pasajero ' + (i + adults + children + 1) + ' (Infante)</legend><div class="row-fluid"><div class="span6"><label>Nombre</label><input class="fill_in span12" type="text" placeholder="Ingrese el nombre del pasajero"></div><div class="span6"><label>Apellido</label><input class="fill_in span12" type="text" placeholder="Ingrese el apellido del pasajero"></div></div><div class="row-fluid"><div class="span6"><label>DNI</label><input class="fill_in span12" type="text" placeholder="Ingrese el DNI del pasajero"></div><div class="span6"><label>Sexo</label><select class="fill_in span12"><option>Masculino</option><option>Femenino</option></select></div></div><div class="row-fluid"><div class="span6"><label>Fecha de nacimiento</label><input type="text" placeholder="dd" class="fill_in span3"><input type="text" placeholder="mm" class="fill_in span3"><input type="text" placeholder="aaaa" class="fill_in span3"></div></div><div class="row-fluid"><div id="edit_passenger_infants_' + (i + 1) + '_span" class="span12"><a id="edit_passenger_infants_' + (i + 1) + '" type="button" class="btn pull-right thin-font">Editar <i class="icon-pencil"></i></a></div></div></div></div>');
		$("#edit_passenger_infants_" + (i + 1) + "_span").hide();
	}
	
	
	
	$("#next_button").click(function() {
		if(state == "pasajeros") { //pasamos al pago
			state = "tarjeta";
			
			//animacion para que suba todo y baje lo nuevo
			$(".passenger").slideUp(500);
			$(".credit_card").show();
			$(".credit_card").slideUp(500);
			$(".credit_card").slideDown(500);
			
			//cambia los titulos y los botones
			$("#title_text").text(" Informacion de pago");
			$("#prev_button_text").text(" Pasajeros");
			$("#next_button_text").text("Confirmacion ");
			
			//cambiamos imagen y barra
			$("#img_change").attr("src","img/large-2.jpg");
			$("#bar_passengers_link").empty();
			$("#bar_passengers_link").append('<a href=""><i class="icon-group"></i> Pasajeros</a>');
		} else if(state == "tarjeta") { //pasamos a la confirmacion
			state = "confirmacion";
			$(".credit_card").slideUp(500);
			$(".fill_in").attr("disabled",true);
			
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
			
			//animacion para que suba todo y baje lo nuevo
			$(".passenger").show();
			$(".passenger").slideUp(500);
			$(".credit_card").show();
			$(".passenger").slideDown(500);
			$(".credit_card").slideDown(500);
			
			//cambia los titulos, los botones y la imagen
			$("#title_text").text(" Confirmacion");
			$("#prev_button_text").text(" Pago");
			$("#next_button_text").text("Confirmar ");
			$("#img_icon").hide();
			$("#img_change").attr("src","img/large-4.jpg");
			
			//creamos todos los eventos de los botones editar
			if(firstTime) {
				for(var i = 0; i < adults; i++) {
					enableButtons("#well_passenger_adults_" + (i + 1), "#edit_passenger_adults_" + (i + 1));
				}
				for(var i = 0; i < children; i++) {
					enableButtons("#well_passenger_children_" + (i + 1), "#edit_passenger_children_" + (i + 1));
				}
				for(var i = 0; i < infants; i++) {
					enableButtons("#well_passenger_infants_" + (i + 1), "#edit_passenger_infants_" + (i + 1));
				}
				enableButtons("#well_credit_card","#edit_credit_card");
				enableButtons("#well_titular_information", "#edit_titular_information");
				enableButtons("#well_contact_information", "#edit_contact_information");
			}
			
			firstTime = 0;
		} else {
			$("#myModal").modal();
		}
	});
		
	$("#prev_button").click(function() {
		if(state == "pasajeros") { //pasamos al paso de pago
			$("#prev_button").attr("href", "results.html");
			state = "resutados";
		} else if(state == "tarjeta") { //pasamos a los pasajeros
			$("#prev_button").removeAttr("href");
			$(".credit_card").slideUp(500);
			$(".passenger").show();
			$(".passenger").slideUp(500);
			$(".passenger").slideDown(500);
			
			//cambio titulo e imagen
			$("#title_text").text(" Informacion de pasajeros");
			$("#img_change").attr("src","img/large-1.jpg");
			
			
			//cambio botones de la barra de abajo
			$("#prev_button_text").text(" Resultados");
			$("#next_button_text").text("Pago ");
			
			state = "pasajeros"
		} else if(state == "confirmacion") { //pasamos al estado de pago
			//chequear que no haya algun campo sin guardar
			//oculto los botones de editar de la tarjeta
			$("#edit_credit_card_span").hide();
			$("#edit_contact_information_span").hide();
			$("#edit_titular_information_span").hide();
			
			//oculto los botones de editar de los pasajeros
			for(var i = 0; i < adults; i++) {
				$("#edit_passenger_adults_" + (i + 1) + "_span").hide();
				enableInputs("#well_passenger_adults_" + (i + 1));
				
			}
			
			for(var i = 0; i < children; i++) {
				$("#edit_passenger_children_" + (i + 1) + "_span").hide();
				enableInputs("#well_passenger_children_" + (i + 1));
			}
			
			for(var i = 0; i < infants; i++) {
				$("#edit_passenger_infants_" + (i + 1) + "_span").hide();
				enableInputs("#well_passenger_infants_" + (i + 1));
			}
			
			//permito la escritura nuevamente de los inputs de la tarjeta
			enableInputs("#well_credit_card");
			enableInputs("#well_titular_information");
			enableInputs("#well_contact_information");
			
			$(".credit_card").slideUp(500);
			$(".passenger").slideUp(500);
			$(".credit_card").slideDown(500);
			
			//cambio titulo imagen y barra de abajo
			$("#title_text").text(" Informacion de pago");
			$("#img_change").attr("src","img/large-2.jpg");
			$("#prev_button_text").text(" Pasajeros");
			$("#next_button_text").text("Confirmacion ");
			$("#img_icon").show();
			
			state = "tarjeta";
		}
	});
});

function enableButtons(idWell, idButton) {
	$(idButton).click(function() {
		if($($(idWell).find("input")[0]).attr("disabled")) {
			$(idWell).find("input").removeAttr("disabled");
			$(idWell).find("select").removeAttr("disabled");
			$(idButton).text(" Guardar"); //AGREGAR TAMBIEN LA IMAGEN
			totalEdits++;
			console.log(totalEdits);
		} else {
			$(idWell).find("input").attr("disabled",true);
			$(idWell).find("select").attr("disabled",true);
			$(idButton).text(" Editar"); //AGREGAR TAMBIEN LA IMAGEN
			totalEdits--;
			console.log(totalEdits);
			// !!!!!!!!!!!!!!!!!!!!!!!FLATA VALIDAR BIEN!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			
		}
	});
}

function enableInputs(idWell) {
	$(idWell).find("input").removeAttr("disabled");
	$(idWell).find("select").removeAttr("disabled");
}