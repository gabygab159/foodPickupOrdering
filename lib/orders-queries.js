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
  // let queryParams = [ 3, 1, 100, '2021/04/06', 1 ];
  const queryString = 'INSERT INTO orders(user_id, restaurant_id, total, date, status) VALUES ($1, $2, $3, $4, $5) RETURNING*;';
  return pool
    .query(queryString, order)
    .then((res) => {
      return res.rows[0];
    })
    .catch(err => console.log(err.messages))
}

module.exports = {
  getOrders,
  getOrderById,
  addNewOrder
};
