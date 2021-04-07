/*
 * All routes for Manus are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const express = require('express');
const router  = express.Router();

const { getMenuItems }  = require('../lib/menus-queries');
const { getRestaurants } = require('../lib/restaurants-queries');
const { getMessages, getMessagesById, getMessagesByOrderId } = require('../lib/messages-queries');
const { getUsersById } = require('../lib/users-queries');
const { render } = require('ejs');

// Router middlewares with no mount path (will be executed on every request to the router)
// router.use((req, res, next) => {
//   console.log('index has been called');
//   //next();
// });

module.exports = (database) => {
  // GET /
  router.get('/', (req, res) => {
    // Getting user information and rendering nav page with user object
    // getUsersById(1)
    //   .then((user) => {
    //     res.render('pages/nav', user);
    //   })
    //   .catch((err) => {
    //     res.render('partials/messages', err.messages);
    //   })
  
    // Get all dishes from the menu and render menu_items page with all objects from the menu_items table
    getMenuItems()
      .then((menus) => {
        const templateVars = { menus };
        res.render('pages/index', templateVars);
      })
      .catch((err) => {
        res.render('partials/messages', err.messages);
      })
  })

  return router;
}