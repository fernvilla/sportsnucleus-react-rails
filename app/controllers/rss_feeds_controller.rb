# frozen_string_literal: true

class RssFeedsController < ApplicationController
  before_action :set_rss_feed, only: %i[show update destroy]

  def index
    @rss_feeds = RssFeed.all

    render json: @rss_feeds
  end

  def show
    render json: @rss_feed
  end

  def create
    @rss_feed = RssFeed.new(rss_feed_params)

    if @rss_feed.save
      render json: @rss_feed, status: :created, location: @rss_feed
    else
      render json: @rss_feed.errors, status: :unprocessable_entity
    end
  end

  def update
    if @rss_feed.update(rss_feed_params)
      render json: @rss_feed
    else
      render json: @rss_feed.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @rss_feed.destroy
  end

  private

  def set_rss_feed
    @rss_feed = RssFeed.find(params[:id])
  end

  def rss_feed_params
    params.require(:rss_feed).permit(:feed_url, :last_status_code, :is_active, :source_id, :team_id)
  end
end
