// Dedicated Vercel serverless function for /api/chat
import { GoogleGenAI } from '@google/genai';

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
      // Graceful fallback response if GEMINI_API_KEY environment variable is not configured yet on Vercel
      const queryLower = message.toLowerCase();
      let reply = "Namaste! 🙏 I am RashtraLink AI. ";
      if (queryLower.includes("what is") || queryLower.includes("rashtralink") || queryLower.includes("about") || queryLower.includes("kya hai")) {
        reply += "RashtraLink is India's sovereign AI-powered social network founded by Debaprabho Paul under Rashtra Group. It replaces opaque casino algorithms with our transparent Sovereign Feed, brings evidence-backed civil discussions in Charcha Arena, and safeguards all Indian citizen data under the DPDP Act 2023.";
      } else if (queryLower.includes("early access") || queryLower.includes("wishlist") || queryLower.includes("apply") || queryLower.includes("join")) {
        reply += "You can apply right here on this page! Click the 'Claim Early Access' button to reserve your Founding Citizen gold badge, verified tick, and early beta platform invitation.";
      } else if (queryLower.includes("founder") || queryLower.includes("who built") || queryLower.includes("ceo") || queryLower.includes("debaprabho") || queryLower.includes("paul")) {
        reply += "RashtraLink was founded by Debaprabho Paul under Rashtra Group with the mission to give 1.4 billion Indians technological independence and sovereign digital identity.";
      } else if (queryLower.includes("algorithm") || queryLower.includes("feed")) {
        reply += "Unlike foreign social apps that trap users in dopamine and outrage spirals, the RashtraLink Sovereign Algorithm uses a transparent 4-stage deterministic calculation that you can inspect and customize directly.";
      } else {
        reply += "I am ready to help you explore RashtraLink's sovereign algorithm, Charcha Arena, creator economy, and early access wishlist! What would you like to know?";
      }
      return res.status(200).json({ reply });
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

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 600,
      }
    });

    const reply = response.text || "Namaste! How may I assist your RashtraLink journey today?";
    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Gemini Chat error:', err);
    return res.status(200).json({ 
      reply: "Namaste! I am RashtraLink AI. I am here to help you learn about India's Sovereign Social Network, the Sovereign Feed Algorithm, Charcha Arena, and claiming your Founding Citizen badge. What would you like to explore?"
    });
  }
}
