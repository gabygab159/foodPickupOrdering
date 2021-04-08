/*
 * All routes for menus are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const express = require('express');
const router  = express.Router();
const { getMenuItems, getMenuItemsById }  = require('../lib/menus-queries');

module.exports = (database) => {
  // GET /menus/
  router.get('/', (req, res) => {
    getMenuItems()
      .then((menus) => {
        const templateVars = { menus };
        res.render("partials/menu-items", templateVars);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  });

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
