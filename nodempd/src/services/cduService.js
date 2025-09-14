const pool = require('../db');
require('dotenv').config();
const schema = process.env.DB_SCHEMA;

const crearCDU = async ({ id_tdu, nombreCorto, descripcionLarga, id_modulo, id_tipo, id_estado }) => {

    console.log("crearCDU: createcdu: nombreCorto= " + nombreCorto + " descripcionLarga= " + descripcionLarga)
  const v_createdAt = new Date();
  const v_updatedAt = new Date();

  const { rows } = await pool.query(
    "INSERT INTO " + schema + ".cdu " +
      "(id_tdu, \"nombreCorto\", \"descripcionLarga\", \"createdAt\", \"updatedAt\", id_modulo, id_tipo, id_estado )" +
      " VALUES ($1, $2, $3, $4, $5, $6, $7, $8 ) RETURNING *",
    [id_tdu, nombreCorto, descripcionLarga, v_createdAt, v_updatedAt, id_modulo, id_tipo, id_estado]
  );

  return rows[0];
};

const getCDU = async () => {
  try {
    const consulta = `
      SELECT id, id_tdu, "nombreCorto", "descripcionLarga"
      FROM ${schema}.cdu
      ORDER BY id ASC
    `;
    const response = await pool.query(consulta);
    return response.rows;
  } catch (error) {
    throw new Error('Error al obtener CDU: ' + error.message);
  }
};

const getCDUCampos = async () => {
  try {
    const consulta = `
      SELECT c.id,
             c.id_tdu,
             t."nombreCorto" AS desctdu,
             c."nombreCorto",
             c."descripcionLarga"
      FROM ${schema}.cdu AS c,
           ${schema}.tdu AS t
      WHERE c.id_tdu = t.id
      ORDER BY c.id ASC
    `;
    const { rows } = await pool.query(consulta);
    return rows;
  } catch (error) {
    throw new Error('Error al obtener CDU con campos: ' + error.message);
  }
};

const getCDUcamposid_tdu = async (id_tdu) => {
  try {
    const consulta = `
      SELECT c.id,
             c.id_tdu,
             t."nombreCorto" AS desctdu,
             c."nombreCorto",
             c."descripcionLarga"
      FROM ${schema}.cdu AS c,
           ${schema}.tdu AS t
      WHERE c.id_tdu = t.id
        AND c.id_tdu = $1
      ORDER BY c.id ASC
    `;
    const { rows } = await pool.query(consulta, [id_tdu]);
    return rows;
  } catch (error) {
    throw new Error('Error al obtener CDU por id_tdu: ' + error.message);
  }
};

const getCDUById = async (id) => {
  try {
    const consulta = `
      SELECT id, id_tdu, "nombreCorto", "descripcionLarga"
      FROM ${schema}.cdu
      WHERE id = $1
    `;
    const { rows } = await pool.query(consulta, [id]);
    return rows;
  } catch (error) {
    throw new Error('Error al obtener CDU por ID: ' + error.message);
  }
};

const updateCDU = async (id, { id_tdu, nombreCorto, descripcionLarga }) => {
  try {
    const updatedAt = new Date();
    const consulta = `
      UPDATE ${schema}.cdu
      SET id_tdu = $2,
          "nombreCorto" = $3,
          "descripcionLarga" = $4,
          "updatedAt" = $5
      WHERE id = $1
      RETURNING *
    `;
    const { rows } = await pool.query(consulta, [id, id_tdu, nombreCorto, descripcionLarga, updatedAt]);
    return rows[0]; // Se espera que solo retorne un registro actualizado
  } catch (error) {
    throw new Error('Error al actualizar CDU: ' + error.message);
  }
};

const deleteCDU = async (id) => {
  try {
    const { rowCount } = await pool.query(`DELETE FROM ${schema}.cdu WHERE id = $1`, [id]);
    if (rowCount === 0) {
      throw new Error('CDU no encontrado');
    }
    return { eliminado: 'ELIMINADO' };
  } catch (error) {
    throw new Error('Error al eliminar CDU: ' + error.message);
  }
};

const getCduIdByNombreCorto = async (tduNombreCorto, cduNombreCorto) => {
  try {
    const consulta = `
      SELECT c.id AS id, c.id_tdu, c."nombreCorto", c."descripcionLarga", c."createdAt", c."updatedAt", c.id_modulo, c.id_tipo, c.id_estado
      FROM ${schema}.tdu t, ${schema}.cdu c 
      WHERE t.id = c.id_tdu
      AND t."nombreCorto" = $1
      AND c."nombreCorto" = $2
    `;
    const { rows } = await pool.query(consulta, [tduNombreCorto, cduNombreCorto]);
    //return rows[0].id;
    return rows;
  } catch (error) {
    throw new Error('Error al obtener getCduIdByNombreCorto: ' + error.message);
  }
};

module.exports = {
  crearCDU,
  getCDU,
  getCDUCampos,
  getCDUcamposid_tdu,
  getCDUById,
  updateCDU,
  deleteCDU,
  getCduIdByNombreCorto
};
