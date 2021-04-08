const express = require('express');
const router = express.Router();

const { updateOrderStatus } = require('../lib/checkout-queries');
const { sendSMS } = require('../helper-functions/send-sms');

router.use((req, res, next) => {
  console.log('router.checkout has been called');
  next();
});

module.exports = (database) => {
  // post /checkout/
  router.post('/', (req, res) => {

    const order_id = req.body.order_id;
    const prep_time = req.body.prep_time;

    updateOrderStatus(order_id , 2)
      .then((status) => {
        // Sends SMS to restaurant with order info
        sendSMS("+15149635280", `A new order has been placed. Order # ${order_id}`)
          .then(res => {
            // Send SMS to client with order preparation time
            sendSMS("+15149635280", `We have received your order. It will be ready to pickup in ${prep_time} minutes`)
              .then(res => {
                setTimeout(() => {
                  // Sends SMS to client and closes orders
                  sendSMS("+15149635280", `Order ${order_id} is ready for pickup!`);
                  updateOrderStatus(order_id, 0);
                }, prep_time * 1000);
              })
              .catch(e => console.error('did not send to client', e));
          })
          .catch(e => console.error("twilio error", e));
        res.redirect('/');
        res.send(status);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  });

  return router;
};


