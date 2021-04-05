const pool = require('./db');

const getMenus = () => {
  return pool
    .query('SELECT * FROM menus;')
    .then(res => res.rows)
    .catch(err => err.messages)
};

const getMenusById = (id) => {
  const values = [ id ];
  return pool
    .query('SELECT * FROM menus WHERE id = $1', values)
    .then(res => res.rows[0])
    .catch(err => err.messages)
};

module.exports = {
  getMenus,
  getMenusById
}; 
