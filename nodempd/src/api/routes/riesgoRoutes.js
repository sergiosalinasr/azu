
const express = require('express');
const logger = require('../../logger');
const router = express.Router();
const riesgoController = require('../controllers/riesgoController');
const keycloak = require('../../config/keycloak');

console.log("En delitoRoutes")
router.post("/", keycloak.protect(), riesgoController.createriesgo);
router.get("/", keycloak.protect(), riesgoController.getriesgo);
router.get("/getriesgocampos", keycloak.protect(), riesgoController.getriesgocampos); // OJO: los sin ID ANTES de los con :id ¿?
router.get("/getriesgocampos/:id_delito", keycloak.protect(), riesgoController.getriesgocamposid_delito);
router.get("/:id", keycloak.protect(), riesgoController.getriesgoById);
router.put("/:id", keycloak.protect(), riesgoController.updateriesgo);
router.delete("/:id", keycloak.protect(), riesgoController.deleteriesgo);

module.exports = router;