var citiesAirportsArray = new Array();
var airlinesArray = new Array();
var i=0;
var curTotal=0;
var advanced_options_on = false;
var error_on = false;
var round_trip = false;

$(document).ready(function() {
	$.ajax({
		url: "http://eiffel.itba.edu.ar/hci/service2/Geo.groovy?method=GetCities&page_size=40",
        dataType: "jsonp",
        jsonpCallback: "fillCitiesArray",
    });
	$.ajax({
		url: "http://eiffel.itba.edu.ar/hci/service2/Misc.groovy?method=GetAirlines",
        dataType: "jsonp",
        jsonpCallback: "fillAirlinesArray",
    });
	
	$("#from_error").hide();
	$("#destination_error").hide();
	$("#airline_error").hide();
	$(".advanced_options_div").hide();

	$("#advanced_options_button").click(function () {	
		if(advanced_options_on){
			$(".advanced_options_div").slideUp(1000);
			$("#advanced_options_icon").toggleClass('icon-minus-sign icon-plus-sign');
			advanced_options_on = false;
		}else{
			$(".advanced_options_div").slideDown(1000);
			$("#advanced_options_icon").toggleClass('icon-plus-sign icon-minus-sign');
			advanced_options_on = true;
		}			
	});
	
	$("#myCarousel").carousel('cycle');
	
	var trip_state = false; 
	$("#oneway_trip").click(function () {
		// home
		$("#return_span").fadeOut(500);
		$("#return_hour").fadeOut(500);
		// esto es de la pag de res
		$("#ret_date_div").slideUp(500);
		// cambia de estado
		$("#oneway_trip").addClass('active');
		$("#round_trip").removeClass('active');
		round_trip = false;
	});
	
	$("#round_trip").click(function () {
		// home
		$("#return_span").fadeIn(500);
		$("#return_hour").fadeIn(500);
		// esto es de la pag de res
		$("#ret_date_div").slideDown(500);
		// cambia de estado
		$("#oneway_trip").removeClass('active');
		$("#round_trip").addClass('active');
		round_trip = true;
	});
});

function fillAirlinesArray(data){
	if(!data.hasOwnProperty("error")){
        for (var j=0;j<data['total'];j++){
        	airlinesArray[j] = data['airlines'][j]['name'];
        }
	}else{
        console.log(JSON.stringify(data));
	}
	$('#airline').typeahead({
		source : airlinesArray,
		minLength : 3
	})
}

function fillCitiesArray(data){
	if(!data.hasOwnProperty("error")){
        for (;i<data['total'];i++){
                citiesAirportsArray[i] = data['cities'][i]['name'];
        }
	}else{
        console.log(JSON.stringify(data));
	}	
	curTotal=i;
	$.ajax({
		url: "http://eiffel.itba.edu.ar/hci/service2/Geo.groovy?method=GetAirports&page_size=52",
        dataType: "jsonp",
        jsonpCallback: "fillAirportsArray",
    });
}

function fillAirportsArray(data){
	if(!data.hasOwnProperty("error")){
        for (;i<curTotal+data['total']-1;i++){
                citiesAirportsArray[i] = data['airports'][i-curTotal]['description']+" ("+data['airports'][i-curTotal]['airportId']+")";
        }
	}else{
        console.log(JSON.stringify(data));
	}
	$('#from').typeahead({
		source : citiesAirportsArray,
		minLength : 3
	});
	$('#to').typeahead({
		source : citiesAirportsArray,
		minLength : 3
	});
	
	$("#from").click(function() {
		$("#from").select();
		$("#origin_span").removeClass('control-group error');
		$("#from_error").hide();
	});
	
	$("#to").click(function() {
		$("#to").select();
		$("#destination_span").removeClass('control-group error');
		$("#destination_error").hide();
	});
	
	$("#airline").click(function() {
		$("#airline").select();
		$("#airline_span").removeClass('control-group error');
		$("#airline_error").hide();
	});
	
	$("#search_button").click(function () {
		var containsOrigin = false;
		var containsDestination = false;
		var containsAirline = false;
		for(var k=0; k < citiesAirportsArray.length; k++){
			if(citiesAirportsArray[k]==$("#from").val()){
				containsOrigin = true;
			}
			if(citiesAirportsArray[k]==$("#to").val()){
				containsDestination = true;
			}
		}
		for(var k=0; k < citiesAirportsArray.length && !containsAirline; k++){
			if(airlinesArray[k] == $("#airline").val() || !advanced_options_on || (advanced_options_on && $("#airline").val()=="" )){
				containsAirline = true;
			}
		}

		if(($("#to").val()) == ($("#from").val())) {
			$("#origin_span").addClass('control-group error');
			$("#destination_span").addClass('control-group error');
			$("#from_error > em").text(" Mismo origen y destino");
			$("#destination_error > em").text(" Mismo origen y destino");
			$("#from_error").show();
			$("#destination_error").show();
		}
		
		
		if(!containsOrigin){
			$("#origin_span").addClass('control-group error');
			if($("#from").val()=="") {
				$("#from_error > em").text(" Por favor, ingrese un origen");
				$("#from_error").show();
			} else {
				$("#from_error > em").text(" Por favor, ingrese un origen valido");
				$("#from_error").show();
			}
		} else{
		//	$("#origin_span").removeClass('control-group error');
		}
		
		if(!containsDestination){
			$("#destination_span").addClass('control-group error');
			if($("#to").val()=="") {
				$("#destination_error > em").text(" Por favor, ingrese un destino");
				$("#destination_error").show();
			} else {
				$("#destination_error > em").text(" Por favor, ingrese un destino valido");
				$("#destination_error").show();
			}
		} else{
		//	$("#destination_span").removeClass('control-group error');
		}
		if(!containsAirline){
			$("#airline_span").addClass('control-group error');
			$("#airline_error").show();
		} else{
			$("#airline_span").removeClass('control-group error');
			$("#airline_error").hide();
		}

		// crea resumen de errores
		if((!containsOrigin || !containsDestination || !containsAirline)){
			if(error_on){
				$(".alert-error").remove();
			}
			$("#button_section").prepend('<div id="alert-div" class="alert alert-error"><strong>Cuidado!</strong> Revise los campos indicados</div>');
			$("#alert-div").hide();
			$("#alert-div").slideDown(500);
			error_on = true;
		}	
	});	
}