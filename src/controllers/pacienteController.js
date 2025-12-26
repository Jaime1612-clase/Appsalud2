const pacienteRepository =require('../repositories/PacienteRepository');


const obtenerPaciente = async (req, res) => {

};

const crearPaciente = async (req, res) => {

};

const actualizarPaciente = async (req, res) => {

};

const eliminarPaciente = async (req, res) => {

};

const mostrarFormularioActualizarPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = await pacienteRepository.obtener ? await pacienteRepository.obtener(id) : null;
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