module TimepieceHelper
  def timepiece(location = 'UTC', type: '24', lead: 'none', abbr_sep: 'none', id: '')
    # Note: On the inclusion of IDs, you should /not/ display them if none is given - HTML compliance.
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
      if hours < 10
        if lead == '0' || lead == 'zero'
          hours = '0' + hours.to_s
        elsif lead == '_' || lead == 'space'
          hours = '&#8199;' + hours.to_s
        end
      end
      if abbr_sep == '.'
        var = var.gsub(/([apm])/, '\1.')
      end
    end
  	time = "<span class='timepiece-hours'>#{hours}</span>"\
           "<span class='timepiece-separator tp-separator-1 tp-hours-minutes'>:</span>"\
           "<span class='timepiece-minutes'>#{minutes}</span>"\
           "<span class='timepiece-separator tp-separator-2 tp-minutes-seconds'>:</span>"\
           "<span class='timepiece-seconds'>#{seconds}</span>"
    if type == '12'
      time = time + "<span class='timepiece-abbr timepiece-abbr-#{var}'>#{var}</span>"
    end
  	content_tag(:span, time.html_safe, class: 'timepiece', 'data-timezone' => location, 'data-tptype' => type, 'data-lead' => lead, 'data-abbr_separator' => abbr_sep, 'id' => id)
  end

  def timer(time_since = Time.now, id: '')
    seconds_diff = (Time.now - time_since).to_i

    days = seconds_diff / 86400
    seconds_diff -= days * 86400

    hours = seconds_diff / 3600
    seconds_diff -= hours * 3600

    minutes = seconds_diff / 60
    seconds_diff -= minutes * 60

    seconds = seconds_diff

    time = "<span class='timepiece-days'>#{days.to_s}</span>"\
           "<span class='timepiece-descriptor tp-descriptor-days'> days </span>"\
           "<span class='timepiece-hours'>#{hours.to_s}</span>"\
           "<span class='timepiece-descriptor tp-descriptor-hours'> hours </span>"\
           "<span class='timepiece-minutes'>#{minutes.to_s}</span>"\
           "<span class='timepiece-descriptor tp-descriptor-minutes'> minutes </span>"\
           "<span class='timepiece-seconds'>#{seconds.to_s}</span>"\
           "<span class='timepiece-descriptor tp-descriptor-seconds'> seconds </span>"
           # "<span class='timepiece-seconds'>#{seconds.to_s.rjust(2, '0')}</span>" # Note: rjust; it might be useful.

    content_tag(:span, time.html_safe, class: 'timepiece-timer', 'data-days' => days, 'data-hours' => hours, 'data-minutes' => minutes, 'data-seconds' => seconds, 'id' => id)
  end

  def countdown(time_until = Time.new(2016), id: '')
    seconds_diff = (time_until - Time.now).to_i

    days = seconds_diff / 86400
    seconds_diff -= days * 86400

    hours = seconds_diff / 3600
    seconds_diff -= hours * 3600

    minutes = seconds_diff / 60
    seconds_diff -= minutes * 60

    seconds = seconds_diff

    time = "<span class='timepiece-days'>#{days.to_s}</span>"\
           "<span class='timepiece-descriptor tp-descriptor-days'> days </span>"\
           "<span class='timepiece-hours'>#{hours.to_s}</span>"\
           "<span class='timepiece-descriptor tp-descriptor-hours'> hours </span>"\
           "<span class='timepiece-minutes'>#{minutes.to_s}</span>"\
           "<span class='timepiece-descriptor tp-descriptor-minutes'> minutes </span>"\
           "<span class='timepiece-seconds'>#{seconds.to_s}</span>"\
           "<span class='timepiece-descriptor tp-descriptor-seconds'> seconds </span>"
           # "<span class='timepiece-seconds'>#{seconds.to_s.rjust(2, '0')}</span>" # Note: rjust; it might be useful.

    content_tag(:span, time.html_safe, class: 'timepiece-countdown', 'data-days' => days, 'data-hours' => hours, 'data-minutes' => minutes, 'data-seconds' => seconds, 'id' => id)
  end
end