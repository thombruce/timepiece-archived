module TimepieceHelper
  def timepiece(location = 'UTC')
  	Time.zone = location
  	time = Time.now.in_time_zone.strftime('%H:%M:%S')
  	content_tag(:span, time, class: 'timepiece', 'data-timezone' => location)
  end
end
