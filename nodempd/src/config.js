const { Sequelize } = require('sequelize');
require('dotenv').config(); // Cargar las variables de entorno
const { getSecret, setSecret } = require('./services/vaultService');


const config = {
    database: {
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432, // Puerto por defecto de PostgreSQL
        schema: process.env.DB_SCHEMA || 'public', // Esquema por defecto
    },
    port: process.env.APP_PORT || 3000, // Puerto para la aplicación
};


const sequelize = new Sequelize(
    config.database.name,
    config.database.user,
    config.database.password,
    {
        host: config.database.host,
        port: config.database.port,
        dialect: 'postgres',
        schema: config.database.schema, // Soporte para esquema
    }
);


module.exports = sequelize, config;


