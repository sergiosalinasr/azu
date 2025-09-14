const fs = require('fs');
const tduService = require('./tduService');
const cduService = require('./cduService');
const leyService = require('../services/leyService');
const delitoService = require('../services/delitoService');
const riesgoService = require('../services/riesgoService');
const fetch = require('node-fetch');

iniciarCargas = async () => {
    console.log("iniciarCargas: " )

    try {
        const nuevo = await tduService.crearTDU({
          nombreCorto: 'Inicial',
          descripcionLarga: 'Carga por JSON',
          createdAt: new Date(),
          updatedAt: new Date(),
          id_modulo: 1,
          id_tipo: 1,
          id_estado: 1,
          id_expreg_nombrecorto: 1,
          id_expreg_desclarga: 1
        });
    
        console.log('TDU insertado:', nuevo);
      } catch (err) {
        console.error('Error:', err.message);
      }

}

seedTDUCDU = async () => {
  try {
    const data = JSON.parse(fs.readFileSync('./src/seeddata/tdu_carga.json', 'utf8'));

    for (const entry of data) {
      const tduData = entry.tdu;

      // Crear TDU
      //console.log(`✔ TDU creando: tduData.nombreCorto=${tduData.nombreCorto}`);
      const nuevoTDU = await tduService.crearTDU({
        nombreCorto: tduData.nombreCorto,
        descripcionLarga: tduData.descripcionLarga,
        id_modulo: tduData.id_modulo,
        id_tipo: tduData.id_tipo,
        id_estado: tduData.id_estado,
        cdu_expreg_nombrecorto: tduData.cdu_expreg_nombrecorto,
        cdu_expreg_desclarga: tduData.cdu_expreg_desclarga
      });
      //const tduResponse = await axios.post(`${BASE_URL}/tdu`, tduData);
      //const newTdu = nuevoTDU.data;

      console.log('TDU insertado:', nuevoTDU);

      // Crear CDUs asociadas
      
      for (const cdu of entry.cdus) {
        // Sobrescribe id_tdu por el nuevo id del TDU creado
        console.log('TDU insertado nuevo.id: ' + nuevoTDU.id, " cdu.nombreCorto: " + cdu.nombreCorto);
        const nuevoCDU = await cduService.crearCDU({
          id_tdu: nuevoTDU.id,
          nombreCorto: cdu.nombreCorto,
          descripcionLarga: cdu.descripcionLarga,
          id_modulo: nuevoTDU.id_modulo,
          id_tipo: nuevoTDU.id_tipo,
          id_estado: nuevoTDU.id_estado
        });
        
        console.log('CDU insertado:', nuevoCDU);

        /*const cduData = {
          ...cdu,
          id_tdu: nuevo.id
        };
        */
        //await axios.post(`${BASE_URL}/cdu`, cduData);
        //console.log(`  ➤ CDU creado: ${cduData.nombreCorto}`);
      }
      
    }

    console.log('✅ Todos los datos han sido importados correctamente.');
  } catch (error) {
    console.error('❌ Error durante la importación:', error.response?.data || error.message);
  }
}

deleteTDUCDU = async () => {
  try {
    const data = JSON.parse(fs.readFileSync('./src/seeddata/tdu_carga.json', 'utf8'));

    for (const entry of data) {
      const tduData = entry.tdu;

      // Buscar TDU según su nombreCorto
      const id_tdu = await tduService.getTduIdByNombreCorto(tduData.nombreCorto);
      
      // Verificar si se encontró un TDU antes de intentar eliminarlo
      if (id_tdu && id_tdu.length > 0) {
        const tdu_Deleted = await tduService.deleteTDU(id_tdu[0].id);
        console.log('Borrando tabla: ' + tduData.nombreCorto + " id: " + id_tdu[0].id + " Respuesta: " + tdu_Deleted.eliminado);
      } else {
        console.log(`⚠️ No se encontró TDU con nombreCorto: ${tduData.nombreCorto}`);
      }
      
    }
    console.log('✅ Todos los datos han sido borrados correctamente.');
  } catch (error) {
    console.error('❌ Error durante la importación:', error.response?.data || error.message);
  }
}

