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
            paciente: paciente || null // importante: siempre pasar
        });
    } catch (err) {
        console.error('Error al obtener paciente:', err);
        res.status(500).send('Error al obtener paciente desde la base de datos');
    }
};

const crearPaciente = async (req, res) => {
    const { nombre, apellidos, fechaDeNacimiento } = req.body;
    if (!nombre || !apellidos || !fechaDeNacimiento) {
        return res.render('index', {
            title: 'APP Salud',
            pacientes: await pacienteRepository.listar(),
            message: 'Todos los campos son obligatorios para crear un paciente'
        });
    }
    //Guardar el nuevo paciente
    await pacienteRepository.crear({ nombre, apellidos, fechaDeNacimiento });
    const pacientes = await pacienteRepository.listar();
    res.render('index', {
        title: 'APP Salud',
        pacientes,
        message: 'Paciente creado correctamente'
    });
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
        message: 'Actualizar paciente'
    });
}


const actualizarPaciente = async (req, res) => {
    const id = req.params.id;
    const { nombre, apellidos, fechaNacimiento } = req.body;
    if (!nombre || !apellidos || !fechaNacimiento) {
        const paciente = await pacienteRepository.buscarPorId(id);
        return res.render('actualizarPaciente', {
            title: 'APP Salud',
            paciente,
            message: 'Error: Todos los campos son obligatorios'
        });
    }
    const pacienteActualizado = new Paciente(id, nombre, apellidos, fechaNacimiento);
    await pacienteRepository.actualizar(pacienteActualizado);
    res.redirect('/pacientes');
};

const eliminarPaciente = async (req, res) => {
    const id = req.params.id;
    const eliminado = await pacienteRepository.eliminar(id);
    const pacientes = await pacienteRepository.listar();
    const message = eliminado ? 'Paciente eliminado correctamente' : 'No se encontró el paciente a eliminar';
    res.render('index', {
        title: 'APP Salud',
        pacientes,
        message
    });
};

const listarPacientes = async (req, res) => {
    try {
        const pacientes = await pacienteRepository.listar();
        res.render('index', {
            title: 'APP Salud',
            pacientes,
            message: 'Bienvenidos a la APP Salud'
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
