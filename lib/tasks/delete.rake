# frozen_string_literal: true

namespace :delete do
  desc 'Delete records older than 14 days'

  task old_articles: :environment do
    Article.where('created_at < ?', 14.days.ago).delete_all
  end

  task all: %i[old_articles]
end
