$(document).ready(function() { 
$(".noUiSlider").noUiSlider({
    range: [0, 1000]
   ,start: [0, 1000]
   ,step: 100
   ,slide: function(){
        var values = $(this).val();
        if (values[0] == 0){
            values[0]="Sin mínimo";
        }
        if (values[1] == 1000){
            values[1]="Sin máximo";
        }
        $("#min").text(            
            values[0]
        );
        $("#max").text(
            values[1]
        );
   }
});
});