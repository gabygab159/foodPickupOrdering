const pool = require('./db');


//update order status to active
//send sms to restaurant
//sms will get order num and summarize prep time for specific order
//call set timeout with a callback to send sms to client to pick up and update the messaging block

//when status is updated to 2. Render messages with order id, thank you message and time

const updateOrderStatus = (order_id, status) => {
  const values = [order_id, status];
  let sqlQuery = `UPDATE orders
                  SET status = $2
                  WHERE id = $1
                  RETURNING * ;`
  return pool
    .query(sqlQuery, values)
    .then(res => console.log(res.rows))
    .catch(err => console.log(err.messages))
}

module.exports = {
  updateOrderStatus
};
