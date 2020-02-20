CREATE DATABASE `database23`;


CREATE TABLE `request` (
  `id` int NOT NULL AUTO_INCREMENT,
  `request_date` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
);


CREATE TABLE `company` (
  `id` int NOT NULL AUTO_INCREMENT,
  `symbol` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `market_cap` varchar(45) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `number_of_employees` varchar(45) DEFAULT NULL,
  `date` varchar(45) DEFAULT NULL,
  `open_price` decimal(10,0) DEFAULT NULL,
  `previous_close_price` decimal(10,0) DEFAULT NULL,
  `request_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_company_1_idx` (`request_id`),
  CONSTRAINT `fk_company_1` FOREIGN KEY (`request_id`) REFERENCES `request` (`id`)
);
