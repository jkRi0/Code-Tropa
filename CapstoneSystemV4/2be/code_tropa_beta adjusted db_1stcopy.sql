-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 03, 2025 at 12:28 PM
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
(1, 1, 1, 90, 80, 85, 100, 1, 0),
(2, 2, 2, 88, 75, 80, 150, 1, 0),
(3, 3, 3, 70, 65, 60, 200, 1, 1),
(4, 4, 4, 85, 70, 75, 110, 1, 0),
(5, 5, 5, 95, 90, 88, 95, 1, 0);

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
  `difficulty` enum('easy','medium','hard') DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `points` int(11) DEFAULT 0,
  `code` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `progress`
--

INSERT INTO `progress` (`id`, `userId`, `type`, `language`, `chapter`, `episode`, `difficulty`, `level`, `points`, `code`) VALUES
(1, 1, 'story', 'java', 1, 1, NULL, NULL, 85, 'System.out.println(\"Hello, Fiesta!\");'),
(2, 2, 'story', 'c++', 1, 2, NULL, NULL, 90, '#include<iostream>\nusing namespace std;\nint main(){ cout<<\"Sari-Sari\"; }'),
(3, 3, 'story', 'c#', 1, 1, NULL, NULL, 70, 'Console.WriteLine(\"Barangay Announcement\");'),
(4, 4, 'challenge', 'java', NULL, NULL, 'easy', 2, 60, 'int a=5; int b=3; Console.WriteLine(a+b);'),
(5, 5, 'challenge', 'c++', NULL, NULL, 'medium', 4, 95, 'for(int i=0;i<5;i++){ cout<<i; }');

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
(1, 1, 'java', 't1', 'b1'),
(2, 1, 'java', 't1', 'b2'),
(3, 1, 'java', 't2', 'b3'),
(4, 2, 'c++', 't1', 'b1'),
(5, 2, 'c++', 't2', 'b2'),
(6, 2, 'c++', 't2', 'b3'),
(7, 2, 'c++', 't3', 'b4'),
(8, 3, 'c#', 't1', 'b1'),
(9, 3, 'c#', 't2', 'b5'),
(10, 4, 'java', 't3', 'b6'),
(11, 4, 'java', 't3', 'b7'),
(12, 5, 'c++', 't2', 'b8'),
(13, 5, 'c++', 't2', 'b9'),
(14, 5, 'c++', 't3', 'b10'),
(15, 5, 'c++', 't3', 'b11'),
(16, 5, 'c++', 't3', 'b12'),
(17, 5, 'c++', 't4', 'b13');

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
(1, 1, 'java', 1, 2, 3),
(2, 2, 'c++', 2, 1, 1),
(3, 3, 'c#', 1, 1, 2),
(4, 4, 'java', 3, 2, 4),
(5, 5, 'c++', 2, 3, 1);

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
(1, 'juan123456', '$2y$10$gyHq.5few4MiSbL5edWEuOVw..vryZnZVq1pKvyLzbVeYkJgD8tUW', 'java', '2025-10-03 10:00:01'),
(2, 'mariaDev', '$2b$12$hl9o.jr4SlZbN7.qwGIp6OGU3gTx//7cacAwCZEnVbeVGN/Elst22', 'c++', '2025-10-03 10:00:01'),
(3, 'pedroCode', '$2b$12$PyEvbHMcr6DdAG1tMXM0S./chwu5N86AUMRrPSutv7FGun43b3U/y', 'c#', '2025-10-03 10:00:01'),
(4, 'luzCoder', '$2b$12$9bEXHygLkPoM/kt7bqXEP.Yt1S2ueqxXmXKTM1N.9wW72e0e76XVa', 'java', '2025-10-03 10:00:01'),
(5, 'kikoIT', '$2b$12$9eglLkQA7novLPDi.Mrofu5lNHbt7j8hMdOFgWju/ZV7n2iGounHG', 'c++', '2025-10-03 10:00:01');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `progress`
--
ALTER TABLE `progress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `rewards`
--
ALTER TABLE `rewards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `saving`
--
ALTER TABLE `saving`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
