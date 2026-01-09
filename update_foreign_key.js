// update_foreign_key.js es un script para actualizar la clave foránea en la tabla 'basculas' para que tenga la opción ON DELETE CASCADE.
// Esto asegura que cuando se elimina un paciente, todas las básculas asociadas a ese paciente también se eliminen automáticamente.
const pool = require('./src/db/mysql');

async function updateForeignKey() {
  try {
    await pool.query('ALTER TABLE basculas DROP FOREIGN KEY basculas_ibfk_1');
    await pool.query(`
      ALTER TABLE basculas
      ADD CONSTRAINT basculas_ibfk_1
      FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
      ON DELETE CASCADE
    `);
    console.log('Clave foránea actualizada con ON DELETE CASCADE');
  } catch (err) {
    console.error('Error actualizando la clave foránea:', err.message);
  } finally {
    pool.end();
  }
}

updateForeignKey();
