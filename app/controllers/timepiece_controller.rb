class TimepieceController < ApplicationController

  respond_to :json

  def clock
  	time = Time.now.in_time_zone(params[:timezone])
    @time = {
      :hours => time.strftime('%H'),
      :minutes => time.strftime('%M'),
      :seconds => time.strftime('%S') 
    }
    respond_with @time
  end

end
