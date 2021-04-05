const sendSMS = require('./twilio');

const phone = "+13439964241";
const message = "Testing from twilio helper function";

sendSMS(phone,message)
  .then(r => console.log(r))
  .catch(e => console.error(e));