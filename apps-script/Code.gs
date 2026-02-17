const CONFIG = {
  spreadsheetName: 'Rapid Rise AI Leads',
  ownerDefault: 'Xander',
  turnstileSecret: PropertiesService.getScriptProperties().getProperty('TURNSTILE_SECRET'),
  internalNotificationEmail: PropertiesService.getScriptProperties().getProperty('INTERNAL_NOTIFICATION_EMAIL') || 'team@rapidriseai.com'
};

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');
    const path = payload.path || (e.parameter && e.parameter.path);
    if (!path || !['quote', 'booking', 'contact'].includes(path)) return jsonResponse({ ok: false, error: 'Invalid path' }, 400);

    const required = { quote: ['full_name','company','email','whatsapp','description','timeline'], booking: ['full_name','email','whatsapp'], contact: ['full_name','email','description'] }[path];
    required.forEach((field) => { if (!payload[field]) throw new Error(`Missing field: ${field}`); });

    const turnstile = verifyTurnstile(payload.turnstileToken);
    if (!turnstile.success) return jsonResponse({ ok: false, error: 'Turnstile failed' }, 400);

    const ss = getSpreadsheet();
    const tab = path === 'quote' ? 'Quote Requests' : path === 'booking' ? 'Bookings' : 'General Enquiries';
    const sheet = ensureSheet(ss, tab);
    const row = [new Date().toISOString(), payload.source_page || '', payload.utm_source || '', payload.utm_medium || '', payload.utm_campaign || '', payload.full_name || '', payload.company || '', payload.role || '', payload.email || '', payload.whatsapp || '', payload.website || '', toCsv(payload.request_types), payload.description || '', payload.tools || '', payload.timeline || '', payload.budget || '', turnstile.success ? 'valid' : 'invalid', 'New', CONFIG.ownerDefault, ''];
    sheet.appendRow(row);

    try {
      if (CONFIG.internalNotificationEmail) {
        MailApp.sendEmail(CONFIG.internalNotificationEmail, `New ${path} submission`, JSON.stringify(payload, null, 2));
      }
    } catch (mailErr) { Logger.log(mailErr); }

    return jsonResponse({ ok: true }, 200);
  } catch (err) {
    return jsonResponse({ ok: false, error: err.message }, 400);
  }
}

function verifyTurnstile(token) {
  const res = UrlFetchApp.fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'post',
    payload: { secret: CONFIG.turnstileSecret, response: token || '' },
    muteHttpExceptions: true,
  });
  return JSON.parse(res.getContentText() || '{}');
}

function getSpreadsheet() {
  const files = DriveApp.getFilesByName(CONFIG.spreadsheetName);
  return files.hasNext() ? SpreadsheetApp.open(files.next()) : SpreadsheetApp.create(CONFIG.spreadsheetName);
}

function ensureSheet(ss, name) {
  const headers = ['timestamp_utc','source_page','utm_source','utm_medium','utm_campaign','full_name','company','role','email','whatsapp','website','request_types','description','tools','timeline','budget','turnstile_status','status','owner','notes'];
  const sheet = ss.getSheetByName(name) || ss.insertSheet(name);
  if (sheet.getLastRow() === 0) sheet.appendRow(headers);
  return sheet;
}

function toCsv(val){ return Array.isArray(val) ? val.join(', ') : (val || ''); }
function jsonResponse(obj, code){ return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON); }
