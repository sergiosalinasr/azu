
const pool = require("../../db")
require('dotenv').config();
const schema = process.env.DB_SCHEMA;
const riesgoService = require('../../services/riesgoService');

exports.getriesgo = async (req, res) => {
  console.log("getriesgo ");
 try { 
  const response = await pool.query("SELECT id, iddelito, nombre, descripcion, probabilidad, impacto, mitigacion FROM " + schema + ".riesgo ORDER BY id ASC");
  res.status(200).json(response.rows);
} catch (error) {
  return res.status(400).json({ error: error.message });
}

};

exports.getriesgocampos = async (req, res) => {
  console.log("getriesgocampos ");
 try { 
  const consulta = 
    "SELECT r.id, " +
     " r.iddelito,  " +
     " d.nombre AS descdelito,  " +
     " r.nombre,  " +
     " r.descripcion,  " +
     " r.probabilidad, cpr.\"nombreCorto\" AS descprobabilidad,  " +
     " r.impacto, cim.\"nombreCorto\" AS descimpacto,  " +
     " r.mitigacion, cmi.\"nombreCorto\" AS descmitigacion  " +
     " FROM " + schema + ".riesgo AS r, " + 
        schema + ".delito AS d, " + 
        schema + ".cdu AS cpr, " + 
        schema + ".cdu AS cim,  " +  
        schema + ".cdu AS cmi  " +
     " WHERE r.iddelito = d.id " + 
     " and r.probabilidad = cpr.id  " +
     " and r.impacto = cim.id  " +
     " AND r.mitigacion = cmi.id  " +
     " ORDER BY id ASC"
  const response = await pool.query(consulta);
  res.status(200).json(response.rows);
} catch (error) {
  return res.status(400).json({ error: error.message });
}

};

exports.getriesgocamposid_delito = async (req, res) => {
  console.log("getriesgocamposid_delito ");
  /*
  try {
    const id_delito = req.params.id_delito;
    console.log("API getriesgocamposid_delito id_delito:" + id_delito)
    const response = await pool.query(
      "SELECT r.id, " +
     " r.iddelito,  " +
     " d.nombre AS descdelito,  " +
     " r.nombre,  " +
     " r.descripcion,  " +
     " r.probabilidad, cpr.\"nombreCorto\" AS descprobabilidad,  " +
     " r.impacto, cim.\"nombreCorto\" AS descimpacto,  " +
     " r.mitigacion, cmi.\"nombreCorto\" AS descmitigacion  " +
     " FROM " + schema + ".riesgo AS r, " + 
        schema + ".delito AS d, " + 
        schema + ".cdu AS cpr, " + 
        schema + ".cdu AS cim,  " +  
        schema + ".cdu AS cmi  " +
     " WHERE r.iddelito = d.id " + 
     " and r.probabilidad = cpr.id  " +
     " and r.impacto = cim.id  " +
     " AND r.mitigacion = cmi.id  " +
     " AND r.iddelito = $1 " +
     " ORDER BY id ASC",
       [id_delito]);
    res.status(200).json(response.rows);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
  */
 try {
     const id_delito = req.params.id_delito;
     const resultado = await riesgoService.getRIESGOcamposid_delito(id_delito);
     res.status(200).json(resultado);
   } catch (error) {
     res.status(404).json({ error: error.message });
   }

};

exports.getriesgoById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await pool.query("SELECT id, iddelito, nombre, descripcion, probabilidad, impacto, mitigacion FROM " + schema + ".riesgo WHERE id = $1", [id]);
    res.status(200).json(response.rows);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

exports.getriesgobynombre = async (req, res) => {
  try {
    const nombre = req.params.nombre;
    //console.log("API getleybynombre. Nombre recibido:-" + nombre + "-")
    const response = await pool.query("SELECT id, iddelito, nombre, descripcion, probabilidad, impacto, mitigacion FROM " + schema + ".riesgo WHERE nombre = $1", [nombre]);
    res.status(200).json(response.rows);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

exports.createriesgo = async (req, res) => {
  /*
  try {
    const { iddelito, nombre, descripcion, probabilidad, impacto, mitigacion } = req.body;
    //const timestampNow = new Date();
    const { rows } = await pool.query(
      "INSERT INTO " + schema + ".riesgo " +
      "(iddelito, nombre, descripcion, probabilidad, impacto, mitigacion)" +
      " VALUES ($1, $2, $3, $4, $5, $6 ) RETURNING *",
      [ iddelito, nombre, descripcion, probabilidad, impacto, mitigacion]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
  */
 try {
    const { iddelito, nombre, descripcion, probabilidad, impacto, mitigacion } = req.body;
    const nuevoRIESGO = await riesgoService.crearRIESGO({
              iddelito: iddelito,
              nombre: nombre,
              descripcion: descripcion,
              probabilidad: probabilidad,
              impacto: impacto,
              mitigacion: mitigacion
            });
    console.log('RIESGO insertado:', nuevoRIESGO);
    res.status(201).json(nuevoRIESGO);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateriesgo = async (req, res) => {
  /*
  try {
    const id = parseInt(req.params.id);
    const { iddelito, nombre, descripcion, probabilidad, impacto, mitigacion } = req.body;
    //const fechapublicacionFormateada = new Date(fechapublicacion);
    const { rows } = await pool.query(
      "UPDATE " + schema + ".riesgo SET iddelito = $2, nombre = $3, descripcion = $4, probabilidad = $5, impacto = $6, mitigacion=$7 WHERE id = $1 RETURNING *",
      [id, iddelito, nombre, descripcion, probabilidad, impacto, mitigacion]
    );
    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  */
 try {
     const id = parseInt(req.params.id);
     const data = req.body;
     const actualizado = await riesgoService.updateRIESGO(id, data);
     res.status(200).json(actualizado);
   } catch (error) {
     res.status(400).json({ error: error.message });
   }
};

exports.deleteriesgo = async (req, res) => {
  /*
  try {
    const id = parseInt(req.params.id);
    const { rowCount } = await pool.query("DELETE FROM " + schema + ".riesgo where id = $1", [
      id,
    ]);
    if (rowCount === 0) {
      return res.status(404).json({ message: "Riesgo not found" });
    }
    return res.status(200).json({ eliminado: "ELIMINADO" });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
  */
 try {
     const id = parseInt(req.params.id);
     const resultado = await riesgoService.deleteRIESGO(id);
     res.status(200).json(resultado);
   } catch (error) {
     res.status(404).json({ error: error.message });
   }
};