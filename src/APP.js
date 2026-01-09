const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const requireLogin = require('./middleware/requireLogin');
const loginRouter = require('./routes/login');
const pacienteRouter = require('./routes/paciente');
const basculaRouter = require('./routes/bascula');

// Protección contra ataques CSRF (Cross-Site Request Forgery)
const csrfProtection = require('./middleware/csrf');

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
app.use(session({
  secret: 'appsalud_secret',
  resave: false,
  saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.set('views', './src/views');

// Ruta principal
app.get('/', (req, res) => {
  res.redirect('/pacientes');
});

app.use('/login', csrfProtection, loginRouter);
app.use('/pacientes', csrfProtection, requireLogin, pacienteRouter);
app.use('/', basculaRouter);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});