var totalEdits = 0;
var adults = parseInt($.cookie('adult-num'));
var children = parseInt($.cookie('child-num'));
var infants = parseInt($.cookie('infant-num'));
var cities = new Array();
var citiesId = new Array();
var countries = new Array();
var countriesId = new Array();
var citiesCountriesId = new Array();
var iFound;


$(document).ready(function() {
	var state = "pasajeros";
	var firstTime = 1; // variable que me dice si ya se creo el evento para los botones editar
	var cur_sym = $.cookie('cur-sym');
	var cur_ratio = $.cookie('cur-ratio');
	var total_price = $.cookie('total-price');
	var tax_price = $.cookie('tax-price');
	var adult_price = $.cookie('adult-price');
	var child_price = $.cookie('child-price');
	var infant_price = $.cookie('infant-price');
	var ob_dep_date = $.cookie('ob-dep-date');
	var ob_arr_date	 = $.cookie('ob-arr-date');
	var ob_dep_hour = $.cookie('ob-dep-hr');
	var ob_arr_hour = $.cookie('ob-arr-hr');
	var flight_type = $.cookie('flight-type');
	var ob_dep_airport = $.cookie('ob-dep-airport');
	var ob_arr_airport = $.cookie('ob-arr-airport');
	var ib_dep_airport = $.cookie('ib-dep-airport');
	var ib_arr_airport = $.cookie('ib-arr-airport');
	var ib_dep_date = $.cookie('ib-dep-date');
	var ib_arr_date = $.cookie('ib-arr-date');
	var ib_dep_hour = $.cookie('ib-dep-hr');
	var ib_arr_hour = $.cookie('ib-arr-hr');
	var ob_id_flight = $.cookie('ob-flight-num');
	var ib_id_flight = $.cookie('ib-flight-num');


	if(flight_type == "one-way")  {
		$("#well_return").hide();
	} else {
		$("#ib_origin_airport").text(" " + ib_dep_airport);
		$("#ib_destination_airport").text(" " + ib_arr_airport);	
		$("#ib_origin_date").text(" " + ib_dep_date + " (" + ib_dep_hour + ")" );
		$("#ib_destination_date").text(" " + ib_arr_date + " (" + ib_arr_hour + ")" );
	}

	$("#adult_price").text(" "+cur_sym+" " + parseInt(adult_price/cur_ratio) + " x " + adults);
	
	if(children == 0) {
		$("#children").hide();
	} else {
		$("#children_price").text(" "+cur_sym+" " + parseInt(child_price/cur_ratio) + " x " + children);
	}

	if(infants == 0) {
		$("#infant").hide();
	} else {
		$("#infant_price").text(" "+cur_sym+" " + parseInt(infant_price/cur_ratio) + " x " + infants);
	}
	
	$("#tax_price").text(" "+cur_sym+" " + parseInt(tax_price/cur_ratio));
	$("#total_price").text(" "+cur_sym+" " + parseInt(total_price/cur_ratio));

	$("#ob_origin_airport").text(" " + ob_dep_airport);
	$("#ob_destination_airport").text(" " + ob_arr_airport);	
	$("#ob_origin_date").text(" " + ob_dep_date + " (" + ob_dep_hour + ")" );
	$("#ob_destination_date").text(" " + ob_arr_date + " (" + ob_arr_hour + ")" );
	$(".credit_card").hide();
	$("#edit_credit_card_span").hide();
	$("#edit_contact_information_span").hide();
	$("#edit_titular_information_span").hide();
	$("#number_credit_card_error").hide();
	$("#expiration_credit_card_error").hide();
	$("#security_credit_card_error").hide();
	$("#name_credit_card_error").hide();
	$("#surname_credit_card_error").hide();
	$("#dni_credit_card_error").hide();
	$("#telephone_credit_card_error").hide();
	$("#email_credit_card_error").hide();
	$("#postal_code_billing_address_error").hide();
	$("#address_billing_address_error").hide();
	$("#floor_billing_address_error").hide();
	$("#apartment_billing_address_error").hide();
	$("#edit_billing_address_span").hide();
	$("#security_credit_card").attr('maxlength', '4');
	$("#security_credit_card").numeric("integer");
	$("#number_credit_card").numeric("integer");
	$("#number_credit_card").attr('maxlength', '16');
	$("#name_credit_card").alpha();
	$("#surname_credit_card").alpha();
	$("#dni_credit_card").numeric("integer");
	$("#dni_credit_card").attr('maxlength', '8');
	$("#postal_code_billing_address").numeric("integer");
	$("#address_billing_address").alphanum();
	$("#telephone_credit_card").numeric("integer");
	$("#floor_billing_address").numeric("integer");
	$("#passengers_link").removeClass("disabled-link");
	$("#passengers_link").addClass("enabled-link");
	$("#number_passengers_link").addClass("badge-inverse");
	focusOutField("#number_credit_card", "#number_credit_card_span", "#number_credit_card_error");
	focusOutField("#security_credit_card", "#security_credit_card_span", "#security_credit_card_error");
	focusOutField("#name_credit_card", "#name_credit_card_span", "#name_credit_card_error");
	focusOutField("#surname_credit_card", "#surname_credit_card_span", "#surname_credit_card_error");
	focusOutField("#dni_credit_card", "#dni_credit_card_span", "#dni_credit_card_error");
	focusOutField("#telephone_credit_card", "#telephone_credit_card_span", "#telephone_credit_card_error");
	focusOutField("#email_credit_card", "#email_credit_card_span", "#email_credit_card_error");
	focusOutField("#postal_code_billing_address", "#postal_code_billing_address_span", "#postal_code_billing_address_error");
	focusOutField("#address_billing_address", "#address_billing_address_span", "#address_billing_address_error");
	focusOutField("#floor_billing_address", "#floor_billing_address_span", "#floor_billing_address_error");
	focusOutField("#apartment_billing_address", "#apartment_billing_address_span", "#apartment_billing_address_error");
	$("#month_expiration_credit_card").change(function() { 
		$("#month_expiration_credit_card").removeClass('error-select');
		if(!($("#year_expiration_credit_card").hasClass('error-select'))) {
			$("#expiration_credit_card_error").hide();
		}
	});

	$("#year_expiration_credit_card").change(function() { 
		$("#year_expiration_credit_card").removeClass('error-select');
		if(!($("#month_expiration_credit_card").hasClass('error-select'))) {
			$("#expiration_credit_card_error").hide();
		}
	});

	//revisar que no deja espacio entre dia mes y anio
	for(var i = 0; i < adults; i++) {
		$("#content_div").append('<div id="well_passenger_adults_' + (i + 1) + '" class="well clearfix passenger"><div class="span12"><legend><i class="icon-user"></i> Pasajero ' + (i + 1) + ' (Adulto)</legend><div class="row-fluid"><div id="passenger_adults_' + (i + 1) + '_name_span" class="span6"><label>Nombre <span class="grey-text">(*)</span></label><input id="passenger_adults_' + (i + 1) + '_name" class="fill_in span12" type="text" placeholder="Ingrese el nombre del pasajero"><p id="passenger_adults_' + (i + 1) + '_name_error" class="text-error"><i class="icon-remove"></i><small id="passenger_adults_' + (i + 1) + '_name_error_text"> Ingrese el nombre del pasajero</small></p></div><div id="passenger_adults_' + (i + 1) + '_surname_span" class="span6"><label>Apellido <span class="grey-text">(*)</span></label><input id="passenger_adults_' + (i + 1) + '_surname" class="fill_in span12" type="text" placeholder="Ingrese el apellido del pasajero"><p id="passenger_adults_' + (i + 1) + '_surname_error" class="text-error"><i class="icon-remove"></i><small id="passenger_adults_' + (i + 1) + '_surname_error_text"> Ingrese el apellido del pasajero</small></p></div></div><div class="row-fluid"><div id="passenger_adults_' + (i + 1) + '_dni_span" class="span6"><label>DNI <span class="grey-text">(*)</span></label><input id="passenger_adults_' + (i + 1) + '_dni" class="fill_in span12" type="text" placeholder="Ingrese el DNI del pasajero (sin puntos)"><p id="passenger_adults_' + (i + 1) + '_dni_error" class="text-error"><i class="icon-remove"></i><small id="passenger_adults_' + (i + 1) + '_dni_error_text"> Ingrese el DNI del pasajero</small></p></div><div class="span6"><label>Sexo <span class="grey-text">(*)</span></label><select class="fill_in span12"><option>Masculino</option><option>Femenino</option></select></div></div><div class="row-fluid"><div id="passenger_adults_' + (i + 1) + '_date_span" class="span6"><label>Fecha de nacimiento <span class="grey-text">(*)</span></label><input id="passenger_adults_' + (i + 1) + '_day" type="text" placeholder="dd" class="fill_in span3"><input id="passenger_adults_' + (i + 1) + '_month" type="text" placeholder="mm" class="fill_in span3"><input id="passenger_adults_' + (i + 1) + '_year" type="text" placeholder="aaaa" class="fill_in span3"><p id="passenger_adults_' + (i + 1) + '_date_error" class="text-error"><i class="icon-remove"></i><small id="passenger_adults_' + (i + 1) + '_date_error_text"> Ingrese la fecha de nacimiento del pasajero</small></p></div></div></div><div class="row-fluid"><small class="required pull-right thin-font">(*) Requerido </small><div id="edit_passenger_adults_' + (i + 1) + '_span" class="row-fluid"><div class="span12"><div class="pull-right"><small class="thin-font">(*) Requerido </small><a id="edit_passenger_adults_' + (i + 1) + '" type="button" class="btn thin-font">Editar <i class="icon-pencil"></i></a></div></div></div></div></div>');
		focusOutField("#passenger_adults_" + (i + 1) + "_name", "#passenger_adults_" + (i + 1) + "_name_span", "#passenger_adults_" + (i + 1 ) + "_name_error");
		focusOutField("#passenger_adults_" + (i + 1) + "_surname", "#passenger_adults_" + (i + 1) + "_surname_span", "#passenger_adults_" + (i + 1 ) + "_surname_error");
		focusOutField("#passenger_adults_" + (i + 1) + "_dni", "#passenger_adults_" + (i + 1) + "_dni_span", "#passenger_adults_" + (i + 1 ) + "_dni_error");
		focusOutField2Adult("#passenger_adults_" + (i + 1) + "_day", "#passenger_adults_" + (i + 1) + "_day", "#passenger_adults_" + (i + 1) + "_month", "#passenger_adults_" + (i + 1) + "_year", "#passenger_adults_" + (i + 1) + "_date_span", "#passenger_adults_" + (i + 1) + "_date_error");
		focusOutField2Adult("#passenger_adults_" + (i + 1) + "_month", "#passenger_adults_" + (i + 1) + "_day", "#passenger_adults_" + (i + 1) + "_month", "#passenger_adults_" + (i + 1) + "_year", "#passenger_adults_" + (i + 1) + "_date_span", "#passenger_adults_" + (i + 1) + "_date_error");
		focusOutField2Adult("#passenger_adults_" + (i + 1) + "_year", "#passenger_adults_" + (i + 1) + "_day", "#passenger_adults_" + (i + 1) + "_month", "#passenger_adults_" + (i + 1) + "_year", "#passenger_adults_" + (i + 1) + "_date_span", "#passenger_adults_" + (i + 1) + "_date_error");
		$("#edit_passenger_adults_" + (i + 1) + "_span").hide();
		$("#passenger_adults_" + (i + 1) + "_name_error").hide();
		$("#passenger_adults_" + (i + 1) + "_surname_error").hide();
		$("#passenger_adults_" + (i + 1) + "_dni_error").hide();
		$("#passenger_adults_" + (i + 1) + "_date_error").hide();
		$("#passenger_adults_" + (i + 1) + "_name").alpha();
		$("#passenger_adults_" + (i + 1) + "_surname").alpha();
		$("#passenger_adults_" + (i + 1) + "_dni").numeric("integer");
		$("#passenger_adults_" + (i + 1) + "_dni").attr('maxlength','8');
		$("#passenger_adults_" + (i + 1) + "_day").numeric("integer");
		$("#passenger_adults_" + (i + 1) + "_month").numeric("integer");
		$("#passenger_adults_" + (i + 1) + "_year").numeric("integer");
		$("#passenger_adults_" + (i + 1) + "_day").attr('maxlength','2');
		$("#passenger_adults_" + (i + 1) + "_month").attr('maxlength','2');
		$("#passenger_adults_" + (i + 1) + "_year").attr('maxlength','4');
	}
	
	for(var i = 0; i < children; i++) {
		$("#content_div").append('<div id="well_passenger_children_' + (i + 1) + '" class="well clearfix passenger"><div class="span12"><legend><i class="icon-user"></i> Pasajero ' + (i + adults + 1) + ' (Ni&#241;o)</legend><div class="row-fluid"><div id="passenger_children_' + (i + 1) + '_name_span" class="span6"><label>Nombre <span class="grey-text">(*)</span></label><input id="passenger_children_' + (i + 1) + '_name" class="fill_in span12" type="text" placeholder="Ingrese el nombre del pasajero"><p id="passenger_children_' + (i + 1) + '_name_error" class="text-error"><i class="icon-remove"></i><small id="passenger_children_' + (i + 1) + '_name_error_text"> Ingrese el nombre del pasajero</small></p></div><div id="passenger_children_' + (i + 1) + '_surname_span" class="span6"><label>Apellido <span class="grey-text">(*)</span></label><input id="passenger_children_' + (i + 1) + '_surname" class="fill_in span12" type="text" placeholder="Ingrese el apellido del pasajero"><p id="passenger_children_' + (i + 1) + '_surname_error" class="text-error"><i class="icon-remove"></i><small id="passenger_children_' + (i + 1) + '_surname_error_text"> Ingrese el apellido del pasajero</small></p></div></div><div class="row-fluid"><div id="passenger_children_' + (i + 1) + '_dni_span" class="span6"><label>DNI <span class="grey-text">(*)</span></label><input id="passenger_children_' + (i + 1) + '_dni" class="fill_in span12" type="text" placeholder="Ingrese el DNI del pasajero (sin puntos)"><p id="passenger_children_' + (i + 1) + '_dni_error" class="text-error"><i class="icon-remove"></i><small id="passenger_children_' + (i + 1) + '_dni_error_text"> Ingrese el DNI del pasajero</small></p></div><div class="span6"><label>Sexo <span class="grey-text">(*)</span></label><select class="fill_in span12"><option>Masculino</option><option>Femenino</option></select></div></div><div class="row-fluid"><div id="passenger_children_' + (i + 1) + '_date_span" class="span6"><label>Fecha de nacimiento <span class="grey-text">(*)</span></label><input id="passenger_children_' + (i + 1) + '_day" type="text" placeholder="dd" class="fill_in span3"><input id="passenger_children_' + (i + 1) + '_month" type="text" placeholder="mm" class="fill_in span3"><input id="passenger_children_' + (i + 1) + '_year" type="text" placeholder="aaaa" class="fill_in span3"><p id="passenger_children_' + (i + 1) + '_date_error" class="text-error"><i class="icon-remove"></i><small id="passenger_children_' + (i + 1) + '_date_error_text"> Ingrese la fecha de nacimiento del pasajero</small></p></div></div><div class="row-fluid"><small class="required pull-right thin-font">(*) Requerido </small><div id="edit_passenger_children_' + (i + 1) + '_span" class="row-fluid"><div class="span12"><div class="pull-right"><small class="thin-font">(*) Requerido </small><a id="edit_passenger_children_' + (i + 1) + '" type="button" class="btn thin-font">Editar <i class="icon-pencil"></i></a></div></div></div></div></div></div>');
		focusOutField("#passenger_children_" + (i + 1) + "_name", "#passenger_children_" + (i + 1) + "_name_span", "#passenger_children_" + (i + 1 ) + "_name_error");
		focusOutField("#passenger_children_" + (i + 1) + "_surname", "#passenger_children_" + (i + 1) + "_surname_span", "#passenger_children_" + (i + 1 ) + "_surname_error");
		focusOutField("#passenger_children_" + (i + 1) + "_dni", "#passenger_children_" + (i + 1) + "_dni_span", "#passenger_children_" + (i + 1 ) + "_dni_error");
		focusOutField2Children("#passenger_children_" + (i + 1) + "_day", "#passenger_children_" + (i + 1) + "_day", "#passenger_children_" + (i + 1) + "_month", "#passenger_children_" + (i + 1) + "_year", "#passenger_children_" + (i + 1) + "_date_span", "#passenger_children_" + (i + 1) + "_date_error");
		focusOutField2Children("#passenger_children_" + (i + 1) + "_month", "#passenger_children_" + (i + 1) + "_day", "#passenger_children_" + (i + 1) + "_month", "#passenger_children_" + (i + 1) + "_year", "#passenger_children_" + (i + 1) + "_date_span", "#passenger_children_" + (i + 1) + "_date_error");
		focusOutField2Children("#passenger_children_" + (i + 1) + "_year", "#passenger_children_" + (i + 1) + "_day", "#passenger_children_" + (i + 1) + "_month", "#passenger_children_" + (i + 1) + "_year", "#passenger_children_" + (i + 1) + "_date_span", "#passenger_children_" + (i + 1) + "_date_error");
		$("#edit_passenger_children_" + (i + 1) + "_span").hide();
		$("#passenger_children_" + (i + 1) + "_name_error").hide();
		$("#passenger_children_" + (i + 1) + "_surname_error").hide();
		$("#passenger_children_" + (i + 1) + "_dni_error").hide();
		$("#passenger_children_" + (i + 1) + "_date_error").hide();
		$("#passenger_children_" + (i + 1) + "_name").alpha();
		$("#passenger_children_" + (i + 1) + "_surname").alpha();
		$("#passenger_children_" + (i + 1) + "_dni").numeric("integer");
		$("#passenger_children_" + (i + 1) + "_dni").attr('maxlength','8');
		$("#passenger_children_" + (i + 1) + "_day").numeric("integer");
		$("#passenger_children_" + (i + 1) + "_month").numeric("integer");
		$("#passenger_children_" + (i + 1) + "_year").numeric("integer");
		$("#passenger_children_" + (i + 1) + "_day").attr('maxlength','2');
		$("#passenger_children_" + (i + 1) + "_month").attr('maxlength','2');
		$("#passenger_children_" + (i + 1) + "_year").attr('maxlength','4');
	}
	
	for(var i = 0; i < infants; i++) {
		$("#content_div").append('<div id="well_passenger_infants_' + (i + 1) + '" class="well clearfix passenger"><div class="span12"><legend><i class="icon-user"></i> Pasajero ' + (i + adults + children + 1) + ' (Infante)</legend><div class="row-fluid"><div id="passenger_infants_' + (i + 1) + '_name_span" class="span6"><label>Nombre <span class="grey-text">(*)</span></label><input id="passenger_infants_' + (i + 1) + '_name" class="fill_in span12" type="text" placeholder="Ingrese el nombre del pasajero"><p id="passenger_infants_' + (i + 1) + '_name_error" class="text-error"><i class="icon-remove"></i><small id="passenger_infants_' + (i + 1) + '_name_error_text"> Ingrese el nombre del pasajero</small></p></div><div id="passenger_infants_' + (i + 1) + '_surname_span" class="span6"><label>Apellido <span class="grey-text">(*)</span></label><input id="passenger_infants_' + (i + 1) + '_surname" class="fill_in span12" type="text" placeholder="Ingrese el apellido del pasajero"><p id="passenger_infants_' + (i + 1) + '_surname_error" class="text-error"><i class="icon-remove"></i><small id="passenger_infants_' + (i + 1) + '_surname_error_text"> Ingrese el apellido del pasajero</small></p></div></div><div class="row-fluid"><div id="passenger_infants_' + (i + 1) + '_dni_span" class="span6"><label>DNI <span class="grey-text">(*)</span></label><input id="passenger_infants_' + (i + 1) + '_dni" class="fill_in span12" type="text" placeholder="Ingrese el DNI del pasajero (sin puntos)"><p id="passenger_infants_' + (i + 1) + '_dni_error" class="text-error"><i class="icon-remove"></i><small id="passenger_infants_' + (i + 1) + '_dni_error_text"> Ingrese el DNI del pasajero</small></p></div><div class="span6"><label>Sexo <span class="grey-text">(*)</span></label><select class="fill_in span12"><option>Masculino</option><option>Femenino</option></select></div></div><div class="row-fluid"><div id="passenger_infants_' + (i + 1) + '_date_span" class="span6"><label>Fecha de nacimiento <span class="grey-text">(*)</span></label><input id="passenger_infants_' + (i + 1) + '_day" type="text" placeholder="dd" class="fill_in span3"><input id="passenger_infants_' + (i + 1) + '_month" type="text" placeholder="mm" class="fill_in span3"><input id="passenger_infants_' + (i + 1) + '_year" type="text" placeholder="aaaa" class="fill_in span3"><p id="passenger_infants_' + (i + 1) + '_date_error" class="text-error"><i class="icon-remove"></i><small id="passenger_infants_' + (i + 1) + '_date_error_text"> Ingrese la fecha de nacimiento del pasajero</small></p></div></div><div class="row-fluid"><small class="required pull-right thin-font">(*) Requerido </small><div id="edit_passenger_infants_' + (i + 1) + '_span" class="row-fluid"><div class="span12"><div class="pull-right"><small class="thin-font">(*) Requerido </small><a id="edit_passenger_infants_' + (i + 1) + '" type="button" class="btn thin-font">Editar <i class="icon-pencil"></i></a></div></div></div></div></div></div>');
		focusOutField("#passenger_infants_" + (i + 1) + "_name", "#passenger_infants_" + (i + 1) + "_name_span", "#passenger_infants_" + (i + 1 ) + "_name_error");
		focusOutField("#passenger_infants_" + (i + 1) + "_surname", "#passenger_infants_" + (i + 1) + "_surname_span", "#passenger_infants_" + (i + 1 ) + "_surname_error");
		focusOutField("#passenger_infants_" + (i + 1) + "_dni", "#passenger_infants_" + (i + 1) + "_dni_span", "#passenger_infants_" + (i + 1 ) + "_dni_error");
		focusOutField2Infant("#passenger_infants_" + (i + 1) + "_day", "#passenger_infants_" + (i + 1) + "_day", "#passenger_infants_" + (i + 1) + "_month", "#passenger_infants_" + (i + 1) + "_year", "#passenger_infants_" + (i + 1) + "_date_span", "#passenger_infants_" + (i + 1) + "_date_error");
		focusOutField2Infant("#passenger_infants_" + (i + 1) + "_month", "#passenger_infants_" + (i + 1) + "_day", "#passenger_infants_" + (i + 1) + "_month", "#passenger_infants_" + (i + 1) + "_year", "#passenger_infants_" + (i + 1) + "_date_span", "#passenger_infants_" + (i + 1) + "_date_error");
		focusOutField2Infant("#passenger_infants_" + (i + 1) + "_year", "#passenger_infants_" + (i + 1) + "_day", "#passenger_infants_" + (i + 1) + "_month", "#passenger_infants_" + (i + 1) + "_year", "#passenger_infants_" + (i + 1) + "_date_span", "#passenger_infants_" + (i + 1) + "_date_error");
		$("#edit_passenger_infants_" + (i + 1) + "_span").hide();
		$("#passenger_infants_" + (i + 1) + "_name_error").hide();
		$("#passenger_infants_" + (i + 1) + "_surname_error").hide();
		$("#passenger_infants_" + (i + 1) + "_dni_error").hide();
		$("#passenger_infants_" + (i + 1) + "_date_error").hide();
		$("#passenger_infants_" + (i + 1) + "_name").alpha();
		$("#passenger_infants_" + (i + 1) + "_surname").alpha();
		$("#passenger_infants_" + (i + 1) + "_dni").numeric("integer");
		$("#passenger_infants_" + (i + 1) + "_dni").attr('maxlength','8');
		$("#passenger_infants_" + (i + 1) + "_day").numeric("integer");
		$("#passenger_infants_" + (i + 1) + "_month").numeric("integer");
		$("#passenger_infants_" + (i + 1) + "_year").numeric("integer");
		$("#passenger_infants_" + (i + 1) + "_day").attr('maxlength','2');
		$("#passenger_infants_" + (i + 1) + "_month").attr('maxlength','2');
		$("#passenger_infants_" + (i + 1) + "_year").attr('maxlength','4');

	}

    $.ajax({
    	url: "http://eiffel.itba.edu.ar/hci/service2/Geo.groovy?method=GetCountries&sort_key=name&sort_order=asc",
    	dataType: "jsonp",
    	jsonpCallback: "fillCountriesArray",
    });


	
	$("#next_button").click(function() {
		if(state == "pasajeros") { //pasamos al pago
			if(validatePassengers()) {
				state = "tarjeta";

				$("#payment_link").removeClass("disabled-link");
				$("#payment_link").addClass("enabled-link");
				$("#number_payment_link").addClass("badge-inverse");
				
				//animacion para que suba todo y baje lo nuevo
				$(".passenger").slideUp(500);
				$(".credit_card").show();
				$(".credit_card").slideUp(500);
				$(".credit_card").slideDown(500);
				
				//cambia los titulos y los botones
				$("#title_text").text(' Información de pago');
				$("#next_button_text").text("Confirmación ");
				
				//cambiamos imagen y barra
				$("#img_change").attr("src","img/large-2.jpg");
				$("#bar_passengers_link").empty();
				$("#bar_passengers_link").append('<a href=""><i class="icon-group"></i> Pasajeros</a>');
			} else{
				$('html, body').animate({scrollTop: '0'}, 'slow');
				$('.center').notify({
    				message: { html: true, html: '<strong>Hay errores en su formulario</strong>. Revise los campos resaltados.' },
    				type: 'error',
    				fadeOut: { enabled: true, delay: 3000 }
  				}).show(); 
			}
		} else if(state == "tarjeta") { //pasamos a la confirmacion
			if(validateCreditCard()) {
				state = "confirmacion";

				$(".required").hide();
				$("#confirmation_link").removeClass("disabled-link");
				$("#confirmation_link").addClass("enabled-link");
				$("#number_confirmation_link").addClass("badge-inverse");

				$("#add-left-margin").hide();
				$(".credit_card").slideUp(500);
				$(".fill_in").attr("disabled",true);
				
				//muestra los botones editar de la tarjeta
				$("#edit_credit_card_span").show();
				$("#edit_contact_information_span").show();
				$("#edit_titular_information_span").show();
				$("#edit_billing_address_span").show();
				
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
				$("#next_button_text").text("Confirmar ");
				$("#img_change").attr("src","img/large-4.jpg");
			
				//creamos todos los eventos de los botones editar
				if(firstTime) {
					for(var i = 0; i < adults; i++) {
						enableButtons("#well_passenger_adults_" + (i + 1), "#edit_passenger_adults_" + (i + 1), "adults", i);
					}
					for(var i = 0; i < children; i++) {
						enableButtons("#well_passenger_children_" + (i + 1), "#edit_passenger_children_" + (i + 1), "children", i);
					}
					for(var i = 0; i < infants; i++) {
						enableButtons("#well_passenger_infants_" + (i + 1), "#edit_passenger_infants_" + (i + 1), "infants", i);
					}
					enableButtons("#well_credit_card","#edit_credit_card", "credit_card", 0);
					enableButtons("#well_titular_information", "#edit_titular_information", "titular_information", 0);
					enableButtons("#well_contact_information", "#edit_contact_information", "contact_information", 0);
					enableButtons("#well_billing_address", "#edit_billing_address", "billing_address", 0);
				}
				
				firstTime = 0;
			} else{
				$('html, body').animate({scrollTop: '0'}, 'slow');
				$('.center').notify({
    				message: { html: true, html: '<strong>Hay errores en su formulario</strong>. Revise los campos resaltados.' },
    				type: 'error',
    				fadeOut: { enabled: true, delay: 3000 }
  				}).show(); 
			}
		} else {
			//chequeo que no haya algun campo sin guardar
			if(totalEdits != 0) {
				$('html, body').animate({scrollTop: '0'}, 'slow');
				$('.center').notify({
    				message: { html: true, html: '<strong>Debe guardar todos los campos para continuar</strong>. Revise los campos resaltados.' },
    				type: 'error',
    				fadeOut: { enabled: true, delay: 3000 }
  				}).show();
				// NUEVA MANERA DE MOSTRAR ERROR
				//$("#modalError").modal();
				//$("#modalError_button").click(function() {
				//	$("#modalError").modal("hide");
				//});
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
				showError("#well_billing_address", "#edit_billing_address");
			} else {
				var jsonData = {};
				jsonData['flightId'] = ob_id_flight;
				jsonData['passengers'] = [];
				for(var i = 0; i < adults; i++) {
					jsonData['passengers'][i] = {};
					jsonData['passengers'][i]['firstName'] = $("#passenger_adults_" + (i + 1) + "_name").val();
					jsonData['passengers'][i]['lastName'] = $("#passenger_adults_" + (i + 1) + "_surname").val();
					jsonData['passengers'][i]['birthdate'] = $("#passenger_adults_" + (i + 1) + "_year").val() + "-" +  $("#passenger_adults_" + (i + 1) + "_month").val() + "-" +  $("#passenger_adults_" + (i + 1) + "_day").val();
					jsonData['passengers'][i]['idType'] =  1;
					jsonData['passengers'][i]['idNumber'] =  $("#passenger_adults_" + (i + 1) + "_dni").val() ;					
				} 
				for(var i = 0; i < children; i++) {
					jsonData['passengers'][i + adults] = {};
					jsonData['passengers'][i + adults]['firstName'] = $("#passenger_children_" + (i + 1) + "_name").val();
					jsonData['passengers'][i + adults]['lastName'] = $("#passenger_children_" + (i + 1) + "_surname").val();
					jsonData['passengers'][i + adults]['birthdate'] = $("#passenger_children_" + (i + 1) + "_year").val() + "-" +  $("#passenger_children_" + (i + 1) + "_month").val() + "-" +  $("#passenger_children_" + (i + 1) + "_day").val();
					jsonData['passengers'][i + adults]['idType'] =  1;
					jsonData['passengers'][i + adults]['idNumber'] =  $("#passenger_children_" + (i + 1) + "_dni").val() ;		
				}
				for(var i = 0; i < infants; i++) {
					jsonData['passengers'][i + adults + infants] = {};
					jsonData['passengers'][i + adults + infants]['firstName'] = $("#passenger_infants_" + (i + 1) + "_name").val();
					jsonData['passengers'][i + adults + infants]['lastName'] = $("#passenger_infants_" + (i + 1) + "_surname").val();
					jsonData['passengers'][i + adults + infants]['birthdate'] = $("#passenger_infants_" + (i + 1) + "_year").val() + "-" +  $("#passenger_infants_" + (i + 1) + "_month").val() + "-" +  $("#passenger_infants_" + (i + 1) + "_day").val();
					jsonData['passengers'][i + adults + infants]['idType'] =  1;
					jsonData['passengers'][i + adults + infants]['idNumber'] =  $("#passenger_infants_" + (i + 1) + "_dni").val();		
				}
				jsonData['payment'] = {};
				jsonData['payment']['installments'] = 0;
				jsonData['payment']['creditCard'] = {};
				jsonData['payment']['creditCard']['number'] = $("#number_credit_card").val();
				jsonData['payment']['creditCard']['expiration'] = $("#month_expiration_credit_card").val() + $("#year_expiration_credit_card").val();
				jsonData['payment']['creditCard']['securityCode'] = $("#security_credit_card").val();
				jsonData['payment']['creditCard']['firstName'] = $("#name_credit_card").val();
				jsonData['payment']['creditCard']['lastName'] = $("#surname_credit_card").val();
				jsonData['billingAddress'] = {};
				jsonData['billingAddress']['country'] = $("#country_billing_address").val();
				jsonData['billingAddress']['state'] = $("#city_billing_address option:selected").text();              
				jsonData['billingAddress']['City'] =  $("#city_billing_address").val();                            
				jsonData['billingAddress']['postalCode'] = $("#postal_code_billing_address").val();
				jsonData['billingAddress']['street'] = $("#address_billing_address").val();
				jsonData['billingAddress']['floor'] = $("#floor_billing_address").val();
				jsonData['billingAddress']['apartment'] = $("#apartment_billing_address").val();
				jsonData['contact'] = {};
				jsonData['contact']['email'] = $("#email_credit_card").val();
				jsonData['contact']['phones'] = [];
				jsonData['contact']['phones'][0] = $("#telephone_credit_card").val();
				$.ajax({
					url: "http://eiffel.itba.edu.ar/hci/service2/Booking.groovy?method=BookFlight2",
					data: { data: JSON.stringify(jsonData) },
					dataType: "jsonp",
					contentType: "application/json",
				}).done(function(data) {
					console.log("LOG 1");
					console.log(JSON.stringify(jsonData));
					if(data.hasOwnProperty('error') || data['booking'] == false) {
						$("#flightError").modal();
					} else {
						if(flight_type == "round-way") {
							jsonData['flightId'] = ib_id_flight;

							$.ajax({
								url: "http://eiffel.itba.edu.ar/hci/service2/Booking.groovy?method=BookFlight2",
								data: { data: JSON.stringify(jsonData) },
								dataType: "jsonp",
								contentType: "application/json",
							}).done(function(data) { 
								console.log("LOG 2");
								console.log(JSON.stringify(jsonData));
								if(data.hasOwnProperty('error') || data['booking'] == false) {
									$("#flightError").modal();
								} else {
									//estado de la compra
									$.cookie('end', 'true', { path: '/' });
									document.location.href="index.html";
								}
							});
						} else {
							$.cookie('end', 'true', { path: '/' });
							document.location.href="index.html";
						}
					}
				});
			}
		}
	});
});

