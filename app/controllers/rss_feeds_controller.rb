class RssFeedsController < ApplicationController
  before_action :set_rss_feed, only: [:show, :update, :destroy]

  # GET /rss_feeds
  def index
    @rss_feeds = RssFeed.all

    render json: @rss_feeds
  end

  # GET /rss_feeds/1
  def show
    render json: @rss_feed
  end

  # POST /rss_feeds
  def create
    @rss_feed = RssFeed.new(rss_feed_params)

    if @rss_feed.save
      render json: @rss_feed, status: :created, location: @rss_feed
    else
      render json: @rss_feed.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /rss_feeds/1
  def update
    if @rss_feed.update(rss_feed_params)
      render json: @rss_feed
    else
      render json: @rss_feed.errors, status: :unprocessable_entity
    end
  end

  # DELETE /rss_feeds/1
  def destroy
    @rss_feed.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_rss_feed
      @rss_feed = RssFeed.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def rss_feed_params
      params.require(:rss_feed).permit(:feed_url, :last_status_code, :is_active, :source_id, :team_id)
    end
end
