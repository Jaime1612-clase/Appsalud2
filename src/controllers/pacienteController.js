const pacienteRepository = require('../repositories/PacienteRepository');

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
    res.send('Función crearPaciente en construcción');
};

const actualizarPaciente = async (req, res) => {
    res.send('Función actualizarPaciente en construcción');
};

const eliminarPaciente = async (req, res) => {
    res.send('Función eliminarPaciente en construcción');
};

const mostrarFormularioActualizarPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = await pacienteRepository.obtener
        ? await pacienteRepository.obtener(id)
        : null;
    res.json({ message: 'mostrarFormularioActualizarPaciente', id, paciente });
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
