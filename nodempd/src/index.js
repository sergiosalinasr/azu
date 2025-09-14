const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./logger');
const cookie = require('cookie'); // Si necesitas manipular cookies manualmente

//const userRoutes = require('./api/routes/userRoutes');
//const config = require('./config/index');
const { login, createUser, checkUserExists, refreshtoken, refreshTokenCookie } = require('./services/authService');  // Asegúrate de que la ruta al módulo authService sea correcta
require('dotenv').config();
const sequelize = require('./config');
const { getSecret, setSecret } = require('./services/vaultService');
const tduRoutes = require('./api/routes/tduRoutes');
const cduRoutes = require('./api/routes/cduRoutes');
//const usersRoutes = require("./api/routes/usersRoutes");
const leyRoutes = require("./api/routes/leyRoutes");
const delitoRoutes = require("./api/routes/delitoRoutes");
const riesgoRoutes = require("./api/routes/riesgoRoutes");
const n8nRoutes = require('./api/routes/n8nRoutes');
const cookieParser = require('cookie-parser');
const SECRET_KEY = 'mi_clave_secreta_super_segura_123!';
const { iniciarCargas, seedTDUCDU, convertirMonedaAPI, calcularTotalAPagarCLP, calcularTotalAPagarMonedaOrigen } = require('./services/rutinasService');

// Validacion de access_token en cada API
const session = require('express-session');
const memoryStore = new session.MemoryStore();
const keycloak = require('./config/keycloak');


const app = express();

