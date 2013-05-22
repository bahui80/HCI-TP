// Variables globales
var airlinesArray = new Array();
var airlinesCodeArray = new Array();
var airlinesPicArray = new Array();
var per_page = 5;
var cur_page= 1;

$(document).ready(function() {

	// muestro un modal incerrable de cargando hasta que termine de buscar el vuelo
	$('#loading-modal').modal({
		backdrop: 'static',
		keyboard: false
	})

	$.ajax({
		url: "http://eiffel.itba.edu.ar/hci/service2/Misc.groovy?method=GetAirlines",
        dataType: "jsonp",
        jsonpCallback: "fillAirlinesArray",
    });

    // borro el div de resultados default
	$('#comments_row').empty();

	// creo el evento de ordenamiento
	orderEvents();

});

function fillAirlinesArray(data){
	if(!data.hasOwnProperty("error")){
        for (var j=0;j<data['total'];j++){
        	airlinesArray[j] = data['airlines'][j]['name'];
        	airlinesCodeArray[j] = data['airlines'][j]['airlineId'];
        	airlinesPicArray[j] = data['airlines'][j]['logo'];
        }
	}else{
        console.log(JSON.stringify(data));
	}
	
	$('#airline_name').typeahead({
		source : airlinesArray,
		minLength : 1
	});

	// cargo la info de las cookies
	loadData();
}

function orderEvents(){
	// function del cambio de ordenamiento
	$("#sort_type").change(function () {
		searchComments(cur_page);
	});
}

function loadData(){

	// instancio el paginado
	createPagination();

	var airline_name = $.cookie('com_airline_name');
	var com_flight_num = $.cookie('com_flight_num');
	var by_airline = $.cookie('by_airline');

	if(by_airline == "true"){
		$("#airline_name_btn").addClass("active");
		$("#flight_number_btn").removeClass("active");
		$("#airline_name_span").show();
		$("#flight_num_span").hide();
		$(".flight-sort-filter").show();
	} else {
		$("#airline_name_btn").removeClass("active");
		$("#flight_number_btn").addClass("active");
		$("#flight_num_span").show();
		$(".flight-sort-filter").hide();
	}



	//cargo la busqueda
	$('#airline_name').val(airline_name);
	$('#flight_num').val(com_flight_num);
	searchComments(1);
}

function createPagination(total, perPage, cur_page){
	$("#pagination_div").pagination({
        items: total,
        itemsOnPage: perPage,
        currentPage: cur_page,
        cssStyle: 'light-theme',
        onPageClick: function(pageNumber) {
            searchComments(pageNumber);
            cur_page = pageNumber;
        }
    });
}

function searchComments(page){

		$('#loading-modal').modal();

	//parametros de busqueda	
	var airline_id = $.cookie('com_airline_id');
	var flight_num = $.cookie('com_flight_num');

	var sort = $("#sort_type").val();
	var key;
	var order;

	if (sort == "flight-asc"){
		key = "flight";
		order = "asc";
	} else if (sort == "flight-desc"){
		key = "flight";
		order = "desc";
	} else if (sort == "airline-asc"){
		key = "airline";
		order = "asc";
	} else if (sort == "airline-desc"){
		key = "airline";
		order = "desc";
	} else if (sort == "rating-asc"){
		key = "rating";
		order = "asc";
	} else if (sort == "rating-desc"){
		key = "rating";
		order = "desc";
	}

	var airline_code;
	for(var j=0; j<airlinesArray.length; j++){
		if(airlinesArray[j] == airline_name){
			airline_code = airlinesCodeArray[j];
		}
	}

	//hago el rquest
	$.ajax({
		url: 'http://eiffel.itba.edu.ar/hci/service2/Review.groovy?method=GetAirlineReviews&airline_id='+airline_id+'&flight_num='+flight_num+'&page='+page+'&page_size='+per_page+'&sort_key='+key+'&sort_order='+order,
        dataType: "jsonp",
        jsonpCallback: "fillReviews",
    });
}

