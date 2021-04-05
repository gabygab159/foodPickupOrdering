/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const express = require('express');
const router  = express.Router();
const { getUsers, getUsersById, getUsersByEmail }  = require('../lib/users-queries');

// Router middlewares with no mount path (will be executed on every request to the router)
router.use((req, res, next) => {
  console.log('router.user has been called');
  next();
});

module.exports = (database) => {
  // GET /users/
  router.get('/', (req, res) => {
    getUsers()
      .then((users) => {
        res.send(users);
      })
      .catch((err) => {
        return err.messages;
      });
  });

  // GET /users/:id
  router.get('/:id', (req, res) => {
    if (req.params.id) {
      getUsersById(req.params.id)
        .then((users) => {
          res.send(users);
        });
    }
  });

  // GET /users/email/:email
  router.get('/email/:email', (req, res) => {
    // const req.params.email = 'alice@bla.com';
    const email = 'alice@bla.com';
    if (email) {
      getUsersByEmail(email)
        .then((users) => {
          res.send(users);
        });
    }
  });

  return router;
};