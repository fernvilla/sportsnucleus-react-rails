# frozen_string_literal: true

class Team < ApplicationRecord
  belongs_to :league
  has_many :rss_feeds
  has_many :articles

  validates :name, :abbreviation, :website_url, :canonical, :league_id, presence: true
end
