# Behaviour Requirements

## APP

### GET /
<!-- Page behaviour -->
- Load header
- Load left section (menu items) -> GET /menus
- Load right section (info/map/cart) -> GET /orders 

<!-- Left Menu Tiles behaviour -->
- return HTML with:
  - Site header
  - Map / Info
  - Dishes menu tiles -> GET /menus
    - Each tile has:
      - Item picture / logo
      - Item name
      - Item description
      - Restaurant name 
      - Item price
      - Buy/Add to order button (depends on user status - logged in or not, see below) 

- Load right section (info/map/cart) -> GET /orders 
  - if user is logged in:
    - if there is an order with status active for the user
      - right top -> (cart) GET /orders/:user_id
      - right bottom ->  GET /messages/:user_id
    - if there is an order with status open
      - Add to Cart button -> POST /orders/new/:menu_item_id
    - if there is no order (order status !== active || order status !== open ) show a message "Your cart is empty"

  - if user is not logged in
    - if there is no order sow a message "No new messages"
    - Add to Cart button -> redirect to /login (GET /login)



## MENUS

### GET / -> (/menus)

  - list the menu items where each item will be a tile on the left side of the main page

### GET /:id (/menus/:id)

  - list menu_items id


## RESTAURANTS

### GET / (/restaurants)

  - list all restaurants

### GET /:id (/restaurants/:id)

  - list the restaurant with :id


## ORDERS

### GET / (/orders)

  - list all orders

### GET /:id (/orders/:id) -> don't need now.

  - list a specific order with id = :id

### GET /:user_id (/orders/:user_id

  - list orders and order items where:
    - orders.user_id = user_id (req.params.id)
    - and status = active(2) or status = open(1)
    - order_items.order_id = orders.id

<!-- Get the order item
### GET /:order_id (/order_items/:order_id) -> used to show the items inside the cart of a specific order

  - list all items that belongs to orders.id = :order_id -->

<!-- /orders/new -->
### POST /new -> when the user click on the *add to cart button* from the menu

  - Is there an order for this user_id with status open?
    - YES 
      <!-- - Update the right side with the order information
        - order number (order id)
        - order item
        - current total -->
      - Perform POST /new/item/:order_id/menu_item_id: (/orders/new/item)
      - Update total to the orders table for that specific order
      - add tax (stretch)
    - NO
      - To create a new order we need:
        - user_id                   -> orders table
        - menu_items.restaurant_id  -> orders table
        - menu_items.id             -> order_items table
        - menu_item.price           -> order_items table
        - menu_item.prep            -> it will be calculated on the fly to set the time for setTimeout callback function
        - provide quantity          -> order_items -> set 1 by default
        - provide date              -> orders table
        - provide status            -> orders table -> open(1)
      - When we have the data, what do we do?
        - "Create the order" -> a function?
        - Perform POST /order_items/:order_id/menu_item_id: <!-- res.render(/new/item/:order_id/menu_item_id:) -->
      - Define the status is very important (where status === active means checkout is done)
### POST /update/:order_id (/message/update/:order_id)
  - Notify user via SMS
  - add message to the database
  - change the order status to close

  - Options for order status
    - (0) closed -> order has been fulfilled
    - (1) open -> cart has items but not checkout
    - (2) active -> cart has items and checked out

### POST /items/delete/:item_id
### POST /checkout




## MESSAGES

### GET / (/messages)

  - list all messages (?)

### GET /:id

  - list a message with id = :id

### GET /:order_id -> (/messages/:order_id)

  - list all messages with messages.order_id = :order_id (when order is active)

### POST /new/:order_id (/messages/new/:order_id) (checkout)

  - Change order status to active
  - Notify restaurant via SMS 
  - add message to the db
  - Calculate time to fullfil the order based on the item prep_time value
    - setTimeout with callback
        - to send SMS to the user 
        - POST /messages/update/:order_id

## ORDER_ITEMS
<!-- 
### GET /:order_id (/order_items/:order_id) -> used to show the items inside the cart of a specific order

  - list all items that belongs to orders.id = :order_id -->

### POST /delete/:order_id/:menu_item_id (stretch?)



<!-- 
### GET /:id

  - if user is logged in:
    - return HTML with:
      - Site header
      - Map / Info
      - Dishes menu tiles
        - Each tile has:
          - Item picture / logo
          - Item name (link) -> GET /menus/:id to a popup window or to the map/info window section
          - Restaurant name (link) -> GET /restaurants/:id to a popup window or map/info window section
          - Buy/Add to order button -> /POST/orders/new/

  - if user is not logged in:


- POST 

OUT
// (link) -> GET /menus/:id to a popup window or to the map/info window section
//  (link) -> GET /menus/:id to a popup window or to the map/info window section
// (link) -> GET /restaurants/:id to a popup window or map/info window section

-->
