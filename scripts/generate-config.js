/**
 * Generates config.js from config.template.js by replacing placeholders
 * with environment variables (e.g. GitHub Secrets in CI).
 * Usage: CONTACT_EMAIL=... CONTACT_FACEBOOK=... node scripts/generate-config.js
 */

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const templatePath = path.join(root, 'config.template.js');
const outputPath = path.join(root, 'config.js');

let content = fs.readFileSync(templatePath, 'utf8');

const replacements = [
  ['__CONTACT_EMAIL__', process.env.CONTACT_EMAIL || ''],
  ['__CONTACT_FACEBOOK__', process.env.CONTACT_FACEBOOK || ''],
  ['__CONTACT_INSTAGRAM__', process.env.CONTACT_INSTAGRAM || ''],
  ['__GOOGLE_CLIENT_ID__', process.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID_HERE'],
];

for (const [placeholder, value] of replacements) {
  content = content.split(placeholder).join(escapeForJsString(value));
}

// ALLOWED_EMAILS: expect JSON array string, e.g. ["a@b.com","b@c.com"]
let allowedEmails = '["your-email@example.com"]';
if (process.env.ALLOWED_EMAILS) {
  try {
    const parsed = JSON.parse(process.env.ALLOWED_EMAILS);
    if (Array.isArray(parsed)) {
      allowedEmails = JSON.stringify(parsed);
    }
  } catch (_) {
    // fallback: treat as comma-separated
    const emails = process.env.ALLOWED_EMAILS.split(',').map(s => s.trim()).filter(Boolean);
    allowedEmails = JSON.stringify(emails);
  }
}
content = content.replace('__ALLOWED_EMAILS__', allowedEmails);

fs.writeFileSync(outputPath, content, 'utf8');
console.log('Generated config.js from template and env/secrets.');

function escapeForJsString(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
}
