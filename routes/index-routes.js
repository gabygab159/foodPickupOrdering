/*
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


module.exports = (database) => {
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
                        if (!userOrder) {
                          templateVars.orderOpen = userOrder;
                          templateVars.orderActive = userOrder;
                          res.render('pages/index', templateVars);
                        } else {
                          // There is an order to the user with status 1 or 2
                          // if status = 1, get order items
                          templateVars.orderOpenInfo = userOrder.filter(o => o.status === 1);
                          templateVars.orderActiveInfo = userOrder.filter(a => a.status === 2);
                          getOrderItems(user_id)
                            .then((orders) => {
                              let orderActive = false;
                              // if order status = 1 -> show items in the cart
                              // if order status = 2 -> show order info in the message, and messages
                              templateVars.orderOpen = orders.filter(o => o.status === 1);
                              templateVars.orderActive = userOrder.filter(a => a.status === 2 ? a.id : false);
                              res.render('pages/index', templateVars);
                            })
                            .catch((err) => {
                              console.error("Error (getOrderItems): ", err.messages);
                            });
                        }
                      })
                      .catch((err) => {
                        console.error("Error (getOrdersByUserId): ", err.messages);
                      });
                  })
                  .catch((err) => {
                    console.log("Error (getUsersById): ", err.messages);
                  });
              })
              .catch((err) => {
                console.error("Error (getRestaurantById): ", err.messages);
              });

          })
          .catch((err) => {
            console.error("Error (getAddressesById): ", err.messages);
          });
      })
      .catch((err) => {
        res.render('partials/messages', err.messages);
      });
  })

  return router;
};

