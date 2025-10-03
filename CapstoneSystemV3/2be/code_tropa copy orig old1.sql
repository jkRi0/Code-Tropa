-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 03, 2025 at 08:40 AM
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
-- Database: `code_tropa`
--

-- --------------------------------------------------------

--
-- Table structure for table `performance`
--

CREATE TABLE `performance` (
  `id` INT NOT NULL,
  `userId` INT NOT NULL,
  `progressId` INT NOT NULL,
  `accuracy` JSON DEFAULT '0',
  `efficiency` JSON DEFAULT '0',
  `readability` JSON DEFAULT '0',
  `time` JSON DEFAULT '0',
  `success` JSON DEFAULT '0',
  `failed` JSON DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `performance`
--

INSERT INTO `performance` (`id`, `userId`, `progressId`, `accuracy`, `efficiency`, `readability`, `time`, `success`, `failed`) VALUES
(3, 4, 2, 0, 0, 0, 0, 0, 0),
(22, 26, 35, 0, 0, 0, 0, 0, 0),
(23, 26, 36, 0, 0, 0, 0, 0, 0),
(24, 26, 37, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `progress`
--

CREATE TABLE `progress` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `storymode` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT '[0,0,0,"java",""]' CHECK (json_valid(`storymode`)),
  `challenges` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT '[0,0,0,"java",""]' CHECK (json_valid(`challenges`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `progress`
--

INSERT INTO `progress` (`id`, `userId`, `storymode`, `challenges`) VALUES
(2, 4, '[0,0,0,\"java\",\"\"]', '[0,0,0,\"java\",\"\"]'),
(35, 26, '[0,0,0,\"java\",\"\"]', '[0,0,0,\"java\",\"\"]'),
(36, 26, '[0,0,0,\"c++\",\"\"]', '[0,0,0,\"c++\",\"\"]'),
(37, 26, '[0,0,0,\"c#\",\"\"]', '[0,0,0,\"c#\",\"\"]');

-- --------------------------------------------------------

--
-- Table structure for table `rewards`
--

CREATE TABLE `rewards` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `tier` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT '[""]' CHECK (json_valid(`tier`)),
  `badges` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT '["java",""]' CHECK (json_valid(`badges`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rewards`
--

INSERT INTO `rewards` (`id`, `userId`, `tier`, `badges`) VALUES
(3, 4, '[\"\"]', '[\"java\",\"\"]'),
(41, 26, '[\"\"]', '[\"java\",\"\"]'),
(42, 26, '[\"\"]', '[\"c++\",\"\"]'),
(43, 26, '[\"t3\"]', '[\"c#\",\"\"]');

-- --------------------------------------------------------

--
-- Table structure for table `saving`
--

CREATE TABLE `saving` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `sceneNum` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT '["java","","",""]' CHECK (json_valid(`sceneNum`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `saving`
--

INSERT INTO `saving` (`id`, `userId`, `sceneNum`) VALUES
(3, 4, '[\"java\",\"\",\"\",\"\"]'),
(36, 26, '[\"java\",\"\",\"\",\"\"]'),
(37, 26, '[\"c++\",\"\",\"\",\"\"]'),
(38, 26, '[\"c#\",\"\",\"\",\"\"]');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `controls` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT '["w","a","s","d","click"]' CHECK (json_valid(`controls`)),
  `volume` int(11) DEFAULT 50
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `userId`, `controls`, `volume`) VALUES
(2, 4, '[\"w\",\"a\",\"s\",\"d\",\"click\"]', 50),
(15, 26, '[\"w\",\"a\",\"s\",\"d\",\"click\"]', 50);

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
(1, 'sample', '$2y$10$1HvyXeAyXpXRNeaqWS8v8uWBepVQykbCg55fc0McVhJQKtFU4axpu', '', '2025-09-18 23:42:16'),
(4, 'sample1', '$2y$10$vK/4V8i97Lx/yQAc9XJ2A.UqylT8NrSamYVTeaSE/5RS7vPYGUDHC', 'c++', '2025-09-21 09:48:15'),
(26, 'qweqwe', '$2y$10$3d6PxXIU.mlzxvWS0dY42OZ2zLUWF8s0LIT5n4wgLrV6FtsJCLrS6', 'c#', '2025-10-03 03:17:23');

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
-- Indexes for table `settings`
--
ALTER TABLE `settings`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `progress`
--
ALTER TABLE `progress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `rewards`
--
ALTER TABLE `rewards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `saving`
--
ALTER TABLE `saving`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

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

--
-- Constraints for table `settings`
--
ALTER TABLE `settings`
  ADD CONSTRAINT `settings_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
