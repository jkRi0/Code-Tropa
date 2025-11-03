-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 03, 2025 at 12:18 AM
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
(9, 25, 'pretest', 'c#', '[1,1,2,2,2,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]', 11, 35, 4, '2025-11-02 20:15:36');

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
(32, 1, 36, 0, 0, 0, 20, 0, 1),
(33, 1, 37, 0, 0, 0, 0, 0, 1),
(46, 25, 50, 0, 0, 0, 0, 0, 0),
(47, 25, 51, 0, 0, 0, 0, 0, 0),
(48, 1, 52, 0, 0, 0, 15, 0, 1),
(49, 1, 53, 0, 0, 0, 15, 0, 1),
(50, 1, 54, 0, 0, 0, 15, 0, 1),
(51, 1, 55, 40, 10, 30, 20, 1, 0),
(52, 1, 56, 40, 10, 30, 20, 1, 0);

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
(1, 1, 'story', 'java', 1, 1, NULL, NULL, 100, NULL),
(2, 2, 'story', 'c++', 1, 2, NULL, NULL, 90, '#include<iostream>\nusing namespace std;\nint main(){ cout<<\"Sari-Sari\"; }'),
(3, 3, 'story', 'c#', 1, 1, NULL, NULL, 70, 'Console.WriteLine(\"Barangay Announcement\");'),
(4, 4, 'challenge', 'java', NULL, NULL, 'easy', 2, 60, 'int a=5; int b=3; Console.WriteLine(a+b);'),
(5, 5, 'challenge', 'c++', NULL, NULL, 'medium', 4, 95, 'for(int i=0;i<5;i++){ cout<<i; }'),
(8, 2, 'story', 'c++', 2, 1, NULL, NULL, 70, '#include <iostream>'),
(9, 3, 'story', 'c#', 1, 2, NULL, NULL, 60, 'Console.WriteLine(\"Pedro\");'),
(10, 4, 'story', 'java', 2, 1, NULL, NULL, 90, 'int x = 10;'),
(11, 5, 'story', 'c++', 3, 1, NULL, NULL, 85, 'for(int i=0;i<5;i++){}'),
(13, 2, 'challenge', 'c++', NULL, NULL, 'medium', 2, 40, 'if(a>b){}'),
(14, 3, 'challenge', 'c#', NULL, NULL, 'hard', 3, 25, 'for(int i=0;i<10;i++){}'),
(15, 4, 'challenge', 'java', NULL, NULL, 'easy', 2, 35, 'System.out.println(\"ok\");'),
(16, 5, 'challenge', 'c++', NULL, NULL, 'medium', 3, 50, 'switch(x){}'),
(17, 6, 'story', 'java', 1, 1, NULL, NULL, 50, 'System.out.println(\"Hello Ana\");'),
(18, 7, 'story', 'c#', 2, 1, NULL, NULL, 60, 'Console.WriteLine(\"Hi Rico\");'),
(19, 8, 'challenge', 'c++', NULL, NULL, 'easy', 1, 40, '#include <iostream>'),
(20, 9, 'story', 'java', 2, 2, NULL, NULL, 70, 'System.out.println(\"Tom here\");'),
(21, 10, 'challenge', 'c#', NULL, NULL, 'medium', 3, 65, 'Console.WriteLine(\"Ivy code\");'),
(22, 11, 'story', 'java', 1, 3, NULL, NULL, 45, 'System.out.println(\"Mark story\");'),
(23, 12, 'challenge', 'c++', NULL, NULL, 'hard', 5, 80, 'cout << \"Ella\";'),
(24, 13, 'story', 'c#', 2, 2, NULL, NULL, 55, 'Console.WriteLine(\"DanSharp\");'),
(25, 14, 'challenge', 'java', NULL, NULL, 'medium', 4, 75, 'System.out.println(\"Lea challenge\");'),
(26, 15, 'story', 'c++', 3, 1, NULL, NULL, 90, 'cout << \"Oscar scene\";'),
(27, 16, 'story', 'java', 0, 0, NULL, NULL, 0, ''),
(28, 16, 'challenge', 'java', NULL, NULL, '', 0, 0, ''),
(36, 1, 'challenge', 'java', NULL, NULL, 'easy', 1, 100, 'public class TahoVendor {\n    public static void main(String[] args) {\n        System.out.println(\"Tahooo!\");\n        System.out.println(\"Taho: ₱15\");\n        System.out.println(\"Syrup: ₱5\");\n    }\n}'),
(37, 1, 'story', 'java', 1, 2, NULL, NULL, 100, NULL),
(50, 25, 'story', 'java', 0, 0, NULL, NULL, 0, ''),
(51, 25, 'challenge', 'java', NULL, NULL, '', 0, 0, ''),
(52, 1, 'challenge', 'java', NULL, NULL, '', 2, 15, 'import java.util.Scanner;\n\npublic class SariSariStore {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        \n        // Product names\n        String suka = \"Vinegar\";\n        String itlog = \"Eggs\";\n        String tinapay = \"Bread\";\n        \n        // Prices\n        double sukaPrice = 25.50;\n        double itlogPrice = 8.00;\n        double tinapayPrice = 35.00;\n        \n        // Get new stock levels from user\n        System.out.print(\"Enter new stock for \" + suka + \": \");\n        int sukaStock = scanner.nextInt();\n        \n        System.out.print(\"Enter new stock for \" + itlog + \": \");\n        int itlogStock = scanner.nextInt();\n        \n        System.out.print(\"Enter new stock for \" + tinapay + \": \");\n        int tinapayStock = scanner.nextInt();\n        \n        // Calculate values\n        double sukaValue = sukaPrice * sukaStock;\n        double itlogValue = itlogPrice * itlogStock;\n        double tinapayValue = tinapayPrice * tinapayStock;\n        \n        // Display updated inventory\n        System.out.println(\"\\nUpdated Inventory:\");\n        System.out.printf(\"%s: %d units @ ₱%.2f = ₱%.2f%n\", suka, sukaStock, sukaPrice, sukaValue);\n        System.out.printf(\"%s: %d units @ ₱%.2f = ₱%.2f%n\", itlog, itlogStock, itlogPrice, itlogValue);\n        System.out.printf(\"%s: %d units @ ₱%.2f = ₱%.2f%n\", tinapay, tinapayStock, tinapayPrice, tinapayValue);\n        \n        // Check for restock alerts (threshold = 20)\n        int threshold = 20;\n        System.out.println();\n        \n        if (sukaStock < threshold) {\n            System.out.println(\"⚠️ RESTOCK ALERT: \" + suka + \" is below threshold (\" + sukaStock + \" < \" + threshold + \")\");\n        }\n        if (itlogStock < threshold) {\n            System.out.println(\"⚠️ RESTOCK ALERT: \" + itlog + \" is below threshold (\" + itlogStock + \" < \" + threshold + \")\");\n        }\n        if (tinapayStock < threshold) {\n            System.out.println(\"⚠️ RESTOCK ALERT: \" + tinapay + \" is below threshold (\" + tinapayStock + \" < \" + threshold + \")\");\n        }\n        \n        scanner.close();\n    }\n}'),
(53, 1, 'challenge', 'java', NULL, NULL, '', 2, 15, 'import java.util.Scanner;\n\npublic class SariSariStore {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        \n        // Product names\n        String suka = \"Vinegar\";\n        String itlog = \"Eggs\";\n        String tinapay = \"Bread\";\n        \n        // Prices\n        double sukaPrice = 25.50;\n        double itlogPrice = 8.00;\n        double tinapayPrice = 35.00;\n        \n        // Get new stock levels from user\n        System.out.print(\"Enter new stock for \" + suka + \": \");\n        int sukaStock = scanner.nextInt();\n        \n        System.out.print(\"Enter new stock for \" + itlog + \": \");\n        int itlogStock = scanner.nextInt();\n        \n        System.out.print(\"Enter new stock for \" + tinapay + \": \");\n        int tinapayStock = scanner.nextInt();\n        \n        // Calculate values\n        double sukaValue = sukaPrice * sukaStock;\n        double itlogValue = itlogPrice * itlogStock;\n        double tinapayValue = tinapayPrice * tinapayStock;\n        \n        // Display updated inventory\n        System.out.println(\"\\nUpdated Inventory:\");\n        System.out.printf(\"%s: %d units @ ₱%.2f = ₱%.2f%n\", suka, sukaStock, sukaPrice, sukaValue);\n        System.out.printf(\"%s: %d units @ ₱%.2f = ₱%.2f%n\", itlog, itlogStock, itlogPrice, itlogValue);\n        System.out.printf(\"%s: %d units @ ₱%.2f = ₱%.2f%n\", tinapay, tinapayStock, tinapayPrice, tinapayValue);\n        \n        // Check for restock alerts (threshold = 20)\n        int threshold = 20;\n        System.out.println();\n        \n        if (sukaStock < threshold) {\n            System.out.println(\"⚠️ RESTOCK ALERT: \" + suka + \" is below threshold (\" + sukaStock + \" < \" + threshold + \")\");\n        }\n        if (itlogStock < threshold) {\n            System.out.println(\"⚠️ RESTOCK ALERT: \" + itlog + \" is below threshold (\" + itlogStock + \" < \" + threshold + \")\");\n        }\n        if (tinapayStock < threshold) {\n            System.out.println(\"⚠️ RESTOCK ALERT: \" + tinapay + \" is below threshold (\" + tinapayStock + \" < \" + threshold + \")\");\n        }\n        \n        scanner.close();\n    }\n}'),
(54, 1, 'challenge', 'java', NULL, NULL, '', 2, 15, 'import java.util.Scanner;\n\npublic class SariSariStore {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        \n        // Product names\n        String suka = \"Vinegar\";\n        String itlog = \"Eggs\";\n        String tinapay = \"Bread\";\n        \n        // Prices\n        double sukaPrice = 25.50;\n        double itlogPrice = 8.00;\n        double tinapayPrice = 35.00;\n        \n        // Get new stock levels from user\n        System.out.print(\"Enter new stock for \" + suka + \": \");\n        int sukaStock = scanner.nextInt();\n        \n        System.out.print(\"Enter new stock for \" + itlog + \": \");\n        int itlogStock = scanner.nextInt();\n        \n        System.out.print(\"Enter new stock for \" + tinapay + \": \");\n        int tinapayStock = scanner.nextInt();\n        \n        // Calculate values\n        double sukaValue = sukaPrice * sukaStock;\n        double itlogValue = itlogPrice * itlogStock;\n        double tinapayValue = tinapayPrice * tinapayStock;\n        \n        // Display updated inventory\n        System.out.println(\"\\nUpdated Inventory:\");\n        System.out.printf(\"%s: %d units @ ₱%.2f = ₱%.2f%n\", suka, sukaStock, sukaPrice, sukaValue);\n        System.out.printf(\"%s: %d units @ ₱%.2f = ₱%.2f%n\", itlog, itlogStock, itlogPrice, itlogValue);\n        System.out.printf(\"%s: %d units @ ₱%.2f = ₱%.2f%n\", tinapay, tinapayStock, tinapayPrice, tinapayValue);\n        \n        // Check for restock alerts (threshold = 20)\n        int threshold = 20;\n        System.out.println();\n        \n        if (sukaStock < threshold) {\n            System.out.println(\"⚠️ RESTOCK ALERT: \" + suka + \" is below threshold (\" + sukaStock + \" < \" + threshold + \")\");\n        }\n        if (itlogStock < threshold) {\n            System.out.println(\"⚠️ RESTOCK ALERT: \" + itlog + \" is below threshold (\" + itlogStock + \" < \" + threshold + \")\");\n        }\n        if (tinapayStock < threshold) {\n            System.out.println(\"⚠️ RESTOCK ALERT: \" + tinapay + \" is below threshold (\" + tinapayStock + \" < \" + threshold + \")\");\n        }\n        \n        scanner.close();\n    }\n}'),
(55, 1, 'challenge', 'java', NULL, NULL, 'easy', 2, 100, 'public class SariSariStore {\n    public static void main(String[] args) {\n        // Declare three product variables with correct data types\n        String suka = \"Vinegar\";\n        String itlog = \"Eggs\";\n        String tinapay = \"Bread\";\n        \n        // Print each product name\n        System.out.println(suka);\n        System.out.println(itlog);\n        System.out.println(tinapay);\n    }\n}'),
(56, 1, 'challenge', 'java', NULL, NULL, 'easy', 3, 100, 'public class FiestaPlanner {\n    public static void main(String[] args) {\n        // Fixed items for the fiesta\n        int banderitas = 500;\n        int lechon = 3000;\n        int soundSystem = 2000;\n        \n        // Calculate total cost\n        int totalCost = banderitas + lechon + soundSystem;\n        \n        // Display budget breakdown\n        System.out.println(\"Fiesta Budget Calculator\");\n        System.out.println(\"=======================\");\n        System.out.println(\"Banderitas: ₱\" + banderitas);\n        System.out.println(\"Lechon: ₱\" + lechon);\n        System.out.println(\"Sound System: ₱\" + soundSystem);\n        System.out.println(\"=======================\");\n        System.out.println(\"Total Cost: ₱\" + totalCost);\n    }\n}');

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
(46, 1, 'java', 't2', 'b2');

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
(35, 25, 'java', 0, 0, 0);

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
(1, 'asd', '$2y$10$gyHq.5few4MiSbL5edWEuOVw..vryZnZVq1pKvyLzbVeYkJgD8tUW', 'java', '2025-10-03 10:00:01', 0, NULL),
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
(25, 'qwe', '$2y$10$zWGDwIrd2/BfKimEGU9Qk.u7Pa8W61Ks6EI2ta2jhPTGwO2XvaK1m', 'java', '2025-11-02 20:09:26', 1, 'c#');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `performance`
--
ALTER TABLE `performance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `progress`
--
ALTER TABLE `progress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `rewards`
--
ALTER TABLE `rewards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `saving`
--
ALTER TABLE `saving`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

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
