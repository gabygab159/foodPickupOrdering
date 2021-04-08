const pool = require('./db');


const updateOrderStatusByOrder = (order_id) => {
  // const values = [order_id];
  // let sqlQuery = `SELECT * FROM orders;`;
  //                 // UPDATE orders
  //                 // SET status = 2
  //                 // WHERE order_id = $1
  //                 // AND status = 1;`;
 return pool
    .query('SELECT * FROM users;')
    .then((res) => console.log(res.rows));
};


updateOrderStatusByOrder(1);
