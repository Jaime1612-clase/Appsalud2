CREATE DATABASE IF NOT EXISTS appsalud;
USE appsalud;

-- 2. Crear la tabla de pacientes
CREATE TABLE IF NOT EXISTS pacientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(180) NOT NULL,
    apellidos VARCHAR(180) NOT NULL,
    fechanacimiento DATE NOT NULL
);

-- 3. Crear la tabla de básculas
CREATE TABLE IF NOT EXISTS basculas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT NOT NULL,
    peso FLOAT NOT NULL,
    altura FLOAT NOT NULL,
    fecha DATE NOT NULL,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);

-- 4. Insertar el paciente de ejemplo
INSERT INTO pacientes (nombre, apellidos, fechanacimiento)
VALUES ('Jaime', 'Carrasco', '2003-02-23');

-- 5. Insertar los registros de báscula asociados al paciente
-- Obtén el id del paciente recién insertado (asumimos que es 1)
INSERT INTO basculas (paciente_id, peso, altura, fecha)
VALUES
    (1, 75.5, 1.60, '2021-10-29'),
    (1, 63.45, 1.61, '2021-11-03'),
    (1, 61.90, 1.61, '2021-11-11');