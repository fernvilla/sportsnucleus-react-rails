class CreateArticles < ActiveRecord::Migration[6.0]
  def change
    create_table :articles do |t|
      t.text :title
      t.string :author
      t.datetime :published_date
      t.string :image
      t.string :url
      t.integer :clicks
      t.text :summary
      t.references :source, null: false, foreign_key: true
      t.references :team, null: false, foreign_key: true

      t.timestamps
    end
  end
end
