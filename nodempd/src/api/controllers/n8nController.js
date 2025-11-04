const n8nService = require('../../services/n8nService');

exports.sendChatMessage = async (req, res) => {
  try {
    const { chatInput, sessionId } = req.body;

    // Validar datos requeridos
    if (!chatInput || !sessionId) {
      return res.status(400).json({
        error: 'Faltan campos requeridos: chatInput y sessionId'
      });
    }

    // Llamar al servicio
    const response = await n8nService.postToN8nChat({ chatInput, sessionId });
    res.json(response);
  } catch (err) {
    console.error('Error en sendChatMessage:', err);
    res.status(500).json({ error: 'Error conectando con n8n' });
  }
};

exports.postn8nusschat = async (req, res) => {
  try {
    const { chatInput, sessionId } = req.body;

    // Validar datos requeridos
    if (!chatInput || !sessionId) {
      return res.status(400).json({
        error: 'Faltan campos requeridos: chatInput y sessionId'
      });
    }

    // Llamar al servicio
    const response = await n8nService.postN8nUssChat({ chatInput, sessionId });
    res.json(response);
  } catch (err) {
    console.error('Error en sendChatMessage:', err);
    res.status(500).json({ error: 'Error conectando con n8n' });
  }
};

exports.postn8nmutchat = async (req, res) => {
  try {
    const { chatInput, sessionId } = req.body;

    // Validar datos requeridos
    if (!chatInput || !sessionId) {
      return res.status(400).json({
        error: 'Faltan campos requeridos: chatInput y sessionId'
      });
    }

    // Llamar al servicio
    const response = await n8nService.postN8nMutChat({ chatInput, sessionId });
    res.json(response);
  } catch (err) {
    console.error('Error en sendChatMessage:', err);
    res.status(500).json({ error: 'Error conectando con n8n' });
  }
};

exports.postn8nchatgpt = async (req, res) => {
  try {
    const { chatInput, sessionId, user_id, topic } = req.body;

    console.log( `n8nController.js/postn8nchatgpt: chatInput: ${chatInput}, sessionId: ${sessionId}, user_id: ${user_id}, topic: ${topic} `)

    // Validar datos requeridos
    if (!chatInput || !sessionId) {
      return res.status(400).json({
        error: 'Faltan campos requeridos: chatInput y sessionId'
      });
    }

    // Llamar al servicio
    const response = await n8nService.postN8nChatGPT({ chatInput, sessionId, user_id, topic });
    res.json(response);
  } catch (err) {
    console.error('Error en sendChatMessage:', err);
    res.status(500).json({ error: 'Error conectando con n8n' });
  }
};