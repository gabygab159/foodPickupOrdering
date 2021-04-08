const { sendSMS }= require('./send-sms');



let sam = "+13439964241";
let gaby = "+15149635280";
let jac = "+14372421211";

const phone = sam;
const message = "Testing from twilio helper function";


sendSMS(phone,message)
  .then(r => console.log(r))
  .catch(e => console.error(e));
