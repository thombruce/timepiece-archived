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
	clock = setInterval(function(){
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
					if($(e).attr("data-abbr_separator") == '.'){
						abbr = abbr.replace(/([apm])/g, '$1.')
					}
					if($(e).attr("data-lead") == '0' || $(e).attr("data-lead") == 'zero' ){
						$('.timepiece-hours', $(e)).html(( $(e).data('hours') < 10 ? "0" : "" ) + $(e).data('hours'));
					}else if($(e).attr("data-lead") == '_' || $(e).attr("data-lead") == 'space' ){
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

get_timer_days = []
get_timer_hours = []
get_timer_minutes = []
get_timer_seconds = []

function set_timer(){
  $(".timepiece-timer").each(function(){
    get_timer_days.push(parseInt($(this).attr('data-days'),10))
    get_timer_hours.push(parseInt($(this).attr('data-hours'),10))
    get_timer_minutes.push(parseInt($(this).attr('data-minutes'),10))
    get_timer_seconds.push(parseInt($(this).attr('data-seconds'),10))
    timer_days = get_timer_days
    timer_hours = get_timer_hours
    timer_minutes = get_timer_minutes
    timer_seconds = get_timer_seconds
  });
}

function show_timer(){
  timer = setInterval(function(){
    for(i = 0; i < timer_hours.length; i++){
      if (timer_seconds[i] < 59){
        timer_seconds[i] += 1
      } else {
        timer_seconds[i] = 0
        if (timer_minutes[i] < 59){
          timer_minutes[i] += 1
        } else {
          timer_minutes[i] = 0
          if (timer_hours[i] < 23){
            timer_hours[i] += 1
          } else {
            timer_hours[i] = 0
            timer_days[i] += 1
          }
        }
      }
    }
    $(".timepiece-timer").each(function(i, e){
      $(e).html(function(){
        $('.timepiece-days', $(e)).html(timer_days[i]);
        $('.timepiece-hours', $(e)).html(timer_hours[i]);
        $('.timepiece-minutes', $(e)).html(timer_minutes[i]);
        $('.timepiece-seconds', $(e)).html(timer_seconds[i]);
      })
    })
  }, 1000)
}

get_countdown_days = []
get_countdown_hours = []
get_countdown_minutes = []
get_countdown_seconds = []

function set_countdown(){
  $(".timepiece-countdown").each(function(){
    get_countdown_days.push(parseInt($(this).attr('data-days'),10))
    get_countdown_hours.push(parseInt($(this).attr('data-hours'),10))
    get_countdown_minutes.push(parseInt($(this).attr('data-minutes'),10))
    get_countdown_seconds.push(parseInt($(this).attr('data-seconds'),10))
    countdown_days = get_countdown_days
    countdown_hours = get_countdown_hours
    countdown_minutes = get_countdown_minutes
    countdown_seconds = get_countdown_seconds
  });
}

function show_countdown(){
  countdown = setInterval(function(){
    for(i = 0; i < countdown_hours.length; i++){
      if (countdown_seconds[i] > 0){
        countdown_seconds[i] -= 1
      } else {
        countdown_seconds[i] = 59
        if (countdown_minutes[i] > 0){
          countdown_minutes[i] -= 1
        } else {
          countdown_minutes[i] = 59
          if (countdown_hours[i] > 0){
            countdown_hours[i] -= 1
          } else {
            countdown_hours[i] = 23
            if (countdown_days[i] > 0){
              countdown_days[i] -= 1
            } else {
              countdown_days[i] = 0
              countdown_hours[i] = 0
              countdown_minutes[i] = 0
              countdown_seconds[i] = 0
            }
          }
        }
      }
    }
    $(".timepiece-countdown").each(function(i, e){
      $(e).html(function(){
        $('.timepiece-days', $(e)).html(countdown_days[i]);
        $('.timepiece-hours', $(e)).html(countdown_hours[i]);
        $('.timepiece-minutes', $(e)).html(countdown_minutes[i]);
        $('.timepiece-seconds', $(e)).html(countdown_seconds[i]);
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
  set_timer()
  set_countdown()
	show_time()
  show_timer()
  show_countdown()
})
$(document).on('page:load', function(){
	clearInterval(clock);
  reset_time();
	clearInterval(timer);
  clearInterval(countdown);
	// Quickfix for Turbolinks. We should revisit this.
  // Note we also need jquery-turbolinks to be installed (should at least make users aware of this)
  // And currently navigation via browser history buttons will break our clocks. FIXME:
  // quick solution - 'onhashchange' . Why we're not using it: Covers more events than we need to refresh for - AJAX cost too high.
  // We're going to need something a little more custom.
})
$(window).focus(function(){
	reset_time()
})