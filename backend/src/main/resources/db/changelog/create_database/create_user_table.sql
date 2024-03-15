--liquibase formatted sql

--changeset create_database:1
create table if not exists "User"
(
    id           BIGINT primary key,
    time_created timestamp
);