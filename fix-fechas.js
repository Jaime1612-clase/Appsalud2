// verificar-fechas.js
const pool = require('./src/db/mysql');

async function verificarFechas() {
    console.log('=== VERIFICANDO FORMATO DE FECHAS EN LA BASE DE DATOS ===\n');
    
    try {
        // 1. Ver estructura de la tabla
        const [structure] = await pool.query("DESCRIBE pacientes");
        console.log('1. ESTRUCTURA DE TABLA "pacientes":');
        structure.forEach(col => {
            console.log(`   ${col.Field}: ${col.Type} ${col.Null === 'YES' ? '(NULL)' : '(NOT NULL)'}`);
        });
        
        // 2. Ver datos actuales
        const [rows] = await pool.query('SELECT id, nombre, fechaDeNacimiento FROM pacientes LIMIT 5');
        console.log('\n2. PRIMEROS 5 REGISTROS:');
        
        if (rows.length === 0) {
            console.log('   No hay registros en la tabla pacientes');
        } else {
            rows.forEach(row => {
                console.log(`\n   ID: ${row.id}`);
                console.log(`   Nombre: ${row.nombre}`);
                console.log(`   Fecha cruda: "${row.fechaDeNacimiento}"`);
                console.log(`   Tipo JavaScript: ${typeof row.fechaDeNacimiento}`);
                console.log(`   Es Date? ${row.fechaDeNacimiento instanceof Date}`);
                console.log(`   Es string? ${typeof row.fechaDeNacimiento === 'string'}`);
                
                // Intentar convertir a Date
                try {
                    const fecha = new Date(row.fechaDeNacimiento);
                    console.log(`   Conversión a Date: ${fecha}`);
                    console.log(`   ¿Fecha válida? ${!isNaN(fecha.getTime())}`);
                    
                    if (!isNaN(fecha.getTime())) {
                        console.log(`   Año: ${fecha.getFullYear()}`);
                        console.log(`   Mes: ${fecha.getMonth() + 1}`);
                        console.log(`   Día: ${fecha.getDate()}`);
                        console.log(`   ISO: ${fecha.toISOString()}`);
                        console.log(`   Formato YYYY-MM-DD: ${fecha.toISOString().split('T')[0]}`);
                    }
                } catch (err) {
                    console.log(`   Error al convertir: ${err.message}`);
                }
            });
        }
        
        // 3. Probar insertar una fecha de prueba
        console.log('\n3. PROBANDO INSERCIÓN DE FECHA DE PRUEBA:');
        const fechaPrueba = '1990-05-15';
        console.log(`   Insertando fecha: "${fechaPrueba}"`);
        
        try {
            await pool.query('INSERT INTO pacientes (nombre, apellidos, fechaDeNacimiento) VALUES (?, ?, ?)', 
                ['Test', 'Usuario', fechaPrueba]);
            console.log('   ✅ Fecha insertada correctamente');
            
            // Verificar cómo se guardó
            const [testRow] = await pool.query('SELECT fechaDeNacimiento FROM pacientes WHERE nombre = "Test" ORDER BY id DESC LIMIT 1');
            console.log(`   Recuperada de BD: "${testRow[0].fechaDeNacimiento}"`);
            
            // Limpiar
            await pool.query('DELETE FROM pacientes WHERE nombre = "Test"');
            console.log('   Registro de prueba eliminado');
        } catch (err) {
            console.log(`   ❌ Error al insertar: ${err.message}`);
        }
        
    } catch (err) {
        console.error('\n❌ ERROR GENERAL:', err.message);
        console.error(err.stack);
    } finally {
        console.log('\n=== VERIFICACIÓN COMPLETADA ===');
        await pool.end();
    }
}

verificarFechas();