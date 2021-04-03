# Behaviour Requirements

## APP

### GET /

- if user is logged in:
  - redirect to /
    - Load header
    - Load left section (menu items) -> GET /menus
    - Load right section (info/map/cart) -> GET / ?
 
    - if user is logged in:
        - return HTML with:
          - Site header
          - Map / Info
          - Dishes menu tiles -> GET /menus
            - Each tile has:
              - Item picture / logo
              - Item name (link) -> GET /menus/:id to a popup window or to the map/info window section
              - Restaurant name (link) -> GET /restaurants/:id to a popup window or map/info window section
              - Buy/Add to order button -> /POST/orders/new/

- if user is not logged in:
  - redirect to /login

## MENUS

### GET / -> (/menus)

  - list the menu items where each item will be a tile on the left side of the main page
    - Dishes menu tiles -> GET /menus
      - Each tile has:
        - Item picture / logo
        - Item name (link) -> GET /menus/:id to a popup window or to the map/info window section
        - Restaurant name (link) -> GET /restaurants/:id to a popup window or map/info window section
        - Buy/Add to order button -> /POST/orders/new/menu_item/:id


### RESTAURANTS


### ORDERS


### USERS





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