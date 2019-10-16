# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  scope '/api' do
    resources :leagues
    resources :sources
    resources :source_types
    resources :rss_feeds

    resources :teams do
      collection do
        get 'get_by_canonical/:canonical' => 'teams#get_by_canonical'
      end
    end

    resources :articles do
      collection do
        get 'last_day'
        get 'get_by_team/:canonical' => 'articles#get_by_team'
        get 'get_most_viewed_by_team/:canonical' => 'articles#get_most_viewed_by_team'
        patch 'update_count/:id' => 'articles#update_count'
      end
    end
  end

  get '*path', to: 'application#fallback_index_html', constraints: lambda { |request|
    !request.xhr? && request.format.html?
  }
end
