const pool = require('../db/mysql');
const Paciente = require('../models/Paciente');

const convertirFecha = (fecha) => {
    if (!fecha) return '2000-01-01';
    if (fecha instanceof Date) return fecha.toISOString().slice(0, 10);
    return fecha;
};

const listar = async () => {
    const [results] = await pool.query('SELECT * FROM pacientes');

    const pacientes = results.map(p => new Paciente(
        p.id,
        p.nombre,
        p.apellidos,
        convertirFecha(p.fechanacimiento) 
    ));

    return pacientes;
};

const guardar = async (paciente) => {
    const [results] = await pool.query(
        'INSERT INTO pacientes (nombre, apellidos, fechanacimiento) VALUES (?, ?, ?)',
        [paciente.nombre, paciente.apellidos, paciente.fechaNacimiento]
    );

    return new Paciente(
        results.insertId,
        paciente.nombre,
        paciente.apellidos,
        convertirFecha(paciente.fechaNacimiento)
    );
};

const buscarPorId = async (id) => {
    const [results] = await pool.query('SELECT * FROM pacientes WHERE id = ?', [id]);
    if (results.length === 0) return null;

    const p = results[0];
    return new Paciente(
        p.id,
        p.nombre,
        p.apellidos,
        convertirFecha(p.fechanacimiento) // <-- convertir aquí también
    );
};

const actualizar = async (paciente) => {
    await pool.query(
        'UPDATE pacientes SET nombre = ?, apellidos = ?, fechanacimiento = ? WHERE id = ?',
        [paciente.nombre, paciente.apellidos, paciente.fechaNacimiento, paciente.id]
    );

    return new Paciente(
        paciente.id,
        paciente.nombre,
        paciente.apellidos,
        convertirFecha(paciente.fechaNacimiento)
    );
};

const eliminar = async (id) => {
    const [results] = await pool.query('DELETE FROM pacientes WHERE id = ?', [id]);
    return results.affectedRows > 0;
};

module.exports = { listar, guardar, buscarPorId, actualizar, eliminar };
