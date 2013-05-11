//Variables globales
var cur_page;
var total_pages;
var page_size = 5;

$(document).ready(function() {

	// muestro un modal incerrable de cargando hasta que termine de buscar el vuelo
	$('#loading-modal').modal({
		backdrop: 'static',
		keyboard: false
	})

	// preparara los efectos de filtro
	prepareFilterEffects();

	// cargo las opciones de busqueda y hago la busqueda
	loadFields();

	// eventos de click de filtros
	filterEvents();

	// eventos de cambio de moneda -> se cambian a mano, alta paja!
	//coinChange();
});


function filterEvents(){

	//function del slider
	$(".noUiSlider").noUiSlider({
		//configuro
		range : [ 0, 5000 ],
		start : [ 0, 5000 ],
		step : 500,
		slide: function(){

			var values = $(this).val();
			if (values[0] == 0) {
				values[0] = "Sin mínimo";
			}
			if (values[1] == 5000) {
				values[1] = "Sin máximo";
			}

			$("#min").text(values[0]);
			$("#max").text(values[1]);

			searchFlights(cur_page);
		}
	});

	// function de la clase
	$("input[name=cabin_group]").change(function () {
		searchFlights(cur_page);
	});

	// function de tiempo de partida
	$("input[name=dep_group]").change(function () {
		searchFlights(cur_page);
	});

	//function de tiempo de regreso
	$("input[name=ret_group]").change(function () {
		searchFlights(cur_page);
	});

	// function del cambio de ordenamiento
	$("#sort_type").change(function () {
		searchFlights(cur_page);
	});
}

function prepareFilterEffects(){
	// eventos de iconos de filtros
	var min_max_filter = true;
	var dep_time_filter = true;
	var ret_time_filter = true;
	var cabin_type_filter = true;
	var airline_filter = true;

	$("#min_max_filter_btn").click(function () {
		if (min_max_filter){
			$("#min_max_filter_div").slideUp(500);
			$("#min_max_filter_btn i:first").removeClass('icon-chevron-sign-up');
			$("#min_max_filter_btn i:first").addClass('icon-chevron-sign-down');
			min_max_filter = false;
		}else{
			$("#min_max_filter_div").slideDown(500);
			$("#min_max_filter_btn i:first").removeClass('icon-chevron-sign-down');
			$("#min_max_filter_btn i:first").addClass('icon-chevron-sign-up');
			min_max_filter = true;
		}
	});

	$("#dep_time_filter_btn").click(function () {
		if (dep_time_filter){
			$("#dep_time_filter_div").slideUp(500);
			$("#dep_time_filter_btn i:first").removeClass('icon-chevron-sign-up');
			$("#dep_time_filter_btn i:first").addClass('icon-chevron-sign-down');
			dep_time_filter = false;
		}else{
			$("#dep_time_filter_div").slideDown(500);
			$("#dep_time_filter_btn i:first").removeClass('icon-chevron-sign-down');
			$("#dep_time_filter_btn i:first").addClass('icon-chevron-sign-up');
			dep_time_filter = true;
		}
	});

	$("#ret_time_filter_btn").click(function () {
		if (ret_time_filter){
			$("#ret_time_filter_div").slideUp(500);
			$("#ret_time_filter_btn i:first").removeClass('icon-chevron-sign-up');
			$("#ret_time_filter_btn i:first").addClass('icon-chevron-sign-down');
			ret_time_filter = false;
		}else{
			$("#ret_time_filter_div").slideDown(500);
			$("#ret_time_filter_btn i:first").removeClass('icon-chevron-sign-down');
			$("#ret_time_filter_btn i:first").addClass('icon-chevron-sign-up');
			ret_time_filter = true;
		}
	});

	$("#cabin_type_filter_btn").click(function () {
		if (cabin_type_filter){
			$("#cabin_type_filter_div").slideUp(500);
			$("#cabin_type_filter_btn i:first").removeClass('icon-chevron-sign-up');
			$("#cabin_type_filter_btn i:first").addClass('icon-chevron-sign-down');
			cabin_type_filter = false;
		}else{
			$("#cabin_type_filter_div").slideDown(500);
			$("#cabin_type_filter_btn i:first").removeClass('icon-chevron-sign-down');
			$("#cabin_type_filter_btn i:first").addClass('icon-chevron-sign-up');
			cabin_type_filter = true;
		}
	});

	$("#airline_filter_btn").click(function () {
		if (airline_filter){
			$("#airline_filter_div").slideUp(500);
			$("#airline_filter_btn i:first").removeClass('icon-chevron-sign-up');
			$("#airline_filter_btn i:first").addClass('icon-chevron-sign-down');
			airline_filter = false;
		}else{
			$("#airline_filter_div").slideDown(500);
			$("#airline_filter_btn i:first").removeClass('icon-chevron-sign-down');
			$("#airline_filter_btn i:first").addClass('icon-chevron-sign-up');
			airline_filter = true;
		}
	});
}

