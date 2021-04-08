const express = require('express');
const router = express.Router();

const { updateOrderStatus } = require('../lib/checkout_queries')
const { sendSMS } = require('../helper-functions/send-sms')

router.use((req, res, next) => {
  console.log('router.checkout has been called');
  next();
});

module.exports = (database) => {
  // post /checkout/
  router.post('/', (req, res) => {

    console.log("DATA COMING FROM THE CHECKOUT: ", req.body);
    // res.send(req.body);
    // checkout form send this
    // {
    //   user_id: "1",
    //   order_id: "7",
    //   restaurant_id: "1",
    //   total: "2373",
    //   prep_time: "12"
    // }

  // GET /checkouts/

    const order_id = req.body.order_id;
    const prep_time = req.body.prep_time;

    updateOrderStatus(order_id , 2)
      .then((status) => {
        //We need to send the restaurant with order id
        sendSMS("+15149635280", `A new order has been placed. Order # ${order_id}`)
          .then(res => {
            //send to client initial sms of order # and time
            sendSMS("+15149635280", `We have received your order. It will be ready to pickup in ${prep_time} minutes`)
              .then(res => {
                //set timeout. send client order ready for pickup
                console.log('message sent to client');
                setTimeout(() => {
                  // inject the client phone number and the time
                  sendSMS("+15149635280", `Order ${order_id} is ready for pickup!`);
                  //  inject order number
                  updateOrderStatus(order_id, 0);
                }, prep_time*1000);
              })
              .catch(e => console.error('did not send to client', e));
          })
          .catch(e => console.error("twilio error", e));
        res.redirect('/')
        res.send(status);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });


  });

  return router;
};


