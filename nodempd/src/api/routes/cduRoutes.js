
const express = require('express');
const logger = require('../../logger');
const router = express.Router();
const cduController = require('../controllers/cduController');
const keycloak = require('../../config/keycloak');

console.log("En delitoRoutes")
router.post("/", keycloak.protect(), cduController.createcdu);
router.get("/", cduController.getcdu);
router.get("/getcducampos", keycloak.protect(), cduController.getcducampos); // OJO: los sin ID ANTES de los con :id ¿?
router.get("/getcducampos/:id_tdu", keycloak.protect(), cduController.getcducamposid_tdu);
router.get('/tdu/:id_tdu', keycloak.protect(), cduController.getCDUsByTDU);
router.get("/:id", keycloak.protect(), cduController.getcduById);
router.get("/getcduidbynombrecorto/:tdunombrecorto/:cdunombrecorto", cduController.getCduIdByNombreCorto);
router.put("/:id", keycloak.protect(), cduController.updatecdu);
router.delete("/:id", keycloak.protect(), cduController.deletecdu);

module.exports = router;