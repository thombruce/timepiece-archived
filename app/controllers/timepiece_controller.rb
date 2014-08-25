class TimepieceController < ApplicationController

  respond_to :json

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
    render :json => arr
  end

end
