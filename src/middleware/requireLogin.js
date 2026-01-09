//Esto es para iniciar sesión y proteger las rutas que requieren autenticación
function requireLogin(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

module.exports = requireLogin;
