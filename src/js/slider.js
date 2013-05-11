$(document).ready(function() {
	$(".noUiSlider").noUiSlider({
		range : [ 0, 5000 ],
		start : [ 0, 5000 ],
		step : 500,
		slide : function() {
			var values = $(this).val();
			if (values[0] == 0) {
				values[0] = "Sin mínimo";
			}
			if (values[1] == 5000) {
				values[1] = "Sin máximo";
			}
			$("#min").text(values[0]);
			$("#max").text(values[1]);
		}
	});
});