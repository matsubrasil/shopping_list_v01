const express = require('express');
const router = express.Router();
const itemRoutes = require('./item.routes');

router.get('/', (req, res) => {
  return res.status(200).json({ success: true, msg: 'From routes' });
});

router.use('/items', itemRoutes);

module.exports = router;
