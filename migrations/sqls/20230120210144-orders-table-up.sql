/* Replace with your SQL commands */
drop type if exists orderStatus ;
create type orderStatus as enum('active', 'complete');
create table orders(id serial primary key,
quantity integer,
status orderstatus,
id_user bigint REFERENCES users(id),
id_product bigint REFERENCES product(id)
);