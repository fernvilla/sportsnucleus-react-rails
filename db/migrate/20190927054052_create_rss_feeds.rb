# frozen_string_literal: true

class CreateRssFeeds < ActiveRecord::Migration[6.0]
  def change
    create_table :rss_feeds do |t|
      t.string :feed_url
      t.integer :last_status_code
      t.boolean :is_active
      t.references :source, null: false, foreign_key: true

      t.timestamps
    end
  end
end
