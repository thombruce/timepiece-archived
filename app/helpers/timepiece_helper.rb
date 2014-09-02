module TimepieceHelper
  def timepiece(location = 'UTC')
  	Time.zone = location
  	hours = Time.now.in_time_zone.strftime('%H')
  	minutes = Time.now.in_time_zone.strftime('%M')
  	seconds = Time.now.in_time_zone.strftime('%S')
  	time = "<span class='timepiece-hours'>#{hours}</span>"\
           "<span class='timepiece-separator tp-separator-1'>:</span>"\
           "<span class='timepiece-minutes'>#{minutes}</span>"\
           "<span class='timepiece-separator tp-separator-2'>:</span>"\
           "<span class='timepiece-seconds'>#{seconds}</span>"
  	content_tag(:span, time.html_safe, class: 'timepiece', 'data-timezone' => location)
  end
end

  	# note on sup/sub - optional, of course. Perhaps best left to the user's own ingenuity. Replace with individual spans?

#\
 #          "<span class='timepiece-abbr'>"\
  #           "<sup>am</sup>"\
   #          "<sub>pm</sub>"\
    #       "</span>"