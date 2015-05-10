get_analog_hours = []
get_analog_minutes = []
get_analog_seconds = []

function get_analog(){
  var zones = []
  $(".timepiece-analog").each(function(){ zones.push($(this).attr('data-timezone')) })
  var timezones = { 'timezones' : zones }
  $.ajax({ type: "POST", url: "/timepiece/clock.json", data: timezones, dataType: "json", cache: false }).success(function(time){
    for(var i = 0; i < time.length; i++){
      get_analog_hours.push(parseInt(time[i].hours,10))
      get_analog_minutes.push(parseInt(time[i].minutes,10))
      get_analog_seconds.push(parseInt(time[i].seconds,10))
    }
    analog_hours = get_analog_hours
    analog_minutes = get_analog_minutes
    analog_seconds = get_analog_seconds
  });
}

function show_analog(){
  analog = setInterval(function(){
    analog_running = true;
    for(i = 0; i < analog_hours.length; i++){
      if (analog_seconds[i] < 59){
        analog_seconds[i] += 1
      } else {
        analog_seconds[i] = 0
        if (analog_minutes[i] < 59){
          analog_minutes[i] += 1
        } else {
          analog_minutes[i] = 0
          if (analog_hours[i] < 23){
            analog_hours[i] += 1
          } else {
            analog_hours[i] = 0
          }
        }
      }
    }
    $(".timepiece-analog").each(function(i, e){
      $(e).html(function(){
        if(analog_hours[i] > 12){
          $(e).data('analog_hours', analog_hours[i] - 12)
        }else if(analog_hours[i] == 0){
          $(e).data('analog_hours', 12)
        }else if(analog_hours[i] == 12){
          $(e).data('analog_hours', 12)
        }else if(analog_hours[i] < 12){
          $(e).data('analog_hours', analog_hours[i])
        }
        $(e).data('hours_angle', ($(e).data('analog_hours') * 30) + (analog_minutes[i] / 2));
        $(e).data('minutes_angle', analog_minutes[i] * 6);
        $(e).data('seconds_angle', analog_seconds[i] * 6);
        $('.timepiece-hours-container', $(e)).css('-ms-transform','rotateZ(' + $(e).data('hours_angle') + 'deg)'); // angle set on each
        $('.timepiece-hours-container', $(e)).css('-webkit-transform','rotateZ(' + $(e).data('hours_angle') + 'deg)');
        $('.timepiece-hours-container', $(e)).css('transform','rotateZ(' + $(e).data('hours_angle') + 'deg)');
        $('.timepiece-minutes-container', $(e)).css('-ms-transform','rotateZ(' + $(e).data('minutes_angle') + 'deg)');
        $('.timepiece-minutes-container', $(e)).css('-webkit-transform','rotateZ(' + $(e).data('minutes_angle') + 'deg)');
        $('.timepiece-minutes-container', $(e)).css('transform','rotateZ(' + $(e).data('minutes_angle') + 'deg)');
        $('.timepiece-seconds-container', $(e)).css('-ms-transform','rotateZ(' + $(e).data('seconds_angle') + 'deg)');
        $('.timepiece-seconds-container', $(e)).css('-webkit-transform','rotateZ(' + $(e).data('seconds_angle') + 'deg)');
        $('.timepiece-seconds-container', $(e)).css('transform','rotateZ(' + $(e).data('seconds_angle') + 'deg)');
      })
    })
  }, 1000)
}

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
    clock_running = true;
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
    timer_running = true;
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
        if (timer_days[i] == 1){
          $('.tp-descriptor-days', $(e)).html('&nbsp;day ');
        } else {
          $('.tp-descriptor-days', $(e)).html('&nbsp;days ');
        }
        $('.timepiece-hours', $(e)).html(timer_hours[i]);
        if (timer_hours[i] == 1){
          $('.tp-descriptor-hours', $(e)).html('&nbsp;hour ');
        } else {
          $('.tp-descriptor-hours', $(e)).html('&nbsp;hours ');
        }
        $('.timepiece-minutes', $(e)).html(timer_minutes[i]);
        if (timer_minutes[i] == 1){
          $('.tp-descriptor-minutes', $(e)).html('&nbsp;minute ');
        } else {
          $('.tp-descriptor-minutes', $(e)).html('&nbsp;minutes ');
        }
        $('.timepiece-seconds', $(e)).html(timer_seconds[i]);
        if (timer_seconds[i] == 1){
          $('.tp-descriptor-seconds', $(e)).html('&nbsp;second ');
        } else {
          $('.tp-descriptor-seconds', $(e)).html('&nbsp;seconds ');
        }
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
    countdown_running = true;
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
        if (countdown_days[i] == 1){
          $('.tp-descriptor-days', $(e)).html('&nbsp;day ');
        } else {
          $('.tp-descriptor-days', $(e)).html('&nbsp;days ');
        }
        $('.timepiece-hours', $(e)).html(countdown_hours[i]);
        if (countdown_hours[i] == 1){
          $('.tp-descriptor-hours', $(e)).html('&nbsp;hour ');
        } else {
          $('.tp-descriptor-hours', $(e)).html('&nbsp;hours ');
        }
        $('.timepiece-minutes', $(e)).html(countdown_minutes[i]);
        if (countdown_minutes[i] == 1){
          $('.tp-descriptor-minutes', $(e)).html('&nbsp;minute ');
        } else {
          $('.tp-descriptor-minutes', $(e)).html('&nbsp;minutes ');
        }
        $('.timepiece-seconds', $(e)).html(countdown_seconds[i]);
        if (countdown_seconds[i] == 1){
          $('.tp-descriptor-seconds', $(e)).html('&nbsp;second ');
        } else {
          $('.tp-descriptor-seconds', $(e)).html('&nbsp;seconds ');
        }
      })
    })
  }, 1000)
}

