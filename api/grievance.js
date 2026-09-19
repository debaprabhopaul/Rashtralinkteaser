// Serverless endpoint for IT Rules 2021 Grievance Redressal
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

  const SHEET_WEBHOOK_URL = process.env.SHEET_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbxOxh07es6Tk5iNRK4bWl6IYwaKSHBfA5h8Up_iFMtUjYfIPT-Omrtgi3UnqWQvbM6CuQ/exec';

  try {
    const { ticketId, name, email, category, details, timestamp } = req.body || {};

    if (!name || !email || !details) {
      return res.status(400).json({ error: 'Name, email, and details are required.' });
    }

    const grievanceRecord = {
      type: 'grievance',
      ticketId: ticketId || `GRV-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp: timestamp || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      name,
      email,
      category: category || 'General Grievance',
      details,
      status: 'Statutory Acknowledgment Issued (24h SLA)',
      submittedAt: new Date().toISOString()
    };

    if (SHEET_WEBHOOK_URL && SHEET_WEBHOOK_URL.startsWith('http')) {
      await fetch(SHEET_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(grievanceRecord),
        redirect: 'follow'
      }).catch(err => console.error('Grievance Sheet Webhook dispatch error:', err));
    }

    return res.status(200).json({ success: true, ticketId: grievanceRecord.ticketId });
  } catch (err) {
    console.error('Error handling grievance ticket:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