function enableButtons(idWell, idButton, type, i) {
	$(idButton).click(function() {
		
		
		if(type == "adults") {
			if(validateAdultPassenger("#passenger_adults_" + (i + 1) + "_name_span", $("#passenger_adults_" + (i + 1) + "_name").val(), "#passenger_adults_" + (i + 1) + "_name_error", "#passenger_adults_" + (i + 1) + "_name_error_text", "#passenger_adults_" + (i + 1) + "_surname_span", $("#passenger_adults_" + (i + 1) + "_surname").val(), "#passenger_adults_" + (i + 1) + "_surname_error", "#passenger_adults_" + (i + 1) + "_surname_error_text", "#passenger_adults_" + (i + 1) + "_dni_span", $("#passenger_adults_" + (i + 1) + "_dni").val(), "#passenger_adults_" + (i + 1) + "_dni_error", "#passenger_adults_" + (i + 1) + "_dni_error_text","#passenger_adults_" + (i + 1) + "_date_span", $("#passenger_adults_" + (i + 1) + "_day").val(), $("#passenger_adults_" + (i + 1) + "_month").val(), $("#passenger_adults_" + (i + 1) + "_year").val(), "#passenger_adults_" + (i + 1) + "_date_error", "#passenger_adults_" + (i + 1) + "_date_error_text")) {
				return ;
			}
		} else if(type == "children") {
			if(validateChildrenPassenger("#passenger_children_" + (i + 1) + "_name_span", $("#passenger_children_" + (i + 1) + "_name").val(), "#passenger_children_" + (i + 1) + "_name_error", "#passenger_children_" + (i + 1) + "_name_error_text", "#passenger_children_" + (i + 1) + "_surname_span", $("#passenger_children_" + (i + 1) + "_surname").val(), "#passenger_children_" + (i + 1) + "_surname_error", "#passenger_children_" + (i + 1) + "_surname_error_text", "#passenger_children_" + (i + 1) + "_dni_span", $("#passenger_children_" + (i + 1) + "_dni").val(), "#passenger_children_" + (i + 1) + "_dni_error", "#passenger_children_" + (i + 1) + "_dni_error_text","#passenger_children_" + (i + 1) + "_date_span", $("#passenger_children_" + (i + 1) + "_day").val(), $("#passenger_children_" + (i + 1) + "_month").val(), $("#passenger_children_" + (i + 1) + "_year").val(), "#passenger_children_" + (i + 1) + "_date_error", "#passenger_children_" + (i + 1) + "_date_error_text")) {
				return ;
			}
		} else if(type == "infants") {
			if(validateInfantPassenger("#passenger_infants_" + (i + 1) + "_name_span", $("#passenger_infants_" + (i + 1) + "_name").val(), "#passenger_infants_" + (i + 1) + "_name_error", "#passenger_infants_" + (i + 1) + "_name_error_text", "#passenger_infants_" + (i + 1) + "_surname_span", $("#passenger_infants_" + (i + 1) + "_surname").val(), "#passenger_infants_" + (i + 1) + "_surname_error", "#passenger_infants_" + (i + 1) + "_surname_error_text", "#passenger_infants_" + (i + 1) + "_dni_span", $("#passenger_infants_" + (i + 1) + "_dni").val(), "#passenger_infants_" + (i + 1) + "_dni_error", "#passenger_infants_" + (i + 1) + "_dni_error_text","#passenger_infants_" + (i + 1) + "_date_span", $("#passenger_infants_" + (i + 1) + "_day").val(), $("#passenger_infants_" + (i + 1) + "_month").val(), $("#passenger_infants_" + (i + 1) + "_year").val(), "#passenger_infants_" + (i + 1) + "_date_error", "#passenger_infants_" + (i + 1) + "_date_error_text")) {
				return ;
			}
		} else if(type == "credit_card") {
			if(validateCreditCardInformation()) {
				return ;
			}
		} else if(type == "titular_information") {
			if(validateTitularInformation()) {
				return ;
			}
		} else if(type == "contact_information"){
			if(validateContactInformation()) {
				return ;
			}
		} else {
			if(validateBillingAddress()) {
				return ;
			}
		}
			
		$(idWell).removeClass("well-group-error");
		$(idButton).removeClass("btn-danger");
		
		if($($(idWell).find("input")[0]).attr("disabled")) {
			$(idWell).find("input").removeAttr("disabled");
			$(idWell).find("select").removeAttr("disabled");
			$(idButton).text(" Guardar ");
			$(idButton).append('<i class="icon-save"></i>');
			totalEdits++;
		} else {
			$(idWell).find("input").attr("disabled",true);
			$(idWell).find("select").attr("disabled",true);
			$(idButton).text(" Editar ");
			$(idButton).append('<i class="icon-pencil"></i>');
			totalEdits--;
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
		if(validateAdultPassenger("#passenger_adults_" + (i + 1) + "_name_span", $("#passenger_adults_" + (i + 1) + "_name").val(), "#passenger_adults_" + (i + 1) + "_name_error", "#passenger_adults_" + (i + 1) + "_name_error_text", "#passenger_adults_" + (i + 1) + "_surname_span", $("#passenger_adults_" + (i + 1) + "_surname").val(), "#passenger_adults_" + (i + 1) + "_surname_error", "#passenger_adults_" + (i + 1) + "_surname_error_text", "#passenger_adults_" + (i + 1) + "_dni_span", $("#passenger_adults_" + (i + 1) + "_dni").val(), "#passenger_adults_" + (i + 1) + "_dni_error", "#passenger_adults_" + (i + 1) + "_dni_error_text","#passenger_adults_" + (i + 1) + "_date_span", $("#passenger_adults_" + (i + 1) + "_day").val(), $("#passenger_adults_" + (i + 1) + "_month").val(), $("#passenger_adults_" + (i + 1) + "_year").val(), "#passenger_adults_" + (i + 1) + "_date_error", "#passenger_adults_" + (i + 1) + "_date_error_text")) {
			error1 = true;
		}
	}
	for(var i = 0; i < children; i++) {
		if(validateChildrenPassenger("#passenger_children_" + (i + 1) + "_name_span", $("#passenger_children_" + (i + 1) + "_name").val(), "#passenger_children_" + (i + 1) + "_name_error", "#passenger_children_" + (i + 1) + "_name_error_text", "#passenger_children_" + (i + 1) + "_surname_span", $("#passenger_children_" + (i + 1) + "_surname").val(), "#passenger_children_" + (i + 1) + "_surname_error", "#passenger_children_" + (i + 1) + "_surname_error_text", "#passenger_children_" + (i + 1) + "_dni_span", $("#passenger_children_" + (i + 1) + "_dni").val(), "#passenger_children_" + (i + 1) + "_dni_error", "#passenger_children_" + (i + 1) + "_dni_error_text","#passenger_children_" + (i + 1) + "_date_span", $("#passenger_children_" + (i + 1) + "_day").val(), $("#passenger_children_" + (i + 1) + "_month").val(), $("#passenger_children_" + (i + 1) + "_year").val(), "#passenger_children_" + (i + 1) + "_date_error", "#passenger_children_" + (i + 1) + "_date_error_text")) {
			error2 = true;
		}
	}
	for(var i = 0; i < infants; i++) {
		if(validateInfantPassenger("#passenger_infants_" + (i + 1) + "_name_span", $("#passenger_infants_" + (i + 1) + "_name").val(), "#passenger_infants_" + (i + 1) + "_name_error", "#passenger_infants_" + (i + 1) + "_name_error_text", "#passenger_infants_" + (i + 1) + "_surname_span", $("#passenger_infants_" + (i + 1) + "_surname").val(), "#passenger_infants_" + (i + 1) + "_surname_error", "#passenger_infants_" + (i + 1) + "_surname_error_text", "#passenger_infants_" + (i + 1) + "_dni_span", $("#passenger_infants_" + (i + 1) + "_dni").val(), "#passenger_infants_" + (i + 1) + "_dni_error", "#passenger_infants_" + (i + 1) + "_dni_error_text","#passenger_infants_" + (i + 1) + "_date_span", $("#passenger_infants_" + (i + 1) + "_day").val(), $("#passenger_infants_" + (i + 1) + "_month").val(), $("#passenger_infants_" + (i + 1) + "_year").val(), "#passenger_infants_" + (i + 1) + "_date_error", "#passenger_infants_" + (i + 1) + "_date_error_text")) {
			error3 = true;
		}
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
		$(passengerNameErrorText).text(" Ingrese un nombre válido");
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
		$(passengerSurnameErrorText).text(" Ingrese un apellido válido");
		$(passengerSurnameError).show();
		error = true;
	}
	
	if(passengerDNI == "") {
		$(passengerDNISpan).addClass("control-group error");
		$(passengerDNIErrorText).text(" Ingrese el número de DNI del pasajero");
		$(passengerDNIError).show();
		error = true;
	} else if(!validateDNIField(passengerDNI)) {
		$(passengerDNISpan).addClass("control-group error");
		$(passengerDNIErrorText).text(" Ingrese un número de DNI válido");
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
		$(passengerDateErrorText).text(" Ingrese una fecha de nacimiento válida");
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
		$(passengerNameErrorText).text(" Ingrese un nombre válido");
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
		$(passengerSurnameErrorText).text(" Ingrese un apellido válido");
		$(passengerSurnameError).show();
		error = true;
	}
	
	if(passengerDNI == "") {
		$(passengerDNISpan).addClass("control-group error");
		$(passengerDNIErrorText).text(" Ingrese el número de DNI del pasajero");
		$(passengerDNIError).show();
		error = true;
	} else if(!validateDNIField(passengerDNI)) {
		$(passengerDNISpan).addClass("control-group error");
		$(passengerDNIErrorText).text(" Ingrese un número de DNI válido");
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
		$(passengerDateErrorText).text(" Ingrese una fecha de nacimiento válida");
		$(passengerDateError).show();
		error = true;
	} else if(!validateDateChildren(passengerDay, passengerMonth, passengerYear)) {
		$(passengerDateSpan).addClass("control-group error");
		$(passengerDateErrorText).text(" La fecha de nacimiento no se corresponde con un niño");
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
		$(passengerNameErrorText).text(" Ingrese un nombre válido");
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
		$(passengerSurnameErrorText).text(" Ingrese un apellido válido");
		$(passengerSurnameError).show();
		error = true;
	}
	
	if(passengerDNI == "") {
		$(passengerDNISpan).addClass("control-group error");
		$(passengerDNIErrorText).text(" Ingrese el número de DNI del pasajero");
		$(passengerDNIError).show();
		error = true;
	} else if(!validateDNIField(passengerDNI)) {
		$(passengerDNISpan).addClass("control-group error");
		$(passengerDNIErrorText).text(" Ingrese un número de DNI válido");
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
		$(passengerDateErrorText).text(" Ingrese una fecha de nacimiento válida");
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
	var textPattern = /^[A-Za-záéíóú ]+$/;
	return textPattern.test(text);
}

function validateDNIField(DNI) {
	var textPattern = /^[0-9 ]{8}$/;
	return textPattern.test(DNI);
}

function validateTelephoneField(telephone) {
	var textPattern = /^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/;
	return textPattern.test(telephone);	
}

function validateEmailField(email) {
	var pattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
	return pattern.test(email);	
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
	var age = now.getFullYear() - date.getFullYear();
	var month;

	age = now.getFullYear() - date.getFullYear();
  	month = now.getMonth() - date.getMonth();
	if (month < 0 || (month == 0 && now.getDate() < date.getDate())) {
   		 age--;
  	}	

	return age > 11;
}

function validateDateChildren(day, month, year) {
	var date = new Date(year, month - 1, day, 0, 0, 0, 0);
	var nowTemp = new Date();
	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
	var age = now.getFullYear() - date.getFullYear();
	var month;

	age = now.getFullYear() - date.getFullYear();
  	month = now.getMonth() - date.getMonth();
	if (month < 0 || (month == 0 && now.getDate() < date.getDate())) {
   		 age--;
  	}	
	
	return age > 2 && age <= 11;
}

function validateDateInfant(day, month, year) {
	var date = new Date(year, month - 1, day, 0, 0, 0, 0);
	var nowTemp = new Date();
	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
	var age = now.getFullYear() - date.getFullYear();
	var month;

	age = now.getFullYear() - date.getFullYear();
  	month = now.getMonth() - date.getMonth();
	if (month < 0 || (month == 0 && now.getDate() < date.getDate())) {
   		 age--;
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
	var error4 = false;

	error1 = validateCreditCardInformation();
	error2 = validateTitularInformation();
	error3 = validateContactInformation();
	error4 = validateBillingAddress();

	return !error1 && !error2 && !error3 && !error4;
}

function validateCreditCardInformation() {
	var error = false;
	var now = new Date();
	
	if($("#number_credit_card").val() == "" ) {
		$("#number_credit_card_span").addClass("control-group error");
		$("#number_credit_card_error_text").text(" Ingrese el número de la tarjeta");
		$("#number_credit_card_error").show();
		error = true;
	} else if(!validateCreditCardNumber($("#number_credit_card").val())) {
		$("#number_credit_card_span").addClass("control-group error");
		$("#number_credit_card_error_text").text(" Ingrese un número válido de tarjeta");
		$("#number_credit_card_error").show();
		error = true;
	}
	
	if($("#month_expiration_credit_card").val() == "month") {
		$("#month_expiration_credit_card").addClass("error-select");
		$("#expiration_credit_card_error_text").text(" Ingrese la fecha de vencimiento de la tarjeta");
		$("#expiration_credit_card_error").show();
		error = true;
	}

	if($("#year_expiration_credit_card").val() == "year") {
		$("#year_expiration_credit_card").addClass("error-select");
		$("#expiration_credit_card_error_text").text(" Ingrese la fecha de vencimiento de la tarjeta");
		$("#expiration_credit_card_error").show();
		error = true;
	}
if($("#month_expiration_credit_card").val() != "month" && $("#year_expiration_credit_card").val() != "year") {
		if(($("#month_expiration_credit_card").val() - 1) < now.getMonth() && $("#year_expiration_credit_card option:selected").text() <= now.getFullYear()) {
			$("#month_expiration_credit_card").addClass("error-select");
			$("#expiration_credit_card_error_text").text(" La tarjeta que ingresó está vencida");
			$("#expiration_credit_card_error").show();
			error = true;
		}
	}

	if($("#security_credit_card").val() == "") {
		$("#security_credit_card_span").addClass("control-group error");
		$("#security_credit_card_error_text").text(" Ingrese el código de seguridad de la tarjeta");
		$("#security_credit_card_error").show();
		error = true;
	} else if(!validateCreditCardSecurity($("#security_credit_card").val())) {
		$("#security_credit_card_span").addClass("control-group error");
		$("#security_credit_card_error_text").text(" Ingrese un código de seguridad válido");
		$("#security_credit_card_error").show();
		error = true;
	}
	
	$.ajax({
		url: "http://eiffel.itba.edu.ar/hci/service2/Booking.groovy?method=ValidateCreditCard&number=" + $("#number_credit_card").val() + "&exp_date=" + $("#month_expiration_credit_card").val() + $("#year_expiration_credit_card").val() + "&sec_code=" + $("#security_credit_card").val(),
		dataType: "jsonp",
	}).done(function(data) {
		if(data.hasOwnProperty("error")){
			if(data["error"]["code"] == 111) {
				$("#security_credit_card_span").addClass("control-group error");
				$("#security_credit_card_error_text").text(" Ingrese un código de seguridad válido");
				$("#security_credit_card_error").show();
				error = true;
			}	
		}
	});

	return error;
}

function validateTitularInformation() {
	var error = false;
	
	if($("#name_credit_card").val() == "" ) {
		$("#name_credit_card_span").addClass("control-group error");
		$("#name_credit_card_error_text").text(" Ingrese el nombre del titular de la tarjeta");
		$("#name_credit_card_error").show();
		error = true;
	} else if(!validateTextField($("#name_credit_card").val())) {
		$("#name_credit_card_span").addClass("control-group error");
		$("#name_credit_card_error_text").text(" Ingrese un nombre válido");
		$("#name_credit_card_error").show();
		error = true;
	}
	
	if($("#surname_credit_card").val() == "" ) {
		$("#surname_credit_card_span").addClass("control-group error");
		$("#surname_credit_card_error_text").text(" Ingrese el apellido del titular de la tarjeta");
		$("#surname_credit_card_error").show();
		error = true;
	} else if(!validateTextField($("#surname_credit_card").val())) {
		$("#surname_credit_card_span").addClass("control-group error");
		$("#surname_credit_card_error_text").text(" Ingrese un apellido válido");
		$("#surname_credit_card_error").show();
		error = true;
	}
	
	if($("#dni_credit_card").val() == "" ) {
		$("#dni_credit_card_span").addClass("control-group error");
		$("#dni_credit_card_error_text").text(" Ingrese el DNI del titular de la tarjeta");
		$("#dni_credit_card_error").show();
		error = true;
	} else if(!validateDNIField($("#dni_credit_card").val())) {
		$("#dni_credit_card_span").addClass("control-group error");
		$("#dni_credit_card_error_text").text(" Ingrese un DNI válido");
		$("#dni_credit_card_error").show();
		error = true;
	}
	
	return error;
}

function validateContactInformation() {
	var error = false;
	
	if($("#telephone_credit_card").val() == "" ) {
		$("#telephone_credit_card_span").addClass("control-group error");
		$("#telephone_credit_card_error_text").text(" Ingrese un teléfono de contacto");
		$("#telephone_credit_card_error").show();
		error = true;
	} else if(!validateTelephoneField($("#telephone_credit_card").val())) {
		$("#telephone_credit_card_span").addClass("control-group error");
		$("#telephone_credit_card_error_text").text(" Ingrese un teléfono válido");
		$("#telephone_credit_card_error").show();
		error = true;
	}
	
	if($("#email_credit_card").val() == "" ) {
		$("#email_credit_card_span").addClass("control-group error");
		$("#email_credit_card_error_text").text(" Ingrese un correo electrónico de contacto");
		$("#email_credit_card_error").show();
		error = true;
	} else if(!validateEmailField($("#email_credit_card").val())) {
		$("#email_credit_card_span").addClass("control-group error");
		$("#email_credit_card_error_text").text(" Ingrese un correo electrónico válido");
		$("#email_credit_card_error").show();
		error = true;
	}
	
	return error;
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
			correct = false;
		}
	} else if($("#type_credit_card").val() == "Master") {
		if(!master1.test(number) && !master2.test(number) && !master3.test(number)) {
			correct = false;
		}
	} else if($("#type_credit_card").val() == "Diners") {
		if(!diners.test(number)) {
			correct = false;
		}
	} else if($("#type_credit_card").val() == "American") {
		if(!american1.test(number) && !american2.test(number) && !american3.test(number)) {
			correct = false;
		}
	}
	
	return correct;
}

function validateCreditCardSecurity(number) {
	var pattern1 = /^[0-9]{3}$/;
	var pattern2 = /^[0-9]{4}$/;
	var correct = true;
	
	if($("#type_credit_card").val() == "American") {
		if(!pattern2.test(number)) {
			correct = false;
		}
	} else {
		if(!pattern1.test(number)) {
			correct = false;
		}
	}
	
	return correct;
}

function validateBillingAddress() {
	var error = false;
	var found = false;
	var postalCodePattern = /^[0-9]+$/;

	if($("#postal_code_billing_address").val() == "") {
		$("#postal_code_billing_address_span").addClass("control-group error");
		$("#postal_code_billing_address_error_text").text(" Ingrese su código postal");
		$("#postal_code_billing_address_error").show();
		error = true;
	} else if(!postalCodePattern.test($("#postal_code_billing_address").val())) {
		$("#postal_code_billing_address_span").addClass("control-group error");
		$("#postal_code_billing_address_error_text").text(" Ingrese un código postal válido");
		$("#postal_code_billing_address_error").show();
		error = true;
	}

	if($("#address_billing_address").val() == "") {
		$("#address_billing_address_span").addClass("control-group error");
		$("#address_billing_address_error_text").text(" Ingrese una dirección");
		$("#address_billing_address_error").show();
		error = true;
	}

	return error;
}

function fillCountriesArray(data) {
	if(!data.hasOwnProperty("error")) {
		for(var i = 0; i < data['total']; i++) {
			countries[i] = data['countries'][i]['name'];
			countriesId[i] = data['countries'][i]['countryId'];
		}
		$.ajax({
			url: "http://eiffel.itba.edu.ar/hci/service2/Geo.groovy?method=GetCities&page_size=40&sort_key=name&sort_order=asc",
        	dataType: "jsonp",
        	jsonpCallback: "fillCitiesArray",
    	});
	} else {
		////// ver que poner como error si no me pudo cargar los paises y las ciudades
	}
}

function fillCitiesArray(data) {
	var id;

	if(!data.hasOwnProperty("error")) {
       	for (var i = 0;i<data['total'];i++){
           	cities[i] = data['cities'][i]['name'];
           	citiesId[i] = data['cities'][i]['cityId'];
           	citiesCountriesId[i] = data['cities'][i]['countryId'];
       	}
       	for(var i = 0; i < countries.length; i++) {
       		$("#country_billing_address").append('<option value="' + countriesId[i] + '">' + countries[i] + '</option>');
       	}
       	for(var i = 0; i < cities.length; i++) {
       		if(citiesCountriesId[i] == countriesId[0]) {
       			$("#city_billing_address").append('<option value="' + citiesId[i] + '">' + cities[i] + '</option>');
       		}
       	}
       	$("#country_billing_address").change(function() {
       		for(var j = 0; j < countriesId.length; j++) {
       			if($("#country_billing_address").val() == countriesId[j]) {
       				id = j;
       			}
       		}
       		$("#city_billing_address").empty();
       		for(var i = 0; i < cities.length; i++) {
       			if(citiesCountriesId[i] == countriesId[id]) {
       				$("#city_billing_address").append('<option value="' + citiesId[i] + '">' + cities[i] + '</option>');
       			}
       		}
       	});
	} else {
	}
}


function focusOutField2Adult(passengerFieldActual, passengerFieldDay, passengerFieldMonth, passengerFieldYear, passengerDateSpan , passengerError) {
	$(passengerFieldActual).focusout(function() {
		if(validateDate($(passengerFieldDay).val(), $(passengerFieldMonth).val(), $(passengerFieldYear).val())) {
			if(validateDateAdult($(passengerFieldDay).val(), $(passengerFieldMonth).val(), $(passengerFieldYear).val())) { 
				$(passengerDateSpan).removeClass('control-group error');
				$(passengerError).hide();
			}
		}
	});
}

function focusOutField2Children(passengerFieldActual, passengerFieldDay, passengerFieldMonth, passengerFieldYear, passengerDateSpan , passengerError) {
	$(passengerFieldActual).focusout(function() {
		if(validateDate($(passengerFieldDay).val(), $(passengerFieldMonth).val(), $(passengerFieldYear).val())) {
			if(validateDateChildren($(passengerFieldDay).val(), $(passengerFieldMonth).val(), $(passengerFieldYear).val())) {
				$(passengerDateSpan).removeClass('control-group error');
				$(passengerError).hide();
			}
		}
	});
}

function focusOutField2Infant(passengerFieldActual, passengerFieldDay, passengerFieldMonth, passengerFieldYear, passengerDateSpan , passengerError) {
	$(passengerFieldActual).focusout(function() {
		if(validateDate($(passengerFieldDay).val(), $(passengerFieldMonth).val(), $(passengerFieldYear).val())) {
			if(validateDateInfant($(passengerFieldDay).val(), $(passengerFieldMonth).val(), $(passengerFieldYear).val())) {
				$(passengerDateSpan).removeClass('control-group error');
				$(passengerError).hide();
			}
		}
	});
}