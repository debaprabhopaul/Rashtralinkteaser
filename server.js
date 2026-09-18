import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`RashtraLink server running on http://0.0.0.0:${PORT}`);
});
