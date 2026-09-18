// Dedicated Vercel serverless function for /api/apply
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const SHEET_WEBHOOK_URL = process.env.SHEET_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbxOxh07es6Tk5iNRK4bWl6IYwaKSHBfA5h8Up_iFMtUjYfIPT-Omrtgi3UnqWQvbM6CuQ/exec';

  try {
    const { id, timestamp, name, phone, email, city, role, note } = req.body || {};
    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required.' });
    }

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

    if (SHEET_WEBHOOK_URL && SHEET_WEBHOOK_URL.startsWith('http')) {
      await fetch(SHEET_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
        redirect: 'follow'
      }).catch(err => console.error('Sheet Webhook dispatch error:', err));
    }

    return res.status(200).json({ success: true, id: record.id });
  } catch (err) {
    console.error('Error handling application:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
