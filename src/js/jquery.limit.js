(function($){  
 $.fn.limit = function(options) {  
 
 	var defaults = {
		limit: 200,
		id_result: false,
		alertClass: false
	}
 
 	var options = $.extend(defaults, options);
 
    return this.each(function() {  
 
	var	caratteri = options.limit;
	
	if(options.id_result != false)
	{
		$("#"+options.id_result).append("Ti restano <strong>"+ caratteri+"</strong> caratteri");
	}
	
	$(this).keypress(function(e){
		if($(this).val().length > caratteri && e.which != 8 && e.which != 46 ){
		return false;
		}
		
		if(options.id_result != false)
		{
		
			var restanti = caratteri - $(this).val().length;
			$("#"+options.id_result).html("Ti restano <strong>"+ restanti+"</strong> caratteri");
		
			if(restanti <= 10)
			{
				$("#"+options.id_result).addClass(options.alertClass);
			}
			else
			{
				$("#"+options.id_result).removeClass(options.alertClass);
			}
		}
	});
 
});  
 };  
})(jQuery);