// Preparar datos y crear la Ley
prepCrearLey = async (p_nombre, p_descripcion, p_fechapublicacion, p_tdu_nom_pais, p_cdu_nom_pais) => {

          const pais = await cduService.getCduIdByNombreCorto(p_tdu_nom_pais, p_cdu_nom_pais)
        if (pais.length === 0) {
          console.log(`✔ TDU: ${p_tdu_nom_pais} CDU: ${p_cdu_nom_pais} NO EXISTE`);
          return 0
        }

        const paisId = pais[0].id;

        // Crear ley
        const nuevoLEY = await leyService.crearLEY({
          nombre: p_nombre,
          descripcion: p_descripcion,
          fechapublicacion: p_fechapublicacion,
          pais: paisId
        });

        // conservamos el id de la nueva Ley para crear el Delito
        return nuevoLEY.id;

}

// Preparar datos y crear el Delito
prepCrearDelito = async (p_ley_id, p_nombre, p_descripcion, 
                          p_tdu_nom_sancion, p_cdu_nom_sancion, 
                          p_tdu_nom_nivelgravedad, p_cdu_nom_nivelgravedad) => {

        const sancion = await cduService.getCduIdByNombreCorto(p_tdu_nom_sancion, p_cdu_nom_sancion)
        if (sancion.length === 0) {
          console.log(`✔ TDU: ${p_tdu_nom_sancion} CDU: ${p_cdu_nom_sancion} NO EXISTE`);
          return 0
        }

        const sancionId = sancion[0].id;

        const nivelgravedad = await cduService.getCduIdByNombreCorto(p_tdu_nom_nivelgravedad, p_cdu_nom_nivelgravedad)
        if (nivelgravedad.length === 0) {
          console.log(`✔ TDU: ${p_tdu_nom_nivelgravedad} CDU: ${p_cdu_nom_nivelgravedad} NO EXISTE`);
          return 0
        }

        const nivelgravedadId = nivelgravedad[0].id;

        // Crear Delito
        const nuevoDELITO = await delitoService.crearDELITO({
          idley: p_ley_id,
          nombre: p_nombre,
          descripcion: p_descripcion,
          sancion: sancionId,
          nivelgravedad: nivelgravedadId
        });

        // conservamos el id de la nueva Ley para crear el Delito
        return nuevoDELITO.id;

}

// Preparar datos y crear el Delito
prepCrearRiesgo = async (p_delito_id, p_nombre, p_descripcion, 
                          p_tdu_nom_probabilidad, p_cdu_nom_probabilidad, 
                          p_tdu_nom_impacto, p_cdu_nom_impacto, 
                          p_tdu_nom_mitigacion, p_cdu_nom_mitigacion) => {

        const probabilidad = await cduService.getCduIdByNombreCorto(p_tdu_nom_probabilidad, p_cdu_nom_probabilidad)
        if (probabilidad.length === 0) {
          console.log(`✔ probabilidad TDU: ${p_tdu_nom_probabilidad} CDU: ${p_cdu_nom_probabilidad} NO EXISTE`);
          return 0
        }

        const probabilidadId = probabilidad[0].id;

        const impacto = await cduService.getCduIdByNombreCorto(p_tdu_nom_impacto, p_cdu_nom_impacto)
        if (impacto.length === 0) {
          console.log(`✔ impacto TDU: ${p_tdu_nom_impacto} CDU: ${p_cdu_nom_impacto} NO EXISTE`);
          return 0
        }

        const impactoId = impacto[0].id;

        const mitigacion = await cduService.getCduIdByNombreCorto(p_tdu_nom_mitigacion, p_cdu_nom_mitigacion)
        if (mitigacion.length === 0) {
          console.log(`✔ mitigacion TDU: ${p_tdu_nom_mitigacion} CDU: ${p_cdu_nom_mitigacion} NO EXISTE`);
          return 0
        }

        const mitigacionId = mitigacion[0].id;

        // Crear Delito
        const nuevoRIESGO = await riesgoService.crearRIESGO({
          iddelito: p_delito_id,
          nombre: p_nombre,
          descripcion: p_descripcion,
          probabilidad: probabilidadId,
          impacto: impactoId,
          mitigacion: mitigacionId
        });

        // conservamos el id del nuevo Riesgo
        return nuevoRIESGO.id;

}

