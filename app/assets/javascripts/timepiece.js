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
				$('.timepiece-hours', $(this)).html(( hours[i] < 10 ? "0" : "" ) + hours[i]);
				$('.timepiece-minutes', $(this)).html(( minutes[i] < 10 ? "0" : "" ) + minutes[i]);
				$('.timepiece-seconds', $(this)).html(( seconds[i] < 10 ? "0" : "" ) + seconds[i]);
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