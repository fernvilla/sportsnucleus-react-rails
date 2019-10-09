# frozen_string_literal: true

class RssFeed < ApplicationRecord
  belongs_to :source
  belongs_to :team, optional: true
end
