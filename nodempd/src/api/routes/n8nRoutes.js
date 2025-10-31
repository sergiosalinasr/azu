const express = require('express');
const router = express.Router();
const tduController = require('../controllers/n8nController');

router.post('/', tduController.sendChatMessage);
router.post('/postn8nusschat', tduController.postn8nusschat);
router.post('/postn8nmutchat', tduController.postn8nmutchat);
router.post('/postn8nchatgpt', tduController.postn8nchatgpt);

module.exports = router;
