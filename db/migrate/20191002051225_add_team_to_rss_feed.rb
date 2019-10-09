# frozen_string_literal: true

class AddTeamToRssFeed < ActiveRecord::Migration[6.0]
  def change
    add_reference :rss_feeds, :team, null: false, foreign_key: true
  end
end
