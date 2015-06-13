class TimepieceController < ApplicationController

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
