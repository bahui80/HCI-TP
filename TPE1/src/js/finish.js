$(document).ready(function() {
	if($.cookie('end') == 'true'){
		$('.center').notify({
    		message: { html: true, html: '<strong>Ha completado la compra</strong>. Disfrute su vuelo.' },
    		type: 'info',
    		fadeOut: { enabled: true, delay: 3000 }
  		}).show(); 
		$.cookie('end', 'false', { path: '/' });
	}
});