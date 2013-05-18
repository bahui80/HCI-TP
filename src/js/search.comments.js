// Variables globales
var airlinesArray = new Array();
var airlinesCodeArray = new Array();

$(document).ready(function() {

	//escondo el mensaje de exito
	$(".after-comment").hide();

	//preparo el boton de posteo
	preparePostComment();

	//preparo el boton de busqueda
	prepareSearchComment();

	$.ajax({
		url: "http://eiffel.itba.edu.ar/hci/service2/Misc.groovy?method=GetAirlines",
        dataType: "jsonp",
        jsonpCallback: "fillAirlinesArray",
    });
	
	$("#flight_num_span").hide();

	$("#airline_name_btn").click(function () {
		$("#flight_number_btn").removeClass('active');
		$("#airline_name_btn").addClass('active');
		$("#flight_num_span").slideUp(500);
		$("#airline_name_span").slideDown(500);
		$("#flight_num").val("");
	});
	
	$("#flight_number_btn").click(function () {
		$("#airline_name_btn").removeClass('active');
		$("#flight_number_btn").addClass('active');
		$("#flight_num_span").slideDown(500);
		$("#airline_name_span").slideUp(500);
		$("#airline_name").val("");
	});
});

function fillAirlinesArray(data){
	if(!data.hasOwnProperty("error")){
        for (var j=0;j<data['total'];j++){
        	airlinesArray[j] = data['airlines'][j]['name'];
        	airlinesCodeArray[j] = data['airlines'][j]['airlineId'];
        }
	}else{
        console.log(JSON.stringify(data));
	}
	$('#airline_name').typeahead({
		source : airlinesArray,
		minLength : 1
	});
	$('#comment_airline_name').typeahead({
		source : airlinesArray,
		minLength : 1
	});
}


function preparePostComment(){
	
	$("#comment_button").click(function () {

		var error_on = false;		
		var containsAirline = false;
		var airlineId;

		for(var k=0; k < airlinesArray.length; k++){
			if(airlinesArray[k] == $("#comment_airline_name").val()){
        		airlineId = airlinesCodeArray[k];
				containsAirline = true;
			}
		}

		if($("#comment_airline_name").val() == ""){
			// ACA ERROR DE NUMERO DE VUELO VACIO
			error_on = true;
		}

		if($("#comment_airline_name").val() == ""){
			// ACA ERROR DE AEROLINEA VACIA
			error_on = true;
		}

		if(!containsAirline){
			// ACA ERROR DE AEROLINEA INVALIDA
			error_on = true;
		}

		if(!error_on){
			//FALTA EL SERVICIO DE COMENTARIOS
			postComment(airlineId, $("#comment_flight_num").val(), $("#amability").val(), $("#food").val(), $("#punctuality").val(), $("#frequent_passenger").val(), $("#comfort").val(), $("#price_quality").val(), $("#recommend").val(), $("#comments").val())

			$(".before-comment").fadeOut(500);
			$(".after-comment").delay(499).fadeIn(500);
		}
	});	
}

function postComment(airline, flight, amability, food, punctuality, frequent_passenger, comfort, price_quality, recommend, comments){
	var objJson = {"airlineId": "IB","flightNumber": 6831, "friendlinessRating": 8,"foodRating": 9,"punctualityRating": 9,"mileageProgramRating": 6, "comfortRating": 9, "qualityPriceRating": 7, "yesRecommend": true, "comments": ""}

	objJson.airlineId = airline;
	objJson.flightNumber = parseInt(flight);
	objJson.friendlinessRating = parseInt(amability);
	objJson.foodRating = parseInt(food);
	objJson.punctualityRating = parseInt(punctuality);
	objJson.mileageProgramRating = parseInt(frequent_passenger);
	objJson.comfortRating = parseInt(comfort);
	objJson.qualityPriceRating = parseInt(price_quality);
	if (recommend == "Si"){
		objJson.yesRecommend = true;
	} else{
		objJson.yesRecommend = false;
	}
	objJson.comments = comments;
	console.log(JSON.stringify(objJson));
	$.ajax({
		url: "http://eiffel.itba.edu.ar/hci/service2/Review.groovy?method=ReviewAirline2",
		data: { data: JSON.stringify(objJson) },
		dataType: "jsonp",
		contentType: "application/json",
	});
}

function prepareSearchComment(){
	
	$("#search_button").click(function () {
		
		var by_airline = $("#airline_name_btn").hasClass("active");
		var error_on = false;		
		var containsAirline = false;
		var airline_name = "";
		var airline_id = "";
		var flight_num = "";

		for(var k=0; k < airlinesArray.length && by_airline; k++){
			if(airlinesArray[k] == $("#airline_name").val()){
				airline_id = airlinesCodeArray[k];
				containsAirline = true;
			}
			if(!by_airline){
				containsAirline = true;
			}
		}

		if(!by_airline && $("#flight_num").val() == ""){
			// ACA ERROR DE NUMERO DE VUELO VACIO
			error_on = true;
		}

		if(by_airline && $("#airline_name").val() == ""){
			// ACA ERROR DE AEROLINEA VACIA
			error_on = true;
		}

		if(by_airline && !containsAirline){
			// ACA ERROR DE AEROLINEA INVALIDA
			error_on = true;
		}

		//preparo info para formar la cookie
		if(!error_on && by_airline){
			airline_name = $("#airline_name").val();
		} else {
			flight_num = $("#flight_num").val();
		}

		if(!error_on){			
			commentSearch(by_airline, airline_name, airline_id, flight_num);
		}
	});	
}

function commentSearch(by_airline, airline_name, airline_id, flight_num){
	// preparo las cookies
	$.cookie('by_airline', by_airline, { path: '/' });
	$.cookie('com_airline_name', airline_name, { path: '/' });
	$.cookie('com_airline_id', airline_id, { path: '/' });
	$.cookie('com_flight_num', flight_num, { path: '/' });

	document.location.href="comments_results.html";
}
