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

### GET /:id (/orders/:id)

  - list a specific order with id = :id

### GET /:user_id (/orders/:user_id (stretch)

  - list orders where orders.user_id = :user_id and status = active

### POST /new

  - Is there an order for this user_id with status open?
    - Is there an order with user_id and status open?
    - YES 
      - Perform POST /order_items/new/:order_id/menu_item_id:
      - Update total to the orders table for that specific order
    - NO
      - Add user_id, restaurant_id, date, status to the orders table
        - POST /orders/new/:user_id/:restaurant_id
          - date = new date Now()
          - status = open
      - Perform POST /order_items/:order_id/menu_item_id:
        - quantity
      - Define the status is very important (where status === active means checkout is done)

  - Options for order status
    - open -> cart has items but not checkout
    - active -> cart has items and checked out
    - closed -> order has been fulfilled


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

### POST /update/:order_id (/message/update/:order_id)
  - Notify user via SMS
  - add message to the database
  - change the order status to close


## ORDER_ITEMS

### GET /:order_id (/order_items/:order_id) -> used to show the items inside the cart of a specific order

  - list all items that belongs to orders.id = :order_id

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


- POST -->




OUT
// (link) -> GET /menus/:id to a popup window or to the map/info window section
//  (link) -> GET /menus/:id to a popup window or to the map/info window section
// (link) -> GET /restaurants/:id to a popup window or map/info window section