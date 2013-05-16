// Variables globales del paginado
var cur_page;
var page_size = 5;
// Variables globales de las monedas
var cur_currency = "Dolares";
var cur_ratio = 1;
var currencies_desc_array = new Array();
var currencies_ratio_array = new Array();
var currencies_symbol_array = new Array();
var cur_flights_price = new Array();

// Variables globales de la primer busqueda
var first_search = true;
var max_results_price;
var min_results_price;
var first_time_matrix = true;

$(document).ready(function() {

	// borro el div de resultados default
	$('#flights_row').empty();

	// muestro un modal incerrable de cargando hasta que termine de buscar el vuelo
	$('#loading-modal').modal({
		backdrop: 'static',
		keyboard: false
	})
	$("#results_num_div").hide();

	// prepara evento de creacion de matriz comparativa


	// prepara eventos de click de filtros
	filterEvents();

	// preparara los efectos de filtro
	prepareFilterEffects();

	// cargo las opciones de busqueda y hago la busqueda
	loadFields();


});

function matrixEvent(){

	var matrix_on = false;

	//configuro el carrusel
    $('#airline-table').carousel({
		interval: false,
	});

	//configuro para que no sea una lista cliclica
	$("#left-control").hide();
	$('#airline-table').bind('slid',function(){
        if($('#airline-table .active').index('#airline-table .item') == 1){
        	$("#left-control").slideDown(200);
        	$("#right-control").slideDown(200);
        }
        if($('#airline-table .active').index('#airline-table .item') == 2){
        	$("#left-control").slideDown(200);
        }
		 if($('#airline-table .active').index('#airline-table .item') == 0){
        	$("#right-control").slideDown(200);
        }
    });

    $('#airline-table').bind('slide',function(){
        if($('#airline-table .active').index('#airline-table .item') == 1){
        	$("#left-control").slideUp(50);
        	$("#right-control").slideUp(50);
        }
        if($('#airline-table .active').index('#airline-table .item') == 2){
        	$("#left-control").slideUp(50);
        	$("#right-control").slideUp(50);
        }
		 if($('#airline-table .active').index('#airline-table .item') == 0){
        	$("#left-control").slideUp(50);
        	$("#right-control").slideUp(50);
        }
    });

	//apertura cerrado de matriz
	$("#compare-airlines").click(function(){
		if(matrix_on){
			$("#airline-well").slideUp(500);
			$("#compare-airlines").text("Mostrar matriz comparativa");
			matrix_on = false;
		} else {
			
			if(first_time_matrix){
				//crea el contenido
			}
			$("#compare-airlines").text("Ocultar matriz comparativa");
			$("#airline-well").slideDown(500);
			matrix_on = true;
		}
	});


}

function coinUpdate(from, to){
	if (from == to){
		return;
	}
	var new_val;
	var new_cur
	var new_sym;
	var new_ratio;
	var new_text;

	// Busco la nueva moneda
	for(var j=0; j< currencies_desc_array.length; j++){
		if(currencies_desc_array[j] == to){
			new_cur = currencies_desc_array[j];
			new_sym = currencies_symbol_array[j];
			new_ratio = currencies_ratio_array[j];
		}
	}

	// Updateo los precios
	var cur_val_selector;
	var cur_sym_selector;
	for (var j=0; j<cur_flights_price.length;j++){		
		new_val = parseInt((cur_flights_price[j])/new_ratio);
		new_text = new_sym+""+new_val;
		cur_val_selector= "#cur_val_"+j;
		$(cur_val_selector).text(new_text);
	}
}

function minMaxUpdate(min, max){
	if(min == "" && max == ""){
		$(".noUiSlider").noUiSlider("disabled", true);
	}
	$(".noUiSlider").empty();
	$(".noUiSlider").noUiSlider({
		range : [ min, max ],
		start : [ min, max ],
		handles: 2,
		slide: function(){
			var values = $(this).val();
			$("#min").text("U$S"+parseInt(values[0]));
			$("#max").text("U$S"+parseInt(values[1]));		
		}
	});
	var values = $(".noUiSlider").val();
	$("#min").text("U$S"+parseInt(values[0]));
	$("#max").text("U$S"+parseInt(values[1]));	
	$(".noUiSlider").noUiSlider("disabled", false);
}	

