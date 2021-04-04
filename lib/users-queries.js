const db = require('./db');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(res => res.rows)
    .catch(err => err.messages)
};

const getUserById = (id) => {
  return db.query('SELECT * FROM users WHERE id = %1', [id])
    .then(res => res.rows[0])
    .catch(err => err.messages)
};

module.exports = {
  getUsers,
  getUsers
};