/* CREATE ROLE chef WITH SUPERUSER LOGIN PASSWORD 'chef_pass'; */

/* ALTER ROLE chef SUPERUSER;  */


CREATE ROLE postgres WITH LOGIN PASSWORD 'root';
ALTER ROLE postgres SUPERUSER;


/*
CREATE TABLE Users (
    id INT PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    avatar VARCHAR(255),
    jwt VARCHAR(255),
    id42 INT
);
*/
