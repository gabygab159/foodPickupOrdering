const pool = require('./db');

const getMenuItems = () => {
  return pool
    .query('SELECT * FROM menu_items;')
    .then(res => res.rows)
    .catch(err => err.messages);
};

const getMenuItemsById = (id) => {
  const values = [ id ];
  return pool
    .query('SELECT * FROM menu_items WHERE id = $1', values)
    .then(res => res.rows[0])
    .catch(err => err.messages);
};

module.exports = {
  getMenuItems,
  getMenuItemsById
};
