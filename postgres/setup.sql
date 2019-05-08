CREATE DATABASE events;
CREATE TABLE events (id SERIAL PRIMARY KEY, startdate timestamp, enddate timestamp, title varchar(200), city varchar(50), facebooklink varchar(500), image varchar(500), tags varchar(500));
