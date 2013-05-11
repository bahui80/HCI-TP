var cur_page = 1;
var page_size = 5;
var total_pages = 1;

$(document).ready(function() {

	// muestro un modal incerrable de cargando hasta que termine de buscar el vuelo
	$('#loading-modal').modal({
		backdrop: 'static',
		keyboard: false
	})

	// esto lo cierra
	$('#loading-modal').modal('hide');

	// creo el objeto query-string para leer la url
	qs= new QueryString();

	// datos de la busqueda del home
	var flightType = qs.value('flightType');
	var from = qs.value('from');
	var from_code = qs.value('from_code');
	var to = qs.value('to');
	var to_code = qs.value('to_code');
	var dep_date = qs.value('dep_date');
	var ret_date = qs.value('ret_date');
	var airline_id = qs.value('airline_id');
	var min_price = qs.value('min_price');
	var max_price = qs.value('max_price');
	var cabin_type = qs.value('cabin_type');
	var dep_time = qs.value('dep_time');
	var ret_time = qs.value('ret_time');

	// cargo las opciones de busqueda
	loadFields(flightType, from, to, dep_date, ret_date, adults, children, infants, airline_id,min_price, max_price, cabin_type, dep_time, ret_time);

	// carga las monedas
	$.ajax({
		url: "http://eiffel.itba.edu.ar/hci/service2/Misc.groovy?method=GetCurrencies",
        dataType: "jsonp",
        jsonpCallback: "loadCurrencies"
    });

	// busco los vuelos de a acuerdo a los parametros pasados
	//searchFlights(flightType, from, to, dep_date, ret_date, adults, children, infants, airline_id,min_price, max_price, cabin_type, dep_time, ret_time, 1, 5, 'fare', 'asc');
	
	// crear paginado
	createPagination();

	// eventos de click de filtros

	// eventos de cambio de moneda

	// eventos de cambio de orden

});

function loadCurrencies(data){
	$("#currencies").empty();
	if(!data.hasOwnProperty("error")){
        for (var j=0;j<data['total'];j++){
        	//crea los chk box de cada aerolinea con su imagen y id
        	if(data['currencies'][j]['description'] == "Dolares"){
        		$('#currencies').append('<option selected="selected">'+data['currencies'][j]['description'] +'</option>');
        	}else{
        		$('#currencies').append('<option>'+data['currencies'][j]['description'] +'</option>');
        	}
        }
	}else{
        console.log(JSON.stringify(data));
	}
	
}

function loadFields(flightType, from, to, dep_date, ret_date, adults, children, infants, airline_id, min_price, max_price, cabin_type, dep_time, ret_time){
	
	// cargar parametros de busqueda
	$('#from').val(from);
	$('#to').val(to);
	$('#dep').val(dep_date);
	$('#ret').val(ret_date);
	$('#adults').val(adults);
	$('#children').val(children);
	$('#infants').val(infants);

	// cargar los filtros
	$("#minMaxSlider").val([min_price, max_price]);

	// cargar horarios de retorno
	if(dep_time == "Morning"){
		$('#morning-dep-time').attr('checked',true);
	}else if(dep_time == "Noon"){
		$('#noon-dep-time').attr('checked',true);
	}else if(dep_time == "Afternoon"){
		$('#afternoon-dep-time').attr('checked',true);
	}else if(dep_time == "Night"){
		$('#night-dep-time').attr('checked',true);
	}else{
		$('#all-dep-time').attr('checked',true);
	}

	// tratado de las preferencias horarias
	if(flightType == "oneWay"){
		// escondo el div de horario de retorno
		$('#ret-time').hide();
	}else{
		// cargo horario de retorno
		if(ret_time == "Morning"){
			$('#morning-ret-time').attr('checked',true);
		}else if(ret_time == "Noon"){
			$('#noon-ret-time').attr('checked',true);
		}else if(ret_time == "Afternoon"){
			$('#afternoon-ret-time').attr('checked',true);
		}else if(ret_time == "Night"){
			$('#night-ret-time').attr('checked',true);
		}else{
			$('#all-ret-time').attr('checked',true);
		}
	}

	// seteo fijo la clase
	$('#cabin_type').val(cabin_type);

	// cargo las aerolineas de la db
	$.ajax({
		url: "http://eiffel.itba.edu.ar/hci/service2/Misc.groovy?method=GetAirlines",
        dataType: "jsonp",
        jsonpCallback: "loadAirlinesChkboxes"
    });	
}

