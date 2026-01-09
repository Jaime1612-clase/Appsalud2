const express = require('express');
const router = express.Router();


const pacienteController = require('../controllers/pacienteController');

router.get('/', pacienteController.listarPacientes);  
router.get('/:id', pacienteController.obtenerPaciente);
router.post('/', pacienteController.crearPaciente);
router.put('/:id', pacienteController.actualizarPaciente);
router.get('/editar/:id', pacienteController.mostrarFormularioActualizarPaciente);
router.delete('/:id', pacienteController.eliminarPaciente);

module.exports = router;