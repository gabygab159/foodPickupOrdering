const poll = require('./lib/db');


const addNewOrder = (order, item, cb) => {
  // let queryParams = [ 3, 1, 100, '2021/04/06', 1 ];
  const queryString = 'INSERT INTO orders (user_id, restaurant_id, total, date, status) VALUES ($1, $2, $3, $4, $5) RETURNING*;';
  pool
    .query(queryString, order)
    .then((res) => {
      const order_id = res.rows[0].id;
      cb(order_id, item[0], item[1]);
      return res.rows[0];
    })
    .catch(err => console.log(err.messages))
  }


  // Return orders with user_id = req.params.user_id and status = 1 (open)
const getOrderStatusByUserId = (user_id) => {
  const values = [ user_id ];
  let sqlQuery = 'SELECT * FROM orders WHERE user_id = $1 AND status = 1;';

  //return pool
  pool
    .query(sqlQuery, values)
    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => {
      return err.messages;
    })
}