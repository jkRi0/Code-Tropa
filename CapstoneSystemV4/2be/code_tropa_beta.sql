-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2025 at 12:30 AM
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
-- Table structure for table `assessments`
--

CREATE TABLE `assessments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `test_type` enum('pretest','posttest') NOT NULL,
  `language` varchar(50) NOT NULL,
  `answers` text NOT NULL COMMENT 'JSON array of user answers',
  `score` int(3) NOT NULL COMMENT 'Score percentage (0-100)',
  `total_questions` int(3) NOT NULL,
  `correct_answers` int(3) NOT NULL,
  `completed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `assessments`
--

INSERT INTO `assessments` (`id`, `user_id`, `test_type`, `language`, `answers`, `score`, `total_questions`, `correct_answers`, `completed_at`) VALUES
(7, 25, 'pretest', 'java', '[1,1,0]', 67, 3, 2, '2025-11-02 20:10:49'),
(8, 25, 'pretest', 'java', '[1,1,1]', 67, 3, 2, '2025-11-02 20:14:22'),
(9, 25, 'pretest', 'c#', '[1,1,2,2,2,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]', 11, 35, 4, '2025-11-02 20:15:36'),
(10, 26, 'pretest', 'java', '[0,1,1]', 33, 3, 1, '2025-11-16 23:30:20');

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
(1, 1, 1, 100, 100, 100, 0, 1, 0),
(2, 2, 2, 88, 75, 80, 150, 1, 0),
(3, 3, 3, 70, 65, 60, 200, 1, 1),
(4, 4, 4, 85, 70, 75, 110, 1, 0),
(5, 5, 5, 95, 90, 88, 95, 1, 0),
(6, 1, 1, 100, 100, 100, 0, 1, 0),
(7, 2, 2, 85, 75, 80, 140, 1, 0),
(8, 3, 3, 88, 70, 78, 150, 1, 0),
(9, 4, 4, 92, 85, 90, 100, 1, 0),
(10, 5, 5, 80, 65, 70, 200, 1, 0),
(13, 3, 8, 78, 66, 70, 190, 1, 0),
(14, 4, 9, 88, 77, 80, 170, 1, 0),
(15, 5, 10, 70, 55, 60, 220, 0, 1),
(18, 8, 8, 70, 60, 65, 200, 0, 1),
(19, 9, 9, 92, 88, 90, 110, 1, 0),
(20, 10, 10, 78, 70, 72, 180, 1, 1),
(21, 11, 11, 82, 77, 85, 160, 1, 0),
(23, 13, 13, 80, 70, 75, 210, 1, 1),
(24, 14, 14, 88, 85, 87, 130, 1, 0),
(25, 15, 15, 90, 89, 88, 100, 1, 0),
(26, 16, 27, 0, 0, 0, 0, 0, 0),
(27, 16, 28, 0, 0, 0, 0, 0, 0),
(32, 1, 36, 11, 10, 10, 20, 0, 1),
(33, 1, 37, 0, 0, 0, 0, 0, 1),
(46, 25, 50, 0, 0, 0, 0, 0, 0),
(47, 25, 51, 0, 0, 0, 0, 0, 0),
(48, 1, 52, 0, 0, 0, 15, 0, 1),
(49, 1, 53, 0, 0, 0, 15, 0, 1),
(50, 1, 54, 0, 0, 0, 15, 0, 1),
(51, 1, 55, 40, 10, 14, 20, 1, 0),
(52, 1, 56, 37, 10, 15, 20, 1, 0),
(53, 1, 57, 0, 0, 0, 0, 0, 1),
(54, 1, 58, 40, 10, 30, 0, 1, 0),
(55, 1, 65, 0, 0, 0, 20, 0, 1),
(56, 1, 66, 0, 0, 0, 20, 0, 1),
(57, 26, 67, 0, 0, 0, 0, 0, 0),
(58, 26, 68, 0, 0, 0, 0, 0, 0),
(59, 26, 69, 5, 0, 0, 15, 0, 1),
(60, 26, 70, 19, 0, 0, 20, 0, 1),
(61, 1, 71, 0, 0, 0, 0, 0, 1),
(62, 1, 72, 2, 10, 9, 20, 0, 1),
(63, 1, 73, 2, 10, 9, 20, 0, 1),
(64, 1, 74, 2, 25, 7, 20, 0, 1),
(65, 1, 75, 2, 25, 7, 20, 0, 1),
(66, 1, 76, 2, 25, 7, 20, 0, 1),
(67, 1, 77, 2, 25, 7, 20, 0, 1),
(68, 1, 78, 2, 25, 11, 20, 0, 1),
(69, 1, 79, 5, 25, 7, 20, 0, 1),
(70, 1, 80, 30, 25, 17, 20, 1, 0),
(71, 1, 81, 0, 0, 0, 0, 0, 1),
(72, 1, 82, 5, 25, 7, 20, 0, 1),
(73, 1, 83, 5, 25, 7, 20, 0, 1),
(74, 1, 84, 0, 0, 0, 0, 0, 1);

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

