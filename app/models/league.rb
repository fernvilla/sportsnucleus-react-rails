# frozen_string_literal: true

class League < ApplicationRecord
  has_many :teams

  validates :name, :abbreviation, :website_url, :canonical, presence: true
end
