const pool = require('./db');

const getOrderItems = () => {
  return pool
    .query('SELECT * FROM order_items;')
    .then(res => res.rows)
    .catch(err => err.messages);
};

// Get order items by order id
const getOrderItemsById = (id) => {
  const values = [ id ];

  let sqlQuery = 'SELECT order_items.*, menu_items.name, menu_items.price ';
  sqlQuery += 'FROM order_items ';
  sqlQuery += 'JOIN menu_items ON menu_items.id = order_items.order_id ';
  sqlQuery += 'WHERE order_items.order_id = $1;';

  return pool
    .query(sqlQuery, values)
    .then(res => res.rows)
    .catch(err => err.messages);
};

module.exports = {
  getOrderItems,
  getOrderItemsById
};