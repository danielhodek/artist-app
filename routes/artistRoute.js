const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');

router.get('/artists', artistController.get);
router.get('/artists/:id', artistController.getById);
router.post('/artists/add', artistController.add);
router.get('/artists/delete/:id', artistController.delete);

module.exports = router;
