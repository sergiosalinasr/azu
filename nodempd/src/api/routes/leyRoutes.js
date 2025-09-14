
const express = require('express');
const logger = require('../../logger');
const router = express.Router();
const leyController = require('../controllers/leyController');
const keycloak = require('../../config/keycloak'); // Importa la instancia de Keycloak

//console.log("En leyRoutes");
logger.info('LeyRoutes.js');
router.get("/", keycloak.protect(), leyController.getley);
router.get("/getleycampos", keycloak.protect(), leyController.getleycampos);
//router.get("/getleybynombre/:nombre", keycloak.protect(), leyController.getleybynombre);
router.get("/:id", keycloak.protect(), leyController.getleyById);
router.post("/", keycloak.protect(), leyController.createley);
router.put("/:id", keycloak.protect(), leyController.updateley);
router.delete("/:id", keycloak.protect(), leyController.deleteley);

module.exports = router;