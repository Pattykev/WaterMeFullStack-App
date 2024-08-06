# WaterMe API BACKEND

 This is a restful API build in TypeScript for the usage of a frontend developper.
 
 The API use Postgresql for storing store informations.
 
 **The database schema and Endpoint** can be found in the [ Waterme-ClassDiagram.png ] ( https://github.com/Pattykev/WaterMeFullStack-App/WaterMe-Backend/Waterme-ClassDiagram.png ) file.

## Install the modules

 For using this package, you must  installed all dependencies by running `yarn ` or `npm install`  to run the API.

## Database Set up 

Docker didn't work on my computer so i used a local database.

Connect to the default database postgres as the server's root user by running `psql -U postgres`

The database will run on port **5432**
 
**Then create the database user with** `CREATE USER fullstack_student with PASSWORD 'fullstack';`

 **Create the databases needed:** `CREATE DATABASE waterplants_db;`  `CREATE DATABASE waterplants_db_test;`
 
 **Assign fullstack_student user privileges on the two tables**: `GRANT ALL PRIVILEGES ON DATABASE waterplants_db TO fullstack_student ` `GRANT ALL PRIVILEGES ON DATABASE water_db_test TO fullstack_student `
 
 ## Setting up environment

 Inside the repository's main directory, create a text file named `.env ` that will hold the configuration. The file should look like this:
```
    POSTGRES_HOST=127.0.0.1
    POSTGRES_DB=waterplants_db
    POSTGRES_USER=fullstack_student
    POSTGRES_PASSWORD=fullstack
    POSTGRES_TEST_DB=waterplants_db_test
    ENV=test
    BCRYPT_PASSWORD=Patricia_2103
    SALT_ROUNDS=10
    TOKEN_SECRET=information2
 
````
If the variable ENV has the value test, the waterplants_db_test will be used instead of waterplants_db.

## Server running

  `npm run start` or `npm run watch` : run the server at the **port 3000** if the variable ENV has the value dev so you you can access the localhost server by the **URL** [ http://localhost:3000]() which show you a greeting message and if the variable ENV has the value test the server will listen at **port 3001** and the **URL** will be  [ http://localhost:3001]() 

 
 ## Scripts running

  `npm run build`: build
  
  `npm run lint`: lint
  
  `npm run prettier`: prettier

  ## Scripts for managing tables of the databases
  
  `npm run dev-up`: migrate up (creating tables for the database storefront_db) for dev database
  
  `npm run dev-down`: migrate down  (deleting tables for the database storefront_db) for dev database
  
  `npm run test-up`: migrate up  (creating tables for the database storefront_db_test) for test database
  
  `npm run test-down`: migrate up  (deleting tables for the database storefront_db) for test database

   ## Script to run the automated tests
  
  `npm run test`: for running unit tests

  ## API Routes

 ### User Routes
     
 - [GET] [ http://localhost:3000/user]() to show all the users registrered
 - [GET] [ http://localhost:3000/user/:id]() to show a particular user registrered with the `id`
 - [POST ][ http://localhost:3000/user/authenticate]() to authenticate an user 
 - [POST] [ http://localhost:3000/user/create]() to create an user with his **username**, **firstname**, **lastname** and **password**
 - [PUT] [ http://localhost:3000/user/update/:id]() to update user's informations registrered
 - [DELETE] [ http://localhost:3000/user/:id]() to remove an user registrered

 ### Product Routes
     
 - [GET] [ http://localhost:3000/product]() to show all the products registrered
 - [GET] [ http://localhost:3000/product/:id]() to show a particular product registrered with the `id` 
 - [POST] [ http://localhost:3000/product/create]() to create a product with his **name**, **price** and **category**
 - [PUT] [ http://localhost:3000/product/update/:id]() to update product's informations registrered
 - [DELETE] [ http://localhost:3000/product/:id]() to remove a product registrered

 ### Order Routes
   
 - [GET] [ http://localhost:3000/order/:id]() to show a particular order registrered with the `id` user 
 - [POST] [ http://localhost:3000/order/create]() to create a order with his **id_user**, **status**, **id_product** and **quantity**
 
 
     













