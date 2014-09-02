module TimepieceHelper
  def timepiece(location = 'UTC', type = '24')
  	Time.zone = location
  	hours = Time.now.in_time_zone.strftime('%H')
  	minutes = Time.now.in_time_zone.strftime('%M')
  	seconds = Time.now.in_time_zone.strftime('%S')
  	if type == '12' && hours.to_i > 12
  	  hours = hours.to_i - 12
  	  var = 'pm'
  	elsif type == '12' && hours.to_i == 0
  	  hours = 12
  	  var = 'am'
  	elsif type == '12' && hours.to_i == 12
  	  var = 'pm'
  	elsif type == '12' && hours.to_i < 12
  	  var = 'am'
  	end
  	time = "<span class='timepiece-hours'>#{hours}</span>"\
           "<span class='timepiece-separator tp-separator-1'>:</span>"\
           "<span class='timepiece-minutes'>#{minutes}</span>"\
           "<span class='timepiece-separator tp-separator-2'>:</span>"\
           "<span class='timepiece-seconds'>#{seconds}</span>"
    if type == '12'
      time = time + "<span class='timepiece-abbr'>#{var}</span>"
    end
  	content_tag(:span, time.html_safe, class: 'timepiece', 'data-timezone' => location, 'data-tptype' => type)
  end
end