app.use(session({
  secret: 'some_secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

// Proteger rutas con Keycloak
if (!keycloak) {
  console.error("Keycloak instance is undefined.");
  process.exit(1);
}
app.use(keycloak.middleware());

//antes de definir tus rutas.
app.use(cookieParser()); // Habilitar el manejo de cookies

// Aplica el middleware CORS
const allowedOrigins = (process.env.CORS_ORIGINS || "").split(",");

app.use(cors({
  origin: function (origin, callback) {
    // Permitir si el origin está en la lista o si no hay origin (ej: Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true
}));

// Middleware para parsear JSON
app.use(express.json());

// Rutas 
app.use('/tdu', tduRoutes);
app.use('/cdu', cduRoutes);

//app.use('/users', usersRoutes);
app.use('/ley', leyRoutes);
app.use('/delito', delitoRoutes);
app.use('/riesgo', riesgoRoutes);
app.use('/n8n', n8nRoutes);

// por ahora, sólo un Healthy!
app.get('/', (req, res) => {
    //res.send('¡Nodempd: Healthy!');
    logger.info("¡Nodempd: Healthy!");
    return res.status(200).json({ message: 'Nodempd: Healthy' });
});

// El backend escuchando!
app.get('/mpd/listen', (req, res) => {
  //res.send('¡Nodempd: Healthy!');
  return res.status(200).json({ message: 'Nodempd: Listen' });
});

// por ahora, sólo un Healthy!
app.get('/felipe', (req, res) => {
  //res.send('¡Nodempd: Healthy!');
  return res.status(200).json({ message: 'Nodempd: Soy Felipe' });
});

// Ruta POST para manejar el login
app.post('/login', (req, res) => {
  logger.info("POST /login");
    const { username, password } = req.body;
    //console.error('Node: Entramos a /login:', username, password);
    if (!username || !password) {
        return res.status(400).json({ message: 'Node: Username and password are required.' });
    }
    //console.log('Node: Función login:', login);
    login(username, password)
        .then(token => {
            res.status(200).json({ 
              access_token: token.access_token, 
              token_type: token.token_type, 
              expires_in: token.expires_in,
              refresh_token: token.refresh_token });
        })
        .catch(error => {
            console.error('Node: Login error:', error);
            logger.error(`POST /login error: ${error.message}`);
            if (error.response && (error.response.status === 400 || error.response.status === 401)) {
                res.status(error.response.status).json({ message: 'Node: Authentication failed. Check credentials.' });
            } else {
                res.status(500).json({ message: 'Node: Internal server error.' });
            }
        });
});

// Ruta POST para manejar el refresh_token
app.post('/refreshtoken', (req, res) => {
  const { refresh_token } = req.body;
  //console.error('Node: Entramos a /refresh_token:', username, password);
  if ( !refresh_token) {
      return res.status(400).json({ message: 'Node: refresh_token are required.' });
  }
  //console.log('Node: Función refresh_token:', refresh_token);
  refreshtoken( refresh_token)
      .then(token => {
          res.status(200).json({ 
            access_token: token.access_token, 
            token_type: token.token_type, 
            expires_in: token.expires_in,
            refresh_token: token.refresh_token });
      })
      .catch(error => {
          console.error('Node: Login error:', error);
          if (error.response && (error.response.status === 400 || error.response.status === 401)) {
              res.status(error.response.status).json({ message: 'Node: Authentication failed. Check credentials.' });
          } else {
              res.status(500).json({ message: 'Node: Internal server error.' });
          }
      });
});


app.post('/SignUp', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    // Primero, verificar si el usuario ya existe
    const userExists = await checkUserExists(username); // Esta función necesita ser implementada o integrada
    console.error('Node: en index.js, volviendo del checkUserExists: ' + userExists);
    if (userExists) {
      return res.status(409).json({ error: 'User already exists.' });
    }

    // Crear el usuario
    const createUserResponse = await createUser(username, password);
    if (createUserResponse.status === 201) {
      res.status(201).json({ message: 'User created successfully.', userId: createUserResponse.id });
    } else {
      throw new Error('Failed to create user');
    }
  } catch (error) {
    console.error('SignUp Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Manjeo de token con cookie

app.post('/logincookie', (req, res) => {
  logger.info("index.js: POST /logincookie");

  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(400).json({ message: 'Node: Username and password are required.' });
  }
  logger.info(`username: ${username}`);
  login(username, password)
      .then(token => {
          // Configura la cookie para el refresh token
          res.cookie('refresh_token', token.refresh_token, {
              httpOnly: true,
              sameSite: "Lax", // O "None" si usas HTTPS
              secure: false,    // Solo en local
              path: "/",
            });
            //console.log("Enviando Set-Cookie:", res.getHeaders()["set-cookie"]);
            //logger.info(`index.js: Enviando Set-Cookie:, ${res.getHeaders()["set-cookie"]}`);
            logger.info(`index.js: Enviando Set-Cookie`);

          // Devuelve el access token en el cuerpo de la respuesta
          res.status(200).json({
              access_token: token.access_token,
              token_type: token.token_type,
              expires_in: token.expires_in,
          });
      })
      .catch(error => {
          console.error('Node: Login error:', error);
          logger.error(`index.js: POST /login error: ${error.message}`);
          if (error.response && (error.response.status === 400 || error.response.status === 401)) {
              res.status(error.response.status).json({ message: 'Node: Authentication failed. Check credentials.' });
          } else {
              res.status(500).json({ message: 'Node: Internal server error.' });
          }
      });
});

app.post('/refreshtokencookie', (req, res) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
      return res.status(401).json({ message: 'No refresh token provided' });
  }

  //console.log('Node: /refreshtokencookie refreshToken:' + refreshToken);
  refreshTokenCookie(refreshToken)
      .then(newToken => {
        res.cookie('refresh_token', newToken.refresh_token, {
          httpOnly: true,
          sameSite: "Lax",
          secure: false, // Asegurar en producción
          path: "/"
        });
        //console.log('Node: /refreshtokencookie newToken.refresh_token:' + newToken.refresh_token);
          // Devuelve el nuevo access token en el cuerpo de la respuesta
          res.status(200).json({
              access_token: newToken.access_token,
              token_type: newToken.token_type,
              expires_in: newToken.expires_in,
          });
      })
      .catch(error => {
          console.error('Node: Refresh token error:', error);
          res.status(401).json({ message: 'Invalid refresh token' });
      });
});


// Carga semilla de Tdu y Cdu
app.get('/seedTDUCDU', (req, res) => {
  
  seedTDUCDU();
  return res.status(200).json({ message: 'Nodempd: seedTDUCDU' });

});

// Carga semilla de Tdu y Cdu
app.get('/deleteTDUCDU', (req, res) => {
  
  deleteTDUCDU();
  return res.status(200).json({ message: 'Nodempd: deleteTDUCDU' });

});

// Carga semilla de tabla ley, delito y riesgo
app.get('/seedLEYPrueba', (req, res) => {
  
  //seedLEY();
  seedLEYPrueba();
  return res.status(200).json({ message: 'Nodempd: seedLEY' });

});

app.get('/convertirMoneda', async (req, res) => {
  const { monto, origen, destino } = req.query;

  if (!monto || !origen || !destino) {
    return res.status(400).json({ error: 'Faltan parámetros: monto, origen, destino' });
  }

  try {
    const resultado = await convertirMonedaAPI(parseFloat(monto), origen, destino);
    res.status(200).json({ montoConvertido: resultado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/calcularTotalAPagarCLP', async (req, res) => {
  const { montoUSD, comisionUSD } = req.query;

  if (!montoUSD || !comisionUSD) {
    return res.status(400).json({ error: 'Faltan parámetros: montoUSD, comisionUSD' });
  }

  try {
    const resultado = await calcularTotalAPagarCLP(parseFloat(montoUSD), parseFloat(comisionUSD));
    res.status(200).json({ TotalAPagarCLP: resultado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/TotalAPagarMonedaOrigen', async (req, res) => {
  const { montoOriginal, monedaOriginal, comisionUSD } = req.query;

  if (!montoOriginal || !monedaOriginal || !comisionUSD) {
    return res.status(400).json({ error: 'Faltan parámetros: montoUSD, comisionUSD' });
  }

  try {
    const resultado = await calcularTotalAPagarMonedaOrigen(parseFloat(montoOriginal), monedaOriginal, parseFloat(comisionUSD));
    res.status(200).json({ TotalAPagarCLP: resultado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//https://n8n.sersalret.com/webhook/b5e0cb94-4b44-4923-a804-fc113f852998/chat
//https://n8n.sersalret.com/webhook/b5e0cb94-4b44-4923-a804-fc113f852998/chat
const CHAT_URL = 'https://n8n.sersalret.com/webhook/b5e0cb94-4b44-4923-a804-fc113f852998/chat';

app.post('/api/chat', async (req, res) => {
  try {
    const r = await fetch(CHAT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await r.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error conectando con n8n' });
  }
});

// Conexión a la base de datos

// Ejemplo de logging
logger.info('INICIO APP');

/*
sequelize.sync()
  .then(() => {
    console.log('Database connected');
    logger.info('Database connected');
    app.listen(3000, () => 
      {
        console.log('Server is running on port 3000');
        logger.info('Server is running on port 3000');
      });
  })
  .catch(error => {
    console.error(error.message || error);
    console.error('Error: La Database no está disponible');
    logger.error('Error: La Database no está disponible');
    process.exit(1); // Cierra el proceso si la base de datos no está disponible
  });
*/

const v_app_port = process.env.APP_PORT;

app.listen(3000, () => console.log('Server is running on port 3000'));

module.exports = app; // Para pruebas y flexibilidad adicional

