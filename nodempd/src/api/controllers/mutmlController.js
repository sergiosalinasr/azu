const mutmlService = require('../../services/mutmlService');

exports.postmutml01 = async (req, res) => {
  try {
    console.error('postmutml01: req.body', req.body);
    const { chatInput } = req.body;

    // Llamar al servicio
    const body = req.body;
    const response = await mutmlService.postMutml01(body);
    res.json(response);
  } catch (err) {
    console.error('Error en sendChatMessage:', err);
    res.status(500).json({ error: 'Error conectando con mutml' });
  }
};

