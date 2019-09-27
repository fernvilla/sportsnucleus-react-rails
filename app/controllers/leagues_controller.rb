# frozen_string_literal: true

class LeaguesController < ApplicationController
  before_action :set_league, only: %i[show update destroy]

  def index
    @leagues = League.all

    render json: @leagues
  end

  def show
    render json: @league
  end

  def create
    @league = League.new(league_params)

    if @league.save
      render json: @league, status: :created, location: @league
    else
      render json: @league.errors, status: :unprocessable_entity
    end
  end

  def update
    if @league.update(league_params)
      render json: @league
    else
      render json: @league.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @league.destroy
  end

  private

  def set_league
    @league = League.find(params[:id])
  end

  def league_params
    params.require(:league).permit(:name, :abbreviation, :canonical, :website_url)
  end
end
