-- phpMyAdmin SQL Dump
-- version 4.4.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 06, 2016 at 12:24 AM
-- Server version: 5.6.25
-- PHP Version: 5.6.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `l_fis`
--

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE IF NOT EXISTS `staff` (
  `staff_id` varchar(100) NOT NULL,
  `nip` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `photo` text,
  `born_date` date DEFAULT NULL,
  `address` text,
  `created` datetime DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` text,
  `gender_id` varchar(100) NOT NULL,
  `language_id` varchar(100) NOT NULL,
  `permission_id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`staff_id`, `nip`, `name`, `photo`, `born_date`, `address`, `created`, `last_login`, `status`, `username`, `password`, `gender_id`, `language_id`, `permission_id`) VALUES
('1112016030220130587', '1632040256499', 'Dawn', 'assets/dist/img/1112016030220130587.png', '2016-03-02', 'Bandung', '2016-03-02 20:13:05', NULL, 1, 'root_developer', '1632040256499', '1142016022809152879', '1142016022808590446', '1262016022817240092'),
('1112016030821515634', '1655080876799', 'Ramona', 'assets/dist/img/default.png', '0000-00-00', 'Bandung', '2016-03-08 21:51:56', NULL, 1, '1655080876799', '1655080876799', '1142016022809154834', '1142016022808590446', '1262016022817243658'),
('1112016030822332190', '1603011018999', 'John', 'assets/dist/img/default.png', '0000-00-00', 'Bandung', '2016-03-08 22:33:21', NULL, 1, '1603011018999', '1603011018999', '1142016022809152879', '1142016022808590446', '1262016022817244262');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`staff_id`),
  ADD KEY `gender_id` (`gender_id`,`language_id`),
  ADD KEY `language_id` (`language_id`),
  ADD KEY `permission_id` (`permission_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `staff`
--
ALTER TABLE `staff`
  ADD CONSTRAINT `staff_ibfk_1` FOREIGN KEY (`gender_id`) REFERENCES `gender` (`gender_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `staff_ibfk_2` FOREIGN KEY (`language_id`) REFERENCES `language` (`language_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
