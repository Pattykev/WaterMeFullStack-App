/* Replace with your SQL commands */
create table plants(
    id serial primary key,
    name varchar(123),
    species varchar(123),
    image BYTEA,
    quantity varchar(123),
    frequency varchar(123),
    watered boolean,
    id_user bigint references users (id) on delete cascade

);