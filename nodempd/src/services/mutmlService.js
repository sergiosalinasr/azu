
require('dotenv').config();
const url_mlserving = process.env.URL_MLSERVING;
const modelo = "/logreg2_1";
const endpoint = url_mlserving + modelo

const postMutml01 = async (payload) => {
  console.error('postMutml01: req.payload', payload);
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
  postMutml01
};