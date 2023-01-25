# STOREFRONT API BACKEND

##### This is a restful API build in TypeScript for the usage of a frontend developper.
##### The API use Postgresql for storing store informations.
##### The database schema and Endpoint can be found in the Requirement.md file.

## Installation instructions

##### For using this package, you can fork it and installed all dependencies by running `yarn` or `npm install` to get the depencies to run the API.

## Set up database

##### Connect to the default database postgres as the server's root user by running `psql -U postgres`
##### Then create the database user with `CREATE USER fullstack_student with PASSWORD 'fullstack';`
##### Assign fullstack_student user as a superuser `ALTER USER fullstack_student SUPERUSER`
##### Create the databases needed: `CREATE DATABASE store;`  `CREATE DATABASE store_test;`

## Scripts running

##### `npm run start` or `npm run watch` : start the server
##### `npm run build`: build
#####  `npm run lint`: lint
#####  `npm run prettier`: prettier
#####  `npm run dev-up`: migrate up for dev database
#####  `npm run dev-down`: migrate down for dev database
#####  `npm run test-up`: migrate up for test database
#####  `npm run test-down`: migrate up for test database
#####  `npm run test`: for running unit tests






