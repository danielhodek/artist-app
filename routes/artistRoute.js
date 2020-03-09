const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');

router.get('/artists', artistController.get);
router.get('/artists/:id', artistController.getById);
router.get('/artists/logout', artistController.logout);
router.post('/artists/add', artistController.add);

module.exports = router;
