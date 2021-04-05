const pool = require('./db');

const getUsers = () => {
  return pool
    .query('SELECT * FROM users;')
    .then(res => { 
      console.log("res.rows inside users route ", res.rows);
      return res.rows;
    })
    .catch(err => err.messages)
};

const getUsersById = (id) => {
  const values = [ id ];
  return pool
    .query(`SELECT * FROM users WHERE id = $1;`, values)
    .then(res => {
      console.log("res.rows[0] inside getUsersById ", res.rows[0]);
      return res.rows[0];
    })
    .catch(err => err.messages)
}

const getUsersByEmail = (email) => {
  const values = [ email ];
  return pool
    .query(`SELECT * FROM users WHERE email = $1;`, values)
    .then(res => {
      // console.log("res.rows[0] inside getUsersByEmail ", res.rows[0]);
      return res.rows[0];
    })
    .catch(err => err.messages)
};

module.exports = {
  getUsers,
  getUsersById,
  getUsersByEmail
};