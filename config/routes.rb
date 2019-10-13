# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  scope '/api' do
    resources :teams
    resources :leagues
    resources :sources
    resources :source_types
    resources :rss_feeds
    resources :articles

    get 'articles/get_by_team/:canonical' => 'articles#get_by_team'
  end

  get '*path', to: 'application#fallback_index_html', constraints: lambda { |request|
    !request.xhr? && request.format.html?
  }
end
