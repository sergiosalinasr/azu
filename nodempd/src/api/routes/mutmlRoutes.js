const express = require('express');
const router = express.Router();
const mutmlController = require('../controllers/mutmlController');

router.post('/mod01', mutmlController.postmutml01);

module.exports = router;
