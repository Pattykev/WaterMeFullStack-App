/* Replace with your SQL commands */
create table order_products(
id serial primary key,
quantity integer,
id_order integer,
id_product integer,
foreign key (id_order) REFERENCES orders(id) on delete cascade on update cascade,
foreign key (id_product) REFERENCES product(id) on delete cascade on update cascade
);

