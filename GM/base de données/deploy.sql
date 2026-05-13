-- ============================================
-- SCRIPT DE DÉPLOIEMENT - Gestion GamesMaster
-- ============================================

CREATE DATABASE IF NOT EXISTS `gestion_gamesmaster` 
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `gestion_gamesmaster`;

-- ============================================
-- TABLE: produits
-- ============================================
CREATE TABLE IF NOT EXISTS `produits` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nom` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `prix` DECIMAL(10,2) DEFAULT 0,
  `stock` INT DEFAULT 0,
  `categorie` VARCHAR(100),
  `image` VARCHAR(500),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- TABLE: groupes
-- ============================================
CREATE TABLE IF NOT EXISTS `groupes` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `type` VARCHAR(50),
  `status` VARCHAR(50) DEFAULT 'actif',
  `gold` INT DEFAULT 0,
  `blueGold` INT DEFAULT 0,
  `missions` INT DEFAULT 0,
  `locations` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- TABLE: notes
-- ============================================
CREATE TABLE IF NOT EXISTS `notes` (
  `id` VARCHAR(50) PRIMARY KEY,
  `groupId` VARCHAR(50),
  `title` VARCHAR(255),
  `content` TEXT,
  `date` DATETIME,
  FOREIGN KEY (`groupId`) REFERENCES `groupes`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- TABLE: gives
-- ============================================
CREATE TABLE IF NOT EXISTS `gives` (
  `id` VARCHAR(50) PRIMARY KEY,
  `groupId` VARCHAR(50),
  `amount` INT DEFAULT 0,
  `reason` TEXT,
  `status` VARCHAR(50) DEFAULT 'pending',
  `date` DATETIME,
  FOREIGN KEY (`groupId`) REFERENCES `groupes`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- TABLE: revs (revendications)
-- ============================================
CREATE TABLE IF NOT EXISTS `revs` (
  `id` VARCHAR(50) PRIMARY KEY,
  `groupId` VARCHAR(50),
  `title` VARCHAR(255),
  `content` TEXT,
  `date` DATETIME,
  FOREIGN KEY (`groupId`) REFERENCES `groupes`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- FIN DU SCRIPT
-- ============================================
