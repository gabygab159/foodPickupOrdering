require('dotenv').config();

const accountSid = process.env.TW_ASID;
const authToken = process.env.TW_ATOK;

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

const sendSMS = (phone, message) => {

  return client.messages.create({
      body: message,
      to: phone,  // Text this number
      from: '+18142088997' // From a valid Twilio number
  })
  .then((message) => {
    return message.sid
  })
  .catch((err) => {
    return err.message
  })

}

module.exports = sendSMS;