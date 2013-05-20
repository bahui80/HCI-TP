var totalEdits = 0;
var adults = 0;
var children = 0;
var infants = 0;

$(document).ready(function() {
//	var adults = $.cookie('adults');
//	var children = $.cookie('children');
//	var infants = $.cookie('infants');
	
	var state = "pasajeros";
	var firstTime = 1; // variable que me dice si ya se creo el evento para los botones editar
	
	$(".credit_card").hide();
	$("#edit_credit_card_span").hide();
	$("#edit_contact_information_span").hide();
	$("#edit_titular_information_span").hide();
	$("#number_credit_card_error").hide();
	$("#expiration_credit_card_error").hide();
	$("#security_credit_card_error").hide();
	
	
	$("#number_credit_card").focusout(function() {
		$("#number_credit_card_span").removeClass('control-group error');
		$("#number_credit_card_error").hide();
	});
	
	$("#expiration_credit_card").focusout(function() {
		$("#expiration_credit_card_span").removeClass('control-group error');
		$("#expiration_credit_card_error").hide();
	});
	
	$("#security_credit_card").focusout(function() {
		$("#security_credit_card_span").removeClass('control-group error');
		$("#security_credit_card_error").hide();
	});
	
	
	//revisar que no deja espacio entre dia mes y anio
	for(var i = 0; i < adults; i++) {
		$("#content_div").append('<div id="well_passenger_adults_' + (i + 1) + '" class="well clearfix passenger"><div class="span12"><legend><i class="icon-user"></i> Pasajero ' + (i + 1) + ' (Adulto)</legend><div class="row-fluid"><div id="passenger_adults_' + (i + 1) + '_name_span" class="span6"><label>Nombre</label><input id="passenger_adults_' + (i + 1) + '_name" class="fill_in span12" type="text" placeholder="Ingrese el nombre del pasajero"><p id="passenger_adults_' + (i + 1) + '_name_error" class="text-error"><i class="icon-remove"></i><small id="passenger_adults_' + (i + 1) + '_name_error_text"> Ingrese el nombre del pasajero</small></p></div><div id="passenger_adults_' + (i + 1) + '_surname_span" class="span6"><label>Apellido</label><input id="passenger_adults_' + (i + 1) + '_surname" class="fill_in span12" type="text" placeholder="Ingrese el apellido del pasajero"><p id="passenger_adults_' + (i + 1) + '_surname_error" class="text-error"><i class="icon-remove"></i><small id="passenger_adults_' + (i + 1) + '_surname_error_text"> Ingrese el apellido del pasajero</small></p></div></div><div class="row-fluid"><div id="passenger_adults_' + (i + 1) + '_dni_span" class="span6"><label>DNI</label><input id="passenger_adults_' + (i + 1) + '_dni" class="fill_in span12" type="text" placeholder="Ingrese el DNI del pasajero"><p id="passenger_adults_' + (i + 1) + '_dni_error" class="text-error"><i class="icon-remove"></i><small id="passenger_adults_' + (i + 1) + '_dni_error_text"> Ingrese el DNI del pasajero</small></p></div><div class="span6"><label>Sexo</label><select class="fill_in span12"><option>Masculino</option><option>Femenino</option></select></div></div><div class="row-fluid"><div id="passenger_adults_' + (i + 1) + '_date_span" class="span6"><label>Fecha de nacimiento</label><input id="passenger_adults_' + (i + 1) + '_day" type="text" placeholder="dd" class="fill_in span3"><input id="passenger_adults_' + (i + 1) + '_month" type="text" placeholder="mm" class="fill_in span3"><input id="passenger_adults_' + (i + 1) + '_year" type="text" placeholder="aaaa" class="fill_in span3"><p id="passenger_adults_' + (i + 1) + '_date_error" class="text-error"><i class="icon-remove"></i><small id="passenger_adults_' + (i + 1) + '_date_error_text"> Ingrese la fecha de nacimiento del pasajero</small></p></div></div></div><div class="row-fluid"><div id="edit_passenger_adults_' + (i + 1) + '_span" class="span12"><a id="edit_passenger_adults_' + (i + 1) + '" type="button" class="btn pull-right thin-font">Editar <i class="icon-pencil"></i></a></div></div></div>');
		focusOutField("#passenger_adults_" + (i + 1) + "_name", "#passenger_adults_" + (i + 1) + "_name_span", "#passenger_adults_" + (i + 1 ) + "_name_error");
		focusOutField("#passenger_adults_" + (i + 1) + "_surname", "#passenger_adults_" + (i + 1) + "_surname_span", "#passenger_adults_" + (i + 1 ) + "_surname_error");
		focusOutField("#passenger_adults_" + (i + 1) + "_dni", "#passenger_adults_" + (i + 1) + "_dni_span", "#passenger_adults_" + (i + 1 ) + "_dni_error");
		$("#edit_passenger_adults_" + (i + 1) + "_span").hide();
		$("#passenger_adults_" + (i + 1) + "_name_error").hide();
		$("#passenger_adults_" + (i + 1) + "_surname_error").hide();
		$("#passenger_adults_" + (i + 1) + "_dni_error").hide();
		$("#passenger_adults_" + (i + 1) + "_date_error").hide();
	}
	
	for(var i = 0; i < children; i++) {
		$("#content_div").append('<div id="well_passenger_children_' + (i + 1) + '" class="well clearfix passenger"><div class="span12"><legend><i class="icon-user"></i> Pasajero ' + (i + adults + 1) + ' (Ni&#241;o)</legend><div class="row-fluid"><div id="passenger_children_' + (i + 1) + '_name_span" class="span6"><label>Nombre</label><input id="passenger_children_' + (i + 1) + '_name" class="fill_in span12" type="text" placeholder="Ingrese el nombre del pasajero"><p id="passenger_children_' + (i + 1) + '_name_error" class="text-error"><i class="icon-remove"></i><small id="passenger_children_' + (i + 1) + '_name_error_text"> Ingrese el nombre del pasajero</small></p></div><div id="passenger_children_' + (i + 1) + '_surname_span" class="span6"><label>Apellido</label><input id="passenger_children_' + (i + 1) + '_surname" class="fill_in span12" type="text" placeholder="Ingrese el apellido del pasajero"><p id="passenger_children_' + (i + 1) + '_surname_error" class="text-error"><i class="icon-remove"></i><small id="passenger_children_' + (i + 1) + '_surname_error_text"> Ingrese el apellido del pasajero</small></p></div></div><div class="row-fluid"><div id="passenger_children_' + (i + 1) + '_dni_span" class="span6"><label>DNI</label><input id="passenger_children_' + (i + 1) + '_dni" class="fill_in span12" type="text" placeholder="Ingrese el DNI del pasajero"><p id="passenger_children_' + (i + 1) + '_dni_error" class="text-error"><i class="icon-remove"></i><small id="passenger_children_' + (i + 1) + '_dni_error_text"> Ingrese el DNI del pasajero</small></p></div><div class="span6"><label>Sexo</label><select class="fill_in span12"><option>Masculino</option><option>Femenino</option></select></div></div><div class="row-fluid"><div id="passenger_children_' + (i + 1) + '_date_span" class="span6"><label>Fecha de nacimiento</label><input id="passenger_children_' + (i + 1) + '_day" type="text" placeholder="dd" class="fill_in span3"><input id="passenger_children_' + (i + 1) + '_month" type="text" placeholder="mm" class="fill_in span3"><input id="passenger_children_' + (i + 1) + '_year" type="text" placeholder="aaaa" class="fill_in span3"><p id="passenger_children_' + (i + 1) + '_date_error" class="text-error"><i class="icon-remove"></i><small id="passenger_children_' + (i + 1) + '_date_error_text"> Ingrese la fecha de nacimiento del pasajero</small></p></div></div><div class="row-fluid"><div id="edit_passenger_children_' + (i + 1) + '_span" class="span12"><a id="edit_passenger_children_' + (i + 1) + '" type="button" class="btn pull-right thin-font">Editar <i class="icon-pencil"></i></a></div></div></div></div>');
		focusOutField("#passenger_children_" + (i + 1) + "_name", "#passenger_children_" + (i + 1) + "_name_span", "#passenger_children_" + (i + 1 ) + "_name_error");
		focusOutField("#passenger_children_" + (i + 1) + "_surname", "#passenger_children_" + (i + 1) + "_surname_span", "#passenger_children_" + (i + 1 ) + "_surname_error");
		focusOutField("#passenger_children_" + (i + 1) + "_dni", "#passenger_children_" + (i + 1) + "_dni_span", "#passenger_children_" + (i + 1 ) + "_dni_error");
		$("#edit_passenger_children_" + (i + 1) + "_span").hide();
		$("#passenger_children_" + (i + 1) + "_name_error").hide();
		$("#passenger_children_" + (i + 1) + "_surname_error").hide();
		$("#passenger_children_" + (i + 1) + "_dni_error").hide();
		$("#passenger_children_" + (i + 1) + "_date_error").hide();
	}
	
	for(var i = 0; i < infants; i++) {
		$("#content_div").append('<div id="well_passenger_infants_' + (i + 1) + '" class="well clearfix passenger"><div class="span12"><legend><i class="icon-user"></i> Pasajero ' + (i + adults + children + 1) + ' (Infante)</legend><div class="row-fluid"><div id="passenger_infants_' + (i + 1) + '_name_span" class="span6"><label>Nombre</label><input id="passenger_infants_' + (i + 1) + '_name" class="fill_in span12" type="text" placeholder="Ingrese el nombre del pasajero"><p id="passenger_infants_' + (i + 1) + '_name_error" class="text-error"><i class="icon-remove"></i><small id="passenger_infants_' + (i + 1) + '_name_error_text"> Ingrese el nombre del pasajero</small></p></div><div id="passenger_infants_' + (i + 1) + '_surname_span" class="span6"><label>Apellido</label><input id="passenger_infants_' + (i + 1) + '_surname" class="fill_in span12" type="text" placeholder="Ingrese el apellido del pasajero"><p id="passenger_infants_' + (i + 1) + '_surname_error" class="text-error"><i class="icon-remove"></i><small id="passenger_infants_' + (i + 1) + '_surname_error_text"> Ingrese el apellido del pasajero</small></p></div></div><div class="row-fluid"><div id="passenger_infants_' + (i + 1) + '_dni_span" class="span6"><label>DNI</label><input id="passenger_infants_' + (i + 1) + '_dni" class="fill_in span12" type="text" placeholder="Ingrese el DNI del pasajero"><p id="passenger_infants_' + (i + 1) + '_dni_error" class="text-error"><i class="icon-remove"></i><small id="passenger_infants_' + (i + 1) + '_dni_error_text"> Ingrese el DNI del pasajero</small></p></div><div class="span6"><label>Sexo</label><select class="fill_in span12"><option>Masculino</option><option>Femenino</option></select></div></div><div class="row-fluid"><div id="passenger_infants_' + (i + 1) + '_date_span" class="span6"><label>Fecha de nacimiento</label><input id="passenger_infants_' + (i + 1) + '_day" type="text" placeholder="dd" class="fill_in span3"><input id="passenger_infants_' + (i + 1) + '_month" type="text" placeholder="mm" class="fill_in span3"><input id="passenger_infants_' + (i + 1) + '_year" type="text" placeholder="aaaa" class="fill_in span3"><p id="passenger_infants_' + (i + 1) + '_date_error" class="text-error"><i class="icon-remove"></i><small id="passenger_infants_' + (i + 1) + '_date_error_text"> Ingrese la fecha de nacimiento del pasajero</small></p></div></div><div class="row-fluid"><div id="edit_passenger_infants_' + (i + 1) + '_span" class="span12"><a id="edit_passenger_infants_' + (i + 1) + '" type="button" class="btn pull-right thin-font">Editar <i class="icon-pencil"></i></a></div></div></div></div>');
		focusOutField("#passenger_infants_" + (i + 1) + "_name", "#passenger_infants_" + (i + 1) + "_name_span", "#passenger_infants_" + (i + 1 ) + "_name_error");
		focusOutField("#passenger_infants_" + (i + 1) + "_surname", "#passenger_infants_" + (i + 1) + "_surname_span", "#passenger_infants_" + (i + 1 ) + "_surname_error");
		focusOutField("#passenger_infants_" + (i + 1) + "_dni", "#passenger_infants_" + (i + 1) + "_dni_span", "#passenger_infants_" + (i + 1 ) + "_dni_error");
		$("#edit_passenger_infants_" + (i + 1) + "_span").hide();
		$("#passenger_infants_" + (i + 1) + "_name_error").hide();
		$("#passenger_infants_" + (i + 1) + "_surname_error").hide();
		$("#passenger_infants_" + (i + 1) + "_dni_error").hide();
		$("#passenger_infants_" + (i + 1) + "_date_error").hide();
	}
	
	$("#next_button").click(function() {
		if(state == "pasajeros") { //pasamos al pago
			if(validatePassengers()) {
				state = "tarjeta";
				
				//animacion para que suba todo y baje lo nuevo
				$(".passenger").slideUp(500);
				$(".credit_card").show();
				$(".credit_card").slideUp(500);
				$(".credit_card").slideDown(500);
				
				//cambia los titulos y los botones
				$("#title_text").text(' Informacion de pago');
		//		$("#prev_button_text").text(" Pasajeros");
				$("#next_button_text").text("Confirmacion ");
				
				//cambiamos imagen y barra
				$("#img_change").attr("src","img/large-2.jpg");
				$("#bar_passengers_link").empty();
				$("#bar_passengers_link").append('<a href=""><i class="icon-group"></i> Pasajeros</a>');
			}
		} else if(state == "tarjeta") { //pasamos a la confirmacion
			if(validateCreditCard()) {
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
				$("#title_text").text(" Confirmación");
		//		$("#prev_button_text").text(" Pago");
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
			}
		} else {
			//chequeo que no haya algun campo sin guardar
			if(totalEdits != 0) {
				$("#modalError").modal();
				$("#modalError_button").click(function() {
					$("#modalError").modal("hide");
				});
				for(var i = 0; i < adults; i++) {
					showError("#well_passenger_adults_" + (i + 1), "#edit_passenger_adults_" + (i + 1));
				}
				for(var i = 0; i < children; i++) {
					showError("#well_passenger_children_" + (i + 1), "#edit_passenger_children_" + (i + 1));
				}
				for(var i = 0; i < infants; i++) {
					showError("#well_passenger_infants_" + (i + 1), "#edit_passenger_infants_" + (i + 1));
				}
				showError("#well_credit_card","#edit_credit_card");
				showError("#well_titular_information", "#edit_titular_information");
				showError("#well_contact_information", "#edit_contact_information");
			} else {
				$("#myModal").modal();
			}
		}
	});
		
//	$("#prev_button").click(function() {
//		if(state == "pasajeros") { //pasamos al paso de pago
//			$("#prev_button").attr("href", "results.html");
//			state = "resutados";
//		} else if(state == "tarjeta") { //pasamos a los pasajeros
//			$("#prev_button").removeAttr("href");
//			$(".credit_card").slideUp(500);
//			$(".passenger").show();
//			$(".passenger").slideUp(500);
//			$(".passenger").slideDown(500);
//			
//			//cambio titulo e imagen
//			$("#title_text").text(" Informacion de pasajeros");
//			$("#img_change").attr("src","img/large-1.jpg");
//			
//			
//			//cambio botones de la barra de abajo
//			$("#prev_button_text").text(" Resultados");
//			$("#next_button_text").text("Pago ");
//			
//			state = "pasajeros"
//		} else if(state == "confirmacion") { //pasamos al estado de pago
//			
//			
//			//oculto los botones de editar de la tarjeta
//			$("#edit_credit_card_span").hide();
//			$("#edit_contact_information_span").hide();
//			$("#edit_titular_information_span").hide();
//			
//			//oculto los botones de editar de los pasajeros
//			for(var i = 0; i < adults; i++) {
//				$("#edit_passenger_adults_" + (i + 1) + "_span").hide();
//				enableInputs("#well_passenger_adults_" + (i + 1));
//				
//			}
//			
//			for(var i = 0; i < children; i++) {
//				$("#edit_passenger_children_" + (i + 1) + "_span").hide();
//				enableInputs("#well_passenger_children_" + (i + 1));
//			}
//			
//			for(var i = 0; i < infants; i++) {
//				$("#edit_passenger_infants_" + (i + 1) + "_span").hide();
//				enableInputs("#well_passenger_infants_" + (i + 1));
//			}
//			
//			//permito la escritura nuevamente de los inputs de la tarjeta
//			enableInputs("#well_credit_card");
//			enableInputs("#well_titular_information");
//			enableInputs("#well_contact_information");
//			
//			$(".credit_card").slideUp(500);
//			$(".passenger").slideUp(500);
//			$(".credit_card").slideDown(500);
//			
//			//cambio titulo imagen y barra de abajo
//			$("#title_text").text(" Informacion de pago");
//			$("#img_change").attr("src","img/large-2.jpg");
//			$("#prev_button_text").text(" Pasajeros");
//			$("#next_button_text").text("Confirmacion ");
//			$("#img_icon").show();
//			
//			state = "tarjeta";
//		}
//	});
});

