
const pool = require("../../db")
require('dotenv').config();
const schema = process.env.DB_SCHEMA;
const cduService = require('../../services/cduService');

exports.getcdu = async (req, res) => {
  console.log("getcdu ");
 /*
  try { 
  const response = await pool.query("SELECT id, id_tdu, \"nombreCorto\", \"descripcionLarga\" FROM " + schema + ".cdu ORDER BY id ASC");
  res.status(200).json(response.rows);
} catch (error) {
  return res.status(400).json({ error: error.message });
}
*/
  try {
    const resultado = await cduService.getCDU();
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

};

exports.getcducampos = async (req, res) => {
  console.log("getcducampos ");
  /*
 try { 
  const consulta = 
    "SELECT c.id, " +
     " c.id_tdu,  " +
     " t.\"nombreCorto\" AS desctdu,  " +
     " c.\"nombreCorto\",  " +
     " c.\"descripcionLarga\"  " +
     " FROM " + schema + ".cdu AS c, " + 
        schema + ".tdu AS t " + 
     " WHERE c.id_tdu = t.id " + 
     " ORDER BY id ASC"
  const response = await pool.query(consulta);
  res.status(200).json(response.rows);
} catch (error) {
  return res.status(400).json({ error: error.message });
}
  */
  try {
    const resultado = await cduService.getCDUCampos();
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

};

exports.getcducamposid_tdu = async (req, res) => {
  console.log("getcducampos ");
  /*
  try {
    const id_tdu = req.params.id_tdu;
    //console.log("API getleybynombre. Nombre recibido:-" + nombre + "-")
    const response = await pool.query(
      "SELECT c.id, " +
     " c.id_tdu,  " +
     " t.\"nombreCorto\" AS desctdu,  " +
     " c.\"nombreCorto\",  " +
     " c.\"descripcionLarga\"  " +
     " FROM " + schema + ".cdu AS c, " + 
        schema + ".tdu AS t " + 
     " WHERE c.id_tdu = t.id " + 
     " AND c.id_tdu = $1 " +
     " ORDER BY id ASC",
       [id_tdu]);
    res.status(200).json(response.rows);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
  */
  try {
    const id_tdu = req.params.id_tdu;
    const resultado = await cduService.getCDUcamposid_tdu(id_tdu);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }

};

exports.getcduById = async (req, res) => {
  /*
  try {
    const id = parseInt(req.params.id);
    const response = await pool.query("SELECT id, id_tdu, \"nombreCorto\", \"descripcionLarga\" FROM " + schema + ".cdu WHERE id = $1", [id]);
    res.status(200).json(response.rows);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
  */
  try {
    const id = parseInt(req.params.id);
    const resultado = await cduService.getCDUById(id);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }

};

exports.getcdubynombre = async (req, res) => {
  try {
    const nombreCorto = req.params.nombreCorto;
    //console.log("API getleybynombre. Nombre recibido:-" + nombre + "-")
    const response = await pool.query("SELECT id, id_tdu, \"nombreCorto\", \"descripcionLarga\" FROM " + schema + ".cdu WHERE \"nombreCorto\" = $1", [nombreCorto]);
    res.status(200).json(response.rows);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

exports.createcdu = async (req, res) => {
  /*
  try {
    const { id_tdu, nombreCorto, descripcionLarga } = req.body;
    const v_createdAt = new Date();
    const v_updatedAt = new Date();
    const { rows } = await pool.query(
      "INSERT INTO " + schema + ".cdu " +
      "(id_tdu, \"nombreCorto\", \"descripcionLarga\", \"createdAt\", \"updatedAt\")" +
      " VALUES ($1, $2, $3, $4, $5 ) RETURNING *",
      [ id_tdu, nombreCorto, descripcionLarga, v_createdAt, v_updatedAt ]
    )
    res.status(201).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
  */
  try {
    const { id_tdu, nombreCorto, descripcionLarga } = req.body;
    const nuevoCDU = await cduService.crearCDU({
              id_tdu: id_tdu,
              nombreCorto: nombreCorto,
              descripcionLarga: descripcionLarga,
              id_modulo: 1,
              id_tipo: 2,
              id_estado: 3
            });
    console.log('CDU insertado:', nuevoCDU);
    res.status(201).json(nuevoCDU);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updatecdu = async (req, res) => {
  /*
  try {
    const id = parseInt(req.params.id);
    const { id_tdu, nombreCorto, descripcionLarga } = req.body;
    const v_updatedAt = new Date();
    const { rows } = await pool.query(
      "UPDATE " + schema + ".cdu SET id_tdu = $2, \"nombreCorto\" = $3, \"descripcionLarga\" = $4, \"updatedAt\" = $5 WHERE id = $1 RETURNING *",
      [id, id_tdu, nombreCorto, descripcionLarga, v_updatedAt]
    );
    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  */
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const actualizado = await cduService.updateCDU(id, data);
    res.status(200).json(actualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

};

exports.deletecdu = async (req, res) => {
  /*
  try {
    const id = parseInt(req.params.id);
    const { rowCount } = await pool.query("DELETE FROM " + schema + ".cdu where id = $1", [
      id,
    ]);
    if (rowCount === 0) {
      return res.status(404).json({ message: "Cdu not found" });
    }
    return res.status(200).json({ eliminado: "ELIMINADO" });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
  */
  try {
    const id = parseInt(req.params.id);
    const resultado = await cduService.deleteCDU(id);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }

};

exports.getCDUsByTDU = async (req, res) => {
  const { id_tdu } = req.params; // Obtiene id_tdu de los parámetros de la URL
  try {
    const result = await pool.query("SELECT id, id_tdu, \"nombreCorto\", \"descripcionLarga\" FROM " + schema + ".cdu WHERE id_tdu = $1", [id_tdu]);
    
    if (result.rows.length > 0) {
      res.status(200).json(result.rows); // Devuelve los registros encontrados
    } else {
      res.status(404).json({ message: `No se encontraron registros para id_tdu: ${id_tdu}` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Manejo de errores
  }
};

exports.getCduIdByNombreCorto = async (req, res) => {

  try {
    const { tdunombrecorto, cdunombrecorto } = req.params;
    console.log("A getCduIdByNombreCorto llegó tdunombrecorto: " + tdunombrecorto + " cdunombrecorto: " + cdunombrecorto)
    const resultado = await cduService.getCduIdByNombreCorto(tdunombrecorto, cdunombrecorto);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }

};

//getCduIdByNombreCorto