const express = require('express');
const router = express.Router();

router.get('/shop', (req, res) => {
  res.send('Página de la tienda');
});

module.exports = router;
