// All routes for Orders are defined here


const express = require('express');
const router  = express.Router();
const { getOrders, getOrderById }  = require('../lib/orders-queries');

// Router middlewares with no mount path (will be executed on every request to the router)
router.use((req, res, next) => {
  console.log('router.user has been called');
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
      .then((orders) => {
        res.send(orders);
      })
      .catch((err) => {
        res.send(err.messages);
      })
    }
  })

  return router;
}


