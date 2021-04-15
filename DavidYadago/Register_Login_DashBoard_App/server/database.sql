--Name of BMG Database
CREATE DATABASE bmg;

--Table for storing users registered
CREATE TABLE member(
    member_id SERIAL PRIMARY KEY,
    member_email VARCHAR(255) NOT NULL,
    member_password VARCHAR(255) NOT NULL,
    business_name VARCHAR(255) NOT NULL,
    business_no BIGINT NOT NULL,
    business_phone INT NOT NULL,
    business_state VARCHAR(255) NOT NULL,
    business_city VARCHAR(255) NOT NULL,
    business_address VARCHAR(255) NOT NULL,
    business_postcode INT NOT NULL,
    member_level INT
);

--sample members inserted to member table:
INSERT INTO member (member_email, member_password, business_name, business_no, business_phone,
business_state, business_city, business_address, business_postcode, member_level) VALUES (
    'BMG99@gmail.com', 'password12345', 'BMG', '31432563637', '0267322250', 'New South Wales', 
    'Sydney', '25 ashton st, Oakville NSW 2000', '2000', '1');
)