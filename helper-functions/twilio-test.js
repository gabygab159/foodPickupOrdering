const sendSMS = require('./twilio');

const phone = "+15149635280";
const message = "Testing from twilio helper function AGAIN";

sendSMS(phone,message)
  .then(r => console.log(r))
  .catch(e => console.error(e));
