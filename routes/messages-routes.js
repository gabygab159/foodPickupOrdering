/*
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const express = require('express');
const router  = express.Router();
const { getMessages, getMessagesById, getMessagesByOrderId }  = require('../lib/messages-queries');


module.exports = (database) => {
  // GET /messages/
  router.get('/', (req, res) => {
    getMessages()
      .then((m) => {
        res.send(m);
      })
      .catch((err) => {
        return err.messages;
      });
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
        });
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
        });
    }
  });

  return router;
};