INSERT INTO `progress` (`userId`, `type`, `language`, `chapter`, `episode`, `difficulty`, `level`, `points`, `code`) VALUES
-- User 1 (asd) - Java Story Mode: All 7 episodes completed
(1, 'story', 'java', 1, 1, NULL, NULL, 95, NULL),
(1, 'story', 'java', 1, 2, NULL, NULL, 88, NULL),
(1, 'story', 'java', 1, 3, NULL, NULL, 92, NULL),
(1, 'story', 'java', 2, 1, NULL, NULL, 85, NULL),
(1, 'story', 'java', 2, 2, NULL, NULL, 90, NULL),
(1, 'story', 'java', 3, 1, NULL, NULL, 87, NULL),
(1, 'story', 'java', 3, 2, NULL, NULL, 93, NULL),
-- User 1 (asd) - C++ Story Mode: All 7 episodes completed
(1, 'story', 'c++', 1, 1, NULL, NULL, 95, NULL),
(1, 'story', 'c++', 1, 2, NULL, NULL, 88, NULL),
(1, 'story', 'c++', 1, 3, NULL, NULL, 92, NULL),
(1, 'story', 'c++', 2, 1, NULL, NULL, 85, NULL),
(1, 'story', 'c++', 2, 2, NULL, NULL, 90, NULL),
(1, 'story', 'c++', 3, 1, NULL, NULL, 87, NULL),
(1, 'story', 'c++', 3, 2, NULL, NULL, 93, NULL),
-- User 1 (asd) - C# Story Mode: All 7 episodes completed
(1, 'story', 'c#', 1, 1, NULL, NULL, 95, NULL),
(1, 'story', 'c#', 1, 2, NULL, NULL, 88, NULL),
(1, 'story', 'c#', 1, 3, NULL, NULL, 92, NULL),
(1, 'story', 'c#', 2, 1, NULL, NULL, 85, NULL),
(1, 'story', 'c#', 2, 2, NULL, NULL, 90, NULL),
(1, 'story', 'c#', 3, 1, NULL, NULL, 87, NULL),
(1, 'story', 'c#', 3, 2, NULL, NULL, 93, NULL),
-- User 1 (asd) - Java Challenge Mode: All 20 levels completed
(1, 'challenge', 'java', NULL, NULL, 'easy', 1, 95, NULL),
(1, 'challenge', 'java', NULL, NULL, 'easy', 2, 88, NULL),
(1, 'challenge', 'java', NULL, NULL, 'easy', 3, 92, NULL),
(1, 'challenge', 'java', NULL, NULL, 'easy', 4, 85, NULL),
(1, 'challenge', 'java', NULL, NULL, 'easy', 5, 90, NULL),
(1, 'challenge', 'java', NULL, NULL, 'easy', 6, 87, NULL),
(1, 'challenge', 'java', NULL, NULL, 'easy', 7, 89, NULL),
(1, 'challenge', 'java', NULL, NULL, 'easy', 8, 86, NULL),
(1, 'challenge', 'java', NULL, NULL, 'easy', 9, 91, NULL),
(1, 'challenge', 'java', NULL, NULL, 'easy', 10, 84, NULL),
(1, 'challenge', 'java', NULL, NULL, 'easy', 11, 88, NULL),
(1, 'challenge', 'java', NULL, NULL, 'easy', 12, 90, NULL),
(1, 'challenge', 'java', NULL, NULL, 'easy', 13, 85, NULL),
(1, 'challenge', 'java', NULL, NULL, 'easy', 14, 87, NULL),
(1, 'challenge', 'java', NULL, NULL, 'easy', 15, 89, NULL),
(1, 'challenge', 'java', NULL, NULL, 'easy', 16, 86, NULL),
(1, 'challenge', 'java', NULL, NULL, 'easy', 17, 92, NULL),
(1, 'challenge', 'java', NULL, NULL, 'easy', 18, 88, NULL),
(1, 'challenge', 'java', NULL, NULL, 'easy', 19, 90, NULL),
(1, 'challenge', 'java', NULL, NULL, 'easy', 20, 93, NULL),
-- User 1 (asd) - C++ Challenge Mode: All 20 levels completed
(1, 'challenge', 'c++', NULL, NULL, 'easy', 1, 95, NULL),
(1, 'challenge', 'c++', NULL, NULL, 'easy', 2, 88, NULL),
(1, 'challenge', 'c++', NULL, NULL, 'easy', 3, 92, NULL),
(1, 'challenge', 'c++', NULL, NULL, 'easy', 4, 85, NULL),
(1, 'challenge', 'c++', NULL, NULL, 'easy', 5, 90, NULL),
(1, 'challenge', 'c++', NULL, NULL, 'easy', 6, 87, NULL),
(1, 'challenge', 'c++', NULL, NULL, 'easy', 7, 89, NULL),
(1, 'challenge', 'c++', NULL, NULL, 'easy', 8, 86, NULL),
(1, 'challenge', 'c++', NULL, NULL, 'easy', 9, 91, NULL),
(1, 'challenge', 'c++', NULL, NULL, 'easy', 10, 84, NULL),
(1, 'challenge', 'c++', NULL, NULL, 'easy', 11, 88, NULL),
(1, 'challenge', 'c++', NULL, NULL, 'easy', 12, 90, NULL),
(1, 'challenge', 'c++', NULL, NULL, 'easy', 13, 85, NULL),
(1, 'challenge', 'c++', NULL, NULL, 'easy', 14, 87, NULL),
(1, 'challenge', 'c++', NULL, NULL, 'easy', 15, 89, NULL),
(1, 'challenge', 'c++', NULL, NULL, 'easy', 16, 86, NULL),
(1, 'challenge', 'c++', NULL, NULL, 'easy', 17, 92, NULL),
(1, 'challenge', 'c++', NULL, NULL, 'easy', 18, 88, NULL),
(1, 'challenge', 'c++', NULL, NULL, 'easy', 19, 90, NULL),
(1, 'challenge', 'c++', NULL, NULL, 'easy', 20, 93, NULL),
-- User 1 (asd) - C# Challenge Mode: All 20 levels completed
(1, 'challenge', 'c#', NULL, NULL, 'easy', 1, 95, NULL),
(1, 'challenge', 'c#', NULL, NULL, 'easy', 2, 88, NULL),
(1, 'challenge', 'c#', NULL, NULL, 'easy', 3, 92, NULL),
(1, 'challenge', 'c#', NULL, NULL, 'easy', 4, 85, NULL),
(1, 'challenge', 'c#', NULL, NULL, 'easy', 5, 90, NULL),
(1, 'challenge', 'c#', NULL, NULL, 'easy', 6, 87, NULL),
(1, 'challenge', 'c#', NULL, NULL, 'easy', 7, 89, NULL),
(1, 'challenge', 'c#', NULL, NULL, 'easy', 8, 86, NULL),
(1, 'challenge', 'c#', NULL, NULL, 'easy', 9, 91, NULL),
(1, 'challenge', 'c#', NULL, NULL, 'easy', 10, 84, NULL),
(1, 'challenge', 'c#', NULL, NULL, 'easy', 11, 88, NULL),
(1, 'challenge', 'c#', NULL, NULL, 'easy', 12, 90, NULL),
(1, 'challenge', 'c#', NULL, NULL, 'easy', 13, 85, NULL),
(1, 'challenge', 'c#', NULL, NULL, 'easy', 14, 87, NULL),
(1, 'challenge', 'c#', NULL, NULL, 'easy', 15, 89, NULL),
(1, 'challenge', 'c#', NULL, NULL, 'easy', 16, 86, NULL),
(1, 'challenge', 'c#', NULL, NULL, 'easy', 17, 92, NULL),
(1, 'challenge', 'c#', NULL, NULL, 'easy', 18, 88, NULL),
(1, 'challenge', 'c#', NULL, NULL, 'easy', 19, 90, NULL),
(1, 'challenge', 'c#', NULL, NULL, 'easy', 20, 93, NULL);

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
(2, 1, 'java', 't3', 'b2'),
(3, 1, 'java', 't2', 'b3'),
(4, 2, 'c++', 't1', 'b1'),
(5, 2, 'c++', 't2', 'b2'),
(6, 2, 'c++', 't2', 'b3'),
(7, 2, 'c++', 't3', 'b4'),
(8, 3, 'c#', 't1', 'b1'),
(9, 3, 'c#', 't2', 'b5'),
(10, 1, 'java', 't3', 'b11'),
(11, 1, 'java', 't3', 'b7'),
(12, 5, 'c++', 't2', 'b8'),
(13, 5, 'c++', 't2', 'b9'),
(14, 5, 'c++', 't3', 'b10'),
(15, 5, 'c++', 't3', 'b11'),
(16, 1, 'java', 't3', 'b13'),
(17, 1, 'java', 't4', 'b12'),
(18, 6, 'java', 't1', 'b1'),
(19, 6, 'java', 't2', 'b2'),
(20, 6, 'java', 't3', 'b3'),
(21, 7, 'c#', 't1', 'b1'),
(22, 7, 'c#', 't2', 'b4'),
(23, 8, 'c++', 't1', 'b2'),
(24, 8, 'c++', 't3', 'b6'),
(25, 9, 'java', 't2', 'b3'),
(26, 9, 'java', 't3', 'b7'),
(27, 9, 'java', 't4', 'b8'),
(28, 10, 'c#', 't1', 'b1'),
(29, 10, 'c#', 't2', 'b5'),
(30, 10, 'c#', 't3', 'b9'),
(31, 11, 'java', 't1', 'b1'),
(32, 11, 'java', 't2', 'b2'),
(33, 12, 'c++', 't1', 'b2'),
(34, 12, 'c++', 't2', 'b3'),
(35, 12, 'c++', 't3', 'b4'),
(36, 13, 'c#', 't1', 'b5'),
(37, 13, 'c#', 't2', 'b6'),
(38, 14, 'java', 't2', 'b7'),
(39, 14, 'java', 't3', 'b8'),
(40, 15, 'c++', 't1', 'b9'),
(41, 15, 'c++', 't2', 'b10'),
(42, 15, 'c++', 't3', 'b11'),
(43, 16, 'java', 't1', 'b1'),
(46, 1, 'java', 't2', 'b2'),
(47, 1, 'java', 't3', 'b3'),
(48, 1, 'java', 't5', 'b5');

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
(5, 5, 'c++', 2, 3, 1),
(6, 1, 'java', 1, 2, 3),
(7, 1, 'java', 2, 1, 4),
(8, 2, 'c++', 2, 1, 5),
(9, 2, 'c++', 3, 2, 1),
(10, 3, 'c#', 1, 3, 2),
(11, 3, 'c#', 2, 2, 3),
(12, 4, 'java', 2, 2, 4),
(13, 4, 'java', 3, 1, 2),
(14, 5, 'c++', 3, 1, 1),
(15, 5, 'c++', 3, 2, 2),
(16, 6, 'java', 1, 1, 2),
(17, 7, 'c#', 2, 1, 3),
(18, 8, 'c++', 1, 2, 2),
(19, 9, 'java', 2, 1, 1),
(20, 10, 'c#', 1, 1, 1),
(21, 11, 'java', 1, 3, 2),
(22, 12, 'c++', 2, 1, 2),
(23, 13, 'c#', 2, 2, 1),
(24, 14, 'java', 3, 1, 1),
(25, 15, 'c++', 3, 2, 2),
(26, 16, 'java', 0, 0, 0),
(35, 25, 'java', 0, 0, 0),
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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `has_taken_pretest` tinyint(1) DEFAULT 0 COMMENT 'Whether user has completed pre-test',
  `pretest_language` varchar(50) DEFAULT NULL COMMENT 'Language selected for pre-test'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `programmingLanguage`, `created_at`, `has_taken_pretest`, `pretest_language`) VALUES
