const axios = require('axios');
const qs = require('querystring');
require('dotenv').config();

const tokenEndpoint = '/auth/realms/master/protocol/openid-connect/token'; // Ajusta esto según tu configuración de Keycloak
const adminTokenEndpoint = process.env.KEYCLOAK_URL + '/auth/realms/master/protocol/openid-connect/token';
const usersEndpoint = '/auth/admin/realms/master/users';
const env_client_id = process.env.KEYCLOAK_CLIENT_ID;


function login(username, password) {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  const body = qs.stringify({
    client_id: env_client_id,
    // client_secret: 'tu_client_secret', // Descomenta si es necesario para tu configuración de Keycloak
    username: username,
    password: password,
    grant_type: 'password'
  });

  KEYCLOAK_URL = process.env.KEYCLOAK_URL + tokenEndpoint

  return axios.post(KEYCLOAK_URL, body, { headers })
    .then(response => response.data)
    .catch(error => {
      if (!error.response || error.response.status === 0 || error.response.status === 504) {
        console.error('El servicio de autenticación no está disponible.');
        throw new Error('Authentication service unavailable');
      }
      throw error;
    });
}

function refreshtoken(refresh_token) {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  const body = qs.stringify({
    client_id: env_client_id,
    grant_type: "refresh_token",
    refresh_token: refresh_token
  });

  KEYCLOAK_URL = process.env.KEYCLOAK_URL + tokenEndpoint

  return axios.post(KEYCLOAK_URL, body, { headers })
    .then(response => response.data)
    .catch(error => {
      if (!error.response || error.response.status === 0 || error.response.status === 504) {
        console.error('El servicio de autenticación no está disponible.');
        throw new Error('Authentication service unavailable');
      }
      throw error;
    });
}

// La función obtiene un token del usuario administrador de Kaycloak (v)
async function getAdminToken() {
  const tokenEndpoint = '/auth/realms/master/protocol/openid-connect/token'; // Asegura la correcta definición del endpoint
  const keycloakBaseUrl = process.env.KEYCLOAK_URL; // Base URL para Keycloak
  const completeUrl = `${keycloakBaseUrl}${tokenEndpoint}`; // Construye la URL completa correctamente

  const body = qs.stringify({
    client_id: env_client_id,
    //client_secret: process.env.KEYCLOAK_ADMIN_CLI_SECRET, // Asegúrate de configurar esto en tus variables de entorno
    username: 'admin',
    password: 'admin',
    grant_type: 'password' // Cambiado a client_credentials para acceso sin usuario
  });

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  try {
    const response = await axios.post(completeUrl, body, { headers });

    return response.data.access_token;
  } catch (error) {
    console.error('Error obteniendo token de Keycloak:', error);
    throw error; // Lanza el error para manejo externo
  }
}

async function createUser(username, password) {
  const token = await getAdminToken();
  const userData = {
    username,
    enabled: true,
    firstName: "Nombre",
    lastName: "Apellido",
    email: username + "@ejemplo.com",
    credentials: [{
      type: 'password',
      value: password,
      temporary: false
    }]
  };

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  console.log('Node: en createUser');
  KEYCLOAK_URL = process.env.KEYCLOAK_URL + usersEndpoint
  return axios.post(KEYCLOAK_URL, userData, { headers })
    .then(response => {
      console.log('Node: Usuario creado');
      return { id: response.data.id, status: response.status };
    })
    .catch(error => {
      console.log('Node: Usuario no creado');
      throw error;
    });
}

// Esta función valida si existe o no en Keycloac el nombre de usuario (v)
async function checkUserExists(username) {
  
  const token = await getAdminToken();
  
  const keycloakBaseUrl = process.env.KEYCLOAK_URL; // Base URL para Keycloak
  const completeUrl = `${keycloakBaseUrl}${usersEndpoint}`; // Construye la URL completa correctamente
  const response = await axios.get(`${completeUrl}?username=${username}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  return response.data.length > 0; // Devuelve true si el usuario existe, false si no
}

function refreshTokenCookie(refreshToken) {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  const body = qs.stringify({
    client_id: env_client_id,
    // client_secret: 'tu_client_secret', // Descomenta si es necesario para tu configuración de Keycloak
    grant_type: 'refresh_token',
    refresh_token: refreshToken
  });

  const KEYCLOAK_URL = process.env.KEYCLOAK_URL + tokenEndpoint

  console.error('refreshTokenCookie: POST: ' + KEYCLOAK_URL);
  return axios.post(KEYCLOAK_URL, body, { headers })
    .then(response => response.data)
    .catch(error => {
      if (!error.response || error.response.status === 0 || error.response.status === 504) {
        console.error('El servicio de autenticación no está disponible.');
        throw new Error('Authentication service unavailable');
      }
      throw error;
    });
}

module.exports = { login, refreshtoken, createUser, checkUserExists, refreshTokenCookie };