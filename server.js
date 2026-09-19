import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { getRashtraLinkKnowledgeReply } from './knowledge.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

// Lazy-initialized Gemini client
let geminiClient = null;
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return geminiClient;
}

const DATA_FILE = path.join(__dirname, 'applications.json');

// Google Apps Script Webhook for automatic Google Sheet sync
const SHEET_WEBHOOK_URL = process.env.SHEET_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbxOxh07es6Tk5iNRK4bWl6IYwaKSHBfA5h8Up_iFMtUjYfIPT-Omrtgi3UnqWQvbM6CuQ/exec';

// Ensure storage file exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]), 'utf-8');
}

// Secure Endpoint for applicants submitting form (No records exposed to client)
app.post('/api/apply', (req, res) => {
  try {
    const { id, timestamp, name, phone, email, city, role, note } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required.' });
    }

    // Clean and ensure phone starts with an apostrophe so Google Sheets never interprets + as a broken formula
    let formattedPhone = phone || '';
    if (formattedPhone && !formattedPhone.startsWith("'")) {
      formattedPhone = "'" + formattedPhone;
    }

    const record = {
      id: id || `RL-KOL-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: timestamp || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      name,
      phone: formattedPhone,
      email: email || '',
      city: city || '',
      role: role || '',
      note: note || '',
      submittedAt: new Date().toISOString()
    };

    let list = [];
    try {
      list = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8') || '[]');
    } catch (e) {
      list = [];
    }

    list.unshift(record);
    fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), 'utf-8');

    // Auto-sync into Google Sheet Webhook
    if (SHEET_WEBHOOK_URL && SHEET_WEBHOOK_URL.startsWith('http')) {
      fetch(SHEET_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
        redirect: 'follow'
      }).then(r => console.log('Google Sheet sync response status:', r.status))
        .catch(err => console.error('Sheet Webhook sync error:', err));
    }

    return res.json({ success: true, id: record.id });
  } catch (err) {
    console.error('Apply error:', err);
    return res.status(500).json({ error: 'Server error saving application.' });
  }
});

// 2. Submit Grievance Redressal Ticket Endpoint (IT Rules 2021)
app.post('/api/grievance', async (req, res) => {
  try {
    const { ticketId, name, email, category, details, timestamp } = req.body || {};
    if (!name || !email || !details) {
      return res.status(400).json({ error: 'Name, email, and details are required.' });
    }

    const record = {
      type: 'grievance',
      ticketId: ticketId || `GRV-2026-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: timestamp || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      name,
      email,
      category: category || 'General Grievance',
      details,
      status: 'Statutory Acknowledgment Issued',
      submittedAt: new Date().toISOString()
    };

    if (SHEET_WEBHOOK_URL && SHEET_WEBHOOK_URL.startsWith('http')) {
      await fetch(SHEET_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
        redirect: 'follow'
      }).catch(err => console.error('Sheet Webhook grievance sync error:', err));
    }

    return res.json({ success: true, ticketId: record.ticketId });
  } catch (err) {
    console.error('Grievance error:', err);
    return res.status(500).json({ error: 'Server error filing grievance.' });
  }
});

// Secure Founder-Only Export (Guarded by Secret Passkey)
app.get('/api/admin/export', (req, res) => {
  const secretKey = req.query.key || req.headers['x-admin-key'];
  const expectedKey = process.env.ADMIN_SECRET_KEY || 'rashtralink2026';

  if (!secretKey || secretKey !== expectedKey) {
    return res.status(401).send('Unauthorized. Invalid or missing Founder Access Key.');
  }

  try {
    const list = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8') || '[]');
    const format = req.query.format || 'csv';

    if (format === 'json') {
      return res.json(list);
    }

    // CSV Format
    const headers = ['Application ID', 'Timestamp (IST)', 'Legal Name', 'WhatsApp Phone', 'Official Email', 'City / State', 'Ecosystem Track', 'Applicant Note'];
    const rows = list.map(a => [
      `"${(a.id || '').replace(/"/g, '""')}"`,
      `"${(a.timestamp || '').replace(/"/g, '""')}"`,
      `"${(a.name || '').replace(/"/g, '""')}"`,
      `"${(a.phone || '').replace(/"/g, '""')}"`,
      `"${(a.email || '').replace(/"/g, '""')}"`,
      `"${(a.city || '').replace(/"/g, '""')}"`,
      `"${(a.role || '').replace(/"/g, '""')}"`,
      `"${(a.note || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="RashtraLink_Applicants_${new Date().toISOString().slice(0, 10)}.csv"`);
    return res.send(csvContent);
  } catch (err) {
    return res.status(500).send('Error generating export.');
  }
});

// Push existing applications to Google Sheet on demand (Founder protected)
app.get('/api/admin/sync-sheet', async (req, res) => {
  const secretKey = req.query.key || req.headers['x-admin-key'];
  const expectedKey = process.env.ADMIN_SECRET_KEY || 'rashtralink2026';

  if (!secretKey || secretKey !== expectedKey) {
    return res.status(401).send('Unauthorized.');
  }

  try {
    const list = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8') || '[]');
    let count = 0;
    for (const record of list) {
      if (SHEET_WEBHOOK_URL) {
        await fetch(SHEET_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(record),
          redirect: 'follow'
        }).catch(e => console.error(e));
        count++;
      }
    }
    return res.send(`Successfully synchronized ${count} applicant record(s) to your Google Sheet!`);
  } catch (err) {
    return res.status(500).send('Sync failed: ' + err.message);
  }
});

