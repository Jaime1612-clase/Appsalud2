-- 1. Crear la base de datos
CREATE DATABASE IF NOT EXISTS appSalud;
USE appSalud;

-- 2. Crear la tabla de pacientes
CREATE TABLE IF NOT EXISTS pacientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  fechaDeNacimiento DATE NOT NULL,
  peso FLOAT NULL,
  temperatura FLOAT NULL
);

-- 3. Crear la tabla de basculas
CREATE TABLE IF NOT EXISTS basculas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  paciente_id INT NOT NULL,
  peso FLOAT NOT NULL,
  altura FLOAT NOT NULL,
  fecha DATE NOT NULL,
  FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);

-- 4. Insertar el paciente de ejemplo
INSERT INTO pacientes (nombre, apellidos, fechaDeNacimiento, peso, temperatura)
VALUES ('Jaime', 'Carrasco', '1999-11-18', 70.0, 36.6);

-- 5. Insertar registros de bascula asociados al paciente
INSERT INTO basculas (paciente_id, peso, altura, fecha)
VALUES
(1, 75.5, 1.60, '2021-10-29'),
(1, 63.45, 1.61, '2021-11-03'),
(1, 61.90, 1.61, '2021-11-11');