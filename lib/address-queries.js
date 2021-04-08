const pool = require('./db');

const getAddresses = () => {
  return pool
    .query('SELECT * FROM addresses;')
    .then (res => {
      return res.rows;
    })
    .catch(err => err.messages);
};

const getAddressesById = (id) => {
  const values = [id];
  return pool
    .query(`SELECT * FROM addresses WHERE id = $1;`, values)
    .then (res => {
      return res.rows[0];
    })
    .catch(err => err.messages);
}

module.exports = {
  getAddresses,
  getAddressesById
};
