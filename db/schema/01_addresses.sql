DROP TABLE IF EXISTS addresses CASCADE;

CREATE TABLE addresses (
  id SERIAL PRIMARY KEY NOT NULL,
  street VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  postal_code VARCHAR(255) NOT NULL,
  province VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL
);
