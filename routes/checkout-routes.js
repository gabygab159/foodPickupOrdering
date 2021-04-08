require('dotenv').config();

// const pool = require('./db');

const accountSid = process.env.TW_ASID;
const authToken = process.env.TW_ATOK;
const twilio = require('twilio');
const client = new twilio(accountSid, authToken);


const express = require('express');
const router  = express.Router();


const { updateOrderStatus } = require('../lib/checkout_queries')
const  sendSMS  = require('../helper-functions/twilio')

router.use((req, res, next) => {
  console.log('router.checkout has been called');
  next();
})

module.exports = (database) => {
  // GET /checkouts/
  router.get('/', (req, res) => {
    updateOrderStatus(9, 2)
      .then((status) => {
        //We need to send the restaurant with order id
        sendSMS("15149635280", "restaurant order with id")
          .then(res => {
            //send to client initial sms of order # and time
            sendSMS("14372421211", "client order message")
              .then(res=> {
                //set timeout. send client order ready for pickup
                console.log('message sent to client')
                // inject the client phone number and the time
                setTimeout(sendSMS("14372421211", "Order is ready for pickup!"),10000)
              })
              .catch(e=>console.error('did not send to client', e))
            })
          .catch(e => console.error("twilio error",e));
        res.send(status)
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  });

  return router;
}
