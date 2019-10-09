# frozen_string_literal: true

require 'feedjira'
require 'httparty'
require 'cgi'

class ArticlesImporter
  def self.import
    feeds = RssFeed.all.to_a

    feeds.each do |feed|
      next unless feed.is_active

      response = HTTParty.get(feed.feed_url)

      feed.update(last_status_code: response.code)

      next unless response.code == 200

      parsed_feed = Feedjira.parse(response.body)

      next unless defined? parsed_feed.entries

      parsed_feed.entries.each do |entry|
        next unless (Date.today - entry.published.to_date).to_i <= 2

        Article.where(url: entry.url).first_or_create(
          title: CGI.unescapeHTML(entry.title),
          author: entry.author,
          summary: CGI.unescapeHTML(entry.summary),
          url: entry.url,
          published_date: entry.published,
          source_id: feed.source_id,
          team_id: feed.team_id
        )

        # if defined? entry.image
        #   url = Article.where(url: entry.url).first
        #   url.update(image: entry.image)
        # end
      end
    rescue StandardError => e
      puts e
      puts feed.url
    end
  end
end
