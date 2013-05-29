$(document).ready(function(){
	if(!are_cookies_enabled()){
		$("body").empty();
		$("body").append('<div class="navbar navbar-inverse navbar-static-top"><div class="navbar-inner"><div class="container text-center"><a class="brand" href="index.html">Quiero viajar!</a></div></div></div><br><div class="container"><div class="row-fluid"><div class="span12 well"><h1 class="text-center"><i class="icon-warning-sign "></i> Atención</h1><h3 class="text-center thin-font">El sitio utiliza Cookies, asegúrese de activarlas</h3></div></div></div>');
	}
});

function are_cookies_enabled(){
	var cookieEnabled = (navigator.cookieEnabled) ? true : false;

	if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled)
	{ 
		document.cookie="testcookie";
		cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
	}
	return (cookieEnabled);
}