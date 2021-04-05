/*
 * All routes for Manus are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { getMenus, getMenusById }  = require('../lib/menus-queries');

// Router middlewares with no mount path (will be executed on every request to the router)
router.use((req, res, next) => {
  console.log('router.menus has been called');
  next();
})

module.exports = (database) => {
  // GET /menus/
  router.get('/', (req, res) => {
    getMenus()
      .then((menus) => {
        res.send(menus);
      })
      .catch((err) => {
        return err.messages;
      })
  })

  router.get('/:id', (req, res) => {
    if (req.params.id) {
      getMenusById(req.params.id)
        .then((menus) => {
          res.send(menus);
        })
    }
  })

  return router;
}