function reset_analog(){
  get_analog_hours = []
  get_analog_minutes = []
  get_analog_seconds = []
  get_analog()
}

function reset_time(){
	get_hours = []
	get_minutes = []
	get_seconds = []
	get_time()
}

function reset_timer(){
  get_timer_days = []
  get_timer_hours = []
  get_timer_minutes = []
  get_timer_seconds = []
  set_timer()
}

function reset_countdown(){
  get_countdown_days = []
  get_countdown_hours = []
  get_countdown_minutes = []
  get_countdown_seconds = []
  set_countdown()
}

/* Let's discuss when those functions will be performed. */

$(document).ready(function(){
  // Might want to reformat to move if-statement : should also be performed before 'reset_time' so as not to make a blank AJAX request.
  if ($(".timepiece-analog").length > 0){
    get_analog()
    show_analog()
  }
  if ($(".timepiece").length > 0){
    get_time()
    show_time()
  }
  if ($(".timepiece-timer").length > 0){
    set_timer()
    show_timer()
  }
  if ($(".timepiece-countdown").length > 0){
    set_countdown()
    show_countdown()
  }
})
$(document).on('page:load', function(){
  if ($(".timepiece-analog").length > 0){
    if (analog_running){
      clearInterval(analog);
    }
    reset_analog();
  }
  if ($(".timepiece").length > 0){
    if (clock_running){
    	clearInterval(clock);
    }
    reset_time();
  }
  if ($(".timepiece-timer").length > 0){
    if (timer_running){
    	clearInterval(timer);
    }
    reset_timer();
    // FIXME: Some code may be superfluous. We've fixed the interval glitch but we should investigate when $(document).ready is running. How much do we really need our reset functions?
  }
  if ($(".timepiece-countdown").length > 0){
    if (countdown_running){
      clearInterval(countdown);
    }
    reset_countdown();
  }
})

$(window).focus(function(){
  if ($(".timepiece-analog").length > 0){
    reset_analog()
  }
  if ($(".timepiece").length > 0){
  	reset_time()
  }
})