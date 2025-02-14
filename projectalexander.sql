-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-02-2025 a las 01:34:11
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `projectalexander`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `approvals`
--

CREATE TABLE `approvals` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `fechaEjecucion` date DEFAULT NULL,
  `desde` varchar(255) NOT NULL,
  `hasta` varchar(255) NOT NULL,
  `inspectorSSA` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `plant_id` bigint(20) UNSIGNED NOT NULL,
  `area_machine_id` bigint(20) UNSIGNED NOT NULL,
  `descripcionTrabajo` text DEFAULT NULL,
  `condiciones` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`condiciones`)),
  `TrabajosIncompatible` text DEFAULT NULL,
  `RiesgosFactores` text DEFAULT NULL,
  `TrabajosElectricos` varchar(255) NOT NULL DEFAULT 'NO',
  `TrabajosDeSoldadura` varchar(255) NOT NULL DEFAULT 'NO',
  `TrabajosEnAlturas` varchar(255) NOT NULL DEFAULT 'NO',
  `Escalera` varchar(255) NOT NULL DEFAULT 'NO',
  `Montacargas` varchar(255) NOT NULL DEFAULT 'NO',
  `Andamios` varchar(255) NOT NULL DEFAULT 'NO',
  `Techo` varchar(255) NOT NULL DEFAULT 'NO',
  `TrabajosDentroCocinadores` varchar(255) NOT NULL DEFAULT 'NO',
  `TrabajosTransportar` varchar(255) NOT NULL DEFAULT 'NO',
  `TrabajosLevantarObjetos` varchar(255) NOT NULL DEFAULT 'NO',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `supplier_id` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `area_machines`
--

CREATE TABLE `area_machines` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `plant_id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('spatie.permission.cache', 'a:3:{s:5:\"alias\";a:0:{}s:11:\"permissions\";a:0:{}s:5:\"roles\";a:0:{}}', 1738512267);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `classifications`
--

CREATE TABLE `classifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `classifications`
--

INSERT INTO `classifications` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Buildings', '2025-01-25 07:27:54', '2025-01-25 07:27:54'),
(2, 'Furniture', '2025-01-25 07:28:05', '2025-01-25 07:28:05'),
(3, 'General Install', '2025-01-25 07:28:09', '2025-01-25 07:28:09'),
(4, 'Land', '2025-01-25 07:28:15', '2025-01-25 07:28:15'),
(5, 'Machines & Equipm', '2025-01-25 07:28:20', '2025-01-25 07:28:20'),
(6, 'Office Hardware Software', '2025-01-25 07:28:25', '2025-01-25 07:28:25'),
(7, 'Other', '2025-01-25 07:28:30', '2025-01-25 07:28:30'),
(8, 'Vehicles', '2025-01-25 07:28:35', '2025-01-25 07:28:35'),
(9, 'Vessel & Fishing Equipment', '2025-01-25 07:28:41', '2025-01-25 07:28:41'),
(10, 'Warenhouse & Distrib', '2025-01-25 07:28:49', '2025-01-25 07:28:49');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `conditions`
--

