// models/tdu.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config'); // Asegúrate de que apunta a la configuración correcta de Sequelize

const TDU = sequelize.define('tdu', {
    nombreCorto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcionLarga: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'tdu',
    schema: 'mpd', // Asegura que la tabla se cree en el esquema public
    timestamps: true,
});

module.exports = TDU;

