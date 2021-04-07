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

// Return orders with user_id = req.params.user_id and status = 1 (open)
const getOrderByUserId = (user_id) => {
  const values = [ user_id ];
  let sqlQuery = 'SELECT * FROM orders WHERE user_id = $1 AND status = 1;';

  return pool
    .query(sqlQuery, values)
    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => {
      return err.messages;
    })

}

// add new order when order status is closed

// Function to add new orders
const addNewOrder = (order) => {
  // let queryParams = [ 3, 1, 100, '2021/04/06', 1 ];
  const queryString = 'INSERT INTO orders (user_id, restaurant_id, total, date, status) VALUES ($1, $2, $3, $4, $5) RETURNING*;';
  return pool
    .query(queryString, order)
    .then((res) => {
      return res.rows[0];
    })
    .catch(err => console.log(err.messages))
  }
  
// Function to add new items to an open order
const addItemsToOrder = (order_id, item_id, quantity) => {
  const values = [ order_id, item_id, quantity ];
  let sqlQuery = 'INSERT INTO order_items ';
  sqlQuery += '(order_id, menu_item_id, quantity) ';
  sqlQuery += 'VALUES ( $1, $2, $3 ) RETURNING*;';

  return pool
    .query(sqlQuery, values)
    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => {
      return err.messages;
    })
};

module.exports = {
  getOrders,
  getOrderById,
  getOrderByUserId,
  addItemsToOrder,
  addNewOrder
};
