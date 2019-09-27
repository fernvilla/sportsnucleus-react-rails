# frozen_string_literal: true

class Source < ApplicationRecord
  belongs_to :source_type
  has_many :articles
end
