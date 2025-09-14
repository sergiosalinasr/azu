const pool = require('../db');
require('dotenv').config();
const logger = require('../logger');
const schema = process.env.DB_SCHEMA;

logger.info('leyService.js');

const crearLEY = async ({ nombre, descripcion, fechapublicacion, pais }) => {

    console.log("crearley: createley: nombre= " + nombre + " descripcion= " + descripcion)

  const { rows } = await pool.query(
    "INSERT INTO " + schema + ".ley " +
      "(nombre, descripcion, fechapublicacion, pais )" +
      " VALUES ($1, $2, $3, $4 ) RETURNING *",
    [nombre, descripcion, fechapublicacion, pais]
  );

  return rows[0];
};

const getLEY = async () => {
  try {
    const consulta = `
      SELECT id, nombre, descripcion, fechapublicacion, pais 
      FROM ${schema}.ley 
      ORDER BY id ASC
    `;
    const response = await pool.query(consulta);
    return response.rows;
  } catch (error) {
    throw new Error('Error al obtener ley: ' + error.message);
  }
};

const getLEYCampos = async () => {
  logger.info('leyService.js: getLEYCampos');
  try {
    const consulta = `
      SELECT l.id, l.nombre, l.descripcion, l.fechapublicacion, l.pais, c."nombreCorto" AS descripcionPais 
       FROM ${schema}.ley AS l, ${schema}.cdu AS c 
       WHERE l.pais = c.id 
       ORDER BY id ASC
    `;
    const { rows } = await pool.query(consulta);
    return rows;
  } catch (error) {
    throw new Error('Error al obtener ley con campos: ' + error.message);
  }
};

const getLEYById = async (id) => {
  try {
    const consulta = `
      SELECT id, nombre, descripcion, fechapublicacion, pais 
      FROM ${schema}.ley 
      WHERE id = $1
    `;
    const { rows } = await pool.query(consulta, [id]);
    return rows;
  } catch (error) {
    throw new Error('Error al obtener ley por ID: ' + error.message);
  }
};

const updateLEY = async (id, nombre, descripcion, fechapublicacion, pais) => {
  try {
    const fechapublicacionFormateada = new Date(fechapublicacion);
    const consulta = `
      UPDATE ${schema}.ley 
      SET nombre = $2, descripcion = $3, fechapublicacion = $4, pais = $5 
      WHERE id = $1 RETURNING *
    `;
    const { rows } = await pool.query(consulta, [id, nombre, descripcion, fechapublicacionFormateada, pais]);
    return rows[0]; // Se espera que solo retorne un registro actualizado
  } catch (error) {
    throw new Error('Error al actualizar ley: ' + error.message);
  }
};

const deleteLEY = async (id) => {
  try {
    const { rowCount } = await pool.query(`DELETE FROM ${schema}.ley WHERE id = $1`, [id]);
    if (rowCount === 0) {
      throw new Error('ley no encontrado');
    }
    return { eliminado: 'ELIMINADO' };
  } catch (error) {
    throw new Error('Error al eliminar ley: ' + error.message);
  }
};

const getLEYIdBynombre = async (nombre) => {
  try {
    const consulta = `
      SELECT id AS id, nombre, descripcion, fechapublicacion, pais 
      FROM ${schema}.ley 
      WHERE nombre = $1
    `;
    const { rows } = await pool.query(consulta, [nombre]);
    return rows;
  } catch (error) {
    throw new Error('Error al obtener getleyIdBynombre: ' + error.message);
  }
};

module.exports = {
  crearLEY,
  getLEY,
  getLEYCampos,
  getLEYById,
  updateLEY,
  deleteLEY,
  getLEYIdBynombre
};