function loadFields(){

	// creo el objeto query-string para leer la url
	qs= new QueryString();

	// datos de la busqueda del home
	var flight_type = qs.value('flight_type');
	var from = qs.value('from');
	var to = qs.value('to');
	var dep_date = qs.value('dep_date');
	var ret_date = qs.value('ret_date');
	var min_price = qs.value('min_price');
	var max_price = qs.value('max_price');
	var cabin_type = qs.value('cabin_type');
	var dep_time = qs.value('dep_time');
	var ret_time = qs.value('ret_time');

	// cargar parametros de busqueda
	$('#from').val(from);
	$('#to').val(to);
	$('#dep').val(dep_date);
	$('#adults').val(adults);
	$('#children').val(children);
	$('#infants').val(infants);

	// cargar ida/vuelta
	if (flight_type =="oneWay"){
		$("#oneway_trip").addClass('active');
		$("#round_trip").removeClass('active');

		$("#ret_date_div").hide();
	}else{
		$("#round_trip_trip").addClass('active');
		$("#oneWay_trip").removeClass('active');
		$("#ret_date_div").show();
		$('#ret').val(ret_date);
	}

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
	if(flight_type == "oneWay"){
		// escondo el div de horario de retorno
		$(".ret_time_filter").hide();
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
        jsonpCallback: "loadAirlines"
    });
}

function loadAirlines(data){
	$("#airline-div").empty();
	$('#airline-div').append('<label class="radio label-font-fix"><input value="" type="radio" name="airlines_group" checked>Todas las aerolíneas</label>')
	if(!data.hasOwnProperty("error")){
        for (var j=0;j<data['total'];j++){

        	//crea los radio btn de cada aerolinea con su imagen y id
        	$('#airline-div').append('<label class="radio label-font-fix"><input type="radio" value="'+data['airlines'][j]['airlineId']+'" name="airlines_group"><img src="'+data['airlines'][j]['logo']+'" height="20" width="20"> '+data['airlines'][j]['name']+'</label>')
        }

        // saca la aerolinea de preferencia del qstring
        var airline_id = qs.value('airline_id');

        // chkea el radio btn de la aerolinea preferida
        if (airline_id != null) {
        	$("#"+airline_id+"-rd-box").attr('checked',true);
        } else {
        	$("#any-airline-rd-box").attr('checked',true);
        }

        // function del nombre de aerolinea
		$("input[name=airlines_group]").change(function () {
			searchFlights(cur_page);
		});        
	} else {
        console.log(JSON.stringify(data));
	}

	// carga las monedas de la db
	$.ajax({
		url: "http://eiffel.itba.edu.ar/hci/service2/Misc.groovy?method=GetCurrencies",
        dataType: "jsonp",
        jsonpCallback: "loadCurrencies"
    });
}

