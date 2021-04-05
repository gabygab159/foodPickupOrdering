const pool = require('./db');

const getMessages = () => {
  return pool
    .query('SELECT * FROM messages;')
    .then(res => res.rows)
    .catch(err => err.messages);
};

const getMessagesById = (id) => {
  const values = [ id ];
  return pool
    .query('SELECT * FROM messages WHERE id = $1', values)
    .then(res => res.rows[0])
    .catch(err => err.messages);
};

const getMessagesByOrderId = (order_id) => {
  const values = [ order_id ];
  return pool
    .query(`SELECT * FROM messages WHERE order_id = $1`, values)
    .then(res => res.rows)
    .catch(err => err.messages);
};

module.exports = {
  getMessages,
  getMessagesById,
  getMessagesByOrderId
};