function enableButtons(idWell, idButton) {
	$(idButton).click(function() {
		//falta la validacion 
		//si paso la validacion
		$(idWell).removeClass("well-group-error");
		$(idButton).removeClass("btn-danger");
		//hasta aca si la paso
		
		if($($(idWell).find("input")[0]).attr("disabled")) {
			$(idWell).find("input").removeAttr("disabled");
			$(idWell).find("select").removeAttr("disabled");
			$(idButton).text(" Guardar ");
			$(idButton).append('<i class="icon-save"></i>');
			totalEdits++;
			console.log(totalEdits);
		} else {
			$(idWell).find("input").attr("disabled",true);
			$(idWell).find("select").attr("disabled",true);
			$(idButton).text(" Editar ");
			$(idButton).append('<i class="icon-pencil"></i>');
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

function showError(idWell, idButton) {
	if(!$($(idWell).find("input")[0]).attr("disabled")) {
		$(idWell).addClass("well-group-error");
		$(idButton).addClass("btn-danger");
	}
}

function validatePassengers() {
	var error1 = false;
	var error2 = false;
	var error3 = false;

	for(var i = 0; i < adults; i++) {
		error1 = validateAdultPassenger("#passenger_adults_" + (i + 1) + "_name_span", $("#passenger_adults_" + (i + 1) + "_name").val(), "#passenger_adults_" + (i + 1) + "_name_error", "#passenger_adults_" + (i + 1) + "_name_error_text", "#passenger_adults_" + (i + 1) + "_surname_span", $("#passenger_adults_" + (i + 1) + "_surname").val(), "#passenger_adults_" + (i + 1) + "_surname_error", "#passenger_adults_" + (i + 1) + "_surname_error_text", "#passenger_adults_" + (i + 1) + "_dni_span", $("#passenger_adults_" + (i + 1) + "_dni").val(), "#passenger_adults_" + (i + 1) + "_dni_error", "#passenger_adults_" + (i + 1) + "_dni_error_text","#passenger_adults_" + (i + 1) + "_date_span", $("#passenger_adults_" + (i + 1) + "_day").val(), $("#passenger_adults_" + (i + 1) + "_month").val(), $("#passenger_adults_" + (i + 1) + "_year").val(), "#passenger_adults_" + (i + 1) + "_date_error", "#passenger_adults_" + (i + 1) + "_date_error_text");
	}
	for(var i = 0; i < children; i++) {
		error2 = validateChildrenPassenger("#passenger_children_" + (i + 1) + "_name_span", $("#passenger_children_" + (i + 1) + "_name").val(), "#passenger_children_" + (i + 1) + "_name_error", "#passenger_children_" + (i + 1) + "_name_error_text", "#passenger_children_" + (i + 1) + "_surname_span", $("#passenger_children_" + (i + 1) + "_surname").val(), "#passenger_children_" + (i + 1) + "_surname_error", "#passenger_children_" + (i + 1) + "_surname_error_text", "#passenger_children_" + (i + 1) + "_dni_span", $("#passenger_children_" + (i + 1) + "_dni").val(), "#passenger_children_" + (i + 1) + "_dni_error", "#passenger_children_" + (i + 1) + "_dni_error_text","#passenger_children_" + (i + 1) + "_date_span", $("#passenger_children_" + (i + 1) + "_day").val(), $("#passenger_children_" + (i + 1) + "_month").val(), $("#passenger_children_" + (i + 1) + "_year").val(), "#passenger_children_" + (i + 1) + "_date_error", "#passenger_children_" + (i + 1) + "_date_error_text");
	}
	for(var i = 0; i < infants; i++) {
		error3 = validateInfantPassenger("#passenger_infants_" + (i + 1) + "_name_span", $("#passenger_infants_" + (i + 1) + "_name").val(), "#passenger_infants_" + (i + 1) + "_name_error", "#passenger_infants_" + (i + 1) + "_name_error_text", "#passenger_infants_" + (i + 1) + "_surname_span", $("#passenger_infants_" + (i + 1) + "_surname").val(), "#passenger_infants_" + (i + 1) + "_surname_error", "#passenger_infants_" + (i + 1) + "_surname_error_text", "#passenger_infants_" + (i + 1) + "_dni_span", $("#passenger_infants_" + (i + 1) + "_dni").val(), "#passenger_infants_" + (i + 1) + "_dni_error", "#passenger_infants_" + (i + 1) + "_dni_error_text","#passenger_infants_" + (i + 1) + "_date_span", $("#passenger_infants_" + (i + 1) + "_day").val(), $("#passenger_infants_" + (i + 1) + "_month").val(), $("#passenger_infants_" + (i + 1) + "_year").val(), "#passenger_infants_" + (i + 1) + "_date_error", "#passenger_infants_" + (i + 1) + "_date_error_text");
	}

	return !error1 && !error2 && !error3;
}

function validateAdultPassenger(passengerNameSpan, passengerName, passengerNameError, passengerNameErrorText, passengerSurnameSpan, passengerSurname, passengerSurnameError, passengerSurnameErrorText, passengerDNISpan, passengerDNI, passengerDNIError, passengerDNIErrorText, passengerDateSpan, passengerDay, passengerMonth, passengerYear, passengerDateError, passengerDateErrorText) {
	var error = false;
	
	if(passengerName == "") {
		$(passengerNameSpan).addClass("control-group error");
		$(passengerNameErrorText).text(" Ingrese el nombre del pasajero");
		$(passengerNameError).show();
		error = true;
	} else if(!validateTextField(passengerName)) {
		$(passengerNameSpan).addClass("control-group error");
		$(passengerNameErrorText).text(" Ingrese un nombre valido");
		$(passengerNameError).show();
		error = true;
	}
	
	if(passengerSurname == "") {
		$(passengerSurnameSpan).addClass("control-group error");
		$(passengerSurnameErrorText).text(" Ingrese el apellido del pasajero");
		$(passengerSurnameError).show();
		error = true;
	} else if(!validateTextField(passengerSurname)) {
		$(passengerSurnameSpan).addClass("control-group error");
		$(passengerSurnameErrorText).text(" Ingrese un apellido valido");
		$(passengerSurnameError).show();
		error = true;
	}
	
	if(passengerDNI == "") {
		$(passengerDNISpan).addClass("control-group error");
		$(passengerDNIErrorText).text(" Ingrese el numero de DNI del pasajero");
		$(passengerDNIError).show();
		error = true;
	} else if(!validateDNIField(passengerDNI)) {
		$(passengerDNISpan).addClass("control-group error");
		$(passengerDNIErrorText).text(" Ingrese un numero de DNI valido");
		$(passengerDNIError).show();
		error = true;
	}
	
	if(passengerDay == "" || passengerMonth == "" || passengerYear == "") {
		$(passengerDateSpan).addClass("control-group error");
		$(passengerDateErrorText).text(" Ingrese la fecha de nacimiento del pasajero");
		$(passengerDateError).show();
		error = true;
	} else if(!validateDate(passengerDay, passengerMonth, passengerYear)) {
		$(passengerDateSpan).addClass("control-group error");
		$(passengerDateErrorText).text(" Ingrese una fecha de nacimiento valida");
		$(passengerDateError).show();
		error = true;
	} else if(!validateDateAdult(passengerDay, passengerMonth, passengerYear)) {
		$(passengerDateSpan).addClass("control-group error");
		$(passengerDateErrorText).text(" La fecha de nacimiento no se corresponde con un adulto");
		$(passengerDateError).show();
		error = true;
	}

	return error;
}

function validateChildrenPassenger(passengerNameSpan, passengerName, passengerNameError, passengerNameErrorText, passengerSurnameSpan, passengerSurname, passengerSurnameError, passengerSurnameErrorText, passengerDNISpan, passengerDNI, passengerDNIError, passengerDNIErrorText, passengerDateSpan, passengerDay, passengerMonth, passengerYear, passengerDateError, passengerDateErrorText) {
	var error = false;

	if(passengerName == "") {
		$(passengerNameSpan).addClass("control-group error");
		$(passengerNameErrorText).text(" Ingrese el nombre del pasajero");
		$(passengerNameError).show();
		error = true;
	} else if(!validateTextField(passengerName)) {
		$(passengerNameSpan).addClass("control-group error");
		$(passengerNameErrorText).text(" Ingrese un nombre valido");
		$(passengerNameError).show();
		error = true;
	}
	
	if(passengerSurname == "") {
		$(passengerSurnameSpan).addClass("control-group error");
		$(passengerSurnameErrorText).text(" Ingrese el apellido del pasajero");
		$(passengerSurnameError).show();
		error = true;
	} else if(!validateTextField(passengerSurname)) {
		$(passengerSurnameSpan).addClass("control-group error");
		$(passengerSurnameErrorText).text(" Ingrese un apellido valido");
		$(passengerSurnameError).show();
		error = true;
	}
	
	if(passengerDNI == "") {
		$(passengerDNISpan).addClass("control-group error");
		$(passengerDNIErrorText).text(" Ingrese el numero de DNI del pasajero");
		$(passengerDNIError).show();
		error = true;
	} else if(!validateDNIField(passengerDNI)) {
		$(passengerDNISpan).addClass("control-group error");
		$(passengerDNIErrorText).text(" Ingrese un numero de DNI valido");
		$(passengerDNIError).show();
		error = true;
	}
	
	if(passengerDay == "" || passengerMonth == "" || passengerYear == "") {
		$(passengerDateSpan).addClass("control-group error");
		$(passengerDateErrorText).text(" Ingrese la fecha de nacimiento del pasajero");
		$(passengerDateError).show();
		error = true;
	} else if(!validateDate(passengerDay, passengerMonth, passengerYear)) {
		$(passengerDateSpan).addClass("control-group error");
		$(passengerDateErrorText).text(" Ingrese una fecha de nacimiento valida");
		$(passengerDateError).show();
		error = true;
	} else if(!validateDateChildren(passengerDay, passengerMonth, passengerYear)) {
		$(passengerDateSpan).addClass("control-group error");
		$(passengerDateErrorText).text(" La fecha de nacimiento no se corresponde con un ninio");
		$(passengerDateError).show();
		error = true;
	}
	
	return error;	
}

function validateInfantPassenger(passengerNameSpan, passengerName, passengerNameError, passengerNameErrorText, passengerSurnameSpan, passengerSurname, passengerSurnameError, passengerSurnameErrorText, passengerDNISpan, passengerDNI, passengerDNIError, passengerDNIErrorText, passengerDateSpan, passengerDay, passengerMonth, passengerYear, passengerDateError, passengerDateErrorText) {
	var error = false;
	
	if(passengerName == "") {
		$(passengerNameSpan).addClass("control-group error");
		$(passengerNameErrorText).text(" Ingrese el nombre del pasajero");
		$(passengerNameError).show();
		error = true;
	} else if(!validateTextField(passengerName)) {
		$(passengerNameSpan).addClass("control-group error");
		$(passengerNameErrorText).text(" Ingrese un nombre valido");
		$(passengerNameError).show();
		error = true;
	}
	
	if(passengerSurname == "") {
		$(passengerSurnameSpan).addClass("control-group error");
		$(passengerSurnameErrorText).text(" Ingrese el apellido del pasajero");
		$(passengerSurnameError).show();
		error = true;
	} else if(!validateTextField(passengerSurname)) {
		$(passengerSurnameSpan).addClass("control-group error");
		$(passengerSurnameErrorText).text(" Ingrese un apellido valido");
		$(passengerSurnameError).show();
		error = true;
	}
	
	if(passengerDNI == "") {
		$(passengerDNISpan).addClass("control-group error");
		$(passengerDNIErrorText).text(" Ingrese el numero de DNI del pasajero");
		$(passengerDNIError).show();
		error = true;
	} else if(!validateDNIField(passengerDNI)) {
		$(passengerDNISpan).addClass("control-group error");
		$(passengerDNIErrorText).text(" Ingrese un numero de DNI valido");
		$(passengerDNIError).show();
		error = true;
	}
	
	if(passengerDay == "" || passengerMonth == "" || passengerYear == "") {
		$(passengerDateSpan).addClass("control-group error");
		$(passengerDateErrorText).text(" Ingrese la fecha de nacimiento del pasajero");
		$(passengerDateError).show();
		error = true;
	} else if(!validateDate(passengerDay, passengerMonth, passengerYear)) {
		$(passengerDateSpan).addClass("control-group error");
		$(passengerDateErrorText).text(" Ingrese una fecha de nacimiento valida");
		$(passengerDateError).show();
		error = true;
	} else if(!validateDateInfant(passengerDay, passengerMonth, passengerYear)) {
		$(passengerDateSpan).addClass("control-group error");
		$(passengerDateErrorText).text(" La fecha de nacimiento no se corresponde con un infante");
		$(passengerDateError).show();
		error = true;
	}
	
	return error;	
}

function validateTextField(text) {
	var textPattern = /^[A-Za-z ]+$/;
	return textPattern.test(text);
}

function validateDNIField(DNI) {
	var textPattern = /^[0-9 ]{8}$/;
	return textPattern.test(DNI);
}

function validateDate(day, month, year) {
	var dayPattern = /^(\d{1,2})$/;
	var monthPattern = /^(\d{1,2})$/;
	var yearPattern = /^(\d{4})$/;
	var nowTemp = new Date();
	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
	var date;
	
	if(!dayPattern.test(day) || !monthPattern.test(month) || !yearPattern.test(year)) {
		return false;
	}
	
	if (month < 1 || month > 12) {
		return false;
	} else if (day < 1 || day> 31) {
		return false;
	} else if ((month==4 || month==6 || month==9 || month==11) && day ==31) {
		return false;
	} else if (month == 2) {
		var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
		if (day> 29 || (day == 29 && !isleap)) {
			return false;
		}
	}
	
	date = new Date(year, month - 1, day, 0, 0, 0, 0);
	if(date > now) {
		return false;
	}
	
	return true;
}

function validateDateAdult(day, month, year) {
	var date = new Date(year, month - 1, day, 0, 0, 0, 0);
	var nowTemp = new Date();
	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
	var age= now.getFullYear() - date.getFullYear();
	
	if(now.getMonth() - date.getMonth() < 0) {
		age = age + 1;
	} else if(now.getMonth() - date.getMonth() == 0) {
		if(now.getDate() - date.getDate() <= 0) {
			age = age + 1;
		}
	} 

	return age > 11;
}

function validateDateChildren(day, month, year) {
	var date = new Date(year, month - 1, day, 0, 0, 0, 0);
	var nowTemp = new Date();
	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
	var age= now.getFullYear() - date.getFullYear();
	
	if(now.getMonth() - date.getMonth() < 0) {
		age = age + 1;
	} else if(now.getMonth() - date.getMonth() == 0) {
		if(now.getDate() - date.getDate() <= 0) {
			age = age + 1;
		}
	} 
	
	return age > 2 && age <= 11;
}

function validateDateInfant(day, month, year) {
	var date = new Date(year, month - 1, day, 0, 0, 0, 0);
	var nowTemp = new Date();
	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
	var age= now.getFullYear() - date.getFullYear();
	
	if(now.getMonth() - date.getMonth() < 0) {
		age = age + 1;
	} else if(now.getMonth() - date.getMonth() == 0) {
		if(now.getDate() - date.getDate() <= 0) {
			age = age + 1;
		}
	} 
	
	return age >= 0 && age <= 2;
}

function focusOutField(passengerField, passengerSpan, passengerError) {
	$(passengerField).focusout(function() {
		$(passengerSpan).removeClass('control-group error');
		$(passengerError).hide();
	});
}

function validateCreditCard() {
	var error1 = false;
	var error2 = false;
	var error3 = false;

	error1 = validateCreditCardInformation();
	error2 = validateTitularInformation();
	error3 = validateContactInformation();
	
	return !error1 && !error2 && !error3;
}

function validateCreditCardInformation() {
	var error = false;
	
	if($("#number_credit_card").val() == "" ) {
		$("#number_credit_card_span").addClass("control-group error");
		$("#number_credit_card_error_text").text(" Ingrese el numero de la tarjeta");
		$("#number_credit_card_error").show();
		error = true;
	} else if(!validateCreditCardNumber($("#number_credit_card").val())) {
		$("#number_credit_card_span").addClass("control-group error");
		$("#number_credit_card_error_text").text(" Ingrese un numero valido de tarjeta");
		$("#number_credit_card_error").show();
		error = true;
	}

	return error;
}

function validateTitularInformation() {
	
}

function validateContactInformation() {
	
}

function validateCreditCardNumber(number) {
	var visa1 = /^4[0-9]{12}$/;
	var visa2 =  /^4[0-9]{15}$/;
	var master1 = /^51[0-9]{14}$/;
	var master2 = /^52[0-9]{14}$/;
	var master3 = /^53[0-9]{14}$/;
	var diners = /^36[0-9]{14}$/;
	var american1 = /^34[0-9]{13}$/;
	var american2 = /^37[0-9]{13}$/;
	var correct = true;
	
	if($("#type_credit_card").val() == "Visa") {
		if(!visa1.test(number) && !visa2.test(number)) {
			console.log("LLEGO");
			correct = false;
		}
	} else if($("#type_credit_card").val() == "Master") {
		if(!master1.test(number) && !master2.test(number) && !master3.test(number)) {
			console.log("LLEGO2");
			correct = false;
		}
	} else if($("#type_credit_card").val() == "Diners") {
		if(!diners.test(number)) {
			console.log("LLEGO 3");
			correct = false;
		}
	} else if($("#type_credit_card").val() == "American") {
		if(!american1.test(number) && !american2.test(number) && !american3.test(number)) {
			console.log("LLEGO 4");
			correct = false;
		}
	}
	
	return correct;
}

function validateCreditCardExpiration(number) {
	
}