const pool = require('./db');

const getRestaurants = () => {
  return pool
    .query('SELECT * FROM restaurants;')
    .then(res => res.rows)
    .catch(err => err.messages);
};

const getRestaurantById = (id) => {
  const values = [ id ];
  return pool
    .query('SELECT * FROM restaurants WHERE id = $1', values)
    .then(res => res.rows[0])
    .catch(err => err.messages);
};

module.exports = {
  getRestaurants,
  getRestaurantById
};