// 3. Gemini Chatbot Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body || {};
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'A valid message string is required.' });
    }

    const ai = getGeminiClient();

    const systemInstruction = `You are RashtraLink AI, an intelligent, patriotic, polite, and helpful assistant on the official platform of RashtraLink (India's Sovereign AI Social Network).
Founder: Debaprabho Paul (Rashtra Group).
Vision & Mission: Empowering 1.4 Billion Indians with data sovereignty, transparent algorithm governance, civil debate without rage-bait algorithms, and high-performance cloud infrastructure compliant with the Digital Personal Data Protection (DPDP) Act 2023.

Core RashtraLink Architecture & Features:
1. Sovereign Feed Algorithm: Open, deterministic 4-stage matrix (Category Weighting, Recency, Network Affinity, Factuality Verification). No black-box addiction or surveillance loops.
2. Charcha Arena: Evidence-based civic discourse where controversial claims require verifiable source citations. Civil debates supported across all 22 official Indian languages.
3. 10K-Zero Creator Model: Fair 70% direct monetization for Indian creators without middleman cuts. Monetization unlocks at 10,000 verified engagements with 0% platform penalty.
4. Data Sovereignty: 100% Indian data residency hosted across Tier-4 regional hubs (Bengaluru, Delhi, Mumbai, Hyderabad, Kolkata, Chennai). Zero foreign data harvesting.
5. Founding Citizen / Wishlist: Users can apply for Early Access via the wishlist on this page to receive a golden Founding Citizen profile badge, 1-year verified checkmark, and early beta access.
6. Founder: Debaprabho Paul, visionary technologist and entrepreneur driving the Rashtra Group vision for Viksit Bharat 2047.

Guidelines:
- Keep responses friendly, warm, articulate, and concise (typically 1-3 short paragraphs or clean bullet points).
- Respond in the language of the user (English, Hindi, Hinglish, Bengali, etc.).
- You are also pleased to answer any general knowledge questions, technology queries, or historical/cultural facts with accuracy and poise.`;

    if (!ai) {
      const reply = getRashtraLinkKnowledgeReply(message);
      return res.status(200).json({ reply, source: 'knowledge-engine' });
    }

    // Format previous messages for multi-turn conversation
    const contents = [];
    if (Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        const role = (item.role === 'assistant' || item.role === 'model') ? 'model' : 'user';
        const text = item.text || (item.parts && item.parts[0]?.text) || '';
        if (text) {
          contents.push({ role, parts: [{ text }] });
        }
      }
    }
    contents.push({ role: 'user', parts: [{ text: message.trim() }] });

    // Primary model is gemini-3.6-flash (active, reliable), with fallback to gemini-3.8-flash
    const candidateModels = ['gemini-3.6-flash', 'gemini-3.8-flash'];
    for (const modelName of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: contents,
          config: {
            systemInstruction,
            temperature: 0.7,
            maxOutputTokens: 600,
          }
        });

        if (response && response.text) {
          return res.status(200).json({ reply: response.text, model: modelName });
        }
      } catch (geminiErr) {
        console.warn(`[server.js] Model ${modelName} returned temporary error:`, geminiErr.message || geminiErr);
      }
    }

    // Resilient fallback if both models experience upstream demand spikes
    const resilientReply = getRashtraLinkKnowledgeReply(message);
    return res.status(200).json({ reply: resilientReply, source: 'resilient-fallback' });
  } catch (err) {
    console.error('Gemini Chat error:', err);
    const fallbackReply = getRashtraLinkKnowledgeReply(req.body?.message || '');
    return res.status(200).json({ reply: fallbackReply, source: 'catch-fallback' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`RashtraLink server running on http://0.0.0.0:${PORT}`);
});