procRiesgo = async (p_riesgoData, p_delito_id) => {

  console.log(`En procRiesgo, procesando p_riesgoData.nombre: ${p_riesgoData.nombre} y p_delito_id: ${p_delito_id}...`);
  if (typeof p_riesgoData.nombre === 'undefined') {
    console.log(`p_riesgoData.nombre está undefined. Se omite esta iteración`);
    return 0; // omite esta iteración
  }

  console.log(`Procesando riesgoData.nombre: ${p_riesgoData.nombre}...`);
  // id del Riesgo, ya sea nuevo o existente
  v_riesgo_id = 0

  // Si el Riesgo ya existe, nos saltamos esta parte y continuamos
  //getRIESGOIdByNombreIdDelito
  const rg_riesgo = await riesgoService.getRIESGOIdByNombreIdDelito(p_riesgoData.nombre, p_delito_id) 
  if (rg_riesgo.length > 0) {

    // Como el Riesgo ya existe, conservamos su id
    console.log("la Riesgo ya existe: " + p_riesgoData.nombre);
    v_riesgo_id = rg_riesgo[0].id;

  } else { // Si el Riesgo no existe, lo creamos

    const nombre = p_riesgoData.nombre;
    const descripcion = p_riesgoData.descripcion;

    // Preparar datos y creamos el Riesgo
    v_riesgo_id = await prepCrearRiesgo(p_delito_id, nombre, descripcion,
                                        p_riesgoData.tdu_nom_probabilidad, p_riesgoData.cdu_nom_probabilidad,
                                        p_riesgoData.tdu_nom_impacto, p_riesgoData.cdu_nom_impacto,
                                        p_riesgoData.tdu_nom_mitigacion, p_riesgoData.cdu_nom_mitigacion);

    console.log(`v_riesgo_id: ${v_riesgo_id}`);

    // si el id es mayor a cero, hemos logrado crear un nuevo Riesgo
    if (v_riesgo_id === 0) {
      console.log(`prepCrearRiesgo con error para nombre: ${nombre}: 
        p_riesgoData.tdu_nom_sancion: ${p_riesgoData.tdu_nom_probabilidad} p_riesgoData.cdu_nom_sancion: ${p_riesgoData.cdu_nom_probabilidad}
        p_riesgoData.tdu_nom_impacto: ${p_riesgoData.tdu_nom_impacto} p_riesgoData.cdu_nom_impacto: ${p_riesgoData.cdu_nom_impacto}
        p_riesgoData.tdu_nom_nivelgravedad: ${p_riesgoData.tdu_nom_mitigacion} p_riesgoData.cdu_nom_nivelgravedad: ${p_riesgoData.cdu_nom_mitigacion}`);
      return v_riesgo_id;
    }

  }
}

procDelito = async (p_delitoData, p_ley_id) => {

  console.log(`Procesando p_delitoData.nombre: ${p_delitoData.nombre}...`);
  if (typeof p_delitoData.nombre === 'undefined') {
    console.log(`p_delitoData.nombre está undefined. Se omite esta iteración`);
    return 0; // omite esta iteración
  }

  // id del delito, ya sea nuevo o existente
  v_delito_id = 0

  // Si el Delito/idLey (getDELITOByNombreIdLey) ya existe, nos saltamos esta parte y pasamos directo a crear sus Riesgos asociados 
  //const rg_delito = await delitoService.getDELITOIdByNombre(delitoData.nombre) 
  const rg_delito = await delitoService.getDELITOByNombreIdLey(p_delitoData.nombre, p_ley_id) 
  if (rg_delito.length > 0) {

    // Como el Delito ya existe, conservamos su id
    console.log("la Delito ya existe: " + p_delitoData.nombre);
    v_delito_id = rg_delito[0].id;

  } else { // Si el Delito no existe, lo creamos

    const nombre = p_delitoData.nombre;
    const descripcion = p_delitoData.descripcion;

    // Preparar datos y creamos el Delito
    v_delito_id = await prepCrearDelito(p_ley_id, nombre, descripcion,
                                        p_delitoData.tdu_nom_sancion, p_delitoData.cdu_nom_sancion,
                                        p_delitoData.tdu_nom_nivelgravedad, p_delitoData.cdu_nom_nivelgravedad);

    console.log(`v_delito_id: ${v_delito_id}`);

    // si el id es mayor a cero, hemos logrado crear un nuevo Delito
    if (v_delito_id === 0) {
      console.log(`prepCrearDelito con error para nombre: ${nombre}: 
        p_delitoData.tdu_nom_sancion: ${p_delitoData.tdu_nom_sancion} p_delitoData.cdu_nom_sancion: ${p_delitoData.cdu_nom_sancion}
        p_delitoData.tdu_nom_nivelgravedad: ${p_delitoData.tdu_nom_nivelgravedad} p_delitoData.cdu_nom_nivelgravedad: ${p_delitoData.cdu_nom_nivelgravedad}`);
      return v_delito_id;
    }

  }

  // Crear Riesgos asociadas al Delito
  for (const riesgoData of p_delitoData.riesgos) {

    v_id_riesgo = procRiesgo(riesgoData, v_delito_id);

  }

}


