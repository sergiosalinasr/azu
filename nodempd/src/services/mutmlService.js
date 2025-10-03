const logger = require('../logger');
require('dotenv').config();
logger.info(`mutmlService.js/process.env.URL_MLSERVING: ${process.env.URL_MLSERVING}`);
const url_mlserving = process.env.URL_MLSERVING;

const postMutml01 = async (payload) => {

  const modelo = "/logreg2_1";
  const endpoint = url_mlserving + modelo
  logger.info(`mutmlService.js/postMutml01/endpoint: ${endpoint}`);
  const r = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!r.ok) {
    throw new Error(`Error HTTP: ${r.status}`);
  }

  return r.json();
};

const postMutml02 = async (payload) => {

  const modelo = "/news_logreg";
  const endpoint = url_mlserving + modelo
  logger.info(`mutmlService.js/postMutml02/endpoint: ${endpoint}`);
  const r = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!r.ok) {
    throw new Error(`Error HTTP: ${r.status}`);
  }

  return r.json();
};

module.exports = {
  postMutml01,
  postMutml02
};