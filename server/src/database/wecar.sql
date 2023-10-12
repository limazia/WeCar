# Host: localhost  (Version 5.5.5-10.4.13-MariaDB)
# Date: 2022-09-23 22:36:08
# Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "brands"
#

CREATE TABLE `brands` (
  `brand_id` varchar(255) NOT NULL,
  `brand_name` varchar(255) NOT NULL,
  `brand_slug` varchar(255) NOT NULL,
  `updateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`brand_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "brands"
#

INSERT INTO `brands` VALUES ('30c95faf','Mercedes Benz','mercedes-benz','2022-09-04 11:42:28','2022-09-04 11:42:28'),('6385f153','BMW','bmw','2022-09-04 11:42:28','2022-09-04 11:42:28'),('8c35f1d7','Audi','audi','2022-09-04 11:42:28','2022-09-04 11:42:28'),('kaskdswd','Ford','ford','2022-09-14 21:13:51','2022-09-14 21:13:51');

#
# Structure for table "contact"
#

CREATE TABLE `contact` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `updateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "contact"
#


#
# Structure for table "knex_migrations"
#

CREATE TABLE `knex_migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

#
# Data for table "knex_migrations"
#

INSERT INTO `knex_migrations` VALUES (1,'20220903233243_brands.js',1,'2022-09-04 11:39:08'),(2,'20220903233304_models.js',1,'2022-09-04 11:39:09'),(3,'20220903233309_cars.js',1,'2022-09-04 11:39:11'),(4,'20220904000215_users.js',1,'2022-09-04 11:39:11'),(5,'20220904000227_contact.js',1,'2022-09-04 11:39:11'),(6,'20220904000247_proposal.js',1,'2022-09-04 11:39:12');

#
# Structure for table "knex_migrations_lock"
#

CREATE TABLE `knex_migrations_lock` (
  `index` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `is_locked` int(11) DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

#
# Data for table "knex_migrations_lock"
#

INSERT INTO `knex_migrations_lock` VALUES (1,0);

#
# Structure for table "models"
#

CREATE TABLE `models` (
  `model_id` varchar(255) NOT NULL,
  `model_name` varchar(255) NOT NULL,
  `model_slug` varchar(255) NOT NULL,
  `id_brand` varchar(255) NOT NULL,
  `updateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`model_id`),
  KEY `models_id_brand_foreign` (`id_brand`),
  CONSTRAINT `models_id_brand_foreign` FOREIGN KEY (`id_brand`) REFERENCES `brands` (`brand_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "models"
#

INSERT INTO `models` VALUES ('28024549','Audi A5','a5','8c35f1d7','2022-09-04 11:42:28','2022-09-04 11:42:28'),('45d9b8f4','Mercedes-Benz C180','c180','30c95faf','2022-09-04 11:42:28','2022-09-04 11:42:28'),('6fd944f9','BMW 320I','320i','6385f153','2022-09-04 11:42:28','2022-09-04 11:42:28'),('d6e0f978','Audi TT','tt','8c35f1d7','2022-09-04 11:42:28','2022-09-04 11:42:28');

#
# Structure for table "cars"
#

CREATE TABLE `cars` (
  `car_id` varchar(255) NOT NULL,
  `car_km` varchar(255) NOT NULL,
  `car_price` varchar(255) NOT NULL,
  `car_image` varchar(255) NOT NULL,
  `car_fuel` enum('gasoline','flex','diesel','electric','hybrid') DEFAULT NULL,
  `car_exchange` enum('automatic','manual') DEFAULT NULL,
  `car_year` varchar(255) NOT NULL,
  `car_observation` text DEFAULT NULL,
  `id_model` varchar(255) NOT NULL,
  `updateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`car_id`),
  KEY `cars_id_model_foreign` (`id_model`),
  CONSTRAINT `cars_id_model_foreign` FOREIGN KEY (`id_model`) REFERENCES `models` (`model_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "cars"
#

INSERT INTO `cars` VALUES ('40e94f14','84000','300000','https://motorshow.com.br/wp-content/uploads/sites/2/2018/05/9_ms416_audi-tt-rs2-747x420.jpg','gasoline','automatic','2019/2020',NULL,'d6e0f978','2022-09-04 11:42:28','2022-09-04 11:42:28'),('4a115d4c','108080','89000','','gasoline','automatic','2017/2017',NULL,'45d9b8f4','2022-09-20 04:13:40','2022-09-04 11:42:28'),('4ac38535','90000','100000','https://cdn.autopapo.com.br/box/uploads/2021/08/31181151/mercedes-benz-c180-sedan-azul-de-frente-2015.jpg','gasoline','automatic','2017/2017',NULL,'45d9b8f4','2022-09-04 11:42:28','2022-09-04 11:42:28'),('f62b5d47','12000','332000','https://s2.glbimg.com/2xcasOKIj3DtHX9bq126Ge10Pbk=/0x0:1600x1100/600x0/smart/filters:gifv():strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2021/C/L/KEM2XhTiKPgeU33kS4eQ/audi-a5-sportback-2020-1600-01.jpg','gasoline','automatic','2019/2019',NULL,'28024549','2022-09-04 11:42:28','2022-09-04 11:42:28');

#
# Structure for table "users"
#

CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `permissions` text NOT NULL,
  `updateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "users"
#

INSERT INTO `users` VALUES ('0361ddbbcc92022','Acacio de Lima','limadeacacio@gmail.com','$2b$10$sJNlXVuqZxpYD3RuCuZcteArMRfyo/GRP0XlpM7twTIhHC9wAUXXu','admin','2022-09-23 22:26:35','2022-09-05 00:54:02');
