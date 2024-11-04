const express = require('express');
const session = require('express-session');
const passport = require('./auth/auth0');

const app = express();

app.use(
  session({
    secret: 'SECRETO_DE_SESION',
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Ruta de autenticación
app.get(
  '/login',
  passport.authenticate('auth0', {
    scope: 'openid email profile'
  }),
  function (req, res) {
    res.redirect('/');
  }
);

// Ruta de callback
app.get(
  '/callback',
  passport.authenticate('auth0', {
    failureRedirect: '/'
  }),
  function (req, res) {
    res.redirect(req.session.returnTo || '/');
  }
);

// Ruta de logout
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Ruta pública
app.get('/', (req, res) => {
  res.send('Bienvenido a Yacu Selva');
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});
const shopRoutes = require('./routes/shop');
app.use('/', shopRoutes);
