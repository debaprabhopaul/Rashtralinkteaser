import fs from 'fs';
import path from 'path';

// Google Apps Script Webhook
const SHEET_WEBHOOK_URL = process.env.SHEET_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbxOxh07es6Tk5iNRK4bWl6IYwaKSHBfA5h8Up_iFMtUjYfIPT-Omrtgi3UnqWQvbM6CuQ/exec';

// Serverless handler on Vercel
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const url = req.url || '';

  // 1. Submit Application Endpoint
  if (req.method === 'POST' && (url.includes('/apply') || url === '/api/apply')) {
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

      // In serverless, try writing to /tmp for ephemeral record
      try {
        const tmpFile = '/tmp/applications.json';
        let list = [];
        if (fs.existsSync(tmpFile)) {
          list = JSON.parse(fs.readFileSync(tmpFile, 'utf-8') || '[]');
        }
        list.unshift(record);
        fs.writeFileSync(tmpFile, JSON.stringify(list, null, 2), 'utf-8');
      } catch (e) {
        // Safe to continue even if /tmp is constrained
      }

      // Sync directly to Google Sheet Webhook
      if (SHEET_WEBHOOK_URL && SHEET_WEBHOOK_URL.startsWith('http')) {
        await fetch(SHEET_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(record),
          redirect: 'follow'
        }).catch(err => console.error('Vercel Sheet Webhook error:', err));
      }

      return res.status(200).json({ success: true, id: record.id });
    } catch (err) {
      console.error('API apply error:', err);
      return res.status(500).json({ error: 'Server error saving application.' });
    }
  }

  // 2. Export / Admin Endpoint
  if (url.includes('/admin/export')) {
    const secretKey = req.query?.key || req.headers['x-admin-key'];
    const expectedKey = process.env.ADMIN_SECRET_KEY || 'rashtralink2026';

    if (!secretKey || secretKey !== expectedKey) {
      return res.status(401).send('Unauthorized. Invalid or missing Founder Access Key.');
    }

    try {
      const tmpFile = '/tmp/applications.json';
      const list = fs.existsSync(tmpFile) ? JSON.parse(fs.readFileSync(tmpFile, 'utf-8') || '[]') : [];
      return res.status(200).json(list);
    } catch (e) {
      return res.status(500).send('Error retrieving export.');
    }
  }

  return res.status(200).json({ status: 'RashtraLink API active' });
}
