const express = require('express');
const router  = express.Router();

const { updateOrderStatusByOrder } = require('../lib/checkout_queries')
router.use((req, res, next) => {
  console.log('router.checkout has been called');
  next();
})

module.exports = (database) => {
  // GET /checkouts/
  router.post('/', (req, res) => {
    updateOrderStatusByOrder(9, 1)
      .then((status) => {
        res.send(status)
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  });


  return router;
}
