const pool = require('./db');

// Get all addresses from the database
const getAddresses = () => {
  return pool
    .query('SELECT * FROM addresses;')
    .then(res => {
      return res.rows;
    })
    .catch(err => err.messages);
};

// Get address from the database by address id
const getAddressesById = (id) => {
  const values = [id];
  return pool
    .query(`SELECT * FROM addresses WHERE id = $1;`, values)
    .then(res => {
      return res.rows[0];
    })
    .catch((err) => {
      console.error("Error (getAddressesById): ", err.messages);
    });
};

module.exports = { getAddresses, getAddressesById };