CREATE TABLE `conditions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `cumple` varchar(255) NOT NULL,
  `observaciones` text DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `data`
--

CREATE TABLE `data` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `area` varchar(255) DEFAULT NULL,
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `group_1` varchar(255) DEFAULT NULL,
  `group_2` varchar(255) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `general_classification` varchar(255) DEFAULT NULL,
  `item_type` varchar(255) DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `qty` decimal(18,2) UNSIGNED DEFAULT 0.00,
  `unit_price` decimal(18,2) DEFAULT 0.00,
  `global_price` decimal(18,2) DEFAULT 0.00,
  `global_price_euros` decimal(18,2) DEFAULT 0.00,
  `stage` varchar(255) DEFAULT NULL,
  `real_value` decimal(18,2) DEFAULT 0.00,
  `real_value_euros` decimal(18,2) DEFAULT 0.00,
  `booked` decimal(18,2) DEFAULT 0.00,
  `booked_euros` decimal(18,2) DEFAULT 0.00,
  `percentage` int(11) DEFAULT 0,
  `executed_dollars` decimal(18,2) DEFAULT 0.00,
  `executed_euros` decimal(18,2) DEFAULT 0.00,
  `supplier` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `order_no` varchar(255) DEFAULT NULL,
  `input_num` varchar(255) DEFAULT NULL,
  `observations` varchar(2000) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `real_updated_at` varchar(10) DEFAULT NULL,
  `booked_updated_at` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `data`
--

INSERT INTO `data` (`id`, `area`, `project_id`, `group_1`, `group_2`, `description`, `general_classification`, `item_type`, `unit`, `qty`, `unit_price`, `global_price`, `global_price_euros`, `stage`, `real_value`, `real_value_euros`, `booked`, `booked_euros`, `percentage`, `executed_dollars`, `executed_euros`, `supplier`, `code`, `order_no`, `input_num`, `observations`, `created_at`, `updated_at`, `real_updated_at`, `booked_updated_at`) VALUES
(169, 'Eléctrica', 2, 'Software', 'Proceso', 'Desarrollo de aplicación, modulo INCENTIVOS. Alcance según especificado en archivo pdf', 'Por ejecutar', 'Mano de Obra', 'unidad', 1.00, 45000.00, 45000.00, 45000.00, 'Presupuesto', 0.00, 0.00, 0.00, 0.00, 0, 0.00, 0.00, NULL, NULL, NULL, NULL, NULL, '2025-02-02 00:57:50', '2025-02-02 00:57:50', NULL, NULL),
(170, 'Eléctrica', 2, 'Red Infraestructura', 'Equipo', 'Rack de comunicaciones para Raspado Ciesa 1', 'Por ejecutar', 'Activo', 'unidad', 1.00, 3027.95, 3027.95, 3027.95, 'Presupuesto', 0.00, 0.00, 0.00, 0.00, 0, 0.00, 0.00, NULL, NULL, NULL, NULL, NULL, '2025-02-02 00:57:50', '2025-02-02 00:57:50', NULL, NULL),
(171, 'Eléctrica', 2, 'Red Infraestructura', 'Equipo', 'MATERIAL REQUERIDO - PARA INSTALACIÓN DE PUNTOS\nUNIVERSALES VOZ / DATOS  : 30 puntos', 'Por ejecutar', 'Material', 'unidad', 1.00, 8075.70, 8075.70, 8075.70, 'Presupuesto', 0.00, 0.00, 0.00, 0.00, 0, 0.00, 0.00, NULL, NULL, NULL, NULL, NULL, '2025-02-02 00:57:50', '2025-02-02 00:57:50', NULL, NULL),
(172, 'Eléctrica', 2, 'Red Infraestructura', 'Equipo', 'MANO DE OBRA - PARA IMPLEMENTAR EN RACK DE COMUNICACIONES RASPADO CIESA 1', 'Por ejecutar', 'Activo', 'unidad', 1.00, 828.00, 828.00, 828.00, 'Presupuesto', 0.00, 0.00, 0.00, 0.00, 0, 0.00, 0.00, NULL, NULL, NULL, NULL, NULL, '2025-02-02 00:57:50', '2025-02-02 00:57:50', NULL, NULL),
(173, 'Eléctrica', 2, 'Red Infraestructura', 'Equipo', 'MANO DE OBRA - PARA INSTALACIÓN DE PUNTOS UNIVERSALES VOZ / DATOS: 30', 'Por ejecutar', 'Activo', 'unidad', 1.00, 3346.50, 3346.50, 3346.50, 'Presupuesto', 0.00, 0.00, 0.00, 0.00, 0, 0.00, 0.00, NULL, NULL, NULL, NULL, NULL, '2025-02-02 00:57:50', '2025-02-02 00:57:50', NULL, NULL),
(174, 'Eléctrica', 2, 'Red Infraestructura', 'Equipo', 'Rack de comunicaciones para Raspado Ciesa 2', 'Por ejecutar', 'Activo', 'unidad', 1.00, 3027.95, 3027.95, 3027.95, 'Presupuesto', 0.00, 0.00, 0.00, 0.00, 0, 0.00, 0.00, NULL, NULL, NULL, NULL, NULL, '2025-02-02 00:57:50', '2025-02-02 00:57:50', NULL, NULL),
(175, 'Eléctrica', 2, 'Red Infraestructura', 'Equipo', 'MATERIAL REQUERIDO - PARA INSTALACIÓN DE PUNTOS\nUNIVERSALES VOZ / DATOS  : 20 puntos Ciesa 2', 'Por ejecutar', 'Material', 'unidad', 1.00, 5556.80, 5556.80, 5556.80, 'Presupuesto', 0.00, 0.00, 0.00, 0.00, 0, 0.00, 0.00, NULL, NULL, NULL, NULL, NULL, '2025-02-02 00:57:50', '2025-02-02 00:57:50', NULL, NULL),
(176, 'Eléctrica', 2, 'Red Infraestructura', 'Equipo', 'MANO DE OBRA - PARA IMPLEMENTAR EN RACK DE COMUNICACIONES RASPADO CIESA 2', 'Por ejecutar', 'Activo', 'unidad', 1.00, 828.00, 828.00, 828.00, 'Presupuesto', 0.00, 0.00, 0.00, 0.00, 0, 0.00, 0.00, NULL, NULL, NULL, NULL, NULL, '2025-02-02 00:57:50', '2025-02-02 00:57:50', NULL, NULL),
(177, 'Eléctrica', 2, 'Red Infraestructura', 'Equipo', 'MANO DE OBRA - PARA INSTALACIÓN DE PUNTOS UNIVERSALES VOZ / DATOS: 20 Ciesa 2', 'Por ejecutar', 'Activo', 'unidad', 1.00, 2541.50, 2541.50, 2541.50, 'Presupuesto', 0.00, 0.00, 0.00, 0.00, 0, 0.00, 0.00, NULL, NULL, NULL, NULL, NULL, '2025-02-02 00:57:50', '2025-02-02 00:57:50', NULL, NULL),
(178, 'Eléctrica', 2, 'Red Infraestructura', 'Equipo', 'PARA IMPLEMENTACION NUEVO RACK DE COMUNICACIONES PARA INTERCONEXIÓN CIESA 1 Y 2', 'Por ejecutar', 'Activo', 'unidad', 1.00, 2325.30, 2325.30, 2325.30, 'Presupuesto', 0.00, 0.00, 0.00, 0.00, 0, 0.00, 0.00, NULL, NULL, NULL, NULL, NULL, '2025-02-02 00:57:50', '2025-02-02 00:57:50', NULL, NULL),
(179, 'Eléctrica', 2, 'Red Infraestructura', 'Equipo', 'MATERIAL REQUERIDO - PARA ACOMETIDA DE FIBRA OPTICA INTERCONEXION RACK DE COMUNICACIONES', 'Por ejecutar', 'Material', 'unidad', 1.00, 9087.30, 9087.30, 9087.30, 'Presupuesto', 0.00, 0.00, 0.00, 0.00, 0, 0.00, 0.00, NULL, NULL, NULL, NULL, NULL, '2025-02-02 00:57:50', '2025-02-02 00:57:50', NULL, NULL),
(180, 'Eléctrica', 2, 'Red Infraestructura', 'Equipo', 'MANO DE OBRA - ACOMETIDA DE FIBRA OPTICA', 'Por ejecutar', 'Activo', 'unidad', 1.00, 4554.00, 4554.00, 4554.00, 'Presupuesto', 0.00, 0.00, 0.00, 0.00, 0, 0.00, 0.00, NULL, NULL, NULL, NULL, NULL, '2025-02-02 00:57:50', '2025-02-02 00:57:50', NULL, NULL),
(181, 'Eléctrica', 2, 'Monitores', 'Equipo', 'Monitor TV Industrial ', 'Por ejecutar', 'Activo', 'unidad', 12.00, 1714.00, 20568.00, 20568.00, 'Presupuesto', 0.00, 0.00, 0.00, 0.00, 0, 0.00, 0.00, NULL, NULL, NULL, NULL, NULL, '2025-02-02 00:57:50', '2025-02-02 00:57:50', NULL, NULL),
(182, 'Eléctrica', 2, 'Monitores', 'Equipo', 'Intalación de TV Industrial con protector frontal contra golpes', 'Por ejecutar', 'Activo', 'unidad', 12.00, 350.00, 4200.00, 4200.00, 'Presupuesto', 0.00, 0.00, 0.00, 0.00, 0, 0.00, 0.00, NULL, NULL, NULL, NULL, NULL, '2025-02-02 00:57:50', '2025-02-02 00:57:50', NULL, NULL),
(183, 'Eléctrica', 2, 'Monitores', 'Equipo', 'Tablet industrial ', 'Por ejecutar', 'Activo', 'unidad', 2.00, 1400.00, 2800.00, 2800.00, 'Presupuesto', 0.00, 0.00, 0.00, 0.00, 0, 0.00, 0.00, NULL, NULL, NULL, NULL, NULL, '2025-02-02 00:57:50', '2025-02-02 00:57:50', NULL, NULL),
(184, 'Eléctrica', 2, 'Monitores', 'Equipo', 'PC de alto desempeño para cada planta', 'Por ejecutar', 'Activo', 'unidad', 2.00, 1500.00, 3000.00, 3000.00, 'Presupuesto', 0.00, 0.00, 0.00, 0.00, 0, 0.00, 0.00, NULL, NULL, NULL, NULL, NULL, '2025-02-02 00:57:50', '2025-02-02 00:57:50', NULL, NULL),
(185, 'Eléctrica', 2, 'Lectores', 'Equipo', 'Tarjeta plastica por operadora con codigo de barras', 'Por ejecutar', 'Material', 'unidad', 8000.00, 0.12, 960.00, 960.00, 'Presupuesto', 0.00, 0.00, 0.00, 0.00, 0, 0.00, 0.00, NULL, NULL, NULL, NULL, NULL, '2025-02-02 00:57:50', '2025-02-02 00:57:50', NULL, NULL),
(186, 'Eléctrica', 2, 'Lectores', 'Equipo', 'Lectores tipo industrial ', 'Por ejecutar', 'Activo', 'unidad', 6.00, 1100.00, 6600.00, 6600.00, 'Presupuesto', 0.00, 0.00, 0.00, 0.00, 0, 0.00, 0.00, NULL, NULL, NULL, NULL, NULL, '2025-02-02 00:57:50', '2025-02-02 00:57:50', NULL, NULL),
(187, 'Eléctrica', 2, 'Lectores', 'Equipo', 'Impresora para tarjetas de PVC', 'Por ejecutar', 'Activo', 'unidad', 1.00, 890.00, 890.00, 890.00, 'Presupuesto', 0.00, 0.00, 0.00, 0.00, 0, 0.00, 0.00, NULL, NULL, NULL, NULL, NULL, '2025-02-02 00:57:50', '2025-02-02 00:57:50', NULL, NULL),
(188, 'Eléctrica', 2, 'Red Infraestructura', 'Equipo', 'Cambio equipos balanza con mas problema', 'Por ejecutar', 'Activo', 'unidad', 2.00, 2500.00, 5000.00, 5000.00, 'Presupuesto', 0.00, 0.00, 0.00, 0.00, 0, 0.00, 0.00, NULL, NULL, NULL, NULL, NULL, '2025-02-02 00:57:50', '2025-02-02 00:57:50', NULL, NULL),
(189, 'Eléctrica', 2, 'Red Infraestructura', 'Proceso', 'Contingencia ', 'Por ejecutar', 'Activo', 'unidad', 1.00, 16283.00, 16283.00, 16283.00, 'Presupuesto', 0.00, 0.00, 0.00, 0.00, 0, 0.00, 0.00, NULL, NULL, NULL, NULL, NULL, '2025-02-02 00:57:50', '2025-02-02 00:57:50', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `investments`
--

CREATE TABLE `investments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `investments`
--

