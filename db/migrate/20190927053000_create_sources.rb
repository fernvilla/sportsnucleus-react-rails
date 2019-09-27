class CreateSources < ActiveRecord::Migration[6.0]
  def change
    create_table :sources do |t|
      t.string :name
      t.string :website_url
      t.string :canonical
      t.references :source_type, null: false, foreign_key: true

      t.timestamps
    end
  end
end
