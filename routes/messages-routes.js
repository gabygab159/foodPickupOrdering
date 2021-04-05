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
  // GET /menus/
  router.get('/', (req, res) => {
    getMessages()
      .then((m) => {
        res.send(m);
      })
      .catch((err) => {
        return err.messages;
      })
  })

  // GET /menus/:id
  router.get('/:id', (req, res) => {
    if (req.params.id) {
      getMenuItemsById(req.params.id)
        .then((menus) => {
          res.send(menus);
        })
        .catch((err) => {
          res.send(err.messages);
        })
    }
  })

  return router;
}
