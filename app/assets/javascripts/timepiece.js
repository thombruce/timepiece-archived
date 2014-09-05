get_hours = []
get_minutes = []
get_seconds = []

function get_time(){
	var zones = []
	$(".timepiece").each(function(){ zones.push($(this).attr('data-timezone')) })
	var timezones = { 'timezones' : zones }
	$.ajax({ type: "POST", url: "/timepiece/clock.json", data: timezones, dataType: "json", cache: false }).success(function(time){
		for(var i = 0; i < time.length; i++){
			get_hours.push(parseInt(time[i].hours,10))
			get_minutes.push(parseInt(time[i].minutes,10))
			get_seconds.push(parseInt(time[i].seconds,10))
		}
		hours = get_hours
		minutes = get_minutes
		seconds = get_seconds
	});
}

function show_time(){
	timer = setInterval(function(){
		for(i = 0; i < hours.length; i++){
			if (seconds[i] < 59){
				seconds[i] += 1
			} else {
				seconds[i] = 0
				if (minutes[i] < 59){
					minutes[i] += 1
				} else {
					minutes[i] = 0
					if (hours[i] < 23){
						hours[i] += 1
					} else {
						hours[i] = 0
					}
				}
			}
		}
		$(".timepiece").each(function(i, e){
			$(e).html(function(){
				if($(e).attr("data-tptype") == '12'){
					if(hours[i] > 12){
						$(e).data('hours', hours[i] - 12)
						abbr = 'pm'
					}else if(hours[i] == 0){
						$(e).data('hours', 12)
						abbr = 'am'
					}else if(hours[i] == 12){
						$(e).data('hours', 12)
						abbr = 'pm'
					}else if(hours[i] < 12){
						$(e).data('hours', hours[i])
						abbr = 'am'
					}
					if($(e).attr("data-lead") == '0' ){
						$('.timepiece-hours', $(e)).html(( $(e).data('hours') < 10 ? "0" : "" ) + $(e).data('hours'));
					}else if($(e).attr("data-lead") == '_'){
						$('.timepiece-hours', $(e)).html(( $(e).data('hours') < 10 ? "&#8199;" : "" ) + $(e).data('hours'));
					}else{
						$('.timepiece-hours', $(e)).html($(e).data('hours'));
					}
					$('.timepiece-minutes', $(e)).html(( minutes[i] < 10 ? "0" : "" ) + minutes[i]);
					$('.timepiece-seconds', $(e)).html(( seconds[i] < 10 ? "0" : "" ) + seconds[i]);
					$('.timepiece-abbr', $(e)).html(abbr);
					if(abbr == 'am'){
						$('.timepiece-abbr', $(e)).removeClass('timepiece-abbr-pm');
						$('.timepiece-abbr', $(e)).addClass('timepiece-abbr-am');
					} else {
						$('.timepiece-abbr', $(e)).removeClass('timepiece-abbr-am');
						$('.timepiece-abbr', $(e)).addClass('timepiece-abbr-pm');
					}
				}else{
					$('.timepiece-hours', $(e)).html(( hours[i] < 10 ? "0" : "" ) + hours[i]);
					$('.timepiece-minutes', $(e)).html(( minutes[i] < 10 ? "0" : "" ) + minutes[i]);
					$('.timepiece-seconds', $(e)).html(( seconds[i] < 10 ? "0" : "" ) + seconds[i]);
				}
			})
		})
	}, 1000)
}

function reset_time(){
	get_hours = []
	get_minutes = []
	get_seconds = []
	get_time()
}

$(document).ready(function(){
	get_time()
	show_time()
})
$(window).focus(function(){
	reset_time()
})