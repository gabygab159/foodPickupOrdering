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

    const order_id = req.body.order_id;
    const prep_time = req.body.prep_time;

    updateOrderStatus(order_id, 2)
      .then((status) => {
        //We need to send the restaurant with order id
        sendSMS("+13439964241", "1st restaurant order with id")
          .then((restaurantMsg) => {
            //send to client initial sms of order # and time
            res.render('pages/index');
            sendSMS("+13439964241", "2nd client order message")
              .then((clientMsg) => {
                //set timeout. send client order ready for pickup
                console.log('3rd message sent to client');
                res.render('pages/index');
                setTimeout(() => {
                  // inject the client phone number and the time
                  sendSMS("+13439964241", "4th Order is ready for pickup!")
                    .then((ready) => {
                      //  inject order number
                      updateOrderStatus(order_id, 0);
                    })
                }, 5000);

              })
              .catch(e => console.error('did not send to client', e));
          })
          .catch(e => console.error("twilio error", e));
        res.send(status);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });


  });

  return router;
};
