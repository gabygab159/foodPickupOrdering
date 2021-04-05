require('dotenv').config();

const express = require('express');
const router = express.Router();

const morgan = require('morgan');

const port = process.env.PORT || 8080;
const app = express();

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(port, () => {
  console.log('app listening on port ', port);
});