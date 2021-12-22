CREATE TABLE `parkinglevels` IF NOT EXISTS (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `parkinglotId` bigint NOT NULL,
  `level` bigint NOT NULL,
  `capacity` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `parkinglotId` (`parkinglotId`),
  CONSTRAINT `parkinglevels_ibfk_1` FOREIGN KEY (`parkinglotId`) REFERENCES `parkinglots` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;


CREATE TABLE `parkinglots` IF NOT EXISTS (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `level` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `parkingspots` IF NOT EXISTS (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `parkingId` bigint DEFAULT NULL,
  `label` varchar(255) NOT NULL,
  `status` enum('available','booked','maintiance') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `parkingId` (`parkingId`),
  KEY `parkingspots_status` (`status`),
  CONSTRAINT `parkingspots_ibfk_1` FOREIGN KEY (`parkingId`) REFERENCES `parkinglevels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `reservations` IF NOT EXISTS (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `spotId` bigint DEFAULT NULL,
  `vehicleId` varchar(255) NOT NULL,
  `entryDateTime` datetime NOT NULL,
  `exitDateTime` datetime DEFAULT NULL,
  `fee` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reservations_vehicle_id_exit_date_time` (`vehicleId`,`exitDateTime`),
  KEY `spotId` (`spotId`),
  KEY `reservations_vehicle_id` (`vehicleId`),
  CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`spotId`) REFERENCES `parkingspots` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


