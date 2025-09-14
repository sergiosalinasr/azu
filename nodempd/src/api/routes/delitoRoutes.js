
const express = require('express');
const logger = require('../../logger');
const router = express.Router();
const delitoController = require('../controllers/delitoController');
const keycloak = require('../../config/keycloak');

console.log("En delitoRoutes")
router.post("/", keycloak.protect(), delitoController.createdelito);
router.get("/", keycloak.protect(), delitoController.getdelito);
router.get("/getdelitocampos", keycloak.protect(), delitoController.getdelitocampos); // OJO: los sin ID ANTES de los con :id ¿?
router.get("/getdelitocampos/:id_ley", keycloak.protect(), delitoController.getdelitocamposid_ley);
router.get("/:id", keycloak.protect(), delitoController.getdelitoById);
router.put("/:id", keycloak.protect(), delitoController.updatedelito);
router.delete("/:id", keycloak.protect(), delitoController.deletedelito);

module.exports = router;