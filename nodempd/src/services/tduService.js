const pool = require('../db');
require('dotenv').config();
const schema = process.env.DB_SCHEMA;

const crearTDU = async ({ nombreCorto, descripcionLarga, id_modulo, id_tipo, id_estado, cdu_expreg_nombrecorto, cdu_expreg_desclarga }) => {

    console.log("crearTDU: createtdu: nombreCorto= " + nombreCorto + " descripcionLarga= " + descripcionLarga)
  const v_createdAt = new Date();
  const v_updatedAt = new Date();

  const { rows } = await pool.query(
    "INSERT INTO " + schema + ".tdu " +
      "(\"nombreCorto\", \"descripcionLarga\", \"createdAt\", \"updatedAt\", id_modulo, id_tipo, id_estado, cdu_expreg_nombrecorto, cdu_expreg_desclarga)" +
      " VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9 ) RETURNING *",
    [nombreCorto, descripcionLarga, v_createdAt, v_updatedAt, id_modulo, id_tipo, id_estado, cdu_expreg_nombrecorto, cdu_expreg_desclarga]
  );

  return rows[0];
};

const getTDU = async () => {

  const response = await pool.query("SELECT id, \"nombreCorto\", \"descripcionLarga\" FROM " + schema + ".tdu ORDER BY id ASC");
  //res.status(200).json(response.rows);

  return response.rows;

};

const getTDUcampos = async () => {
  try {
    const consulta = `
      SELECT t.id, 
             t."nombreCorto", 
             t."descripcionLarga"
      FROM ${schema}.tdu AS t 
      ORDER BY id ASC
    `;
    const response = await pool.query(consulta);
    return response.rows;
  } catch (error) {
    throw new Error('Error al obtener los TDU: ' + error.message);
  }
};

const getTDUById = async (id) => {
  try {
    const consulta = `
      SELECT id, "nombreCorto", "descripcionLarga"
      FROM ${schema}.tdu
      WHERE id = $1
    `;
    const { rows } = await pool.query(consulta, [id]);
    return rows;
  } catch (error) {
    throw new Error('Error al obtener TDU por ID: ' + error.message);
  }
};

const updateTDU = async (id, nombreCorto, descripcionLarga) => {
  try {
    const v_updateAt = new Date();
    const consulta = `
      UPDATE ${schema}.tdu
      SET "nombreCorto" = $2, "descripcionLarga" = $3, "updatedAt" = $4
      WHERE id = $1
      RETURNING *
    `;
    const { rows } = await pool.query(consulta, [id, nombreCorto, descripcionLarga, v_updateAt]);
    return rows[0];
  } catch (error) {
    throw new Error('Error al actualizar TDU: ' + error.message);
  }
};

const deleteTDU = async (id) => {
  try {
    const { rowCount } = await pool.query(
      `DELETE FROM ${schema}.tdu WHERE id = $1`,
      [id]
    );

    if (rowCount === 0) {
      throw new Error('Tdu not found');
    }

    return { eliminado: 'ELIMINADO' };
  } catch (error) {
    throw new Error('Error al eliminar TDU: ' + error.message);
  }
};

const getTduIdByNombreCorto = async (tduNombreCorto) => {
  try {
    const consulta = `
      SELECT t.id
      FROM ${schema}.tdu t
      WHERE t."nombreCorto" = $1
    `;
    const { rows } = await pool.query(consulta, [tduNombreCorto]);
    return rows;
  } catch (error) {
    throw new Error('Error al obtener getTduIdByNombreCorto: ' + error.message);
  }
};

const postTDUxCDUById = async (ids) => {
  console.log(`getTDUxCDUById: ${ids}`)
  try {
    const consulta = `
      SELECT json_agg(tdu) AS tdu_list
      FROM (
        SELECT json_build_object(
          'id', T.id,
          'nombreCorto', T."nombreCorto",
          'descripcionLarga', T."descripcionLarga",
          'createdAt', T."createdAt",
          'updatedAt', T."updatedAt",
          'id_modulo', T.id_modulo,
          'id_tipo', T.id_tipo,
          'id_estado', T.id_estado,
          'cdu_expreg_nombrecorto', T.cdu_expreg_nombrecorto,
          'cdu_expreg_desclarga', T.cdu_expreg_desclarga,
          'cdus', COALESCE(
            json_agg(
              json_build_object(
                'id', C.id,
                'id_tdu', C.id_tdu,
                'nombreCorto', C."nombreCorto",
                'descripcionLarga', C."descripcionLarga",
                'createdAt', C."createdAt",
                'updatedAt', C."updatedAt",
                'id_modulo', C.id_modulo,
                'id_tipo', C.id_tipo,
                'id_estado', C.id_estado
              )
            ) FILTER (WHERE C.id IS NOT NULL),
            '[]'
          )
        ) AS tdu
        FROM ${schema}.tdu AS T
        LEFT JOIN ${schema}.cdu AS C
          ON T.id = C.id_tdu
        WHERE T.id = ANY($1)
        GROUP BY T.id
      ) t;
    `;

    const { rows } = await pool.query(consulta, [ids]);

    return rows.length > 0 && rows[0].tdu_list ? rows[0].tdu_list : [];

  } catch (error) {
    throw new Error('Error al obtener TDUs con CDUs: ' + error.message);
  }
};

module.exports = {
  crearTDU,
  getTDU,
  getTDUcampos,
  getTDUById,
  updateTDU,
  deleteTDU,
  getTduIdByNombreCorto,
  postTDUxCDUById
};
