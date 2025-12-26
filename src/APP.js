const express = require('express');
const bodyParser = require('body-parser');
const path =require ('path');
const methodOverride = require('method-override');

//routas
const pacienteRouter = require('./routes/Paciente');
const basculaRouter = require('./routes/Bascula');


const app = express();
const PORT = 3000;


app.use(bodyParser.urlencoded({ extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('method'));


app.set('view engine', 'ejs');
app.set('view', './src/views');


app.get('/', (req, res) => {
  res.redirect('/pacientes');
});

app.use('/Paciente', pacienteRouter);
app.use('/Bascula', basculaRouter);


app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
})