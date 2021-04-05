const pool = require('./db');

const getUsers = () => {
  return pool
    .query('SELECT * FROM users;')
    .then(res => res.rows)
    .catch(err => err.messages)
};

const getUsersByEmail = (email) => {
  const values = [ email ];
  return pool
    .query('SELECT * FROM users WHERE email = %1', values)
    .then(res => res.rows[0])
    .catch(err => err.messages)
};

module.exports = {
  getUsers,
  getUsersByEmail
};