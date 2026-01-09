const pool = require('../db/mysql');
const Paciente = require('../models/Paciente');

const listar = async () => {
    // Asegurar columnas opcionales
    try {
        await pool.query('ALTER TABLE pacientes ADD COLUMN IF NOT EXISTS peso FLOAT NULL');
        await pool.query('ALTER TABLE pacientes ADD COLUMN IF NOT EXISTS temperatura FLOAT NULL');
    } catch (e) {
        // Ignorar si la versión de MySQL no soporta IF NOT EXISTS
    }
    const [results] = await pool.query('SELECT * FROM pacientes');
    const pacientes = results.map(p => new Paciente(
        p.id,
        p.nombre,
        p.apellidos,
        p.fechaDeNacimiento,
        p.peso,
        p.temperatura
    ));
    return pacientes;
};

const crear = async (paciente) => {
    // Asegurar columnas
    try {
        await pool.query('ALTER TABLE pacientes ADD COLUMN IF NOT EXISTS peso FLOAT NULL');
        await pool.query('ALTER TABLE pacientes ADD COLUMN IF NOT EXISTS temperatura FLOAT NULL');
    } catch (e) {}

    const [results] = await pool.query('INSERT INTO pacientes (nombre, apellidos, fechaDeNacimiento, peso, temperatura) VALUES (?, ?, ?, ?, ?)',
        [paciente.nombre, paciente.apellidos, paciente.fechaDeNacimiento, paciente.peso || null, paciente.temperatura || null]);
    
    return new Paciente(
        results.insertId,
        paciente.nombre,
        paciente.apellidos,
        paciente.fechaDeNacimiento,
        paciente.peso || null,
        paciente.temperatura || null
    );
}
// Buscar paciente por ID
const buscarPorId = async (id) => {
    try {
        await pool.query('ALTER TABLE pacientes ADD COLUMN IF NOT EXISTS peso FLOAT NULL');
        await pool.query('ALTER TABLE pacientes ADD COLUMN IF NOT EXISTS temperatura FLOAT NULL');
    } catch (e) {}
    const [results] = await pool.query('SELECT * FROM pacientes WHERE id = ?', [id]);
    if (results.length === 0) {
        return null;
    }
    const p = results[0];
    return new Paciente(
        p.id,
        p.nombre,
        p.apellidos,
        p.fechaDeNacimiento,
        p.peso,
        p.temperatura  
    );
}
// Actualizar paciente existente
const actualizar = async (paciente) => {
    try {
        await pool.query('ALTER TABLE pacientes ADD COLUMN IF NOT EXISTS peso FLOAT NULL');
        await pool.query('ALTER TABLE pacientes ADD COLUMN IF NOT EXISTS temperatura FLOAT NULL');
    } catch (e) {}

    await pool.query('UPDATE pacientes SET nombre = ?, apellidos = ?, fechaDeNacimiento = ?, peso = ?, temperatura = ? WHERE id = ?',
        [
            paciente.nombre,
            paciente.apellidos,
            paciente.fechaDeNacimiento instanceof Date
                ? paciente.fechaDeNacimiento.toISOString().slice(0, 10)
                : (typeof paciente.fechaDeNacimiento === 'string' && paciente.fechaDeNacimiento.length === 10
                    ? paciente.fechaDeNacimiento
                    : null),
            (paciente.peso !== undefined && paciente.peso !== null && paciente.peso !== '') ? Number(paciente.peso) : null,
            (paciente.temperatura !== undefined && paciente.temperatura !== null && paciente.temperatura !== '') ? Number(paciente.temperatura) : null,
            paciente.id
        ]);
    
    return new Paciente(
        paciente.id,
        paciente.nombre,
        paciente.apellidos,
        paciente.fechaNacimiento,
        paciente.peso || null,
        paciente.temperatura || null
    );
}
// Eliminar paciente por ID
const eliminar = async (id) => {
    const [results] = await pool.query('DELETE FROM pacientes WHERE id = ?', [id]);
    
    // Reiniciar AUTO_INCREMENT al máximo ID actual + 1, Esto es para que cuando crees un paciente nuevo, se reinice el ID y no queden huecos en la numeración.
    if (results.affectedRows > 0) {
        const [maxIdResult] = await pool.query('SELECT MAX(id) as maxId FROM pacientes');
        const nextId = (maxIdResult[0].maxId || 0) + 1;
        await pool.query(`ALTER TABLE pacientes AUTO_INCREMENT = ${nextId}`);
    }
    
    return results.affectedRows > 0;
}

module.exports = {
    listar,
    crear,
    buscarPorId,
    actualizar,
    eliminar
};