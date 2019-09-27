# frozen_string_literal: true

ActiveAdmin.register Article do
  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  # permit_params :title, :author, :published_date, :image, :url, :clicks, :summary, :source_id, :team_id
  #
  # or
  #
  permit_params do
    permitted = %i[title author published_date image url clicks summary source_id team_id]
    permitted << :other if params[:action] == 'create' && current_user.admin?
    permitted
  end
end
