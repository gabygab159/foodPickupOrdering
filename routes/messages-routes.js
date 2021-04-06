/*
 * All routes for Manus are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const express = require('express');
const router  = express.Router();
const { getMessages, getMessagesById, getMessagesByOrderId }  = require('../lib/messages-queries');

// Router middlewares with no mount path (will be executed on every request to the router)
router.use((req, res, next) => {
  console.log('router.messages has been called');
  next();
})

module.exports = (database) => {
  // GET /messages/
  router.get('/', (req, res) => {
    getMessages()
      .then((m) => {
        res.send(m);
      })
      .catch((err) => {
        return err.messages;
      })
  });

  // GET /messages/:id
  router.get('/:id', (req, res) => {
    if (req.params.id) {
      getMessagesById(req.params.id)
        .then((m) => {
          res.send(m);
        })
        .catch((err) => {
          res.send(err.messages);
        })
    }
  });

  // GET /messages/order/:id
  router.get('/order/:id', (req, res) => {
    if (req.params.id) {
      getMessagesByOrderId(req.params.id)
        .then(m => {
          res.send(m);
        })
        .catch(err => {
          res.send(err.messages);
        })
    }
  });

  // POST /messages/new/:order_id
  // When the user checkout, POST /orders/new/ will be called
  // then a new message will be sent to the restaurant
  // When the restaurant start preparing the food, the prep time will be set
  // and a message will be sent to the user and the website will be updated with the message
  // When the food is ready, a new message will be send to the user to inform order is ready to pick up
  // and website is updated

  return router;
}
