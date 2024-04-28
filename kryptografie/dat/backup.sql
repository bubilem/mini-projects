SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Databáze: `krypto`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `attempt`
--

DROP TABLE IF EXISTS `attempt`;
CREATE TABLE IF NOT EXISTS `attempt` (
  `id` mediumint UNSIGNED NOT NULL AUTO_INCREMENT,
  `dttm` datetime NOT NULL,
  `crypto_analyst` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `duration` mediumint UNSIGNED NOT NULL,
  `success` tinyint UNSIGNED NOT NULL DEFAULT '0',
  `message` char(10) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_message` (`message`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `attempt`
--

INSERT INTO `attempt` (`id`, `dttm`, `crypto_analyst`, `duration`, `success`, `message`) VALUES
(1, '2024-04-28 14:28:00', 'John Doe', 25, 0, '2024-B-003'),
(2, '2024-04-28 14:30:00', 'John Doe', 45, 0, '2024-B-003'),
(3, '2024-04-28 14:34:00', 'František Kryptoman', 10, 0, '2024-B-003'),
(4, '2024-04-28 14:35:00', 'John Doe', 15, 1, '2024-B-004'),
(5, '2024-04-28 14:38:00', 'František Kryptoman', 5, 1, '2024-B-003'),
(7, '2024-04-28 14:39:00', 'John Doe', 20, 0, '2024-B-005'),
(8, '2024-04-28 14:45:34', 'Oto Oto', 10, 0, '2024-B-005'),
(9, '2024-04-28 14:48:00', 'František Kryptoman', 15, 1, '2024-B-005');

--
-- Omezení pro exportované tabulky
--

--
-- Omezení pro tabulku `attempt`
--
ALTER TABLE `attempt`
  ADD CONSTRAINT `FK_message` FOREIGN KEY (`message`) REFERENCES `message` (`code`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
