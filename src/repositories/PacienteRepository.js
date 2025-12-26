const pool = require('../db/mysql');
const Paciente = require('../models/Paciente');

const listar = async () => {
    try {
        const [results] = await pool.query('SELECT * FROM pacientes');

        const pacientes = results.map(p => {
            // Convertir cualquier objeto Date a string YYYY-MM-DD
            let fechaStr;
            if (p.fechanacimiento instanceof Date) {
                fechaStr = p.fechanacimiento.toISOString().slice(0, 10);
            } else {
                fechaStr = p.fechanacimiento;
            }

            return new Paciente(
                p.nombre,
                p.apellidos,
                fechaStr
            );
        });

        return pacientes;
    } catch (err) {
        console.error('Error en DB listar pacientes:', err.message || err);
        throw err;
    }
};

module.exports = { listar };
