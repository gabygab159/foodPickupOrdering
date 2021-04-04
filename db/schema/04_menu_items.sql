DROP TABLE IF EXISTS menu_items  CASCADE;

CREATE TABLE menu_items (

  id SERIAL PRIMARY KEY NOT NULL,
  restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  price INT NOT NULL,
  prep_time INT NOT NULL DEFAULT 0,
  menu_item_category_ID INTEGER REFERENCES menu_item_categories(id) ON DELETE CASCADE

);
