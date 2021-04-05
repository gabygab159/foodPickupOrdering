const pool = require('./db');

const getOrders = () => {
  return pool
    .query('SELECT * FROM orders;')
    .then(res => res.rows)
    .catch(err => err.messages)
};

const getOrderById = (id) => {
  const values = [ id ];
  return pool
    .query('SELECT * FROM orders WHERE id = $1', values)
    .then(res => res.rows[0])
    .catch(err => err.messages)
};

module.exports = {
  getOrders,
  getOrderById
};