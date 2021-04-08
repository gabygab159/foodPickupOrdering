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
    const orderDate = new Date();
    const order = [ user_id, parseInt(restaurant_id), parseInt(price), orderDate, 1 ];
    
    // addNewOrder(order).then(res => res).then(info => addOrderItems(info))

    // check if there is an order open for the current user
    getOrderStatusByUserId(user_id)
      .then((userOrder) => {

        console.log("DEBUG ADD ITEMS TO ORDER - userOrder: ", userOrder);

        if (!userOrder) {
          // Add a new order and the item if there is no open orders for the user
          addNewOrder(order)
          .then((neworder) => {  
              if (!neworder) {
                console.log("Error while adding a new order");
              } else {
                addItemsToOrder(neworder.id, id, 1)
                  .then((item) => {
                    console.log("New item added to the order");
                    res.redirect('/');
                  })
                  .catch((err) => {
                    console.log("Error addItemsToOrder: ", err.messages);
                    res.render('partials/message', err.messages);
                  })
              }
          })
          .catch((err) => {
            console.log("ERROR: ", err.messages)
          })

        } else {
          // Add items to an existing order
          addItemsToOrder(userOrder[0].id, id, 1)
            .then((item) => {
              res.redirect('/');
            })
            .catch((err) => {
              res.render('partials/message', err.messages);
            })
        }
      })


    
  })

  return router;

  }