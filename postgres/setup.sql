CREATE DATABASE events;
CREATE TABLE events (id SERIAL PRIMARY KEY, startdate timestamp, enddate timestamp, title varchar(200), city varchar(50), facebooklink varchar(500), image varchar(500), tags varchar(500));

CREATE TABLE users(
   username varchar(20) NOT NULL,
   password varchar(20) NOT NULL,
   enabled boolean NOT NULL DEFAULT FALSE,
   primary key(username)
);

create table user_roles (
  user_role_id SERIAL PRIMARY KEY,
  username varchar(20) NOT NULL,
  role varchar(20) NOT NULL,
  UNIQUE (username,role),
  FOREIGN KEY (username) REFERENCES users (username)
);