const express = require('express');
const router = express.Router();

const ItemsController = require('./../controllers/Items.controller');

router.get('/', ItemsController.index);
router.post('/', ItemsController.store);
router.delete('/:id', ItemsController.del);

module.exports = router;
