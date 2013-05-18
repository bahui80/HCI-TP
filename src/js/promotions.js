var from;
var from_id;

$(document).ready(function() {
		$.ajax({
            url: "http://eiffel.itba.edu.ar/hci/service2/Geo.groovy?method=GetCities&page_size=40",
			dataType: "jsonp",
			jsonpCallback: "fillCitiesArray",
        });
}); 

function fillCitiesArray(data){
	var myCities = new Array();
	var myCitiesId = new Array();
	var mapState = false;
	if(!data.hasOwnProperty("error")){
		for (var i=0;i<data['total'];i++){
			myCities[i] = data['cities'][i]['name'];
			myCitiesId[i] = data['cities'][i]['cityId'];
		}
	}else{
		console.log(JSON.stringify(data));
	}
	
	$( "#city_offers" ).typeahead({
		source : myCities,
		minLength : 3
	});
	
	$("#search_offers").click(function() {
		$("#map-container").empty();
		$("#map-text").empty();
		$("#map-text").append('<i class="icon-spinner icon-spin"></i> Cargando');
		var origin = $("#city_offers").val();		
		var origin_id = myCitiesId[myCities.indexOf(origin)];
		from = origin;
		from_id = origin_id;
		var my_lat = data['cities'][myCities.indexOf(origin)]['longitude'];
		var my_long = data['cities'][myCities.indexOf(origin)]['longitude'];

		$.ajax({
            url: "http://eiffel.itba.edu.ar/hci/service2/Booking.groovy?method=GetFlightDeals&from="+origin_id,
			dataType: "jsonp",
			jsonpCallback: "offer_search",
        });
	});		
}

function offer_search(data){	
	$("#map").fadeIn(500).delay(1500);

	var marker = new Array();
	//dibujo el mapa
	var mapOptions = {
		zoom: 2,
		center: new google.maps.LatLng(0, 0),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true,
	};
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	
	//dibujo las marcas y las ventanas, attacheo evento boton
	for(var i=0; i<data['deals'].length; i++){
		var offer_lat = data['deals'][i]['cityLatitude'];
		var offer_long = data['deals'][i]['cityLongitude'];
		var cityId = data['deals'][i]['cityId'];
		var cityName = data['deals'][i]['cityName'];
		var countryId = data['deals'][i]['countryName'];
		var price = data['deals'][i]['price'];
		var moneda = data['currencyId'];
		var content = '<p><b>'+cityName+':</b> U$D '+price+'</p><a id="search_offer_btn'+i+'" data-from="'+from+' data-from-id="'+from_id+' data-to="'+cityName+'" data-to-id="'+cityId+'" data-price="'+price+'" class="btn btn-inverse thin-font btn-block">Buscar vuelo</a>'
		if(price >0 && price<200){
			marker[i] = createMarker(new google.maps.LatLng(offer_lat, offer_long), content, map, 'http://imageshack.us/a/img716/715/verycheap.png');
		} else if (price >= 200 && price < 400){
			marker[i] = createMarker(new google.maps.LatLng(offer_lat, offer_long), content, map, 'http://imageshack.us/a/img832/6568/cheapt.png');
		} else if (price >=400 && price < 1000){
			marker[i] = createMarker(new google.maps.LatLng(offer_lat, offer_long), content, map, 'http://imageshack.us/a/img812/5279/normalik.png');
		} else if (price >= 1000){
			marker[i] = createMarker(new google.maps.LatLng(offer_lat, offer_long), content, map, 'http://imageshack.us/a/img59/4734/expensivep.png');
		}

		$("#search_offer_btn"+i).click(function (){

			//tomo la informacion que guarde en el boton
			var from = 	$("#search_offer_btn"+i).data('from');
			var from_id = $("#search_offer_btn"+i).data('from-id');
			var to = $("#search_offer_btn"+i).data('to');
			var to_id = $("#search_offer_btn"+i).data('to-id');
			var price = $("#search_offer_btn"+i).data('price');
			var today = new Date();
			var dep_date = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
			dep_date = dep_date.getFullYear()+"-"+dep_date.getMonth()+"-"+dep_date.getDate();

			// ALGO NO FUNCIONA!!!
			alert(to);
			$.cookie('from', from, { path: '/' });
			$.cookie('from_code', from_code, { path: '/' });
			$.cookie('to', to, { path: '/' });
			$.cookie('to_code', to_code, { path: '/' });
			$.cookie('dep_date', dep_date, { path: '/' });

			//voy a la pag de resultados
			document.location.href="results.html";
		});	
	}
}

//var global para ver si hay algun abierta
var curr_infw;

//crea los markers
function createMarker(point, content, map, img) {
	var marker = new google.maps.Marker({
		position: point,
		map: map,
		icon: img
	});
	var infowindow = new google.maps.InfoWindow({
		content: content
	});
	google.maps.event.addListener(marker, 'click', function() {
	if(curr_infw) { curr_infw.close();}
		curr_infw = infowindow; 
		infowindow.open(map, marker);
	});
	return marker;
};