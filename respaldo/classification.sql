-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 25, 2025 at 03:43 AM
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
-- Database: `projectsalex`
--

-- --------------------------------------------------------

--
-- Table structure for table `classification_of_investments`
--

CREATE TABLE `classifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `classifications`
--

INSERT INTO `classifications` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Buildings', '2025-01-25 02:27:54', '2025-01-25 02:27:54'),
(2, 'Furniture', '2025-01-25 02:28:05', '2025-01-25 02:28:05'),
(3, 'General Install', '2025-01-25 02:28:09', '2025-01-25 02:28:09'),
(4, 'Land', '2025-01-25 02:28:15', '2025-01-25 02:28:15'),
(5, 'Machines & Equipm', '2025-01-25 02:28:20', '2025-01-25 02:28:20'),
(6, 'Office Hardware Software', '2025-01-25 02:28:25', '2025-01-25 02:28:25'),
(7, 'Other', '2025-01-25 02:28:30', '2025-01-25 02:28:30'),
(8, 'Vehicles', '2025-01-25 02:28:35', '2025-01-25 02:28:35'),
(9, 'Vessel & Fishing Equipment', '2025-01-25 02:28:41', '2025-01-25 02:28:41'),
(10, 'Warenhouse & Distrib', '2025-01-25 02:28:49', '2025-01-25 02:28:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `classification_of_investments`
--
ALTER TABLE `classification_of_investments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `classification_of_investments_name_unique` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `classification_of_investments`
--
ALTER TABLE `classification_of_investments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
