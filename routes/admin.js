const express = require('express');
const router = express.Router();

// Middleware para verificar autenticación
function secured(req, res, next) {
  if (req.user) {
    return next();
  }
  res.redirect('/login');
}

router.get('/admin', secured, (req, res) => {
  res.send('Panel administrativo');
});

module.exports = router;
