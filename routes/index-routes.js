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
const { getOrderStatusByUserId, getOrderItems } = require('../lib/orders-queries');
const { render } = require('ejs');

// Router middlewares with no mount path (will be executed on every request to the router)
// router.use((req, res, next) => {
//   console.log('index has been called');
//   //next();
// });

module.exports = (database) => {
  // GET /
  //
  // Get user information
  // Get restaurant information (stretch)
  // Get order information
  // Get messages
  router.get('/', (req, res) => {
    // Getting user information and rendering nav page with user object
    // getUsersById(1)
    //   .then((user) => {
    //     res.render('pages/nav', user);
    //   })
    //   .catch((err) => {
    //     res.render('partials/messages', err.messages);
    //   })
  
    const user_id = 1;

    // Get all dishes from the menu and render menu_items page with all objects from the menu_items table
    getMenuItems()
      .then((menus) => {
        const templateVars = { menus, user_id };
        
        res.render('pages/index', templateVars);
      })
      .catch((err) => {
        res.render('partials/messages', err.messages);
      })

    // Find if there is order with status 1 or 2 for the user
    // If no orders with status 1 or 2
    //    - Render cart as Cart is empty
    //    - Render messages as "No new messages"
    // For orders with status 1 render the cart with order items

    // For orders with status 2 render the message box with the messages related to the order
    getOrderStatusByUserId(user_id)
      .then((userOrder) => {

        if(!userOrder) {
          res.render('pages/index');
        }



      })
      .catch((err) => {
        console.log("Error: ", err.messages);
      })







  })



  return router;
}