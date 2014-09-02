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


# Note: add class to timepiece-abbr: timepiece-abbr-#{var} . Working this on the JS side shouldn't be too difficult just...
# element.addClass('timepiece-abbr-' + var) right? Except, you have to remove old and add new, toggle or something-something.
# Therein lies the difficulty.