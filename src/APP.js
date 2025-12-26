const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');

// rutas
const pacienteRouter = require('./routes/paciente');
const basculaRouter = require('./routes/bascula');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 


app.get('/', (req, res) => {
  res.redirect('/pacientes');
});

app.use('/Paciente', pacienteRouter);
app.use('/Bascula', basculaRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
