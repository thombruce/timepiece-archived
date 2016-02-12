class TimepieceController < ActionController::Base
  
  protect_from_forgery with: :null_session

  def clock
    arr = Array.new
    params[:timezones].each_with_index do | data, index |
    	zone = Time.now.in_time_zone(data)
      time = {
        :hours => zone.strftime('%H'),
        :minutes => zone.strftime('%M'),
        :seconds => zone.strftime('%S') 
      }
      arr << time
    end
    respond_to do |format|
      format.json { render :json => arr }
    end
  end

end
