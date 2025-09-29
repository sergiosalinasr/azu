require('dotenv').config();

const getENV = () => {
  return {
    production: process.env.production,
    appVersion: process.env.appVersion,
    env_version: process.env.env_version,
    env_empresa_logo: process.env.env_empresa_logo,
    env_empresa_url: process.env.env_empresa_url,
    env_nombre_sistema: process.env.env_nombre_sistema,
    env_empresa: process.env.env_empresa,
    env_url_backend: process.env.env_url_backend,
    env_tdu_pais: process.env.env_tdu_pais,
    env_tdu_sancion: process.env.env_tdu_sancion,
    env_tdu_nivelgravedad: process.env.env_tdu_nivelgravedad,
    env_tdu_probabilidad: process.env.env_tdu_probabilidad,
    env_tdu_impacto: process.env.env_tdu_impacto,
    env_tdu_mitigacion: process.env.env_tdu_mitigacion
  };
};

module.exports = {
  getENV
};

