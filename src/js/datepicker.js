$(document).ready(function() {
	var nowTemp = new Date();
	nowTemp.setDate(nowTemp.getDate() + 2);
	
	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

	var checkin = $('#dep_date').datepicker({
		onRender : function(date) {
			return date.valueOf() < now.valueOf() ? 'disabled' : '';
		}}).on('changeDate', function(ev) {
			if (ev.date.valueOf() > checkout.date.valueOf()) {
				var newDate = new Date(ev.date)
				newDate.setDate(newDate.getDate() + 1);
			}
			checkin.hide();
			$('#ret_date')[0].focus();
		}).data('datepicker');

	var checkout = $('#ret_date').datepicker({
		onRender : function(date) {
			return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
		}}).on('changeDate', function(ev) {
			checkout.hide();
		}).data('datepicker');
		
	$('#dep_date').datepicker('setValue', now);
	$('#ret_date').datepicker('setValue', now);	
});