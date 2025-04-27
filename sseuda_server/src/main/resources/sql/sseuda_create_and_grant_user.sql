use mysql;

CREATE DATABASE sseudadb;
SHOW DATABASES;

CREATE USER 'sseuda'@'%' IDENTIFIED BY  'sseuda';
SELECT * FROM mysql.user;

GRANT ALL PRIVILEGES ON sseudadb.* TO 'sseuda'@'%';
GRANT SUPER ON *.* TO 'sseuda'@'%';
SHOW GRANTS FOR 'sseuda'@'%';
-- SET GLOBAL log_bin_trust_function_creators = 1;

use sseudadb;