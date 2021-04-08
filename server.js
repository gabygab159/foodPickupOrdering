// load .env data into process.env
require('dotenv').config();

// Web server config
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 8080;

const database = require('./lib/db');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoute = require("./routes/users-routes");
const menusRoute = require("./routes/menus-routes");
const ordersRoute = require("./routes/orders-routes");
const messagesRoute = require("./routes/messages-routes");
const orderItemsRoute = require("./routes/order-items-routes");
const restaurantRoute = require("./routes/restaurants-routes.js");
const indexRoute = require("./routes/index-routes");
const checkoutRoutes = require('./routes/checkout-routes');
const { render } = require('ejs');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// app.use('/', )
app.use('/users', usersRoute(database));
app.use('/menus', menusRoute(database));
app.use('/orders', ordersRoute(database));
app.use('/messages', messagesRoute(database));
app.use('/order-items', orderItemsRoute(database));
app.use('/restaurants', restaurantRoute(database));
app.use('/checkouts', checkoutRoutes(database));
app.use('/', indexRoute(database));


// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
// app.get("/", (req, res) => {
//   res.render("pages/index");
//   res.render("partials/menu-items", menus)
// });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