// A partir del archivo leyes.json, cargamos leyes de prueba y datos asociados de delito y riesgo
seedLEYPrueba = async () => {
  try {
    const leyes = JSON.parse(fs.readFileSync('./src/seeddata/leyesReal.json', 'utf8'));
    
    
    
    for (leyData of leyes) {
      console.log("Procesando leyData.nombre: " + leyData.nombre);

      // id de la Ley, ya sea nueva o existente
      v_ley_id = 0

      // Si la LEY ya existe, conservamos su id y pasamos directo a crear sus Delitos asociados
      const rg_ley = await leyService.getLEYIdBynombre(leyData.nombre) 
      if (rg_ley.length > 0) {

        // Como la Ley ya existe, conserrvamos su id
        console.log("la Ley ya existe: " + leyData.nombre);
        v_ley_id = rg_ley[0].id;

      } else { // Si la LEY no existe, la creamos

        console.log("la Ley no existe: " + leyData.nombre);

        const nombre = leyData.nombre;
        const descripcion = leyData.descripcion;
        const fechapublicacion = leyData.fechapublicacion;

        // Preparar datos, creamos la Ley y obtenemos su id
        v_ley_id = await prepCrearLey(nombre, descripcion, fechapublicacion, leyData.tdu_nom_pais, leyData.cdu_nom_pais)

        console.log(`v_ley_id: ${v_ley_id}`);

        // si el id es mayor a cero, hemos logrado crear una nueva Ley
        if (v_ley_id === 0) {
          console.log(`prepCrearLey con error para nombre: ${nombre}: leyData.tdu_nom_pais: ${leyData.tdu_nom_pais} leyData.tdu_nom_pais: ${leyData.tdu_nom_pais}`);
          continue;
        }

      }

      // Crear delitos asociadas a la LEY
      for (const delitoData of leyData.delitos) {

        v_id_delito = procDelito(delitoData, v_ley_id)

      }     
  
    }  

    console.log('✅ Todos los datos han sido importados correctamente.');
  } catch (error) {
    console.error('❌ Error durante la importación:', error.response?.data || error.message);
  }
}

convertirMonedaAPI = async (monto, origen, destino) => {
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();

    const rates = data.rates;

    if (!rates[origen] || !rates[destino]) {
      throw new Error('Moneda no soportada');
    }

    // Paso 1: Convertir a USD si es necesario
    const montoEnUSD = origen === 'USD' ? monto : monto / rates[origen];

    // Paso 2: Convertir de USD a la moneda destino
    const montoConvertido = destino === 'USD' ? montoEnUSD : montoEnUSD * rates[destino];

    console.log(`${monto} ${origen} = ${montoConvertido.toFixed(2)} ${destino}`);
    return montoConvertido.toFixed(2);
  } catch (error) {
    console.error('Error en la conversión:', error.message);
    return null;
  }

}


calcularTotalAPagarCLP = async (montoUSD, comisionUSD) => {
  try {
    const totalUSD = montoUSD + comisionUSD;

  // Convertimos el total en USD a CLP usando la API
  const totalCLP = await convertirMonedaAPI(totalUSD, 'USD', 'CLP');

  console.log(`Total a pagar por enviar ${montoUSD} USD (comisión ${comisionUSD} USD): ${totalCLP} CLP`);
  return totalCLP;

  } catch (error) {
    console.error('Error en la conversión:', error.message);
    return null;
  }

}

calcularTotalAPagarMonedaOrigen = async (montoOriginal, monedaOriginal, comisionUSD) => {
  try {
    // Convertimos la comisión en USD a la moneda original
    const comisionEnMonedaOrigen = await convertirMonedaAPI(comisionUSD, 'USD', monedaOriginal);

    if (comisionEnMonedaOrigen === null) {
      throw new Error('No se pudo convertir la comisión');
    }

    const totalPagar = parseFloat(montoOriginal) + parseFloat(comisionEnMonedaOrigen);

    console.log(`Total a pagar por enviar ${montoOriginal} ${monedaOriginal} (comisión ${comisionUSD} USD ≈ ${comisionEnMonedaOrigen} ${monedaOriginal}): ${totalPagar} ${monedaOriginal}`);
    
    return totalPagar.toFixed(2);
  } catch (error) {
    console.error('Error en el cálculo del total:', error.message);
    return null;
  }
}

module.exports = { iniciarCargas, seedTDUCDU, seedLEYPrueba, convertirMonedaAPI, calcularTotalAPagarCLP, calcularTotalAPagarMonedaOrigen };