-- Esquema de base de datos para gestión de usuarios, proyectos, tareas y tarifas
CREATE DATABASE IF NOT EXISTS gestion_proyectos DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gestion_proyectos;

-- Usuarios
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(200) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Proyectos
CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Tarifa de usuario por proyecto (rate)
CREATE TABLE IF NOT EXISTS user_project_rates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  project_id INT NOT NULL,
  rate DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY ux_user_project (user_id, project_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Tareas
CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  project_id INT NOT NULL,
  description VARCHAR(500) NOT NULL,
  hours DECIMAL(6,2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Datos de ejemplo
INSERT INTO users (name, email) VALUES
('Ana Pérez', 'ana@example.com'),
('Luis Gómez', 'luis@example.com')
ON DUPLICATE KEY UPDATE email = email;

INSERT INTO projects (name, description) VALUES
('Proyecto Alpha', 'Proyecto para cliente Alpha'),
('Proyecto Beta', 'Proyecto interno Beta')
ON DUPLICATE KEY UPDATE name = name;

-- Asociar tarifas por usuario y proyecto
INSERT INTO user_project_rates (user_id, project_id, rate) VALUES
(1, 1, 35.00),
(1, 2, 30.00),
(2, 1, 40.00)
ON DUPLICATE KEY UPDATE rate = VALUES(rate);

-- Tareas de ejemplo
INSERT INTO tasks (user_id, project_id, description, hours) VALUES
(1, 1, 'Diseño de arquitectura', 5.50),
(1, 2, 'Implementación módulo X', 3.25),
(2, 1, 'Revisión de código', 2.00)
ON DUPLICATE KEY UPDATE description = description;
