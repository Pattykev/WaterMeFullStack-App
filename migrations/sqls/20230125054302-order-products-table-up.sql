/* Replace with your SQL commands */
create table order_products(
id serial primary key,
quantity integer,
id_order bigint references orders (id),
id_product bigint references product (id)

);