(1, 'asd', '$2y$10$gyHq.5few4MiSbL5edWEuOVw..vryZnZVq1pKvyLzbVeYkJgD8tUW', 'c#', '2025-10-03 10:00:01', 0, NULL),
(2, 'mariaDev', '$2b$12$hl9o.jr4SlZbN7.qwGIp6OGU3gTx//7cacAwCZEnVbeVGN/Elst22', 'c++', '2025-10-03 10:00:01', 0, NULL),
(3, 'pedroCode', '$2b$12$PyEvbHMcr6DdAG1tMXM0S./chwu5N86AUMRrPSutv7FGun43b3U/y', 'c#', '2025-10-03 10:00:01', 0, NULL),
(4, 'luzCoder', '$2b$12$9bEXHygLkPoM/kt7bqXEP.Yt1S2ueqxXmXKTM1N.9wW72e0e76XVa', 'java', '2025-10-03 10:00:01', 0, NULL),
(5, 'kikoIT', '$2b$12$9eglLkQA7novLPDi.Mrofu5lNHbt7j8hMdOFgWju/ZV7n2iGounHG', 'c++', '2025-10-03 10:00:01', 0, NULL),
(6, 'anaProg', '$2y$10$4LgZf1QqUiTtvopUjMxJuuv38ZcZr9kNQf19Xy1p6FpF.5bSxxjK.', 'java', '2025-10-04 06:34:49', 0, NULL),
(7, 'ricoDev', '$2y$10$Ax2mgh76dHR7hQFSssnZbe2Pc2d92jS0JYQYq2tyHZ04Kekf2v0K.', 'c#', '2025-10-04 06:34:49', 0, NULL),
(8, 'saraC', '$2y$10$C8zWksh4z2b5PtiJGEeX3evqOxQ7nLwOEVdM7.LU0rwEXs2zRjG7C', 'c++', '2025-10-04 06:34:49', 0, NULL),
(9, 'tomJava', '$2y$10$X8DEUdKf9hW9sHKIhj8T/O8AvNwBfP2AQZpN8aNhyim/jJ4n6jWgu', 'java', '2025-10-04 06:34:49', 0, NULL),
(10, 'ivyCoder', '$2y$10$C1R7nSMv9o1.Vp3dq9oyAu13TofJQFSW8Zh5f/ubQPaYc4fJvT3.6', 'c#', '2025-10-04 06:34:49', 0, NULL),
(11, 'markDev', '$2y$10$dS2Rf6o5mUTVQEz0cOx8Hu7g0uF3HkI43aR8ZjAg6wM5tHIXsxj2K', 'java', '2025-10-04 06:34:49', 0, NULL),
(12, 'ellaC', '$2y$10$t3eqUuxQYyZlLgQzK6VjuuHRsm31vLQKnE2y4nU0F5LoSCItmB7Wa', 'c++', '2025-10-04 06:34:49', 0, NULL),
(13, 'danSharp', '$2y$10$xiSev3M0dS3k9Unh4UOwaOnW9Z9jUw2k/Yr8h6tE7YOKUPyEZMrvu', 'c#', '2025-10-04 06:34:49', 0, NULL),
(14, 'leaJava', '$2y$10$R9vN8uDjSHVQb7rK38VmGeyh8o7c/FHMP0xTQwD1r5F6zQ1.D7xPu', 'java', '2025-10-04 06:34:49', 0, NULL),
(15, 'oscarC', '$2y$10$UoRmE3.N6KX9s5m6XebSYeQ8Wm5dS/U7Ry1Yb2eqw7KxjGUKhZ0ce', 'c++', '2025-10-04 06:34:49', 0, NULL),
(16, 'Hans-Axle', '$2y$10$CxbXWgEcAjlCJNYrAVa/K.HyvNF9ExzplVrgYwcyYo0r.dqGWqBGq', 'java', '2025-10-13 06:46:42', 0, NULL),
(25, 'qwe', '$2y$10$zWGDwIrd2/BfKimEGU9Qk.u7Pa8W61Ks6EI2ta2jhPTGwO2XvaK1m', 'java', '2025-11-02 20:09:26', 1, 'c#'),
(26, 'carl', '$2y$10$/V/m9nGCWeMyxgdLN/NMQuiAieYLxe2u.Rx00LaPiXUNlg5Ul3kNC', 'c++', '2025-11-16 23:29:59', 1, 'java');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assessments`
--
ALTER TABLE `assessments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `test_type` (`test_type`),
  ADD KEY `language` (`language`),
  ADD KEY `idx_user_test_type` (`user_id`,`test_type`),
  ADD KEY `idx_user_language` (`user_id`,`language`);

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
-- AUTO_INCREMENT for table `assessments`
--
ALTER TABLE `assessments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `performance`
--
ALTER TABLE `performance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `progress`
--
ALTER TABLE `progress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT for table `rewards`
--
ALTER TABLE `rewards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

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
-- Constraints for table `assessments`
--
ALTER TABLE `assessments`
  ADD CONSTRAINT `assessments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

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
