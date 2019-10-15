# frozen_string_literal: true

class TeamsController < ApplicationController
  before_action :set_team, only: %i[show update destroy]

  def index
    @teams = Team.all

    render json: @teams
  end

  def show
    render json: @team
  end

  def create
    @team = Team.new(team_params)

    if @team.save
      render json: @team, status: :created, location: @team
    else
      render json: @team.errors, status: :unprocessable_entity
    end
  end

  def update
    if @team.update(team_params)
      render json: @team
    else
      render json: @team.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @team.destroy
  end

  def get_by_canonical
    @team = Team.includes(:articles).order('articles.published_date desc').find_by(canonical: params[:canonical])

    render json: @team, include: { articles: { include: %i[source] } }
  end

  private

  def set_team
    @team = Team.find(params[:id])
  end

  def team_params
    params.require(:team).permit(:name, :abbreviation, :canonical, :website_url, :league_id)
  end
end
