# User Stories

A food ordering experience for a single restaurant. Hungry clients of this fictitious restaurant can visit its website, select one or more dishes and place an order for pick-up. They will receive a notification when their order is ready.

The restaurant and client both need to be notified since this app serves as an intermediary.

When an order is placed the restaurant receives the order via SMS. The restaurant can then specify how long it will take to fulfill it. Once they provide this information, the website updates for the client and also notifies them via SMS.

You can use a modern telecomm API service such as Twilio to implement SMS communication from the website to the client and restaurant.

For inspiration check out how Ritual works, but keep in mind that's implemented as a native app and serves more than one restaurant.

## Restaurant

- Single Restaurant
- Restaurant Info
- Restaurant get notification when order is placed via SMS
- Restaurant specify how long it will take to fulfill the order
  - Website updates the client
  - Client receives a notification (SMS)
- Restaurants has a menu
- Menu search

## Users

- Users can visit the website
- Users can select one or more dishes
- Users place the order
- Users pick up
- Client receives a notification when the order is ready to pick up
- User get notification when order is placed SMS

## Orders

- Order history

## Items to discuss

- Shopping Cart
- Reviews (stretch)
- Payments (stretch)
- Share function (stretch)
- Favourite
- Login/Logout
- Map (to show the time will take for the user to get to the restaurant)

# Database Tables

- users
- restaurants
- orders
- reviews
- menus

# Technologies & Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Twilio API

# Behaviour Requirements (REST)

- Browse  -> GET  -> routes
- Read    -> GET  -> routes
- Edit    -> POST -> routes
- Add     -> POST -> routes
- Delete  -> POST -> routes

# TODO

## Frontend

  - [ ] Style Decisions
  - [ ] Wireframing - (Website mockup)
  - [ ] SPA or MPA

## App Strategies/Requirements

  - [ ] Review User's stories

## Backend
  - [ ] Database Tables
  - [ ] ERD
  - [ ] (DDL) - create the sql files to build the database
  - [ ] Which/review npm modules
  - [ ] Research about Twilio API (*)
