# frozen_string_literal: true

class Team < ApplicationRecord
  belongs_to :league

  validates :name, :abbreviation, :website_url, :canonical, :league_id, presence: true
end
