const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');

//rutas
const pacienteRouter = require('./routes/paciente');
const basculaRouter = require('./routes/bascula');


const app = express();
const PORT = 3000;

//logger
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
});

//middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));


app.set('view engine', 'ejs');
app.set('views', './src/views');

//rutas
// Ruta principal
app.get('/', (req, res) => {
  res.redirect('/pacientes');
});

app.use('/pacientes', pacienteRouter);
app.use('/', basculaRouter);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});