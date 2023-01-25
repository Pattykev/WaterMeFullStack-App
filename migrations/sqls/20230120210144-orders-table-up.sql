/* Replace with your SQL commands */
create table orders(id serial primary key,
id_user integer,
status varchar(10),
foreign key (id_user) REFERENCES users(id) on delete cascade on update cascade
);