-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 19, 2025 at 02:56 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `code_tropa_beta`
--

-- --------------------------------------------------------

--
-- Table structure for table `performance`
--

CREATE TABLE `performance` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `progressId` int(11) NOT NULL,
  `accuracy` int(11) DEFAULT 0,
  `efficiency` int(11) DEFAULT 0,
  `readability` int(11) DEFAULT 0,
  `timeTaken` int(11) DEFAULT 0,
  `success` int(11) DEFAULT 0,
  `failed` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `performance`
--

INSERT INTO `performance` (`id`, `userId`, `progressId`, `accuracy`, `efficiency`, `readability`, `timeTaken`, `success`, `failed`) VALUES
(48, 26, 53, 0, 0, 0, 0, 0, 0),
(49, 26, 54, 0, 0, 0, 0, 0, 0),
(50, 26, 56, 40, 10, 30, 20, 1, 0),
(52, 26, 58, 30, 25, 25, 20, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `progress`
--

CREATE TABLE `progress` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `type` enum('story','challenge') NOT NULL,
  `language` enum('java','c++','c#') NOT NULL,
  `chapter` int(11) DEFAULT NULL,
  `episode` int(11) DEFAULT NULL,
  `difficulty` enum('easy','average','difficult') DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `points` int(11) DEFAULT 0,
  `code` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `progress`
--

INSERT INTO `progress` (`id`, `userId`, `type`, `language`, `chapter`, `episode`, `difficulty`, `level`, `points`, `code`) VALUES
(53, 26, 'story', 'java', 0, 0, NULL, NULL, 0, ''),
(54, 26, 'challenge', 'java', NULL, NULL, '', 0, 0, ''),
(56, 26, 'challenge', 'java', NULL, NULL, 'easy', 1, 100, 'public class TahoVendor {\n    public static void main(String[] args) {\n        System.out.println(\"Tahooo!\");\n        System.out.println(\"Taho: ₱15\");\n        System.out.println(\"Syrup: ₱5\");\n    }\n}'),
(58, 26, 'challenge', 'java', NULL, NULL, 'average', 1, 100, '/* \n * Taho is a beloved Filipino street food made of silken tofu,\n * brown sugar syrup, and sago pearls. Vendors traditionally\n * announce their presence by calling out \"Tahooo!\"\n */\npublic class TahoVendor {\n    public static void main(String[] args) {\n        // Print header\n        System.out.println(\"================\");\n        System.out.println(\"   TAHO MENU\");\n        System.out.println(\"================\");\n        \n        // Print menu items with proper formatting\n        System.out.println(\"Taho:₱15\");\n        System.out.println(\"Syrup:₱5\");\n        \n        // Print footer\n        System.out.println(\"================\");\n    }\n}'),
(59, 26, 'story', 'java', 1, 1, NULL, NULL, 100, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `rewards`
--

CREATE TABLE `rewards` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `language` enum('java','c++','c#') NOT NULL,
  `tier` varchar(10) DEFAULT NULL,
  `badgeName` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rewards`
--

INSERT INTO `rewards` (`id`, `userId`, `language`, `tier`, `badgeName`) VALUES
(51, 26, 'java', 't1', 'b1');

-- --------------------------------------------------------

--
-- Table structure for table `saving`
--

CREATE TABLE `saving` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `language` enum('java','c++','c#') NOT NULL,
  `chapter` int(11) DEFAULT 0,
  `episode` int(11) DEFAULT 0,
  `scene` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `saving`
--

INSERT INTO `saving` (`id`, `userId`, `language`, `chapter`, `episode`, `scene`) VALUES
(36, 26, 'java', 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `programmingLanguage` enum('java','c++','c#') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `programmingLanguage`, `created_at`) VALUES
(26, 'asd', '$2y$10$oCttyq9FuZAnZhf4kxkxtuKH9ynhH/x3Pyhpdd7RxXMuJ5CcrxZkm', 'java', '2025-10-17 23:53:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `performance`
--
ALTER TABLE `performance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `progressId` (`progressId`);

--
-- Indexes for table `progress`
--
ALTER TABLE `progress`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `rewards`
--
ALTER TABLE `rewards`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `saving`
--
ALTER TABLE `saving`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `performance`
--
ALTER TABLE `performance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `progress`
--
ALTER TABLE `progress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `rewards`
--
ALTER TABLE `rewards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `saving`
--
ALTER TABLE `saving`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `performance`
--
ALTER TABLE `performance`
  ADD CONSTRAINT `performance_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `performance_ibfk_2` FOREIGN KEY (`progressId`) REFERENCES `progress` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `progress`
--
ALTER TABLE `progress`
  ADD CONSTRAINT `progress_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `rewards`
--
ALTER TABLE `rewards`
  ADD CONSTRAINT `rewards_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `saving`
--
ALTER TABLE `saving`
  ADD CONSTRAINT `saving_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
