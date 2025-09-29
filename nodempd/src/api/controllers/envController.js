

require('dotenv').config();
const logger = require('../../logger');
const envService = require('../../services/envService');

exports.getenv = async (req, res) => {
  console.log("getenv ");
  try { 
    const getENV = await envService.getENV();
    res.status(200).json(getENV);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

};
