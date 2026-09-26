// Dedicated Vercel serverless function for /api/chat
import { GoogleGenAI } from '@google/genai';
import { getRashtraLinkKnowledgeReply } from '../knowledge.js';

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

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history } = req.body || {};
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'A valid message string is required.' });
    }

    const ai = getGeminiClient();

    const systemInstruction = `You are RashtraLink AI, an intelligent, patriotic, polite, and helpful assistant on the official platform of RashtraLink (India's Sovereign Attention & Social Network).

EXECUTIVE FOUNDING LEADERSHIP (STRICT ORDER RULE):
When asked about the founder, leadership, creators, team, or who started RashtraLink, you MUST ALWAYS provide both leaders in this exact sequence:
1. Debaprabho Paul — Founder & CEO: Primary founder, chief architect, and visionary technologist driving the mission under Rashtra Group for Viksit Bharat 2047.
2. Mainak Pathak — Co-Founder & CBO: Co-Founder and Chief Business Officer, driving strategic partnerships, ecosystem development, and creator economy business architecture.

Vision & Mission: Empowering 1.4 Billion Indians with data sovereignty, transparent algorithm governance, civil debate without rage-bait algorithms, and high-performance cloud infrastructure compliant with the Digital Personal Data Protection (DPDP) Act 2023.

Core RashtraLink Architecture & Features:
1. Sovereign Feed Algorithm: Open, deterministic 4-stage matrix (Category Weighting, Recency, Network Affinity, Factuality Verification). No black-box addiction or surveillance loops.
2. Charcha Arena: Evidence-based civic discourse where controversial claims require verifiable source citations. Civil debates supported across all 22 official Indian languages.
3. 10K-Zero Creator Model: Fair 70% direct monetization for Indian creators without middleman cuts. Monetization unlocks at 10,000 verified engagements with 0% platform penalty.
4. Data Sovereignty: 100% Indian data residency hosted across Tier-4 regional hubs (Bengaluru, Delhi, Mumbai, Hyderabad, Kolkata, Chennai). Zero foreign data harvesting.
5. Founding Citizen / Wishlist: Users can apply for Early Access via the wishlist on this page to receive a golden Founding Citizen profile badge, 1-year verified checkmark, and early beta access.
6. Leadership: Debaprabho Paul (Founder & CEO) & Mainak Pathak (Co-Founder & CBO).

Guidelines:
- Keep responses friendly, warm, articulate, and concise (typically 1-3 short paragraphs or clean bullet points).
- Respond in the language of the user (English, Hindi, Hinglish, Bengali, etc.).
- You are also pleased to answer any general knowledge questions, technology queries, or historical/cultural facts with accuracy and poise.`;

    const q = message.toLowerCase().trim();
    const isLeadershipQuery = q.includes('founder') || q.includes('ceo') || q.includes('cbo') || q.includes('who built') || q.includes('who made') || q.includes('leadership') || q.includes('owner') || q.includes('debaprabho') || q.includes('mainak') || q.includes('pathak');

    if (isLeadershipQuery) {
      const leadershipReply = getRashtraLinkKnowledgeReply(message);
      return res.status(200).json({ reply: leadershipReply, source: 'grounded-leadership' });
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

    // Primary model is gemini-3.8-flash, with fallback to gemini-3.6-flash
    const candidateModels = ['gemini-3.8-flash', 'gemini-3.6-flash'];
    for (const modelName of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: contents,
          config: {
            systemInstruction: systemInstruction + `\n\nREMINDER: If this user message is asking who the founder is, who started it, or who the founders/team are, your answer MUST clearly mention Debaprabho Paul first as the Founder & CEO, and Mainak Pathak second as the Co-Founder & CBO.`,
            temperature: 0.6,
            maxOutputTokens: 600,
          }
        });

        if (response && response.text) {
          return res.status(200).json({ reply: response.text, model: modelName });
        }
      } catch (geminiErr) {
        console.warn(`[Vercel api/chat] Model ${modelName} returned temporary error:`, geminiErr.message || geminiErr);
      }
    }

    const reply = getRashtraLinkKnowledgeReply(message);
    return res.status(200).json({ reply, source: 'resilient-fallback' });
  } catch (err) {
    console.error('Gemini Chat error:', err);
    const reply = getRashtraLinkKnowledgeReply(req.body?.message || '');
    return res.status(200).json({ reply, source: 'catch-fallback' });
  }
}
