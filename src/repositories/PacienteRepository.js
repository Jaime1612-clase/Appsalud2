const pool = require('../db/mysql');
const Paciente = require('../models/paciente');

const listar = async () => {
    const [results] = await pool.query('SELECT * FROM pacientes');
    const pacientes = results.map(p => new Paciente(
        p.id,
        p.nombre,
        p.apellidos,
        p.fechaDeNacimiento
    ));
    return pacientes;
};

const crear = async (paciente) => {
    const [results] = await pool.query('INSERT INTO pacientes (nombre, apellidos, fechaDeNacimiento) VALUES (?, ?, ?)',
        [paciente.nombre, paciente.apellidos, paciente.fechaDeNacimiento]);
    const nuevoPaciente = new Paciente(
        results.insertId,
        paciente.nombre,
        paciente.apellidos,
        paciente.fechaDeNacimiento
    );
    return nuevoPaciente;
}

const buscarPorId = async (id) => {
    const [results] = await pool.query('SELECT * FROM pacientes WHERE id = ?', [id]);
    if (results.length === 0) {
        return null;
    }
    const p = results[0];
    const paciente = new Paciente(
        p.id,
        p.nombre,
        p.apellidos,
        p.fechaDeNacimiento
    );
    return paciente;
}

const actualizar = async (paciente) => {
    await pool.query('UPDATE pacientes SET nombre = ?, apellidos = ?, fechaDeNacimiento = ? WHERE id = ?',
        [paciente.nombre, paciente.apellidos, paciente.fechaDeNacimiento, paciente.id]);
    return new Paciente(
        paciente.id,
        paciente.nombre,
        paciente.apellidos,
        paciente.fechaDeNacimiento
    );
}

const eliminar = async (id) => {
    const [results] = await pool.query('DELETE FROM pacientes WHERE id = ?', [id]);
    if (results.affectedRows === 0) {
        return false;
    }
    return true;
}

// EXPORTA CON LOS NOMBRES QUE USA EL CONTROLLER
module.exports = {
    listar,
    crear,        
    buscarPorId,
    actualizar,
    eliminar
};