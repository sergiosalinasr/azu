
require('dotenv').config();
const url_mlserving = process.env.URL_MLSERVING;

const postMutml01 = async (payload) => {

  const modelo = "/logreg2_1";
  const endpoint = url_mlserving + modelo
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