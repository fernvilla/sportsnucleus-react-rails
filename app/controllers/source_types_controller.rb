# frozen_string_literal: true

class SourceTypesController < ApplicationController
  before_action :set_source_type, only: %i[show update destroy]

  def index
    @source_types = SourceType.all

    render json: @source_types
  end

  def show
    render json: @source_type
  end

  def create
    @source_type = SourceType.new(source_type_params)

    if @source_type.save
      render json: @source_type, status: :created, location: @source_type
    else
      render json: @source_type.errors, status: :unprocessable_entity
    end
  end

  def update
    if @source_type.update(source_type_params)
      render json: @source_type
    else
      render json: @source_type.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @source_type.destroy
  end

  private

  def set_source_type
    @source_type = SourceType.find(params[:id])
  end

  def source_type_params
    params.require(:source_type).permit(:name)
  end
end
