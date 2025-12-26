const pool = require('../db/mysql');
const Paciente = require('../models/Paciente');

const listar = async () => {
    try {
        const [results] = await pool.query('SELECT * FROM pacientes');

        const pacientes = results.map(p => new Paciente(
            p.id,
            p.nombre,
            p.apellidos,
            p.fechanacimiento
        ));

        return pacientes;
    } catch (err) {
        console.error('Error en DB listar pacientes:', err.message || err);
        throw err;
    }
};

module.exports = { listar };