function loadCurrencies(data){
	$("#currencies").empty();
	if(!data.hasOwnProperty("error")){
        for (var j=0;j<data['total'];j++){

        	//crea los chk box de cada aerolinea con su imagen y id
        	if (data['currencies'][j]['description'] == "Dolares") {
        		$('#currencies').append('<option selected="selected">'+data['currencies'][j]['description'] +'</option>');
        	} else {
        		$('#currencies').append('<option>'+data['currencies'][j]['description'] +'</option>');
        	}
        }
	}else{
        console.log(JSON.stringify(data));
	}

	// hago la busqueda inicial con los campos que llene
	searchFlights(1);
}

function searchFlights(page){

	$('#loading-modal').modal('show');
	// cargadas por url unicamente
	var flight_type = qs.value('flight_type');
	var from = qs.value('from_code');
	var to = qs.value('to_code');
	var dep_date = qs.value('dep_date');
	var adults = qs.value('adults');
	var children = qs.value('children');
	var infants = qs.value('infants');

	// cosas variblaes
	var sliders_val = $(".noUiSlider").val();
	var min_price = sliders_val[0];
	var max_price = sliders_val[1];
	var cabin_type = $("input[name='cabin_group']:checked").val();
	var dep_time = $("input[name='dep_group']:checked").val();
	var ret_time = $("input[name='ret_group']:checked").val();
	var airline_id = $("input[name='airlines_group']:checked").val();

	var min_dep_time = "";
	var max_dep_time = "";

	if(dep_time == "Morning"){
	 	min_dep_time = "00:00";
		max_dep_time = "06:00";
	} else if (dep_time == "Noon") {
	 	min_dep_time = "06:00";
		max_dep_time = "12:00";
	} else if (dep_time == "Afternoon"){
	 	min_dep_time = "12:00";
		max_dep_time = "18:00";
	} else if (dep_time == "Night"){
	 	min_dep_time = "18:00";
		max_dep_time = "24:00";		
	}

	var min_ret_time = "";
	var max_ret_time = "";

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

	var sort_type = $("#sort_type").val();
	var sort_key = "";
	var sort_order = "";
	
	if (sort_type == "fare-asc"){
		sort_key = "fare";
		sort_order = "asc"
	}else if (sort_type == "fare-desc"){
		sort_key = "fare";
		sort_order = "desc"
	} else if (sort_type == "total-asc"){
		sort_key = "total";
		sort_order = "asc"
	} else if (sort_type == "total-desc"){
		sort_key = "total";
		sort_order = "desc"
	} else if (sort_type == "airline-asc"){
		sort_key = "airline";
		sort_order = "asc"
	} else if (sort_type == "airline-desc"){
		sort_key = "airline";
		sort_order = "desc"
	} else if (sort_type == "duration-asc"){
		sort_key = "duration";
		sort_order = "asc"
	} else if (sort_type == "duration-desc"){
		sort_key = "duration";
		sort_order = "desc"
	}

	if(flight_type == "oneWay"){
		$.ajax({
			url: "http://eiffel.itba.edu.ar/hci/service2/Booking.groovy?method=GetOneWayFlights&from="+from+"&to="+to+"&dep_date="+dep_date+"&adults="+adults+"&children="+children+"&infants="+infants+"&airline_id="+airline_id+"&min_price="+min_price+"&max_price="+max_price+"&cabin_type="+cabin_type+"&min_dep_time="+min_dep_time+"&max_dep_time="+max_dep_time+"&page="+page+"&page_size="+page_size+"&sort_key="+sort_key+"&sort_order="+sort_order,
        	dataType: "jsonp",
        	jsonpCallback: "oneWayFlight"
    	});
	} else {
	$.ajax({
			url: "http://eiffel.itba.edu.ar/hci/service2/Booking.groovy?method=GetRoundTripFlights&from="+from+"&to="+to+"&dep_date="+dep_date+"&ret_date="+ret_date+"&adults="+adults+"&children="+children+"&infants="+infants+"&airline_id="+airline_id+"&min_price="+min_price+"&max_price="+max_price+"&cabin_type="+cabin_type+"&min_dep_time="+min_dep_time+"&max_dep_time="+max_dep_time+"&min_ret_time="+min_ret_time+"&max_ret_time="+max_ret_time+"&page="+page+"&page_size="+page_size+"&sort_key="+sort_key+"&sort_order="+sort_order,
        	dataType: "jsonp",
        	jsonpCallback: "roundWayFlight"
    	});
	}
}

