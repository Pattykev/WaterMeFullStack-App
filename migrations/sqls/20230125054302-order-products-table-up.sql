/* Replace with your SQL commands */
create table order_products(
id serial primary key,
quantity integer,
id_order bigint references orders (id) on delete cascade,
id_product bigint references product (id) on delete cascade

);

