// diagnostico.js - Debe estar en D:\descargas\APPSALUD2\
const fs = require('fs');
const path = require('path');

console.log('=== DIAGNÓSTICO CORREGIDO ===\n');

// 1. Verificar estructura
console.log('1. ESTRUCTURA DESDE RAÍZ:');
const basePath = __dirname;
const checkFolders = [
    'src',
    'src/controllers',
    'src/routes', 
    'src/views',
    'src/repositories',
    'src/public'
];

checkFolders.forEach(folder => {
    const fullPath = path.join(basePath, folder);
    const exists = fs.existsSync(fullPath);
    console.log(`${exists ? '✅' : '❌'} ${folder} -> ${fullPath}`);
});

// 2. Verificar archivos críticos con rutas absolutas
console.log('\n2. ARCHIVOS CRÍTICOS:');
const checkFiles = [
    'src/controllers/pacienteController.js',
    'src/routes/paciente.js',
    'src/repositories/PacienteRepository.js',
    'src/views/index.ejs',
    'src/APP.js'
];

checkFiles.forEach(file => {
    const fullPath = path.join(basePath, file);
    const exists = fs.existsSync(fullPath);
    console.log(`${exists ? '✅' : '❌'} ${file}`);
});

// 3. Verificar pacienteController desde raíz
console.log('\n3. PROBANDO CARGA DESDE RAÍZ:');
try {
    const controllerPath = path.join(basePath, 'src/controllers/pacienteController.js');
    const controller = require(controllerPath);
    console.log('✅ Controller cargado desde:', controllerPath);
    console.log('   Métodos:', Object.keys(controller).join(', '));
} catch (err) {
    console.log('❌ Error:', err.message);
    console.log('   Stack:', err.stack);
}

// 4. Verificar contenido de APP.js
console.log('\n4. EJECUTANDO APP.JS DE FORMA SIMPLIFICADA:');
try {
    // Prueba mínima
    const express = require('express');
    const testApp = express();
    testApp.set('view engine', 'ejs');
    testApp.set('views', path.join(basePath, 'src/views'));
    
    // Ruta de prueba
    testApp.get('/test-simple', (req, res) => {
        res.render('index', {
            title: 'Test Simple',
            pacientes: [{id: 1, nombre: 'Test', apellidos: 'Simple', fechaDeNacimiento: '2000-01-01'}],
            message: 'Vista funciona correctamente'
        });
    });
    
    console.log('✅ Configuración Express correcta');
    console.log('   Prueba en: http://localhost:3001/test-simple');
    
    testApp.listen(3001, () => {
        console.log('   Servidor de prueba iniciado en puerto 3001');
    });
    
} catch (err) {
    console.log('❌ Error:', err.message);
}