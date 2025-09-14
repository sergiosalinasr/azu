const pool = require('../db');
require('dotenv').config();
const schema = process.env.DB_SCHEMA;

const crearRIESGO = async ({ iddelito, nombre, descripcion, probabilidad, impacto, mitigacion }) => {

    console.log("crearRIESGO: createRIESGO: nombre= " + nombre + " descripcion= " + descripcion)

  const { rows } = await pool.query(
    "INSERT INTO " + schema + ".riesgo " +
      "(iddelito, nombre, descripcion, probabilidad, impacto, mitigacion)" +
      " VALUES ($1, $2, $3, $4, $5, $6 ) RETURNING *",
    [iddelito, nombre, descripcion, probabilidad, impacto, mitigacion]
  );

  return rows[0];
};

const getRIESGO = async () => {
  try {
    const consulta = `
      SELECT id, id_tdu, "nombreCorto", "descripcionLarga"
      FROM ${schema}.RIESGO
      ORDER BY id ASC
    `;
    const response = await pool.query(consulta);
    return response.rows;
  } catch (error) {
    throw new Error('Error al obtener RIESGO: ' + error.message);
  }
};

const getRIESGOCampos = async () => {
  try {
    const consulta = `
      SELECT c.id,
             c.id_tdu,
             t."nombreCorto" AS desctdu,
             c."nombreCorto",
             c."descripcionLarga"
      FROM ${schema}.RIESGO AS c,
           ${schema}.tdu AS t
      WHERE c.id_tdu = t.id
      ORDER BY c.id ASC
    `;
    const { rows } = await pool.query(consulta);
    return rows;
  } catch (error) {
    throw new Error('Error al obtener RIESGO con campos: ' + error.message);
  }
};

const getRIESGOcamposid_delito = async (id_delito) => {
  try {
    const consulta = `
      SELECT r.id, 
        r.iddelito, 
        d.nombre AS descdelito, 
        r.nombre, 
        r.descripcion, 
        r.probabilidad, cpr."nombreCorto" AS descprobabilidad, 
        r.impacto, cim."nombreCorto" AS descimpacto, 
        r.mitigacion, cmi."nombreCorto" AS descmitigacion 
      FROM ${schema}.riesgo AS r, 
        ${schema}.delito AS d,  
        ${schema}.cdu AS cpr, 
        ${schema}.cdu AS cim, 
        ${schema}.cdu AS cmi 
      WHERE r.iddelito = d.id 
        and r.probabilidad = cpr.id 
        and r.impacto = cim.id 
        AND r.mitigacion = cmi.id 
        AND r.iddelito = $1 
      ORDER BY id ASC
    `;
    const { rows } = await pool.query(consulta, [id_delito]);
    return rows;
  } catch (error) {
    throw new Error('Error al obtener RIESGO por id_tdu: ' + error.message);
  }
};

const getRIESGOById = async (id) => {
  try {
    const consulta = `
      SELECT id, id_tdu, "nombreCorto", "descripcionLarga"
      FROM ${schema}.RIESGO
      WHERE id = $1
    `;
    const { rows } = await pool.query(consulta, [id]);
    return rows;
  } catch (error) {
    throw new Error('Error al obtener RIESGO por ID: ' + error.message);
  }
};

const updateRIESGO = async (id, { iddelito, nombre, descripcion, probabilidad, impacto, mitigacion }) => {
  try {
    const consulta = `
      UPDATE ${schema}.riesgo 
      SET iddelito = $2, nombre = $3, descripcion = $4, probabilidad = $5, impacto = $6, mitigacion=$7 
      WHERE id = $1 RETURNING *
    `;
    const { rows } = await pool.query(consulta, [id, iddelito, nombre, descripcion, probabilidad, impacto, mitigacion]);
    return rows[0]; // Se espera que solo retorne un registro actualizado
  } catch (error) {
    throw new Error('Error al actualizar RIESGO: ' + error.message);
  }
};

const deleteRIESGO = async (id) => {
  try {
    const { rowCount } = await pool.query(`DELETE FROM ${schema}.RIESGO WHERE id = $1`, [id]);
    if (rowCount === 0) {
      throw new Error('RIESGO no encontrado');
    }
    return { eliminado: 'ELIMINADO' };
  } catch (error) {
    throw new Error('Error al eliminar RIESGO: ' + error.message);
  }
};

const getRIESGOIdByNombreCorto = async (tduNombreCorto, RIESGONombreCorto) => {
  try {
    const consulta = `
      SELECT c.id
      FROM ${schema}.tdu t, ${schema}.RIESGO c 
      WHERE t.id = c.id_tdu
      AND t."nombreCorto" = $1
      AND c."nombreCorto" = $2
    `;
    const { rows } = await pool.query(consulta, [tduNombreCorto, RIESGONombreCorto]);
    return rows;
  } catch (error) {
    throw new Error('Error al obtener getRIESGOIdByNombreCorto: ' + error.message);
  }
};

const getRIESGOIdByNombre = async (nombre) => {
  try {
    const consulta = `
      SELECT id AS id, iddelito, nombre, descripcion, probabilidad, impacto, mitigacion
      FROM ${schema}.riesgo 
      WHERE nombre = $1
    `;
    const { rows } = await pool.query(consulta, [nombre]);
    return rows;
  } catch (error) {
    throw new Error('Error al obtener getRIESGOIdByNombre: ' + error.message);
  }
};

const getRIESGOIdByNombreIdDelito = async (nombre, p_idDelito) => {
  try {
    const consulta = `
      SELECT id AS id, iddelito, nombre, descripcion, probabilidad, impacto, mitigacion
      FROM ${schema}.riesgo 
      WHERE nombre = $1
      AND iddelito = $2
    `;
    const { rows } = await pool.query(consulta, [nombre, p_idDelito]);
    return rows;
  } catch (error) {
    throw new Error('Error al obtener getRIESGOIdByNombre: ' + error.message);
  }
};

module.exports = {
  crearRIESGO,
  getRIESGO,
  getRIESGOCampos,
  getRIESGOcamposid_delito,
  getRIESGOById,
  updateRIESGO,
  deleteRIESGO,
  getRIESGOIdByNombreCorto,
  getRIESGOIdByNombre,
  getRIESGOIdByNombreIdDelito
};
