//import pg from "pg";
const pg = require('pg');
require('dotenv').config(); // Cargar las variables de entorno
const logger = require('./logger');

/*
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "./config.js";
 */

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  schema: process.env.DB_SCHEMA || 'mpd',
  port: process.env.DB_PORT || 5432
});

// Prueba de conexión
pool.query('SELECT now()', (err, res) => {
    if (err) {
      console.error('Error al conectar con la base de datos:', err);
    } else {
      console.log('Conexión exitosa con PostgreSQL:', res.rows);
    }
  });

module.exports = pool;