function fillReviews(data){

	//limpio la seccion de comentarios
	$('#comments_row').empty();

	if(!data.hasOwnProperty("error")){
		if(data['total'] == 0){
			if($.cookie('by_airline') == "true")
				$('#comments_row').append('<div class="row-fluid"><div class="well clearfix"><div class="span12"><h3 class="text-center"><i class="icon-warning-sign"></i> No pudimos encontrar ninguna opinión!</h3><p class="text-center">Todavía no se han dejado opiniones sobre esta aerolinea</p></div></div></div>')
			else
				$('#comments_row').append('<div class="row-fluid"><div class="well clearfix"><div class="span12"><h3 class="text-center"><i class="icon-warning-sign"></i> No pudimos encontrar ninguna opinión!</h3><p class="text-center">Todavía no se han dejado opiniones sobre este vuelo</p></div></div></div>')	
		}else{
			for (var j=0;j<data['pageSize'];j++){
        		if( (data['page']-1)*(data['pageSize'])+j < data['total']){

        			//me guardo la data del comentario
        			var airline_id = data['reviews'][j]['airlineId'];
        			var flight_number = data['reviews'][j]['flightNumber'];
        			var rating = data['reviews'][j]['overallRating'];
        			var friendliness = '<div class="pull-left thin-font">Amabilidad </div><div class="pull-right">'+numberToStars(data['reviews'][j]['friendlinessRating'])+'</div><br>';
        			var food = '<div class="pull-left thin-font">Comida </div><div class="pull-right">'+numberToStars(data['reviews'][j]['foodRating'])+'</div><br>';
        			var punctuality = '<div class="pull-left thin-font">Puntualidad </div><div class="pull-right">'+numberToStars(data['reviews'][j]['punctualityRating'])+'</div><br>';
        			var comfort = '<div class="pull-left thin-font">Confort </div><div class="pull-right">'+numberToStars(data['reviews'][j]['comfortRating'])+'</div><br>';
        			var quality_price = '<div class="pull-left thin-font">Precio/calidad </div><div class="pull-right">'+numberToStars(data['reviews'][j]['qualityPriceRating'])+'</div><br>';
        			var frequent_passenger = '<div class="pull-left thin-font">Viajero frecuente </div><div class="pull-right">'+numberToStars(data['reviews'][j]['qualityPriceRating'])+'</div><br>';
        			var recommend = data['reviews'][j]['yesRecommend'];
        			var comments = data['reviews'][j]['comments'];

        			if (recommend == 1){
        				recommend = '<div class="pull-left thin-font">Recomienda </div><div class="pull-right"><i class="icon-ok"></i></div><br>';
        			} else {
        				recommend = '<div class="pull-left thin-font">Recomienda </div><div class="pull-right"><i class="icon-remove"></i></div><br>';
        			}

        			if (comments == null){
        				comments = "Opinión sin comentarios"
        			}

        			var airline_pic;
        			var airline_name;

        			for (var k=0; k<airlinesCodeArray.length; k++){
        				if(airlinesCodeArray[k] == airline_id){
        					airline_pic = airlinesPicArray[k];
        					airline_name = airlinesArray[k];
        				}
        			}

        			var stars_code = numberToStars(rating);

        			$("#comments_row").append('<div class="well remove-bottom-padding clearfix"><div class="span9"><table class="table"><thead><tr><th><img src="'+airline_pic+'" height="20" width="20"> '+airline_name+' <div class="pull-right">Vuelo: #'+flight_number+''+airline_id+'</div></th></tr></thead><tbody><tr><td class="remove-bottom-padding max-width-table"><ul class="inline small-bottom-margin"><li>'+comments+'</li></ul></td></tr></tbody></table></div><div class="span3 well remove-top-padding"><h4 class="text-center">'+rating+'/10</h4><h4 class="text-center">'+stars_code+'</h4><div class="row-fluid"><div class="span12"><a id="popover'+j+'" rel="popover" class="btn btn-block btn-inverse thin-font">Ver detalles</a></div></div></div></div>')

					var popover_code = friendliness+food+comfort+quality_price+punctuality+frequent_passenger+recommend;
					var popover_id = "#popover"+j;

					$(popover_id).popover({ placement: 'left', title: '<h4>Detalles de la opinión</h4>', content: popover_code, html:true });
        		}
        	}
		}
	}else{
		console.log(JSON.stringify(data));
		return;
	}

	// actualizo la leyendea de cant de vuelos actuales
	$("#found_num").text(data['total']);

	// creo el paginador con los resultados
	createPagination(data['total'], data['pageSize'], data['page']);

	//termino de cargar
	$('#loading-modal').modal('hide');
}

function numberToStars(number){
	var floatNum = parseFloat(number);
	var fullStars = parseInt(floatNum/2);
	var halfStar = 0;

	if((floatNum/2)-fullStars > 0){
		halfStar = 1;
	}

	var starsCode = "";

	for(var i=0; i<fullStars; i++){
		starsCode = starsCode+'<i class="icon-star"></i>';
	}
	if(halfStar == 1){
		starsCode = starsCode+'<i class="icon-star-half-empty"></i>';
	}


	for(var i=0; i<5-fullStars-parseInt(halfStar); i++){
		starsCode = starsCode+'<i class="icon-star-empty"></i>';
	}

	return starsCode;
}