function oneWayFlight(data){

	// limpio por si cambio de pagina
	$('#flights_row').empty();

	// si no hubo error imprime
	if(!data.hasOwnProperty("error")){
		if(data['total'] == 0){
			$('#flights_row').append('<div id="flights_row"class="row-fluid"><div class="well clearfix"><div class="span12"><h3 class="text-center"><i class="icon-warning-sign"></i> No pudomos encontrar ningún vuelo!</h3><p class="text-center">Intenta buscando con otros parámetros o quitando filtros si haz aplicado alguno</p></div></div></div>')
		}else{
        	for (var j=0;j<data['pageSize'];j++){
        		if( (data['page']-1)*(data['pageSize'])+j < data['total']){
        			console.log((data['page']-1)*(data['pageSize'])+j < data['total']);
        			// informacion del vuelo de ida
        			var ob_date = getDateInfo(data['flights'][j]['outboundRoutes'][0]['segments'][0]['departure']['date']);
					var ob_dep_city = getCity(data['flights'][j]['outboundRoutes'][0]['segments'][0]['departure']['cityName']);
					var ob_dep_ap_id = data['flights'][j]['outboundRoutes'][0]['segments'][0]['departure']['airportId'];
					var ob_arr_city = getCity(data['flights'][j]['outboundRoutes'][0]['segments'][0]['arrival']['cityName']);
					var ob_arr_ap_id = data['flights'][j]['outboundRoutes'][0]['segments'][0]['arrival']['airportId'];
					var ob_dep_hr = getDateTime(data['flights'][j]['outboundRoutes'][0]['segments'][0]['departure']['date'])+"hs";
					var ob_arr_hr = getDateTime(data['flights'][j]['outboundRoutes'][0]['segments'][0]['arrival']['date'])+"hs";
					var ob_dur = getDuration(data['flights'][j]['outboundRoutes'][0]['segments'][0]['duration']);
					var ob_airline_name = data['flights'][j]['outboundRoutes'][0]['segments'][0]['airlineName'];
					var flight_price = data['flights'][j]['price']['total']['total'];
					var ob_airline_pic;				

					for (var k=0; k<data['filters'][0]['values'].length; k++) {
						if (ob_airline_name == data['filters'][0]['values'][k]['name']) {
							ob_airline_pic = data['filters'][0]['values'][k]['logo'];
						}
					}

					// tengo que guardarme los datos que voy a usar para mandarle por el href a la compra
					//creo el div
					$('#flights_row').append('<div class="well small-bottom-padding clearfix"><div class="span9"><table class="table"><thead><tr><th><i class="icon-circle-arrow-right icon-large"></i> Ida</th><th>'+ob_date+'</th><th>'+ob_dep_city+' ('+ob_dep_ap_id+') <i class="icon-caret-right icon-large"></i> '+ob_arr_city+' ('+ob_arr_ap_id+')</th></tr></thead><tbody><tr><td>'+ob_dep_hr+' <i class="icon-caret-right icon-large"></i> '+ob_arr_hr+'</td><td>('+ob_dur+', Directo)</td><td><img src="'+ob_airline_pic+'" height="25" width="25">'+ob_airline_name+'</td></tr></tbody></table></div><div class="span3"><div class="well remove-bottom-margin remove-top-padding"><h3 class="text-center">$'+flight_price+'</h3><div class="row-fluid"><div class="span12"><button class="btn btn-block" >Ver detalles</button></div></div><br><div class="row-fluid"><div class="span12"><a href="pasajeros.html" type="button" class="btn btn-inverse btn-block thin-font">Comprar</a></div></div></div></div></div>');
        		}
        	}
		}

		
	}else{
		$('#flights_row').append('<div id="flights_row"class="row-fluid"><div class="well clearfix"><div class="span12"><h3 class="text-center"><i class="icon-warning-sign"></i> No pudimos encontrar ningún vuelo!</h3><p class="text-center">Intenta buscando con otros parámetros o quitando filtros si haz aplicado alguno</p></div></div></div>')
        console.log(JSON.stringify(data));
	}

	// creo el paginador con los resultados
	createPagination(data['total'], data['pageSize'], data['page']);

	//termino de cargar
	$('#loading-modal').modal('hide');
}

