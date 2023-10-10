CREATE ROLE chef WITH SUPERUSER LOGIN PASSWORD 'chef_pass';

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

/*

pgsql  | running bootstrap script ... ok
pgsql  | performing post-bootstrap initialization ... 2023-10-10 11:43:44.360 UTC [40] 


FATAL:  zero-length delimited identifier at or near """" at character 12
[40] STATEMENT:  ALTER USER ""postgres"" WITH PASSWORD E'"root"';

pgsql  | 	
pgsql  | child process exited with exit code 1
pgsql  | initdb: removing contents of data directory "/var/lib/postgresql/data"


*/