CREATE DATABASE wetbat;

\c wetbat

CREATE TABLE airport(
    id SERIAL PRIMARY KEY,
    city VARCHAR(100),
    code VARCHAR(5)
);

CREATE TABLE transportation(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE quote(
    id SERIAL PRIMARY KEY,
    departureId INT NULL,
    destinationId INT NULL,
    departureDate DATE NOT NULL,
    returnDate DATE NOT NULL,
    noOfTravelers INT NULL,
    transportationId INT NULL,
    fname VARCHAR(100) NOT NULL,
    lname VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NULL,
    email VARCHAR(50) NULL,
    price DECIMAL NULL,
    status VARCHAR(10) NOT NULL,
    CONSTRAINT fk_departureAirport
      FOREIGN KEY(departureId) 
	  REFERENCES airport(id),
    CONSTRAINT fk_destinationAirport
      FOREIGN KEY(destinationId) 
	  REFERENCES airport(id),
    CONSTRAINT fk_transportation
      FOREIGN KEY(transportationId) 
	  REFERENCES transportation(id)
);

