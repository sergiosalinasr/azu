//import fetch from 'node-fetch';

const CHAT_URL = 'https://n8n.sersalret.com/webhook/b5e0cb94-4b44-4923-a804-fc113f852998/chat';

const postToN8nChat = async (payload) => {
  const r = await fetch(CHAT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!r.ok) {
    throw new Error(`Error HTTP: ${r.status}`);
  }

  return r.json();
};

const postN8nUssChat = async (payload) => {
  const CHAT_URL = 'https://n8n.sersalret.com/webhook/41c5c118-3dc3-4988-ace3-72974643a916/chat';
  const r = await fetch(CHAT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!r.ok) {
    throw new Error(`Error HTTP: ${r.status}`);
  }

  return r.json();
};

const postN8nMutChat = async (payload) => {
  const CHAT_URL = 'https://n8n.sersalret.com/webhook/31eea859-c9e5-4682-a943-f49b74511537/chat';
  const r = await fetch(CHAT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!r.ok) {
    throw new Error(`Error HTTP: ${r.status}`);
  }

  return r.json();
};

// Implementa un chatgpt personal usando las APIs via n8n
const postN8nChatGPT = async (payload) => {
  const CHAT_URL = 'https://n8n.sersalret.com/webhook/12af40e5-004f-4d93-869e-5acd2c6acb50/chat';
  console.log( `n8nService.js/postN8nChatGPT: payload: ${JSON.stringify(payload)}`)
  const r = await fetch(CHAT_URL, {
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
  postToN8nChat,
  postN8nUssChat,
  postN8nMutChat,
  postN8nChatGPT
};