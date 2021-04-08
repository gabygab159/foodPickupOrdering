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
const { getOrdersByUserId, getOrderStatusByUserId, getOrderItems } = require('../lib/orders-queries');
const { getRestaurantById } = require('../lib/restaurants-queries');
const { getAddressesById } = require('../lib/address-queries');
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
  
    const user_id = 1;
    const restaurant_id = 1;

    // Get all dishes from the menu and render menu_items page with all objects from the menu_items table
    getMenuItems()
      .then((menus) => {
        const templateVars = { menus, user_id };
        
        getAddressesById(restaurant_id)
        .then((address) => {
          templateVars.addresses = address;



          getRestaurantById(restaurant_id)
          .then((restaurant) => {

            templateVars.restaurants = restaurant;

            getUsersById(user_id) 
            .then((users) => {
              templateVars.users = users;

              getOrdersByUserId(user_id)
                .then((userOrder) => {
                  // if we get the menu items
                  // we check if there are orders for the user
                  console.log("getOrdersByUserId inside index-route.js: ", userOrder);
                  if(!userOrder) {
                    //console.log("USERORDER (no orders for the user): ", userOrder);
                    //orderItems = [];
                    templateVars.orderOpen = userOrder;
                    templateVars.orderActive = userOrder;
                    res.render('pages/index', templateVars);
                  } else {
                    //console.log(">>>>>>USERORDER EXIST: ", userOrder);
                    // There is an order to the user with status 1 or 2
                    // if status = 1, get order items
                    //console.log("USER ORDERS BEFORE GETTING ITEMS: ", userOrder);
                    templateVars.orderOpenInfo = userOrder.filter(o => o.status === 1);
                    templateVars.orderActiveInfo = userOrder.filter(a => a.status === 2);
                    getOrderItems(user_id)
                    .then((orders) => {
                      let orderActive = false;                   
                      // if order status = 1 -> show items in the cart
                      // if order status = 2 -> show order info in the message, and messages
                      templateVars.orderOpen = orders.filter(o => o.status === 1); // This variable needs to be renamed to orderOpenItems
                      templateVars.orderActive = userOrder.filter(a => a.status === 2 ? a.id : false); // This variable need to be renamed to orderActiveItem
                      res.render('pages/index', templateVars);
                    })
                    .catch((err) => {
                      console.error("Error (getOrderItems): ", err.messages);
                    })
                  }
                })
                .catch((err) => {
                  console.error("Error (getOrdersByUserId): ", err.messages);
                })
            })
            .catch((err) => {
              console.log("Error (getUsersById): ", err.messages);
            })
          })
          .catch((err) => {
            console.error("Error (getRestaurantById): ", err.messages);
          })
        })
        .catch((err) => {
          console.error("Error (getAddressesById): ", err.messages);
        })
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
 
  })
  return router;
}

