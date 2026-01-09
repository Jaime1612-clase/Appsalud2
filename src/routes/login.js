const express = require('express');
const router = express.Router();

// Usuario para iniciar sesión
const USER = {
  username: 'admin',
  password: 'jaime123'
};


router.get('/', (req, res) => {
  res.render('login', { title: 'Iniciar sesión', message: null, csrfToken: req.csrfToken ? req.csrfToken() : '' });
});


router.post('/', (req, res) => {
  const { username, password } = req.body;
  if (username === USER.username && password === USER.password) {
    req.session.user = username;
    return res.redirect('/pacientes');
  }
  res.render('login', { title: 'Iniciar sesión', message: 'Credenciales incorrectas', csrfToken: req.csrfToken ? req.csrfToken() : '' });
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;
