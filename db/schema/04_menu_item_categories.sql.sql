DROP TABLE IF EXISTS menu_item_categories CASCADE;

CREATE TABLE menu_item_categories (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);
