

const logger = require('../../logger');
const express = require('express');
const router = express.Router();
const envController = require('../controllers/envController');
const keycloak = require('../../config/keycloak');

console.log("En envRoutes")

router.get("/env.json", envController.getenv);

module.exports = router;