INSERT INTO `investments` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Innovation', '2025-01-25 07:23:31', '2025-01-25 07:23:31'),
(2, 'Efficiency & Saving', '2025-01-25 07:23:36', '2025-01-25 07:23:36'),
(3, 'Replacement & Restructuring', '2025-01-25 07:23:42', '2025-01-25 07:23:42'),
(4, 'Quality & Hygiene', '2025-01-25 07:23:47', '2025-01-25 07:23:47'),
(5, 'Health & Safety', '2025-01-25 07:23:52', '2025-01-25 07:23:52'),
(6, 'Environment', '2025-01-25 07:23:58', '2025-01-25 07:23:58'),
(7, 'Maintenance', '2025-01-25 07:24:03', '2025-01-25 07:24:03'),
(8, 'Capacity Increase', '2025-01-25 07:24:06', '2025-01-25 07:24:06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `justifications`
--

CREATE TABLE `justifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `justifications`
--

INSERT INTO `justifications` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Normal Capex', '2025-01-25 07:24:55', '2025-01-25 07:24:55'),
(2, 'Special Project', '2025-01-25 07:25:01', '2025-01-25 07:25:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_06_22_074053_create_plants_table', 1),
(5, '2024_06_30_073140_create_permission_tables', 1),
(6, '2024_10_17_025549_create_area_machines_table', 1),
(7, '2024_10_17_032208_create_suppliers_table', 1),
(8, '2024_10_17_040554_create_conditions_table', 1),
(9, '2024_10_17_044836_create_approval_table', 1),
(10, '2024_10_20_230806_update_approvals_add_supplier_id', 1),
(11, '2025_01_24_203855_create_states_table', 1),
(12, '2025_01_24_204725_create_justifications_table', 1),
(13, '2025_01_24_205017_create_investments_table', 1),
(14, '2025_01_24_205248_create_classifications', 1),
(15, '2025_01_24_205633_create_projects_table', 1),
(16, '2025_02_01_102132_create_data_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `model_has_permissions`
--

INSERT INTO `model_has_permissions` (`permission_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1),
(2, 'App\\Models\\User', 1),
(3, 'App\\Models\\User', 1),
(4, 'App\\Models\\User', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'Create Project', 'web', '2025-02-01 16:12:02', '2025-02-01 16:12:02'),
(2, 'Edit Project', 'web', '2025-02-01 16:12:11', '2025-02-01 16:12:11'),
(3, 'Delete Project', 'web', '2025-02-01 16:12:19', '2025-02-01 16:12:19'),
(4, 'Update Project', 'web', '2025-02-01 16:12:43', '2025-02-01 16:12:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plants`
--

CREATE TABLE `plants` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `plants`
--

INSERT INTO `plants` (`id`, `name`, `country`, `city`, `created_at`, `updated_at`) VALUES
(1, 'CIESA 1', 'Ecuador', 'Manta', '2025-01-25 10:14:48', '2025-01-25 10:14:48'),
(2, 'CIESA 2', 'ECUADOR', 'Manta', '2025-01-25 10:15:02', '2025-01-25 10:15:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `projects`
--

CREATE TABLE `projects` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `pda_code` varchar(255) NOT NULL,
  `data_uploaded` tinyint(1) NOT NULL DEFAULT 0,
  `rate` double NOT NULL,
  `plant_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `state_id` bigint(20) UNSIGNED NOT NULL,
  `justification_id` bigint(20) UNSIGNED NOT NULL,
  `investment_id` bigint(20) UNSIGNED NOT NULL,
  `classification_id` bigint(20) UNSIGNED NOT NULL,
  `start_date` date NOT NULL,
  `finish_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `projects`
--

INSERT INTO `projects` (`id`, `name`, `pda_code`, `data_uploaded`, `rate`, `plant_id`, `user_id`, `state_id`, `justification_id`, `investment_id`, `classification_id`, `start_date`, `finish_date`, `created_at`, `updated_at`) VALUES
(1, 'Danilo-tech', 'test', 0, 1, 1, 1, 1, 2, 5, 8, '2025-02-05', '2025-03-08', '2025-02-01 16:13:51', '2025-02-02 00:57:24'),
(2, 'Test Empresa 1', 'erre', 1, 1, 2, 1, 1, 1, 3, 6, '2025-01-29', '2025-03-07', '2025-02-01 23:29:16', '2025-02-02 00:57:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'Project', 'web', '2025-02-01 16:12:56', '2025-02-01 16:12:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('BrnlFp2RQaQOneaIJrDCUyKchpxCflienBVGOsjs', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36', 'YTo3OntzOjY6Il90b2tlbiI7czo0MDoiZU00endjZHVBVHdJSkVGcWdQQjBQb0lsWnRaWlZzVjJuN0pwbnRtTCI7czozOiJ1cmwiO2E6MDp7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjMyOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvcHJvamVjdHMvMiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjE7czoxNzoicGFzc3dvcmRfaGFzaF93ZWIiO3M6NjA6IiQyeSQxMiRDNWdLTEE0SkhyYmVqeFFhdnBNbWkueVYwVmZaU283aE5SWVNLcjVIRDloVC83TDJNY3R6bSI7czo4OiJmaWxhbWVudCI7YTowOnt9fQ==', 1738466524);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `states`
--

CREATE TABLE `states` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `states`
--

INSERT INTO `states` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Planification', '2025-01-25 07:21:15', '2025-01-25 07:21:15'),
(2, 'Execution', '2025-01-25 07:21:21', '2025-01-25 07:21:21'),
(3, 'Finished', '2025-01-25 07:21:26', '2025-01-25 07:21:26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `suppliers`
--

CREATE TABLE `suppliers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `city` varchar(255) DEFAULT NULL,
  `phone_business` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Danilo', 'danilogrnd@gmail.com', NULL, '$2y$12$C5gKLA4JHrbejxQavpMmi.yV0VfZSo7hNRYSKr5HD9hT/7L2Mctzm', NULL, '2025-02-01 16:04:09', '2025-02-01 16:04:09');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `approvals`
--
ALTER TABLE `approvals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `approvals_user_id_foreign` (`user_id`),
  ADD KEY `approvals_plant_id_foreign` (`plant_id`),
  ADD KEY `approvals_area_machine_id_foreign` (`area_machine_id`),
  ADD KEY `approvals_supplier_id_foreign` (`supplier_id`);

--
-- Indices de la tabla `area_machines`
--
ALTER TABLE `area_machines`
  ADD PRIMARY KEY (`id`),
  ADD KEY `area_machines_plant_id_foreign` (`plant_id`);

--
-- Indices de la tabla `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `classifications`
--
ALTER TABLE `classifications`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `classifications_name_unique` (`name`);

--
-- Indices de la tabla `conditions`
--
ALTER TABLE `conditions`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `data`
--
ALTER TABLE `data`
  ADD PRIMARY KEY (`id`),
  ADD KEY `data_project_id_foreign` (`project_id`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `investments`
--
ALTER TABLE `investments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `investments_name_unique` (`name`);

--
-- Indices de la tabla `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indices de la tabla `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `justifications`
--
ALTER TABLE `justifications`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `justifications_name_unique` (`name`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indices de la tabla `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indices de la tabla `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indices de la tabla `plants`
--
ALTER TABLE `plants`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projects_plant_id_foreign` (`plant_id`),
  ADD KEY `projects_user_id_foreign` (`user_id`),
  ADD KEY `projects_state_id_foreign` (`state_id`),
  ADD KEY `projects_justification_id_foreign` (`justification_id`),
  ADD KEY `projects_investment_id_foreign` (`investment_id`),
  ADD KEY `projects_classification_id_foreign` (`classification_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indices de la tabla `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indices de la tabla `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `states_name_unique` (`name`);

--
-- Indices de la tabla `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `approvals`
--
ALTER TABLE `approvals`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `area_machines`
--
ALTER TABLE `area_machines`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `classifications`
--
ALTER TABLE `classifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `conditions`
--
ALTER TABLE `conditions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `data`
--
ALTER TABLE `data`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=190;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `investments`
--
ALTER TABLE `investments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `justifications`
--
ALTER TABLE `justifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `plants`
--
ALTER TABLE `plants`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `projects`
--
ALTER TABLE `projects`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `states`
--
ALTER TABLE `states`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `approvals`
--
ALTER TABLE `approvals`
  ADD CONSTRAINT `approvals_area_machine_id_foreign` FOREIGN KEY (`area_machine_id`) REFERENCES `area_machines` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `approvals_plant_id_foreign` FOREIGN KEY (`plant_id`) REFERENCES `plants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `approvals_supplier_id_foreign` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `approvals_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `area_machines`
--
ALTER TABLE `area_machines`
  ADD CONSTRAINT `area_machines_plant_id_foreign` FOREIGN KEY (`plant_id`) REFERENCES `plants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `data`
--
ALTER TABLE `data`
  ADD CONSTRAINT `data_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_classification_id_foreign` FOREIGN KEY (`classification_id`) REFERENCES `classifications` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `projects_investment_id_foreign` FOREIGN KEY (`investment_id`) REFERENCES `investments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `projects_justification_id_foreign` FOREIGN KEY (`justification_id`) REFERENCES `justifications` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `projects_plant_id_foreign` FOREIGN KEY (`plant_id`) REFERENCES `plants` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `projects_state_id_foreign` FOREIGN KEY (`state_id`) REFERENCES `states` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `projects_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
