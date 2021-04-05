DROP TABLE IF EXISTS restaurants CASCADE;

CREATE TABLE restaurants (

  id SERIAL PRIMARY KEY NOT NULL,
  address_id INTEGER REFERENCES addresses(id) ON DELETE CASCADE,

  name VARCHAR(255) NOT NULL,
  phone_number INT NOT NULL,
  image_url VARCHAR(255) NOT NULL

);
