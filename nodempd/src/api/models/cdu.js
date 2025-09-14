// models/cdu.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config');
const TDU = require('./tdu'); // Importa el modelo TDU

const CDU = sequelize.define('cdu', {
    id_tdu: {
        type: DataTypes.INTEGER,
        references: {
            model: TDU,
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    nombreCorto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcionLarga: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'cdu',
    schema: 'mpd', // Asegura que la tabla se cree en el esquema mpd
    timestamps: true,
});

// Definir la relación entre TDU y CDU
TDU.hasMany(CDU, { foreignKey: 'id_tdu' }); // cada entrada de TDU puede tener varias entradas en CDU que están asociadas con ella mediante el campo id_tdu en CDU
CDU.belongsTo(TDU, { foreignKey: 'id_tdu' }); // cada registro de CDU pertenece a un único registro en TDU

module.exports = CDU;
