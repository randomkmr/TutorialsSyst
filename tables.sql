CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
email varchar(190) UNIQUE NOT NULL,
password varchar(80) NOT NULL,
reg_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

CREATE TABLE tutorials (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
title TEXT,
content MEDIUMTEXT,
private BOOLEAN NOT NULL DEFAULT 0
)

