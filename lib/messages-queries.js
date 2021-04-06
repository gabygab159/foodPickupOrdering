const pool = require('./db');

const getMessages = () => {
  return pool
    .query('SELECT * FROM messages;')
    .then(res => res.rows)
    .catch(err => err.messages);
};

const getMessagesById = (id) => {
  const values = [ id ];

  let sqlQuery = 'SELECT * FROM messages ';
  sqlQuery += 'JOIN orders ON orders.id = messages.id ';
  sqlQuery += 'WHERE id = $1 AND orders.status = 2';
  
  return pool
    .query(sqlQuery, values)
    .then(res => res.rows[0])
    .catch(err => err.messages);
};

const getMessagesByOrderId = (order_id) => {
  const values = [ order_id ];

  let sqlQuery = 'SELECT * FROM messages WHERE order_id = $1;'
  return pool
    .query(sqlQuery, values)
    .then(res => res.rows)
    .catch(err => err.messages);
};

module.exports = {
  getMessages,
  getMessagesById,
  getMessagesByOrderId
};