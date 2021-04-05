require('dotenv').config();

const express = require('express');
const router = express.Router();

const morgan = require('morgan');
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const database   = require('./lib/db');

const port = process.env.PORT || 8080;
const app = express();

app.use(morgan('dev'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));





app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(port, () => {
  console.log('app listening on port ', port);
});