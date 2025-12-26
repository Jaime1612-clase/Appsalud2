const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

router.get('/:id', pacienteController.obtenerPaciente);
router.get('/', pacienteController.listarPacientes);
router.post('/', pacienteController.crearPaciente);
router.put('/:id', pacienteController.actualizarPaciente);
router.delete('/:id', pacienteController.eliminarPaciente);
router.get('/editar/:id', pacienteController.mostrarFormularioActualizarPaciente);

module.exports = router;
