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
    get 'articles/get_most_viewed_by_team/:canonical' => 'articles#get_most_viewed_by_team'
    patch 'articles/update_count/:id' => 'articles#update_count'

    get 'teams/get_by_canonical/:canonical' => 'teams#get_by_canonical'
  end

  get '*path', to: 'application#fallback_index_html', constraints: lambda { |request|
    !request.xhr? && request.format.html?
  }
end
