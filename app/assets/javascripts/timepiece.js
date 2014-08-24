function get_time(){
	$(".timepiece").each(function(){
		zone = $(this).attr('title')
		$.ajax({ type: "GET", url: "/timepiece/clock.json", data:{timezone: zone}, dataType: "json", cache: false }).success(function(time){
			hours = parseInt(time.hours,10)
			minutes = parseInt(time.minutes,10)
			seconds = parseInt(time.seconds,10)
		});
	})
}

function show_time(){
	setInterval(function(){
		if (seconds < 59){
			seconds += 1
		} else {
			seconds = 0
			if (minutes < 59){
				minutes += 1
			} else {
				minutes = 0
				if (hours < 23){
					hours += 1
				} else {
					hours = 0
				}
			}
		}
		$(".timepiece").each(function(){
			$(this).html(( hours < 10 ? "0" : "" ) + hours + ':' + ( minutes < 10 ? "0" : "" ) + minutes + ':' + ( seconds < 10 ? "0" : "" ) + seconds)
		})
	}, 1000)
}
$(document).ready(function(){
	get_time()
	show_time()
})
$(window).focus(function(){
	get_time()
})