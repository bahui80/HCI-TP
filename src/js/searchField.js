var citiesAirportsArray = new Array();
var airlinesArray = new Array();
var i=0;
var curTotal=0;
var advanced_options_on = false;

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
		$("#return_date").fadeOut(500);
		$("#return_hour").fadeOut(500);
		$("#oneway_trip").addClass('active');
		$("#round_trip").removeClass('active');
	});
	
	$("#round_trip").click(function () {
		$("#return_date").fadeIn(500);
		$("#return_hour").fadeIn(500);
		$("#oneway_trip").removeClass('active');
		$("#round_trip").addClass('active');
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
	$('#origin').typeahead({
		source : citiesAirportsArray,
		minLength : 3
	});
	$('#destination').typeahead({
		source : citiesAirportsArray,
		minLength : 3
	});
	
	$("#search_button").click(function () {
		var containsOrigin = false;
		var containsDestination = false;
		var containsAirline = false;
		for(var k=0; k<citiesAirportsArray.length; k++){
			if(citiesAirportsArray[k]==$("#origin").val()){
				containsOrigin = true;
			}
			if(citiesAirportsArray[k]==$("#destination").val()){
				containsDestination = true;
			}
		}
		for(var k=0; k<citiesAirportsArray.length && !containsAirline; k++){
			if(airlinesArray[k]==$("#airline").val() || !advanced_options_on || (advanced_options_on && $("#airline").val()=="" )){
				containsAirline = true;
			}
		}
	});
	
}