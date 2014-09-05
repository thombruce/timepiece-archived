module TimepieceHelper
  def timepiece(location = 'UTC', type = '24', lead = '')
  	Time.zone = location
  	hours = Time.now.in_time_zone.strftime('%H')
  	minutes = Time.now.in_time_zone.strftime('%M')
  	seconds = Time.now.in_time_zone.strftime('%S')
  	if type == '12'
      hours = hours.to_i
      if hours > 12
        hours = hours - 12
  	    var = 'pm'
      elsif hours == 0
  	    hours = 12
  	    var = 'am'
  	  elsif hours == 12
  	    var = 'pm'
  	  elsif hours < 12
  	    var = 'am'
  	  end
      if hours < 10 && lead == '0'
        hours = '0' + hours.to_s
        # Next, add &#8199 as option - digit-sized blank; great for maintaining alignment without the 0.
      end
    end
  	time = "<span class='timepiece-hours'>#{hours}</span>"\
           "<span class='timepiece-separator tp-separator-1'>:</span>"\
           "<span class='timepiece-minutes'>#{minutes}</span>"\
           "<span class='timepiece-separator tp-separator-2'>:</span>"\
           "<span class='timepiece-seconds'>#{seconds}</span>"
    if type == '12'
      time = time + "<span class='timepiece-abbr timepiece-abbr-#{var}'>#{var}</span>"
    end
  	content_tag(:span, time.html_safe, class: 'timepiece', 'data-timezone' => location, 'data-tptype' => type, 'data-lead' => lead)
  end
end