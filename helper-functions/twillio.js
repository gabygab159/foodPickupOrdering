const accountSid = process.env.W_ASID;
const authToken = process.env.TW_ATOK;

// const accountSid = 'AC65939d6e2b5b22881ef863c35dbd0659'; // Your Account SID from www.twilio.com/console
// const authToken = '2de8609dd4a14b29307c4215ee108a99';   // Your Auth Token from www.twilio.com/console

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);


const sendSMS = (phone, message) => {

  return client.messages.create({
      body: 'Teste from Sam using Twilio',
      to: '+14372421211',  // Text this number
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