class CreateLeagues < ActiveRecord::Migration[6.0]
  def change
    create_table :leagues do |t|
      t.string :name
      t.string :abbreviation
      t.string :canonical
      t.string :website_url

      t.timestamps
    end
  end
end
