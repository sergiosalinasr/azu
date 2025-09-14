const Keycloak = require('keycloak-connect');
const session = require('express-session');
const adminTokenEndpoint = process.env.KEYCLOAK_AUTH
const memoryStore = new session.MemoryStore();
const logger = require('../logger');

logger.info(`keycloak.js adminTokenEndpoint: ${adminTokenEndpoint}`);

const keycloak = new Keycloak({ store: memoryStore }, {
  "realm": "master",
  "auth-server-url": adminTokenEndpoint,
  "ssl-required": "external",
  "resource": "admin-cli",
  "public-client": true
});

module.exports = keycloak;
