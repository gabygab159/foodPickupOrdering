const pool = require('./db');

const getOrderItems = () => {
  return pool
    .query('SELECT * FROM order_items;')
    .then(res => res.rows)
    .catch(err => err.messages);
};

const getOrderItemsById = (id) => {
  const values = [ id ];
  return pool
    .query('SELECT * FROM order_items WHERE id = $1', values)
    .then(res => res.rows[0])
    .catch(err => err.messages);
};

module.exports = {
  getOrderItems,
  getOrderItemsById
};