function roundWayFlight(data){

	// limpio por si cambio de pagina
	$('#flights_row').empty();

	if(!data.hasOwnProperty("error")){
		if(data['total'] == 0){
			$('#flights_row').append('<div class="row-fluid"><div class="well clearfix"><div class="span12"><h3 class="text-center"><i class="icon-warning-sign"></i> No pudimos encontrar ningún vuelo!</h3><p class="text-center">Hubo un error inesperado en la busqueda</p></div></div></div>')
		}else{
        	for (var j=0;j<data['total'];j++){
        		//falta ver como organizamos la inf al final
        		$('#flights_row').append('')
        	}
		}
	}else{
		$('#flights_row').append('<div id="flights_row"class="row-fluid"><div class="well clearfix"><div class="span12"><h3 class="text-center"><i class="icon-warning-sign"></i> No pudimos encontrar ningún vuelo!</h3><p class="text-center">Hubo un error inesperado en la busqueda</p></div></div></div>')
        console.log(JSON.stringify(data));
	}

	// creo el paginador con los resultados
	createPagination(data['total'], data['pageSize'], data['page']);
	
	//termino de cargar
	$('#loading-modal').modal('hide');
}

function createPagination(total, perPage, cur_page){
	$("#pagination_div").pagination({
        items: total,
        itemsOnPage: perPage,
        currentPage: cur_page,
        cssStyle: 'light-theme',
        onPageClick: function(pageNumber) {
            searchFlights(pageNumber);
            cur_page = pageNumber;
        }
    });
}

function getDateInfo(data){
	var year = data.substring(0,4);
	var month = data.substring(5,7);
	var day = data.substring(8,10);

	var monthName;
	switch(month){
		case "01":
			monthName ="enero";
		case "02":
			monthName ="febrero";
		case "03":
			monthName ="marzo";
		case "04":
			monthName ="abril";
		case "05":
			monthName ="mayo";
		case "06":
			monthName ="junio";
		case "07":
			monthName ="julio";
		case "08":
			monthName ="agosto";
		case "09":
			monthName ="septiembre";
		case "10":
			monthName ="octubre";
		case "11":
			monthName ="noviembre";
		case "12":
			monthName ="diciembre";
	} 
	return day+" de "+monthName+" de "+year;
}

function getDateTime(data){
	var regex = /[0-9]{2}:[0-9]{2}:[0-9]{2}/;
	var res = regex.exec(data)+"";
	return res.substring(0,5);
}

function getDuration(data){
	var hrs = data.substring(0,2);
	var mins = data.substring(4,6);

	var hasHrs = true;
	var hasMins = true;

	if (hrs == "00"){
		hasHrs = false;
	}
	if (mins = "00"){
		hasMins = false;
	}

	var dur = "-";
	if (hasHrs){
		dur = hrs+"h ";
	}
	if (hasMins){
		dur = dur+""+mins+"m";
	}
	return dur;
}

function getCity(data){
	var regex = /[a-zA-Z\s]*/;
	return regex.exec(data);
}

function getAirport(data){
	var regex = /[a-zA-Z\s]*/;
	return regex.exec(data);
}