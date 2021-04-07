// All routes for Orders are defined here


const express = require('express');
const router  = express.Router();
const { getOrders, getOrderById, getOrderStatusByUserId, addItemsToOrder, addNewOrder }  = require('../lib/orders-queries');

// Router middlewares with no mount path (will be executed on every request to the router)
router.use((req, res, next) => {
  console.log('router.orders has been called');
  next();
});

module.exports = (database) => {
  // GET /orders/
  router.get('/', (req,res) => {
    getOrders()
      .then((orders) => {
        res.send(orders);
      })
      .catch((err) => {
        return err.messages;
      })
  })
  // GET Orders / id
  router.get('/:id', (req, res) => {

      if (req.params.id) {
      getOrderById(req.params.id)
      .then((order) => {
        res.send(order);
      })
      .catch((err) => {
        res.send(err.messages);
      })
    }
  })


  router.post('/new', (req, res) => {

    // Check if there is an order with open status (1) for the current user
    // YES  
    //    - add new item to the order
    //    - update the total on the orders table
    // NO
    //    - create a new order
    //    - add item to the new order

    const user_id = 1;
    const { id, restaurant_id, price, prep_time } = req.body;

    // res.send(req.body);
 
    getOrderStatusByUserId(user_id)
      .then((order) => {
        if(!order) {
          // user_id, restaurant_id, total, date, status
          // user_id, restaurant_id, total, date, status
          const values = [ user_id, restaurant_id*1, price*1, Date.now(), 1 ];
          addNewOrder(values)
            .then((newOrder) => {
              console.log("after call addNewOrder: ", newOrder);
              getOrderStatusByUserId(user_id)
                .then((item) => {
                  res.redirect('/');
                })
            })
          // res.redirect('/');
        } else {
          addItemsToOrder(order.id, id, 1)
            .then((item) => {
              res.redirect('/');
            })
        }
        // addItemsToOrder(order.id, id, 1);
        // res.redirect('/');
      })

    const order = [user_id, restaurant_id, price, Date.now(), 1 ];
    const item = [id, 1];

    // addNewOrder(order, item, addItemsToOrder)
    //   .then((res) => {
    //     res.redirect('/');
    //   })

    // if (currentOrder) {
    //   res.send(currentOrder);
    // } else {
    //   const message = currentOrder;
    //   res.send(message);
    // }
    // getOrderByUserId(user_id)
    //   .then((order) => {
    //     const obj = { order, menus };
    //     console.log("OBJ: ", obj)
    //     res.send(obj);
    //   })
    //   .catch((err) => {
    //     res.send(err.messages);
    //   })

  })

  // work in progress

  ///router.post('/new', (req, res) => {

    //console.log("----> params in the user_id:", req.params);

    // const user_id = req.params.user_id;
    // const user_id = 1;

    // if(user_id) {

    //   getOrderByUserId(user_id)
    //     .then((order) => {
          
    //       console.log("response from getOrdersById: ", order);
    
    //       if (order) {
    //         // add the current item to the current order to the current user with current status open (1)
    //       } else {
    //         // This is a new
    //         const user_id = req.params.user_id;
    //         const item_id = req.params.id;
    //         const restaurant_id = req.params.restaurant_id;
    //         const price = req.params.price;
    //         const prep_time = req.params.prep_time;
    //         const quantity = 1;
    //         const date = Date.now();
    //         const status = 1;
      
    //         //const newItem = { req.params } '
    //         const newItem = [ user_id, 1, 100, '2021/04/06', 1 ];
    //         addNewOrder(newItem)
    //           .then((order) => {
    //             addItemsToOrder(order.id, item_id, quantity)
    //               .then((item) => {
    //                 res.render('cart', order)
    //               })
    //               .catch((err) => {
    //                 res.render('messages', err.messages);
    //               })
    //           })
    //           .catch((err) => {
    //             res.send(err.messages);
    //           })
    //       }
    //     })

    // } else { 
    //   res.render('../partials/messages', "No user_id");
    // }

  return router;

  }