const express = require('express');
const router  = express.Router();
const { getRestaurants, getRestaurantById }  = require('../lib/restaurants-queries');

// Router middlewares with no mount path (will be executed on every request to the router)
router.use((req, res, next) => {
  console.log('router.restaurants has been called');
  next();
});

module.exports = (database) => {
  // GET /restaurants/
  router.get('/', (req, res) => {
    getRestaurants()
      .then((restaurant) => {
        res.send(restaurant);
      })
      .catch((err) => {
        return err.messages;
      });
  });

  // GET /restaurants/:id
  router.get('/:id', (req, res) => {
    if (req.params.id) {
      getRestaurantById(req.params.id)
        .then((restaurant) => {
          res.send(restaurant);
        })
        .catch((err) => {
          res.send(err.messages);
        })
    }
  });

  return router;
};