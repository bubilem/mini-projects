--
-- Struktura tabulky `message`
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE IF NOT EXISTS `message` (
  `code` char(10) COLLATE utf8mb4_general_ci NOT NULL,
  `dttm` datetime NOT NULL,
  `gps` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `content` text COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Omezení pro tabulku `attempt`
--
ALTER TABLE `attempt`
  ADD CONSTRAINT `FK_message` FOREIGN KEY (`message`) REFERENCES `message` (`code`) ON DELETE CASCADE ON UPDATE CASCADE;


