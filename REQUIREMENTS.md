# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index: `GET /product`
- Show:`GET /product/:id`
- Create [token required] : `POST /product/create`
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]: ` GET /user`
- Show [token required] : ` GET /user/:id`
- Create N[token required]: `POST /user/create`

#### Orders
- Current Order by user (args: user id)[token required]: `GET /order/:id`
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category



#### User
- id
- firstName
- lastName
- password


#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)


 ## Database schema

 ` product( id serial primary key,name varchar(123),price integer,category varchar(123));`

 ` users (id serial primary key,username varchar(123),firstname varchar(123),lastname varchar(123),password varchar(123));`

 ` orders (id serial primary key,id_user REFERENCES users(id),status enum('activate' , 'complete'));`

` order_products(id serial primary key,quantity integer,id_order REFERENCES orders(id),id_product REFERENCES product(id) );`

 





