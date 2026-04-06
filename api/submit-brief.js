// Vercel Serverless Function — Brand Brief Email Notification
// Uses Nodemailer + Gmail App Password (zero cost, no third-party)
// Env vars needed in Vercel dashboard:
//   GMAIL_USER   → your Gmail address  e.g. gouthamslal.work@gmail.com
//   GMAIL_PASS   → 16-char Gmail App Password (not your real password)
//   NOTIFY_TO    → email to receive briefs (can be same as GMAIL_USER)

const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  // CORS — allow only your own domain
  res.setHeader('Access-Control-Allow-Origin', 'https://madebygoutham.space');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    brand_name,
    client_email,
    story,
    differentiation,
    vision,
    values,
    competitors,
    audience,
    archetype,
    tone,
    notes,
  } = req.body;

  // Basic validation
  if (!brand_name || !client_email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Build the HTML email
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <style>
    body{font-family:'Helvetica Neue',Arial,sans-serif;background:#f5f2ed;margin:0;padding:0}
    .wrap{max-width:620px;margin:40px auto;background:#fff;border-radius:10px;overflow:hidden;border:1px solid #e8e4de}
    .hdr{background:#0e0e0e;padding:32px 36px}
    .hdr-tag{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#888;margin-bottom:10px}
    .hdr-title{font-size:26px;font-weight:700;color:#fff;line-height:1.1}
    .hdr-sub{font-size:13px;color:#666;margin-top:8px}
    .body{padding:32px 36px}
    .section{margin-bottom:28px;padding-bottom:28px;border-bottom:1px solid #f0ece6}
    .section:last-child{border-bottom:none;margin-bottom:0}
    .sec-label{font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:#aaa;margin-bottom:8px;font-weight:600}
    .sec-val{font-size:14px;line-height:1.8;color:#1a1a1a}
    .chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:4px}
    .chip{font-size:11px;padding:4px 12px;background:#f5f2ed;border-radius:100px;color:#555;border:1px solid #e8e4de}
    .arch-badge{display:inline-flex;align-items:center;gap:8px;padding:10px 18px;background:#0e0e0e;border-radius:8px;color:#fff;font-size:14px;font-weight:600}
    .tone-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
    .tone-labels{display:flex;justify-content:space-between;font-size:11px;color:#888;width:100%}
    .tone-bar-bg{height:3px;background:#f0ece6;border-radius:2px;margin:4px 0 0;position:relative}
    .tone-bar-fill{height:3px;background:#0e0e0e;border-radius:2px}
    .cta{display:inline-block;margin-top:4px;padding:12px 24px;background:#0e0e0e;color:#fff;text-decoration:none;border-radius:100px;font-size:12px;letter-spacing:.08em;text-transform:uppercase}
    .footer{background:#f9f6f2;padding:20px 36px;font-size:11px;color:#aaa;border-top:1px solid #f0ece6}
  </style>
</head>
<body>
<div class="wrap">
  <div class="hdr">
    <div class="hdr-tag">New Brand Brief</div>
    <div class="hdr-title">${escapeHtml(brand_name)}</div>
    <div class="hdr-sub">From: <a href="mailto:${escapeHtml(client_email)}" style="color:#888">${escapeHtml(client_email)}</a></div>
  </div>
  <div class="body">

    <div class="section">
      <div class="sec-label">Brand Story</div>
      <div class="sec-val">${escapeHtml(story || '—')}</div>
    </div>

    <div class="section">
      <div class="sec-label">What Makes It Different</div>
      <div class="sec-val">${escapeHtml(differentiation || '—')}</div>
    </div>

    <div class="section">
      <div class="sec-label">5-Year Vision</div>
      <div class="sec-val">${escapeHtml(vision || '—')}</div>
    </div>

    <div class="section">
      <div class="sec-label">Brand Values</div>
      <div class="chips">${(values || '—').split(',').map(v => `<span class="chip">${escapeHtml(v.trim())}</span>`).join('')}</div>
    </div>

    <div class="section">
      <div class="sec-label">Competitors & Admired Brands</div>
      <div class="sec-val">${escapeHtml(competitors || '—')}</div>
    </div>

    <div class="section">
      <div class="sec-label">Target Audience</div>
      <div class="sec-val">${escapeHtml(audience || '—')}</div>
    </div>

    <div class="section">
      <div class="sec-label">Brand Archetype</div>
      <div class="arch-badge">${escapeHtml(archetype || '—')}</div>
    </div>

    <div class="section">
      <div class="sec-label">Tone of Voice</div>
      ${buildToneHtml(tone)}
    </div>

    <div class="section">
      <div class="sec-label">Additional Notes</div>
      <div class="sec-val">${escapeHtml(notes || '—')}</div>
    </div>

    <a href="mailto:${escapeHtml(client_email)}" class="cta">Reply to Client →</a>

  </div>
  <div class="footer">
    Submitted via madebygoutham.space/brief &nbsp;·&nbsp; ${new Date().toUTCString()}
  </div>
</div>
</body>
</html>`;

  // Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,   // Gmail App Password — NOT your login password
    },
  });

  try {
    await transporter.sendMail({
      from: `"Brand Brief" <${process.env.GMAIL_USER}>`,
      to: process.env.NOTIFY_TO,
      replyTo: client_email,
      subject: `✦ New Brand Brief — ${brand_name}`,
      html,
      text: buildPlainText(req.body),
    });

    return res.status(200).json({ ok: true, message: 'Brief received!' });
  } catch (err) {
    console.error('Email send error:', err);
    return res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
};

// ── Helpers ──────────────────────────────────────────────────
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '<br/>');
}

function buildToneHtml(tone) {
  if (!tone || typeof tone !== 'object') return '<div style="color:#aaa;font-size:12px">—</div>';
  return Object.entries(tone).map(([label, val]) => {
    const pct = Math.min(100, Math.max(0, parseInt(val) || 50));
    const parts = label.split('↔').map(s => s.trim());
    return `
      <div style="margin-bottom:14px">
        <div class="tone-labels"><span>${escapeHtml(parts[0] || '')}</span><span>${escapeHtml(parts[1] || '')}</span></div>
        <div class="tone-bar-bg"><div class="tone-bar-fill" style="width:${pct}%"></div></div>
      </div>`;
  }).join('');
}

function buildPlainText(data) {
  return `NEW BRAND BRIEF — ${data.brand_name || ''}

Client: ${data.client_email || ''}
Brand: ${data.brand_name || ''}

STORY
${data.story || '—'}

DIFFERENTIATION
${data.differentiation || '—'}

5-YEAR VISION
${data.vision || '—'}

VALUES
${data.values || '—'}

COMPETITORS
${data.competitors || '—'}

AUDIENCE
${data.audience || '—'}

ARCHETYPE
${data.archetype || '—'}

TONE
${JSON.stringify(data.tone || {}, null, 2)}

NOTES
${data.notes || '—'}
`;
}
