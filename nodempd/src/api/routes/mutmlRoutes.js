const express = require('express');
const router = express.Router();
const mutmlController = require('../controllers/mutmlController');

router.post('/mod01', mutmlController.postmutml01);
router.post('/mod02', mutmlController.postmutml02);

module.exports = router;
