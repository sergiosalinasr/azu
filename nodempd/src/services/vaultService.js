const Vault = require('node-vault');

const vaultClient = Vault({
  apiVersion: 'v1', // Versión de la API
  endpoint: 'http://127.0.0.1:8201', // URL del servidor Vault
  token: 'root-token', // Token de autenticación
});

/**
 * Recupera un secreto desde Vault.
 * @param {string} path - Ruta del secreto en Vault.
 * @returns {Promise<Object>} - El contenido del secreto.
 */
async function getSecret(path) {
  try {
    const secret = await vaultClient.read(`secret/data/${path}`);
    //return secret.data.data; // Devuelve solo los datos del secreto
    return secret.data; // Devuelve solo los datos del secreto
  } catch (error) {
    console.error(`Error al recuperar el secreto de secret/secretoprueba:`, error.message);
    throw error;
  }
}

/**
 * Guarda un secreto en Vault.
 * @param {string} path - Ruta del secreto en Vault.
 * @param {Object} data - Los datos a guardar en el secreto.
 * @returns {Promise<void>}
 */
async function setSecret(path, data) {
  try {
    await vaultClient.write(`secret/data/${path}`, { data });
    console.log(`Secreto guardado en ${path}`);
  } catch (error) {
    console.error(`Error al guardar el secreto en ${path}:`, error.message);
    throw error;
  }
}

module.exports = { getSecret, setSecret };
