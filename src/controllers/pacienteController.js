const pacienteRepository = require('../repositories/PacienteRepository');
const Paciente = require('../models/Paciente');

const obtenerPaciente = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).send('El ID de paciente es obligatorio');

        const paciente = await pacienteRepository.buscarPorId(id);

        res.render('Buscar', {
            title: 'App Salud',
            message: paciente ? 'Paciente encontrado' : 'Paciente no encontrado',
            paciente: paciente || null,
            csrfToken: req.csrfToken ? req.csrfToken() : ''
        });
    } catch (err) {
        console.error('Error al obtener paciente:', err);
        res.status(500).send('Error al obtener paciente desde la base de datos');
    }
};

const crearPaciente = async (req, res) => {
    const { nombre, apellidos, fechaDeNacimiento, peso, temperatura } = req.body;
    if (!nombre || !apellidos || !fechaDeNacimiento) {
        return res.render('index', {
            title: 'APP Salud',
            pacientes: await pacienteRepository.listar(),
            message: 'Nombre, apellidos y fecha de nacimiento son obligatorios',
            csrfToken: req.csrfToken ? req.csrfToken() : ''
        });
    }
    await pacienteRepository.crear({ nombre, apellidos, fechaDeNacimiento, peso: peso ? Number(peso) : null, temperatura: temperatura ? Number(temperatura) : null });
    req.session.message = 'Paciente creado correctamente';
    res.redirect('/pacientes');
};

const mostrarFormularioActualizarPaciente = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.redirect('/pacientes');
    }
    const paciente = await pacienteRepository.buscarPorId(id);
    res.render('actualizarPaciente', {  
        title: 'APP Salud',
        paciente: paciente || null,
        message: 'Actualizar paciente',
        csrfToken: req.csrfToken ? req.csrfToken() : ''
    });
}


const actualizarPaciente = async (req, res) => {
    const id = req.params.id;
    const { nombre, apellidos, fechaNacimiento, peso, temperatura } = req.body;
    // Normalizar fecha para evitar problemas con campos vacíos o mal formateados
    const fechaValida = fechaNacimiento && !isNaN(new Date(fechaNacimiento).getTime());
    if (!nombre || !apellidos || !fechaValida) {
        const paciente = await pacienteRepository.buscarPorId(id);
        return res.render('actualizarPaciente', {
            title: 'APP Salud',
            paciente,
            message: 'Error: Nombre, apellidos y fecha de nacimiento son obligatorios',
            csrfToken: req.csrfToken ? req.csrfToken() : ''
        });
    }
    const pacienteActualizado = new Paciente(id, nombre, apellidos, fechaNacimiento, peso ? Number(peso) : null, temperatura ? Number(temperatura) : null);
    await pacienteRepository.actualizar(pacienteActualizado);
    res.redirect('/pacientes');
};

const eliminarPaciente = async (req, res) => {
    const id = req.params.id;
    const eliminado = await pacienteRepository.eliminar(id);
    const message = eliminado ? 'Paciente eliminado correctamente' : 'No se encontró el paciente a eliminar';
    req.session.message = message;
    res.redirect('/pacientes');
};

const listarPacientes = async (req, res) => {
    try {
        const pacientes = await pacienteRepository.listar();
        const message = req.session.message;
        delete req.session.message;
        res.render('index', {
            title: 'APP Salud',
            pacientes,
            message,
            csrfToken: req.csrfToken ? req.csrfToken() : ''
        });
    } catch (err) {
        console.error('Error al listar pacientes:', err.message || err);
        res.status(500).send('Error al obtener pacientes desde la base de datos');
    }
};

module.exports = {
    obtenerPaciente,
    crearPaciente,
    actualizarPaciente,
    eliminarPaciente,
    listarPacientes,
    mostrarFormularioActualizarPaciente
    
};
