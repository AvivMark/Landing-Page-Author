/**
 * Generates config.js from config.template.js.
 * In CI (GitHub Actions): values come from env vars set by the workflow from Repository Secrets.
 * Locally: set CONTACT_EMAIL=... CONTACT_FACEBOOK=... etc., or leave unset to use defaults.
 */

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const templatePath = path.join(root, 'config.template.js');
const outputPath = path.join(root, 'config.js');

if (!fs.existsSync(templatePath)) {
  console.error('Missing config.template.js at', templatePath);
  process.exit(1);
}

let content = fs.readFileSync(templatePath, 'utf8');

// Values from env (in GitHub Actions these are set from Repository Secrets in the workflow)
const fromSecret = (name) => process.env[name] !== undefined && String(process.env[name]).trim() !== '';
const defaults = {
  CONTACT_EMAIL: 'yosifia015@gmail.com',
  CONTACT_FACEBOOK: 'https://www.facebook.com/yosefa.porat/',
};
const replacements = [
  ['__CONTACT_EMAIL__', (process.env.CONTACT_EMAIL || '').trim() || defaults.CONTACT_EMAIL],
  ['__CONTACT_FACEBOOK__', (process.env.CONTACT_FACEBOOK || '').trim() || defaults.CONTACT_FACEBOOK],
  ['__CONTACT_INSTAGRAM__', (process.env.CONTACT_INSTAGRAM || '').trim()],
  ['__GOOGLE_CLIENT_ID__', (process.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID_HERE').trim()],
];

for (const [placeholder, value] of replacements) {
  content = content.split(placeholder).join(escapeForJsString(value));
}

// ALLOWED_EMAILS: expect JSON array string, e.g. ["a@b.com","b@c.com"]
let allowedEmails = '["your-email@example.com"]';
const raw = process.env.ALLOWED_EMAILS;
if (raw && String(raw).trim()) {
  try {
    const parsed = JSON.parse(String(raw).trim());
    if (Array.isArray(parsed)) {
      allowedEmails = JSON.stringify(parsed);
    }
  } catch (_) {
    const emails = String(raw).split(',').map(s => s.trim()).filter(Boolean);
    if (emails.length) allowedEmails = JSON.stringify(emails);
  }
}
if (!content.includes('__ALLOWED_EMAILS__')) {
  console.error('Template missing __ALLOWED_EMAILS__ placeholder');
  process.exit(1);
}
content = content.replace('__ALLOWED_EMAILS__', allowedEmails);

fs.writeFileSync(outputPath, content, 'utf8');
const usedSecrets = ['CONTACT_EMAIL', 'CONTACT_FACEBOOK', 'CONTACT_INSTAGRAM', 'GOOGLE_CLIENT_ID', 'ALLOWED_EMAILS'].filter(fromSecret);
if (usedSecrets.length) {
  console.log('Generated config.js — values from GitHub Secrets:', usedSecrets.join(', '));
} else {
  console.log('Generated config.js — using defaults (set Secrets in repo to override)');
}

function escapeForJsString(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
}
