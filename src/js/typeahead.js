$(document).ready(function() {
	var subjects = [ 'Buenos Aires', 'Bueco', 'Cordoba', 'Corbata' ];
	$('#origin').typeahead({
		source : subjects,
		minLength : 3
	})
	$('#destination').typeahead({
		source : subjects,
		minLength : 3
	})
});