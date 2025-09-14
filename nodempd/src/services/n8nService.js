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

module.exports = {
  postToN8nChat,
  postN8nUssChat,
  postN8nMutChat
};