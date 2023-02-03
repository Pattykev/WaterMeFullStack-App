/* Replace with your SQL commands */
drop type if exists orderStatus ;
create type orderStatus as ENUM ('active', 'complete');
create table orders(id serial primary key,
id_user bigint references users (id) on delete cascade,
status orderStatus);

