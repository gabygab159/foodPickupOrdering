const express = require('express');
const router  = express.Router();
const { getRestaurants, getRestaurantById }  = require('../lib/restaurants-queries');

// Router middlewares with no mount path (will be executed on every request to the router)
router.use((req, res, next) => {
  console.log('router.menus has been called');
  next();
});

module.exports = (database) => {
  // GET /menus/
  router.get('/', (req, res) => {
    getRestaurants()
      .then((restaurant) => {
        res.send(restaurant);
      })
      .catch((err) => {
        return err.messages;
      });
  });

  // GET /menus/:id
  router.get('/:id', (req, res) => {
    if (req.params.id) {
      getRestaurantById(req.params.id)
        .then((menus) => {
          res.send(menus);
        })
        .catch((err) => {
          res.send(err.messages);
        })
    }
  });

  return router;
};
