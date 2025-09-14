const pool = require('../db');
require('dotenv').config();
const schema = process.env.DB_SCHEMA;

const crearDELITO = async ({ idley, nombre, descripcion, sancion, nivelgravedad }) => {

  const { rows } = await pool.query(
    "INSERT INTO " + schema + ".delito " +
      "(idley, nombre, descripcion, sancion, nivelgravedad)" +
      " VALUES ($1, $2, $3, $4, $5 ) RETURNING *",
    [idley, nombre, descripcion, sancion, nivelgravedad]
  );

  return rows[0];
};

const getDELITO = async () => {
  try {
    const consulta = `
      SELECT id, id_tdu, "nombreCorto", "descripcionLarga"
      FROM ${schema}.DELITO
      ORDER BY id ASC
    `;
    const response = await pool.query(consulta);
    return response.rows;
  } catch (error) {
    throw new Error('Error al obtener DELITO: ' + error.message);
  }
};

const getDELITOCampos = async () => {
  try {
    const consulta = `
      SELECT c.id,
             c.id_tdu,
             t."nombreCorto" AS desctdu,
             c."nombreCorto",
             c."descripcionLarga"
      FROM ${schema}.DELITO AS c,
           ${schema}.tdu AS t
      WHERE c.id_tdu = t.id
      ORDER BY c.id ASC
    `;
    const { rows } = await pool.query(consulta);
    return rows;
  } catch (error) {
    throw new Error('Error al obtener DELITO con campos: ' + error.message);
  }
};

const getDELITOcamposid_ley = async (id_ley) => {
  try {
    const consulta = `
      SELECT d.id, 
        d.idley, 
        l.nombre AS descley, 
        d.nombre, 
        d.descripcion, 
        d.sancion, cs."nombreCorto" AS descsancion, 
        d.nivelgravedad, cng."nombreCorto" AS descnivelgravedad 
      FROM ${schema}.delito AS d, ${schema}.ley AS l, ${schema}.cdu AS cs, ${schema}.cdu AS cng 
      WHERE d.idley = l.id and d.sancion = cs.id 
        AND d.nivelgravedad = cng.id 
        AND d.idley = $1 
      ORDER BY id ASC
    `;
    const { rows } = await pool.query(consulta, [id_ley]);
    return rows;
  } catch (error) {
    throw new Error('Error al obtener DELITO por id_ley: ' + error.message);
  }
};

const getDELITOById = async (id) => {
  try {
    const consulta = `
      SELECT id, id_tdu, "nombreCorto", "descripcionLarga"
      FROM ${schema}.DELITO
      WHERE id = $1
    `;
    const { rows } = await pool.query(consulta, [id]);
    return rows;
  } catch (error) {
    throw new Error('Error al obtener DELITO por ID: ' + error.message);
  }
};

const updateDELITO = async (id, { idley, nombre, descripcion, sancion, nivelgravedad }) => {
  try {
    const consulta = `
      UPDATE ${schema}.delito 
      SET idley = $2, nombre = $3, descripcion = $4, sancion = $5, nivelgravedad = $6 
      WHERE id = $1 RETURNING *
    `;
    const { rows } = await pool.query(consulta, [id, idley, nombre, descripcion, sancion, nivelgravedad]);
    return rows[0]; // Se espera que solo retorne un registro actualizado
  } catch (error) {
    throw new Error('Error al actualizar DELITO: ' + error.message);
  }
};

const deleteDELITO = async (id) => {
  try {
    const { rowCount } = await pool.query(`DELETE FROM ${schema}.DELITO WHERE id = $1`, [id]);
    if (rowCount === 0) {
      throw new Error('DELITO no encontrado');
    }
    return { eliminado: 'ELIMINADO' };
  } catch (error) {
    throw new Error('Error al eliminar DELITO: ' + error.message);
  }
};

const getDELITOIdByNombreCorto = async (tduNombreCorto, DELITONombreCorto) => {
  try {
    const consulta = `
      SELECT c.id
      FROM ${schema}.tdu t, ${schema}.DELITO c 
      WHERE t.id = c.id_tdu
      AND t."nombreCorto" = $1
      AND c."nombreCorto" = $2
    `;
    const { rows } = await pool.query(consulta, [tduNombreCorto, DELITONombreCorto]);
    return rows;
  } catch (error) {
    throw new Error('Error al obtener getDELITOIdByNombreCorto: ' + error.message);
  }
};

const getDELITOIdByNombre = async (nombre) => {
  try {
    const consulta = `
      SELECT id AS id, idley, nombre, descripcion, sancion, nivelgravedad
      FROM ${schema}.delito 
      WHERE nombre = $1
    `;
    const { rows } = await pool.query(consulta, [nombre]);
    return rows;
  } catch (error) {
    throw new Error('Error al obtener getleyIdBynombre: ' + error.message);
  }
};

// Obtiene el Delito dado su nombre para la respectiva idLey
const getDELITOByNombreIdLey = async (nombre, p_idLey) => {
  try {
    const consulta = `
      SELECT id AS id, idley, nombre, descripcion, sancion, nivelgravedad
      FROM ${schema}.delito 
      WHERE nombre = $1
      AND idley = $2
    `;
    const { rows } = await pool.query(consulta, [nombre, p_idLey]);
    return rows;
  } catch (error) {
    throw new Error('Error al obtener getleyIdBynombre: ' + error.message);
  }
};

module.exports = {
  crearDELITO,
  getDELITO,
  getDELITOCampos,
  getDELITOcamposid_ley,
  getDELITOById,
  updateDELITO,
  deleteDELITO,
  getDELITOIdByNombreCorto,
  getDELITOIdByNombre,
  getDELITOByNombreIdLey
};
