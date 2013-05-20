$(document).ready(function() {
    var nowTemp = new Date();
    nowTemp.setDate(nowTemp.getDate()-1);
    var depDate = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
    var retDate = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
     
    // DATEPICKER DE IDA
    $('#dep_date_btn').datepicker({
    	format: 'dd/mm/yyyy',
    	startDate: depDate
    }).on('changeDate', function(ev) {
    	var newDate = new Date(ev.date);
    	depDate = newDate;
    	// cambio el input de ida    	
    	$('#dep_date').val(dateToString(newDate));
    	// fijo el nuevo minimo para el retorno
    	newDate.setDate(newDate.getDate() + 1);
    	$('#ret_date_btn').datepicker('setStartDate', dateToString(newDate));  
    	// si la fecha de retorno es ams chica la cambio  	
    	if (depDate.valueOf() > retDate.valueOf()) {
    		//cambio el de retorno
    		retDate = newDate;
    		$('#ret_date').val(dateToString(newDate));
    		$('#ret_date_btn').datepicker('update', dateToString(newDate));
    	} else {
    		$('#ret_date_btn').datepicker('update', dateToString(retDate));    		
    	}
    	$('#dep_date_btn').datepicker('hide');		
    }).data('datepicker');

    // DATEPICKER DE RETORNO
	$('#ret_date_btn').datepicker({
    	format: 'dd/mm/yyyy',
    	startDate: retDate
    }).on('changeDate', function(ev) {
    	//cambio el input de retorno
    	var newDate = new Date(ev.date);
    	retDate = newDate;
    	$('#ret_date').val(dateToString(newDate));
    	$('#ret_date_btn').datepicker('hide');
    }).data('datepicker');

});

function dateToString(date){
	var dateDay = date.getDate();
    if(dateDay < 10){
	   	dateDay = "0"+dateDay;
	}
	var dateMonth = (date.getMonth()+1);
	if(dateMonth < 10){
	   	dateMonth = "0"+dateMonth;
	}
	var dateString = dateDay+"/"+dateMonth+"/"+date.getFullYear();
	return dateString;
}

function stringToDate(stringDate) {
	var currVal = stringDate;
	var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/; 
	var dtArray = currVal.match(rxDatePattern); 
	var date;
	
	dtDay = dtArray[1];
    dtMonth= dtArray[3];
    dtYear = dtArray[5];  
	
	date = new Date(dtYear, dtMonth - 1, dtDay, 0, 0, 0, 0);
	return date;
}