const pool = require('./db');

const getOrders = () => {
  return pool
    .query('SELECT * FROM orders;')
    .then(res => res.rows)
    .catch(err => err.messages);
};

const getOrderById = (id) => {
  const values = [ id ];
  return pool
    .query('SELECT * FROM orders WHERE id = $1', values)
    .then(res => res.rows[0])
    .catch(err => err.messages);
};

// add new order when order status is closed

const addNewOrder = (order) => {
  const queryString = `INSERT INTO orders( user_id, restaurant_id, total, date, status)
  VALUES($1, $2, $3, $4, $5)
  RETURNING*;`;

  let queryParams = [
    order.user_id,
    order.restaurant_id,
    order.total,
    order.date,
    order.status
  ];

  return pool
    .query(queryString, queryParams)
    .then(res => res.rows[0])
    .catch(err => console.log(err.messages))
}

module.exports = {
  getOrders,
  getOrderById,
  addNewOrder
};
