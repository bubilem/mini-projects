-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1:3306
-- Vytvořeno: Úte 31. kvě 2022, 11:06
-- Verze serveru: 8.0.27
-- Verze PHP: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `flights`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `airport`
--

DROP TABLE IF EXISTS `airport`;
CREATE TABLE IF NOT EXISTS `airport` (
  `code` char(3) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Vypisuji data pro tabulku `airport`
--

INSERT INTO `airport` (`code`, `name`) VALUES
('BRQ', 'Brno'),
('CDG', 'Paris Charles de Gaulle Airport'),
('CIA', 'Rome Ciampino'),
('DBV', 'Dubrovnik'),
('LGW', 'London Gatwick'),
('PRG', 'Letiště Václava Havla'),
('VDF', 'Varnsdorf international airport');

-- --------------------------------------------------------

--
-- Struktura tabulky `flight`
--

DROP TABLE IF EXISTS `flight`;
CREATE TABLE IF NOT EXISTS `flight` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `code` varchar(7) NOT NULL,
  `from_dttm` timestamp NOT NULL,
  `from_airport_code` char(3) NOT NULL,
  `to_dttm` timestamp NOT NULL,
  `to_airport_code` char(3) NOT NULL,
  `gate_code` char(3) DEFAULT NULL,
  `state` char(3) NOT NULL DEFAULT 'DEF',
  PRIMARY KEY (`id`),
  KEY `fk_flight_airport_idx` (`from_airport_code`),
  KEY `fk_flight_airport1_idx` (`to_airport_code`),
  KEY `fk_flight_gate1_idx` (`gate_code`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3;

--
-- Vypisuji data pro tabulku `flight`
--

INSERT INTO `flight` (`id`, `code`, `from_dttm`, `from_airport_code`, `to_dttm`, `to_airport_code`, `gate_code`, `state`) VALUES
(1, 'OK 1234', '2022-05-30 08:11:00', 'PRG', '2022-05-30 12:00:00', 'CIA', 'A01', 'DEF'),
(2, 'OK 3214', '2022-05-31 08:13:02', 'PRG', '2022-05-30 08:50:00', 'LGW', 'A01', 'DEF'),
(3, 'HY 4578', '2022-05-30 12:00:00', 'PRG', '2022-05-30 14:13:00', 'LGW', 'A02', 'DEF'),
(4, 'LH 4571', '2022-06-07 10:00:00', 'PRG', '2022-05-30 11:20:00', 'LGW', 'B01', 'DEF'),
(5, 'OK 222', '2022-06-08 08:20:00', 'LGW', '2022-06-08 12:00:00', 'PRG', 'A01', 'DEF'),
(7, 'OK 321', '2022-06-09 10:00:00', 'PRG', '2022-06-09 11:00:00', 'CIA', 'A01', 'DEF'),
(8, 'LH 4571', '2022-06-06 10:00:00', 'PRG', '2022-06-06 11:20:00', 'CDG', 'A02', 'DEF'),
(9, 'OK 222', '2022-06-15 08:20:00', 'CDG', '2022-06-15 12:00:00', 'PRG', 'B01', 'DEF'),
(10, 'HY 4578', '2022-05-30 12:10:00', 'PRG', '2022-05-30 14:23:00', 'VDF', 'A02', 'DEF'),
(11, 'HY 4578', '2022-05-30 13:15:00', 'PRG', '2022-05-30 15:23:00', 'CIA', 'B02', 'DEF'),
(12, 'OK 6578', '2022-05-30 13:25:00', 'PRG', '2022-05-30 13:55:00', 'VDF', 'B01', 'DEF'),
(13, 'OK 7800', '2022-05-30 13:40:00', 'PRG', '2022-05-30 15:40:00', 'CDG', 'A02', 'DEF'),
(14, 'OK 7112', '2022-05-30 13:45:00', 'PRG', '2022-05-30 14:10:00', 'VDF', 'B02', 'DEF'),
(15, 'LH 0015', '2022-05-30 14:50:00', 'PRG', '2022-05-30 15:10:00', 'LGW', 'A02', 'DEF'),
(16, 'LH 0022', '2022-05-30 15:00:00', 'PRG', '2022-05-30 16:50:00', 'LGW', 'A01', 'DEF'),
(17, 'OK 007', '2022-05-30 15:05:00', 'PRG', '2022-05-30 16:20:00', 'VDF', 'B01', 'DEF'),
(18, 'LH 1122', '2022-05-30 15:22:00', 'PRG', '2022-05-30 18:20:00', 'CIA', 'A02', 'DEF'),
(19, 'LH 4211', '2022-05-30 18:00:00', 'PRG', '2022-05-30 19:00:00', 'BRQ', 'B01', 'DEF');

-- --------------------------------------------------------

--
-- Struktura tabulky `gate`
--

DROP TABLE IF EXISTS `gate`;
CREATE TABLE IF NOT EXISTS `gate` (
  `code` char(3) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Vypisuji data pro tabulku `gate`
--

INSERT INTO `gate` (`code`, `description`) VALUES
('A01', NULL),
('A02', NULL),
('B01', NULL),
('B02', NULL);

--
-- Omezení pro exportované tabulky
--

--
-- Omezení pro tabulku `flight`
--
ALTER TABLE `flight`
  ADD CONSTRAINT `fk_flight_airport` FOREIGN KEY (`from_airport_code`) REFERENCES `airport` (`code`),
  ADD CONSTRAINT `fk_flight_airport1` FOREIGN KEY (`to_airport_code`) REFERENCES `airport` (`code`),
  ADD CONSTRAINT `fk_flight_gate1` FOREIGN KEY (`gate_code`) REFERENCES `gate` (`code`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
