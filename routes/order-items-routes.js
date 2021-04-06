/*
 * All routes for Manus are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const express = require('express');
const router  = express.Router();
const { getOrderItems, getOrderItemsById }  = require('../lib/order-items-queries');

// Router middlewares with no mount path (will be executed on every request to the router)
router.use((req, res, next) => {
  console.log('router.order_items has been called');
  next();
})

module.exports = (database) => {
  // GET /order-items/
  router.get('/', (req, res) => {
    getOrderItems()
      .then((items) => {
        res.send(items);
      })
      .catch((err) => {
        return err.messages;
      })
  })

  // GET /order-items/:order_id
  router.get('/:id', (req, res) => {
    if (req.params.id) {
      getOrderItemsById(req.params.id)
        .then((items) => {
          res.send(items);
        })
        .catch((err) => {
          res.send(err.messages);
        })
    }
  })

  return router;
}