function loadAirlinesChkboxes(data){
	$("#airline-div").empty();
	$('#airline-div').append('<label>Nombre de la aerolínea</label><label class="radio label-font-fix"><input id="any-airline-rd-box" type="radio" name="airlines_group" checked>Todas las aerolíneas</label>')
	if(!data.hasOwnProperty("error")){
        for (var j=0;j<data['total'];j++){
        	//crea los chk box de cada aerolinea con su imagen y id
        	$('#airline-div').append('<label class="radio label-font-fix"><input id="'+data['airlines'][j]['airlineId']+'-rd-box" type="radio" name="airlines_group"><img src="'+data['airlines'][j]['logo']+'" height="20" width="20"> '+data['airlines'][j]['name']+'</label>')
        }

        // saca la aerolinea de preferencia del qstring
        var airline_id = qs.value('airline_id');

        // chkea el chk box de la aerolinea preferida
        if (airline_id != null) {
        	$("#"+airline_id+"-rd-box").attr('checked',true);
        }else{
        	$("#any-airline-rd-box").attr('checked',true);
        }        
	}else{
        console.log(JSON.stringify(data));
	}
}

function searchFlights(flightType, from, to, dep_date, ret_date, adults, children, infants, airline_id,min_price, max_price, cabin_type, dep_time, ret_time, page, page_size, sort_key, sort_order){
	//$('#flights_row').empty();

	var min_dep_time;
	var max_dep_time;
	var min_ret_time;
	var max_ret_time;

	if(dep_time == "Morning"){
		min_dep_time = "00:00";
		max_dep_time = "06:00";
	}else if(dep_time == "Noon"){
		min_dep_time = "06:00";
		max_dep_time = "12:00";
	}else if(dep_time == "Afternoon"){
		min_dep_time = "12:00";
		max_dep_time = "18:00";
	}else if(dep_time == "Night"){
		min_dep_time = "18:00";
		max_dep_time = "00:00";
	}

	if(ret_time == "Morning"){
		min_ret_time = "00:00";
		max_ret_time = "06:00";
	}else if(ret_time == "Noon"){
		min_ret_time = "06:00";
		max_ret_time = "12:00";
	}else if(ret_time == "Afternoon"){
		min_ret_time = "12:00";
		max_ret_time = "18:00";
	}else if(ret_time == "Night"){
		min_ret_time = "18:00";
		max_ret_time = "00:00";
	}

	if(flightType == "oneWay"){
		$.ajax({
			url: "http://eiffel.itba.edu.ar/hci/service2/Booking.groovy?method=GetOneWayFlights&from="+from+"&to="+to+"&dep_date="+dep_date+"&adults="+adults+"&children="+children+"&infants="+infants+"&airline_id="+airline_id+"&min_price="+min_price+"&max_price="+max_price+"&cabin_type="+cabin_type+"&min_dep_time="+min_dep_time+"&max_dep_time="+max_dep_time+"&page="+page+"&page_size="+page_size+"&sort_key="+sort_key+"&sort_order="+sort_order,
        	dataType: "jsonp",
        	jsonpCallback: "oneWayFlight"
    	});
	}else{
	$.ajax({
			url: "http://eiffel.itba.edu.ar/hci/service2/Booking.groovy?method=GetRoundTripFlights&from="+from+"&to="+to+"&dep_date="+dep_date+"&ret_date="+ret_date+"&adults="+adults+"&children="+children+"&infants="+infants+"&airline_id="+airline_id+"&min_price="+min_price+"&max_price="+max_price+"&cabin_type="+cabin_type+"&min_dep_time="+min_dep_time+"&max_dep_time="+max_dep_time+"&min_ret_time="+min_ret_time+"&max_ret_time="+max_ret_time+"&page="+page+"&page_size="+page_size+"&sort_key="+sort_key+"&sort_order="+sort_order,
        	dataType: "jsonp",
        	jsonpCallback: "roundWayFlight"
    	});
	}
}

function oneWayFlight(data){
	$('#flights_row').empty();
	if(!data.hasOwnProperty("error")){
		if(data['total'] == 0){
			$('#flights_row').append('<div id="flights_row"class="row-fluid"><div class="well clearfix"><div class="span12"><h3 class="text-center"><i class="icon-warning-sign"></i> No pudomos encontrar ningún vuelo!</h3><p class="text-center">Intenta buscando con otros parámetros o quitando filtros si haz aplicado alguno</p></div></div></div>')
		}else{
        	for (var j=0;j<data['total'];j++){
        		//falta ver como organizamos la inf al final
        		$('#flights_row').append('')
        	}
		}
	}else{
        console.log(JSON.stringify(data));
	}
}

function roundWayFlight(data){
	$('#flights_row').empty();
	if(!data.hasOwnProperty("error")){
		if(data['total'] == 0){
			$('#flights_row').append('<div id="flights_row"class="row-fluid"><div class="well clearfix"><div class="span12"><h3 class="text-center"><i class="icon-warning-sign"></i> No pudimos encontrar ningún vuelo!</h3><p class="text-center">Intenta buscando con otros parámetros o quitando filtros si haz aplicado alguno</p></div></div></div>')
		}else{
        	for (var j=0;j<data['total'];j++){
        		//falta ver como organizamos la inf al final
        		$('#flights_row').append('')
        	}
		}
	}else{
        console.log(JSON.stringify(data));
	}
}

function createPagination(){
	$("#pagination_div").pagination({
        items: 100,
        itemsOnPage: 10,
        cssStyle: 'light-theme'
    });
}