function filterEvents(){

	$("#airline-well").hide();

	// function de las monedas
	$("#currencies").change(function(){
		
		// primero actualizo el slider
		var new_cur;
		var new_sym;
		var new_ratio;
		// Busco la nueva moneda
		for(var j=0; j< currencies_desc_array.length; j++){
			if(currencies_desc_array[j] == $("#currencies").val()){
				new_cur = currencies_desc_array[j];
				new_sym = currencies_symbol_array[j];
				new_ratio = currencies_ratio_array[j];
			}
		}

		//me guardo el valor viejo para transformarlo
		var old_cur = $(".noUiSlider").val();
		var old_min_cur = old_cur[0];
		var old_max_cur = old_cur[1];		

		var new_min_cur = (old_min_cur*cur_ratio)/new_ratio;		
		var new_max_cur = (old_max_cur*cur_ratio)/new_ratio;

		// nuevo slider
		$(".noUiSlider").empty();
		var new_min = min_results_price/new_ratio;
		var new_max = max_results_price/new_ratio;

		if (new_min_cur < new_min){
			new_min_cur = new_min;
		}
		if (new_max_cur > new_max){
			new_max_cur = new_max;
		}
		$(".noUiSlider").noUiSlider({
			range : [ new_min, new_max ],
			handles: 2,
			start : [ new_min_cur, new_max_cur ],
			slide: function(){
				var values = $(this).val();
				$("#min").text(new_sym+parseInt(values[0]));
				$("#max").text(new_sym+parseInt(values[1]));		
			}
		});	
		$("#min").text(new_sym+parseInt(new_min_cur));
		$("#max").text(new_sym+parseInt(new_max_cur));

		coinUpdate(cur_currency,$("#currencies").val());
		cur_currency = new_cur;
		cur_ratio = new_ratio;
	});

	// function del slider inicial
	$(".noUiSlider").noUiSlider({
		range : [ 0, 1000 ],
		start : [ 0, 1000 ],
		handles: 2
	});
	$("#min").text("Sin mínimo");
	$("#max").text("Sin máximo");
	$(".noUiSlider").noUiSlider("disabled", true);

	$(".noUiSlider").mouseup(function(){
		if (!$(".noUiSlider").hasClass("disabled")){
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

	// instancio el paginado
	createPagination();

	// datos de la busqueda del home
	var flight_type = $.cookie('flight_type');
	var from = $.cookie('from');
	var to = $.cookie('to');
	var dep_date = changeDateFormatBack($.cookie('dep_date'));
	var ret_date = changeDateFormatBack($.cookie('ret_date'));
	var cabin_type = $.cookie('cabin_type');
	var dep_time = $.cookie('dep_time');
	var ret_time = $.cookie('ret_time');

	// cargar parametros de busqueda
	$('#from').val(from);
	$('#to').val(to);
	$('#dep_date').val(dep_date);
	$('#adults').val(adults);
	$('#children').val(children);
	$('#infants').val(infants);

	// cargar ida/vuelta
	if (flight_type =="one_way"){
		$("#oneway_trip").addClass('active');
		$("#round_trip").removeClass('active');
		$("#ret_date_div").hide();
	}else{
		$("#round_trip_trip").addClass('active');
		$("#oneWay_trip").removeClass('active');
		$("#ret_date_div").show();
		$('#ret_date').val(ret_date);
	}

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
	if(flight_type == "one_way"){
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
	if(cabin_type == "ECONOMY"){
		$('#economy_cabin').attr('checked',true);
	} else if (cabin_type == "BUSINESS"){
		$('#business_cabin').attr('checked',true);
	} else if (cabin_type == "FIRST_CLASS"){
		$('#first_class_cabin').attr('checked',true);
	}

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
        	$('#airline-div').append('<label class="radio label-font-fix"><input type="radio" id="'+data['airlines'][j]['airlineId']+'-rd-box" value="'+data['airlines'][j]['airlineId']+'" name="airlines_group"><img src="'+data['airlines'][j]['logo']+'" height="20" width="20"> '+data['airlines'][j]['name']+'</label>')
        }

        // saca la aerolinea de preferencia del qstring
        var airline_id = $.cookie('airline');

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

        	currencies_desc_array[j] = data['currencies'][j]['description'];
        	currencies_ratio_array[j] = data['currencies'][j]['ratio'];
        	currencies_symbol_array[j] = data['currencies'][j]['symbol'];
        }
	}else{
        console.log(JSON.stringify(data));
	}

	// hago la busqueda inicial con los campos que llene
	searchFlights(1);
}

function searchFlights(page){

	$('#loading-modal').modal('show');
	$("#results_num_div").slideUp(500);

	// cargadas por url unicamente
	var flight_type = $.cookie('flight_type');
	var from = $.cookie('from_code');
	var to = $.cookie('to_code');
	var dep_date = $.cookie('dep_date');
	var ret_date = $.cookie('ret_date');
	var adults = $.cookie('adults');
	var children = $.cookie('children');
	var infants = $.cookie('infants');

	// cosas variblaes
	var sliders_val = $(".noUiSlider").val();
	var min_price = "";
	var max_price = "";	
	if(!first_search){
		min_price = sliders_val[0]*cur_ratio;
		max_price = sliders_val[1]*cur_ratio;
	}
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


	$('#flights_row').empty();
	if(flight_type == "one_way"){
		//saco el precio min y max
		if (first_search){
			alert(max_dep_time);
			$.ajax({
				url: "http://eiffel.itba.edu.ar/hci/service2/Booking.groovy?method=GetOneWayFlights&from="+from+"&to="+to+"&dep_date="+dep_date+"&adults="+adults+"&children="+children+"&infants="+infants+"&airline_id="+airline_id+"&min_price="+min_price+"&max_price="+max_price+"&cabin_type="+cabin_type+"&min_dep_time="+min_dep_time+"&max_dep_time="+max_dep_time+"&page=1&page_size=1&sort_key=total&sort_order=asc",
	       		dataType: "jsonp",
	    	}).done(function(data) {
				if(!data.hasOwnProperty("error")){
					if(data['total'] == 0){
						min_results_price = "";
					} else{
						min_results_price = data['flights'][0]['price']['total']['total'];
						$.ajax({
							url: "http://eiffel.itba.edu.ar/hci/service2/Booking.groovy?method=GetOneWayFlights&from="+from+"&to="+to+"&dep_date="+dep_date+"&adults="+adults+"&children="+children+"&infants="+infants+"&airline_id="+airline_id+"&min_price="+min_price+"&max_price="+max_price+"&cabin_type="+cabin_type+"&min_dep_time="+min_dep_time+"&max_dep_time="+max_dep_time+"&page=1&page_size=1&sort_key=total&sort_order=desc",
	       					dataType: "jsonp",
	    				}).done(function(data) {
	    					if(!data.hasOwnProperty("error")){
								if(data['total'] == 0){
									max_results_price = "";
								} else{
									max_results_price = data['flights'][0]['price']['total']['total'];
									minMaxUpdate(min_results_price, max_results_price);
									// ya tengo precio min y max, busco los vuelos
									$.ajax({
										url: "http://eiffel.itba.edu.ar/hci/service2/Booking.groovy?method=GetOneWayFlights&from="+from+"&to="+to+"&dep_date="+dep_date+"&adults="+adults+"&children="+children+"&infants="+infants+"&airline_id="+airline_id+"&min_price="+min_price+"&max_price="+max_price+"&cabin_type="+cabin_type+"&min_dep_time="+min_dep_time+"&max_dep_time="+max_dep_time+"&page="+page+"&page_size="+page_size+"&sort_key="+sort_key+"&sort_order="+sort_order,
	        							dataType: "jsonp",
	        							jsonpCallback: "oneWayFlight"
	    							});
	    							first_search = false;
								}
							} else {
								$('#flights_row').append('<div id="flights_row"class="row-fluid"><div class="well clearfix"><div class="span12"><h3 class="text-center"><i class="icon-warning-sign"></i> No pudimos encontrar ningún vuelo!</h3><p class="text-center">Hubo un error inesperado en la busqueda</p></div></div></div>')
			        			console.log(JSON.stringify(data));
			        			return;
							}
						});
	    			}
				} else {
					$('#flights_row').append('<div id="flights_row"class="row-fluid"><div class="well clearfix"><div class="span12"><h3 class="text-center"><i class="icon-warning-sign"></i> No pudimos encontrar ningún vuelo!</h3><p class="text-center">Hubo un error inesperado en la busqueda</p></div></div></div>')
        			console.log(JSON.stringify(data));
        			return;
				}
	    	});
		} else{
			$.ajax({
				url: "http://eiffel.itba.edu.ar/hci/service2/Booking.groovy?method=GetOneWayFlights&from="+from+"&to="+to+"&dep_date="+dep_date+"&adults="+adults+"&children="+children+"&infants="+infants+"&airline_id="+airline_id+"&min_price="+min_price+"&max_price="+max_price+"&cabin_type="+cabin_type+"&min_dep_time="+min_dep_time+"&max_dep_time="+max_dep_time+"&page="+page+"&page_size="+page_size+"&sort_key="+sort_key+"&sort_order="+sort_order,
				dataType: "jsonp",
				jsonpCallback: "oneWayFlight"
			});
		}
	} else {
		// FALTA IMPLEMENTAR
		$.ajax({
			url: "http://eiffel.itba.edu.ar/hci/service2/Booking.groovy?method=GetRoundTripFlights&from="+from+"&to="+to+"&dep_date="+dep_date+"&ret_date="+ret_date+"&adults="+adults+"&children="+children+"&infants="+infants+"&airline_id="+airline_id+"&min_price="+min_price+"&max_price="+max_price+"&cabin_type="+cabin_type+"&min_dep_time="+min_dep_time+"&max_dep_time="+max_dep_time+"&min_ret_time="+min_ret_time+"&max_ret_time="+max_ret_time+"&page="+page+"&page_size="+page_size+"&sort_key="+sort_key+"&sort_order="+sort_order,
        	dataType: "jsonp",
        	jsonpCallback: "roundWayFlight"
    	});
	}
}

function oneWayFlight(data){

	cur_flights_price = new Array();

	// si no hubo error imprime
	if(!data.hasOwnProperty("error")){
		if(data['total'] == 0){
			$('#flights_row').append('<div id="flights_row"class="row-fluid"><div class="well clearfix"><div class="span12"><h3 class="text-center"><i class="icon-warning-sign"></i> No pudimos encontrar ningún vuelo!</h3><p class="text-center">Intenta buscando con otros parámetros o quitando filtros si haz aplicado alguno</p></div></div></div>')
		}else{
			//attacheo evento a la matriz creada
			matrixEvent();
			//ahora agrego los vuelos
        	for (var j=0;j<data['pageSize'];j++){
        		if( (data['page']-1)*(data['pageSize'])+j < data['total']){

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
					var ob_airline_pic;				

					//info del precio
					var flight_price = cur_flights_price[j] = parseInt(data['flights'][j]['price']['total']['total']);
					var adult_price;
					var child_price;
					var infant_price
					var taxes_price;

        			if (data['flights'][j]['price']['adults'] == null){
        				adult_price = "-";
        			} else {
        				adult_price = data['flights'][j]['price']['adults']['baseFare']+" x"+data['flights'][j]['price']['adults']['quantity'];
        			}
        			if (data['flights'][j]['price']['children'] == null){
        				child_price = "-";
        			} else {
        				child_price = data['flights'][j]['price']['children']['baseFare']+" x"+data['flights'][j]['price']['children']['quantity'];
        			}
        			if (data['flights'][j]['price']['infants'] == null){
        				infant_price = "-";
        			} else {
        				infant_price = data['flights'][j]['price']['infants']['baseFare']+" x"+data['flights'][j]['price']['infants']['quantity'];
        			}
        			
        			taxes_price = parseInt(data['flights'][j]['price']['total']['taxes']+data['flights'][j]['price']['total']['charges']);

					for (var k=0; k<data['filters'][0]['values'].length; k++) {
						if (ob_airline_name == data['filters'][0]['values'][k]['name']) {
							ob_airline_pic = data['filters'][0]['values'][k]['logo'];
						}
					}

					// tengo que guardarme los datos que voy a usar para mandarle por el href a la compra

					//creo el div
					$('#flights_row').append('<div class="well clearfix"><div class="span9"><table class="table"><thead><tr><th><i class="icon-circle-arrow-right icon-large"></i> '+ob_date+' <div class="pull-right">'+ob_dep_city+' ('+ob_dep_ap_id+') <i class="icon-caret-right icon-large"></i> '+ob_arr_city+' ('+ob_arr_ap_id+')</div></th></tr></thead><tbody><tr><td class="remove-bottom-padding"><ul class="inline small-bottom-margin"><li><b>Sale:</b> '+ob_dep_hr+'</li><li><b>Llega:</b> '+ob_arr_hr+'</li><li><i class="icon-time"></i> '+ob_dur+'</li><li>Directo</li><li><img src="'+ob_airline_pic+'" height="20" width="20"> '+ob_airline_name+'</li></ul></td></tr></tbody></table></div><div class="span3"><div class="well remove-bottom-margin remove-top-padding"><h3 class="text-center"><div id="cur_val_'+j+'">U$S'+flight_price+'</div></h3><div class="row-fluid"><div class="span12"><a id="popover'+j+'" rel="popover" class="btn btn-block thin-font" >Ver detalles</a></div></div><br><div class="row-fluid"><div class="span12"><a href="pasajeros.html" type="button" class="btn btn-inverse btn-block thin-font">Comprar</a></div></div></div></div></div>');

        			// creo el html de los popovers


					var popover_code = 'Precio por adulto: '+adult_price+'<br>Precio por niño: '+child_price+'<br>Precio por infante: '+infant_price+'<br>Precio por impuestos: '+taxes_price;
					var popover_id = "#popover"+j;

					$(popover_id).popover({ placement: 'left', title: '<h4>Detalle del precio</h4>', content: popover_code, html:true });
				}
        	}
		}		
	}else{
		$('#flights_row').append('<div id="flights_row"class="row-fluid"><div class="well clearfix"><div class="span12"><h3 class="text-center"><i class="icon-warning-sign"></i> No pudimos encontrar ningún vuelo!</h3><p class="text-center">Hubo un error inesperado en la busqueda</p></div></div></div>')
        console.log(JSON.stringify(data));
        return;
	}

	// actualizo la leyendea de cant de vuelos actuales
	$("#found_num").text(data['total']);

	if(first_search && data['total'] == 0){
		$("#compare-airlines").addClass("disabled");
	}

	// Si la moenda actual es otra cambio	
	coinUpdate("Dolares",$("#currencies").val());

	// creo el paginador con los resultados
	createPagination(data['total'], data['pageSize'], data['page']);

	//termino de cargar
	$('#loading-modal').modal('hide');
	$("#results_num_div").slideDown(500);
}

function roundWayFlight(data){

	// limpio el div donde voy a meter resultados
	$('#flights_row').empty();

	if(!data.hasOwnProperty("error")){
		if(data['total'] == 0){
			$('#flights_row').append('<div class="row-fluid"><div class="well clearfix"><div class="span12"><h3 class="text-center"><i class="icon-warning-sign"></i> No pudimos encontrar ningún vuelo!</h3><p class="text-center"> No pudimos encontrar ningún vuelo!</h3><p class="text-center">Intenta buscando con otros parámetros o quitando filtros si haz aplicado alguno</p></div></div></div>')
		}else{
        	for (var j=0;j<data['pageSize'];j++){
        		if( (data['page']-1)*(data['pageSize'])+j < data['total']){
        			console.log(data['flights']);
	        		if ((data['flights'] != null) && (data['flights'][j].hasOwnProperty('outboundRoutes')) && (data['flights'][j].hasOwnProperty('inboundRoutes'))){
						//info del precio
						var flight_price = cur_flights_price[j] = parseInt(data['flights'][j]['price']['total']['total']);
						var taxes_price = parseInt(data['flights'][j]['price']['total']['taxes']+data['flights'][j]['price']['total']['charges']);
						var adult_price;
						var child_price;
						var infant_price					

	        			if (data['flights'][j]['price']['adults'] == null){
	        				adult_price = "-";
	        			} else {
	        				adult_price = data['flights'][j]['price']['adults']['baseFare']+" x"+data['flights'][j]['price']['adults']['quantity'];
	        			}
	        			if (data['flights'][j]['price']['children'] == null){
	        				child_price = "-";
	        			} else {
	        				child_price = data['flights'][j]['price']['children']['baseFare']+" x"+data['flights'][j]['price']['children']['quantity'];
	        			}
	        			if (data['flights'][j]['price']['infants'] == null){
	        				infant_price = "-";
	        			} else {
	        				infant_price = data['flights'][j]['price']['infants']['baseFare']+" x"+data['flights'][j]['price']['infants']['quantity'];
	        			}


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
						var ob_airline_pic;	

						for (var k=0; k<data['filters'][0]['values'].length; k++) {
							if (ob_airline_name == data['filters'][0]['values'][k]['name']) {
								ob_airline_pic = data['filters'][0]['values'][k]['logo'];
							}
						}

						// informacion del vuelo de vuelta
	        			var ib_date = getDateInfo(data['flights'][j]['inboundRoutes'][0]['segments'][0]['departure']['date']);
						var ib_dep_city = getCity(data['flights'][j]['inboundRoutes'][0]['segments'][0]['departure']['cityName']);
						var ib_dep_ap_id = data['flights'][j]['inboundRoutes'][0]['segments'][0]['departure']['airportId'];
						var ib_arr_city = getCity(data['flights'][j]['inboundRoutes'][0]['segments'][0]['arrival']['cityName']);
						var ib_arr_ap_id = data['flights'][j]['inboundRoutes'][0]['segments'][0]['arrival']['airportId'];
						var ib_dep_hr = getDateTime(data['flights'][j]['inboundRoutes'][0]['segments'][0]['departure']['date'])+"hs";
						var ib_arr_hr = getDateTime(data['flights'][j]['inboundRoutes'][0]['segments'][0]['arrival']['date'])+"hs";
						var ib_dur = getDuration(data['flights'][j]['inboundRoutes'][0]['segments'][0]['duration']);
						var ib_airline_name = data['flights'][j]['inboundRoutes'][0]['segments'][0]['airlineName'];
						var ib_airline_pic;	

						for (var k=0; k<data['filters'][0]['values'].length; k++) {
							if (ib_airline_name == data['filters'][0]['values'][k]['name']) {
								ib_airline_pic = data['filters'][0]['values'][k]['logo'];
							}
						}

						// tengo que guardarme los datos que voy a usar para mandarle por el href a la compra
					}
					//creo el div
					$('#flights_row').append('<div class="well small-bottom-padding clearfix"><div class="span9"><table class="table"><thead><tr><th><i class="icon-circle-arrow-right icon-large"></i> '+ob_date+' <div class="pull-right">'+ob_dep_city+' ('+ob_dep_ap_id+') <i class="icon-caret-right icon-large"></i> '+ob_arr_city+' ('+ob_arr_ap_id+')</div></th></tr></thead><tbody><tr><td class="remove-bottom-padding"><ul class="inline small-bottom-margin"><li><b>Sale:</b> '+ob_dep_hr+'</li><li><b>Llega:</b> '+ob_arr_hr+'</li><li><i class="icon-time"></i> '+ob_dur+'</li><li>Directo</li><li><img src="'+ob_airline_pic+'" height="20" width="20"> '+ob_airline_name+'</li></ul></td></tr></tbody><thead><tr><th><i class="icon-circle-arrow-left icon-large"></i> '+ib_date+' <div class="pull-right">'+ib_dep_city+' ('+ib_dep_ap_id+') <i class="icon-caret-right icon-large"></i> '+ib_arr_city+' ('+ib_arr_ap_id+')</div></th></tr></thead><tbody><tr><td class="remove-bottom-padding"><ul class="inline small-bottom-margin"><li><b>Sale:</b> '+ib_dep_hr+'</li><li><b>Llega:</b> '+ib_arr_hr+'</li><li><i class="icon-time"></i> '+ib_dur+'</li><li>Directo</li><li><img src="'+ib_airline_pic+'" height="20" width="20"> '+ib_airline_name+'</li></ul></td></tr></tbody></table></div><div class="span3"><div class="well remove-bottom-margin remove-top-padding"><h3 class="text-center"><div id="cur_val_'+j+'">U$S'+flight_price+'</div></h3><div class="row-fluid"><div class="span12"><a id="popover'+j+'" rel="popover" class="btn btn-block thin-font" >Ver detalles</a></div></div><br><div class="row-fluid"><div class="span12"><a href="pasajeros.html" type="button" class="btn btn-inverse btn-block thin-font">Comprar</a></div></div></div></div></div>');
				}
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
			break;
		case "02":
			monthName ="febrero";
			break;
		case "03":
			monthName ="marzo";
			break;
		case "04":
			monthName ="abril";
			break;
		case "05":
			monthName ="mayo";
			break;
		case "06":
			monthName ="junio";
			break;
		case "07":
			monthName ="julio";
			break;
		case "08":
			monthName ="agosto";
			break;
		case "09":
			monthName ="septiembre";
			break;
		case "10":
			monthName ="octubre";
			break;
		case "11":
			monthName ="noviembre";
			break;
		case "12":
			monthName ="diciembre";
			break;
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
	var mins = data.substring(3,5);
	if (hrs.substring(0,1) == "0"){
		hrs = hrs.substring(1,2);
	}

	if (mins.substring(0,1) == "0"){
		mins = mins.substring(1,2);
	}
	return hrs+"h "+mins+"m";
}

function getCity(data){
	var regex = /[a-zA-Z\s]*/;
	return regex.exec(data);
}

function getAirport(data){
	var regex = /[a-zA-Z\s]*/;
	return regex.exec(data);
}

function changeDateFormatBack(date){
	if (date != null){
		var day = date.substring(8,10);
		var month = date.substring(5,7);
		var year = date.substring(0,4);
		return day+"/"+month+"/"+year;
	}
}