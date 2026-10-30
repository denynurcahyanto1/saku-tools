import {
  countText, transformText, formatJson, encodeBase64, decodeBase64,
  encodeUrl, decodeUrl, generatePassword, generateUuid,
  calculateDiscount, formatCurrency, normalizeHexColor, hexToRgb, rgbToHsl, timestampToDate, dateToTimestamp,
} from './core.js';
import { qrcode } from './vendor/qrcode.mjs';
import { stringToBytes } from './vendor/qrcode_UTF8.mjs';
qrcode.stringToBytes = stringToBytes;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const translations = {
  en: {
    eyebrow: 'FREE • PRIVATE • NO SIGN-UP', heroTitle: 'Small tools.<br><span>Big help.</span>',
    heroLead: 'A handy collection for everyday tasks and curious minds. Open a tool, get things done, get on with your day.',
    exploreTools: 'Explore tools', localNote: 'Your data stays on your device', promiseFree: 'Always free', promisePrivate: 'No uploads', promiseOffline: 'Works offline', promiseOpen: 'Open source',
    toolboxLabel: 'THE TOOLBOX', toolsTitle: 'What do you need<br>to get done?', toolsLead: 'No clutter. No account. Just practical tools that do one job well.',
    textTool: 'Text tools', passwordTool: 'Password', discountTool: 'Discount calculator', everydayCategory: 'EVERYDAY', textTitle: 'Text toolkit', textDesc: 'Count, clean, and transform text in seconds.', yourText: 'Your text', textPlaceholder: 'Paste or type your text here…', words: 'Words', characters: 'Characters', lines: 'Lines', readingTime: 'Reading time', uppercase: 'UPPERCASE', lowercase: 'lowercase', titleCase: 'Title Case', sentenceCase: 'Sentence case', cleanSpaces: 'Clean spaces', dedupeLines: 'Remove duplicate lines', textLocal: 'Everything runs locally in this tab.', copyText: 'Copy text ↗',
    jsonDesc: 'Validate, prettify, or minify JSON.', inputJson: 'Input JSON', formatJson: 'Format JSON', minifyJson: 'Minify', result: 'Result', copyResult: 'Copy result ↗', jsonLocal: 'JSON is parsed in your browser only.',
    base64Desc: 'Convert text to Base64 and back, including Unicode.', inputText: 'Input text', encode: 'Encode ↓', decode: '↑ Decode', base64Local: 'No data is sent to an external service.', urlDesc: 'Safely encode or decode URL components.', urlLocal: "Uses the browser's built-in URL encoding.",
    securityCategory: 'SECURITY', passwordTitle: 'Password generator', passwordDesc: 'Generate a random password on this device.', passwordLength: 'Password length', lowerLetters: 'Lowercase letters (a-z)', upperLetters: 'Uppercase letters (A-Z)', numbers: 'Numbers (0-9)', symbols: 'Symbols (!@#$…)', generatePassword: 'Generate password ↗', passwordSafety: 'Generated locally with the Web Crypto API. Use a password manager and never reuse important passwords.',
    uuidDesc: 'Create random unique identifiers in your browser.', howMany: 'How many?', generateUuids: 'Generate UUIDs ↗', generatedUuids: 'Generated UUIDs', uuidLocal: 'Uses cryptographically secure browser randomness.',
    discountTitle: 'Discount calculator', discountDesc: 'Quickly see the savings and final price.', originalPrice: 'Original price', discountRate: 'Discount (%)', youSave: 'YOU SAVE', finalPrice: 'FINAL PRICE', discountNote: 'Calculation only. Taxes, shipping, and store-specific rules may change the checkout total.',
    qrTool: 'QR generator', colorTool: 'Color picker', compressTool: 'Image compressor', resizeTool: 'Image resizer', markdownTool: 'Markdown editor', timestampTool: 'Timestamp converter', qrTitle: 'QR Code generator', qrDesc: 'Turn a link or short message into a scannable QR code.', qrContent: 'Text or URL', qrCorrection: 'Error correction', generateQr: 'Generate QR ↗', qrReady: 'Your QR code will appear here.', downloadPng: 'Download PNG', qrLocal: 'Generated in your browser. Keep QR content short enough for reliable scanning.', colorTitle: 'Color picker & converter', colorDesc: 'Choose a color and copy HEX, RGB, or HSL values.', colorPreview: 'Live color preview', hexColor: 'HEX color', copyValue: 'Copy', colorLocal: 'Color conversion runs locally. Browser color picker appearance may vary.', compressTitle: 'Image compressor', compressDesc: 'Reduce image file size without uploading it.', resizeTitle: 'Image resizer', resizeDesc: 'Resize an image to the dimensions you need.', chooseImage: 'Choose an image (max 20 MB)', quality: 'Quality', outputFormat: 'Output format', compressImage: 'Compress image ↗', resizeImage: 'Resize image ↗', downloadImage: 'Download image', imageLocal: 'Images are processed locally in this browser. Animated images are converted to a still image.', widthPx: 'Width (px)', heightPx: 'Height (px)', keepRatio: 'Keep aspect ratio', markdownTitle: 'Markdown editor', markdownDesc: 'Write Markdown and preview a safe, formatted version.', markdownInput: 'Markdown source', markdownPreview: 'Live preview', markdownSafe: 'HTML is escaped for safety', markdownLocal: 'Preview is generated locally. Raw HTML is not rendered.', timestampTitle: 'Timestamp converter', timestampDesc: 'Convert Unix timestamps and local date/time values.', unixTimestamp: 'Unix timestamp (seconds or milliseconds)', localDateTime: 'Local date & time', dateToUnix: 'Date/time to Unix timestamp', chooseDateTime: 'Choose local date and time', timestampLocal: "Timestamp conversions use your device's local timezone for local display; ISO output is UTC.", whyLabel: 'WHY SAKUTOOLS', privacyTitle: 'Useful tools.<br><span>Private by default.</span>', privacyBody: 'SakuTools is designed to do its work inside your browser. Your text, JSON, and generated passwords are not uploaded to a SakuTools server. No account is needed, and the core app has no analytics or advertising scripts.', privacyCaveat: 'For sensitive work, review the source code and your browser extensions. Offline support becomes available after the app has loaded once.', viewSource: 'Explore the source code ↗', footerText: 'Made for useful little moments. Open source under the MIT License.',
  },
  id: {
    eyebrow: 'GRATIS • PRIVAT • TANPA DAFTAR', heroTitle: 'Alat sederhana.<br><span>Manfaat besar.</span>',
    heroLead: 'Kumpulan alat praktis untuk kebutuhan sehari-hari dan pekerjaan digital. Pilih alat, selesaikan pekerjaan, lanjutkan aktivitasmu.',
    exploreTools: 'Jelajahi alat', localNote: 'Data tetap di perangkatmu', promiseFree: 'Selalu gratis', promisePrivate: 'Tanpa unggah', promiseOffline: 'Bisa offline', promiseOpen: 'Sumber terbuka',
    toolboxLabel: 'KUMPULAN ALAT', toolsTitle: 'Apa yang ingin<br>kamu selesaikan?', toolsLead: 'Tanpa hal yang mengganggu. Tanpa akun. Alat praktis yang fokus pada satu tugas.',
    textTool: 'Alat teks', passwordTool: 'Kata sandi', discountTool: 'Kalkulator diskon', everydayCategory: 'SEHARI-HARI', textTitle: 'Perangkat teks', textDesc: 'Hitung, rapikan, dan ubah teks dalam hitungan detik.', yourText: 'Teks kamu', textPlaceholder: 'Tempel atau ketik teks di sini…', words: 'Kata', characters: 'Karakter', lines: 'Baris', readingTime: 'Waktu baca', uppercase: 'HURUF BESAR', lowercase: 'huruf kecil', titleCase: 'Huruf Awal Besar', sentenceCase: 'Kapitalisasi kalimat', cleanSpaces: 'Rapikan spasi', dedupeLines: 'Hapus baris duplikat', textLocal: 'Semua proses berjalan lokal di tab ini.', copyText: 'Salin teks ↗',
    jsonDesc: 'Validasi, rapikan, atau ringkas JSON.', inputJson: 'Input JSON', formatJson: 'Format JSON', minifyJson: 'Ringkas', result: 'Hasil', copyResult: 'Salin hasil ↗', jsonLocal: 'JSON diproses hanya di browser kamu.',
    base64Desc: 'Ubah teks menjadi Base64 dan sebaliknya, termasuk Unicode.', inputText: 'Teks input', encode: 'Encode ↓', decode: '↑ Decode', base64Local: 'Tidak ada data yang dikirim ke layanan eksternal.', urlDesc: 'Encode atau decode bagian URL dengan aman.', urlLocal: 'Menggunakan fungsi URL bawaan browser.',
    securityCategory: 'KEAMANAN', passwordTitle: 'Pembuat kata sandi', passwordDesc: 'Buat kata sandi acak langsung di perangkat ini.', passwordLength: 'Panjang kata sandi', lowerLetters: 'Huruf kecil (a-z)', upperLetters: 'Huruf besar (A-Z)', numbers: 'Angka (0-9)', symbols: 'Simbol (!@#$…)', generatePassword: 'Buat kata sandi ↗', passwordSafety: 'Dibuat secara lokal memakai Web Crypto API. Gunakan password manager dan jangan gunakan ulang kata sandi penting.',
    uuidDesc: 'Buat pengenal unik acak langsung di browser.', howMany: 'Jumlah?', generateUuids: 'Buat UUID ↗', generatedUuids: 'UUID yang dibuat', uuidLocal: 'Memakai sumber acak browser yang aman secara kriptografis.',
    discountTitle: 'Kalkulator diskon', discountDesc: 'Lihat nominal penghematan dan harga akhir dengan cepat.', originalPrice: 'Harga awal', discountRate: 'Diskon (%)', youSave: 'HEMAT', finalPrice: 'HARGA AKHIR', discountNote: 'Hanya perhitungan. Pajak, ongkir, dan aturan toko dapat mengubah total pembayaran.',
    qrTool: 'Pembuat QR', colorTool: 'Pemilih warna', compressTool: 'Kompres gambar', resizeTool: 'Ubah ukuran gambar', markdownTool: 'Editor Markdown', timestampTool: 'Konverter timestamp', qrTitle: 'Pembuat QR Code', qrDesc: 'Ubah tautan atau pesan singkat menjadi QR Code yang bisa dipindai.', qrContent: 'Teks atau URL', qrCorrection: 'Koreksi kesalahan', generateQr: 'Buat QR ↗', qrReady: 'QR Code akan muncul di sini.', downloadPng: 'Unduh PNG', qrLocal: 'Dibuat di browser. Gunakan konten singkat agar QR mudah dipindai.', colorTitle: 'Pemilih & konverter warna', colorDesc: 'Pilih warna lalu salin nilai HEX, RGB, atau HSL.', colorPreview: 'Pratinjau warna langsung', hexColor: 'Warna HEX', copyValue: 'Salin', colorLocal: 'Konversi warna berjalan lokal. Tampilan pemilih warna bergantung browser.', compressTitle: 'Kompres gambar', compressDesc: 'Kurangi ukuran file gambar tanpa mengunggahnya.', resizeTitle: 'Ubah ukuran gambar', resizeDesc: 'Ubah dimensi gambar sesuai kebutuhan.', chooseImage: 'Pilih gambar (maks. 20 MB)', quality: 'Kualitas', outputFormat: 'Format keluaran', compressImage: 'Kompres gambar ↗', resizeImage: 'Ubah ukuran ↗', downloadImage: 'Unduh gambar', imageLocal: 'Gambar diproses lokal di browser. Gambar animasi akan diubah menjadi gambar diam.', widthPx: 'Lebar (px)', heightPx: 'Tinggi (px)', keepRatio: 'Pertahankan rasio', markdownTitle: 'Editor Markdown', markdownDesc: 'Tulis Markdown dan lihat pratinjau yang diformat dengan aman.', markdownInput: 'Sumber Markdown', markdownPreview: 'Pratinjau langsung', markdownSafe: 'HTML di-escape demi keamanan', markdownLocal: 'Pratinjau dibuat lokal. HTML mentah tidak ditampilkan.', timestampTitle: 'Konverter timestamp', timestampDesc: 'Konversi Unix timestamp dan tanggal/waktu lokal.', unixTimestamp: 'Unix timestamp (detik atau milidetik)', localDateTime: 'Tanggal & waktu lokal', dateToUnix: 'Tanggal/waktu ke Unix timestamp', chooseDateTime: 'Pilih tanggal dan waktu lokal', timestampLocal: 'Konversi memakai zona waktu perangkat untuk tampilan lokal; keluaran ISO menggunakan UTC.', whyLabel: 'MENGAPA SAKUTOOLS', privacyTitle: 'Alat yang berguna.<br><span>Privat sejak awal.</span>', privacyBody: 'SakuTools dirancang untuk bekerja di dalam browser. Teks, JSON, dan kata sandi yang dibuat tidak diunggah ke server SakuTools. Tidak perlu akun, dan aplikasi inti tidak memakai skrip analitik atau iklan.', privacyCaveat: 'Untuk pekerjaan sensitif, tinjau kode sumber dan ekstensi browser yang kamu gunakan. Dukungan offline tersedia setelah aplikasi dimuat satu kali.', viewSource: 'Lihat kode sumber ↗', footerText: 'Dibuat untuk membantu hal-hal kecil. Sumber terbuka dengan lisensi MIT.',
  },
};
let language = localStorage.getItem('sakutools-language') || 'en';
let toastTimer;

function t(key) { return translations[language][key] || translations.en[key] || key; }
function toast(message) {
  const element = $('#toast');
  element.textContent = message;
  element.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => element.classList.remove('show'), 2400);
}
function setStatus(id, message, kind = 'success') {
  const element = document.getElementById(id);
  element.textContent = message;
  element.className = `field-status ${kind}`;
}
async function copyValue(value) {
  if (!value) { toast(language === 'id' ? 'Tidak ada hasil untuk disalin.' : 'Nothing to copy yet.'); return; }
  try {
    await navigator.clipboard.writeText(value);
    toast(language === 'id' ? 'Berhasil disalin.' : 'Copied to clipboard.');
  } catch {
    toast(language === 'id' ? 'Clipboard tidak tersedia di browser ini.' : 'Clipboard is unavailable in this browser.');
  }
}
function switchTool(name) {
  $$('.tool-nav').forEach((button) => button.classList.toggle('active', button.dataset.tool === name));
  $$('[data-panel]').forEach((panel) => {
    const active = panel.dataset.panel === name;
    panel.hidden = !active;
    panel.classList.toggle('active', active);
  });
}
function updateTextStats() {
  const stats = countText($('#text-input').value);
  $('#word-count').textContent = stats.words.toLocaleString();
  $('#char-count').textContent = stats.characters.toLocaleString();
  $('#line-count').textContent = stats.lines.toLocaleString();
  $('#reading-time').textContent = `${stats.readingMinutes} ${language === 'id' ? 'mnt' : 'min'}`;
}
function applyLanguage() {
  document.documentElement.lang = language;
  $$('[data-i18n]').forEach((element) => {
    const value = t(element.dataset.i18n);
    if (value.includes('<')) element.innerHTML = value;
    else element.textContent = value;
  });
  $$('[data-i18n-placeholder]').forEach((element) => { element.placeholder = t(element.dataset.i18nPlaceholder); });
  $('#language-toggle').textContent = language === 'en' ? 'ID' : 'EN';
  updateTextStats();
}

$$('.tool-nav').forEach((button) => button.addEventListener('click', () => switchTool(button.dataset.tool)));
$('#text-input').addEventListener('input', updateTextStats);
$$('[data-text-action]').forEach((button) => button.addEventListener('click', () => {
  try {
    $('#text-input').value = transformText($('#text-input').value, button.dataset.textAction);
    updateTextStats();
    toast(language === 'id' ? 'Teks berhasil diperbarui.' : 'Text updated.');
  } catch (error) { toast(error.message); }
}));

$$('[data-json-action]').forEach((button) => button.addEventListener('click', () => {
  try {
    $('#json-output').value = formatJson($('#json-input').value, button.dataset.jsonAction === 'minify');
    setStatus('json-status', language === 'id' ? 'JSON valid' : 'Valid JSON');
  } catch (error) {
    $('#json-output').value = '';
    setStatus('json-status', error.message, 'error');
  }
}));
$$('[data-base64-action]').forEach((button) => button.addEventListener('click', () => {
  try {
    $('#base64-output').value = button.dataset.base64Action === 'encode' ? encodeBase64($('#base64-input').value) : decodeBase64($('#base64-input').value);
    setStatus('base64-status', language === 'id' ? 'Berhasil' : 'Done');
  } catch (error) { $('#base64-output').value = ''; setStatus('base64-status', error.message, 'error'); }
}));
$$('[data-url-action]').forEach((button) => button.addEventListener('click', () => {
  try {
    $('#url-output').value = button.dataset.urlAction === 'encode' ? encodeUrl($('#url-input').value) : decodeUrl($('#url-input').value);
    setStatus('url-status', language === 'id' ? 'Berhasil' : 'Done');
  } catch (error) { $('#url-output').value = ''; setStatus('url-status', error.message, 'error'); }
}));

function createPassword() {
  try {
    const password = generatePassword({
      length: Number($('#password-length').value),
      lowercase: $('#pw-lower').checked,
      uppercase: $('#pw-upper').checked,
      numbers: $('#pw-numbers').checked,
      symbols: $('#pw-symbols').checked,
    });
    $('#password-output').textContent = password;
  } catch (error) { toast(error.message); }
}
$('#password-length').addEventListener('input', () => { $('#password-length-value').textContent = $('#password-length').value; });
$('#generate-password').addEventListener('click', createPassword);
$('#copy-password').addEventListener('click', () => copyValue($('#password-output').textContent));
$('#generate-uuid').addEventListener('click', () => {
  const count = Number($('#uuid-count').value);
  if (!Number.isInteger(count) || count < 1 || count > 25) { toast(language === 'id' ? 'Masukkan jumlah 1 sampai 25.' : 'Enter a quantity from 1 to 25.'); return; }
  try { $('#uuid-output').value = Array.from({ length: count }, () => generateUuid()).join('\n'); }
  catch (error) { toast(error.message); }
});

function updateDiscount() {
  try {
    const { savings, finalPrice } = calculateDiscount($('#original-price').value, $('#discount-rate').value);
    const locale = language === 'id' ? 'id-ID' : 'en-US';
    const currency = language === 'id' ? 'IDR' : 'USD';
    $('#discount-savings').textContent = formatCurrency(savings, locale, currency);
    $('#discount-final').textContent = formatCurrency(finalPrice, locale, currency);
  } catch { $('#discount-savings').textContent = '—'; $('#discount-final').textContent = '—'; }
}
$('#original-price').addEventListener('input', updateDiscount);
$('#discount-rate').addEventListener('input', updateDiscount);

$$('[data-copy]').forEach((button) => button.addEventListener('click', () => copyValue(document.getElementById(button.dataset.copy).value)));
$('#language-toggle').addEventListener('click', () => {
  language = language === 'en' ? 'id' : 'en';
  localStorage.setItem('sakutools-language', language);
  applyLanguage(); updateDiscount();
});
$('#theme-toggle').addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('sakutools-theme', next);
  $('#theme-toggle').textContent = next === 'light' ? '☾' : '☼';
});
const savedTheme = localStorage.getItem('sakutools-theme');
if (savedTheme) { document.documentElement.dataset.theme = savedTheme; $('#theme-toggle').textContent = savedTheme === 'light' ? '☾' : '☼'; }
// QR Code generation uses a locally bundled MIT-licensed library.
$('#generate-qr').addEventListener('click', () => {
  const value = $('#qr-input').value.trim();
  const canvas = $('#qr-canvas');
  const context = canvas.getContext('2d');
  if (!value) { toast(language === 'id' ? 'Masukkan teks atau URL.' : 'Enter text or a URL.'); return; }
  try {
    const qr = qrcode(0, $('#qr-level').value);
    qr.addData(value, 'Byte');
    qr.make();
    const count = qr.getModuleCount();
    const margin = 4;
    const size = 280;
    const cell = size / (count + margin * 2);
    context.fillStyle = '#ffffff'; context.fillRect(0, 0, size, size);
    context.fillStyle = '#111111';
    for (let row = 0; row < count; row += 1) {
      for (let col = 0; col < count; col += 1) {
        if (qr.isDark(row, col)) context.fillRect(Math.floor((col + margin) * cell), Math.floor((row + margin) * cell), Math.ceil(cell), Math.ceil(cell));
      }
    }
    const link = $('#qr-download');
    link.href = canvas.toDataURL('image/png');
    link.hidden = false;
    $('#qr-status').textContent = language === 'id' ? 'QR Code berhasil dibuat.' : 'QR code generated successfully.';
  } catch (error) {
    $('#qr-status').textContent = error?.message || (language === 'id' ? 'Teks terlalu panjang untuk QR Code.' : 'Text is too long for a QR code.');
    $('#qr-download').hidden = true;
  }
});

function updateColorValues(value) {
  try {
    const hex = normalizeHexColor(value);
    const { r, g, b } = hexToRgb(hex);
    const { h, s, l } = rgbToHsl(r, g, b);
    $('#color-picker').value = hex;
    $('#color-hex').value = hex;
    $('#color-name').textContent = hex;
    $('#color-preview').style.setProperty('--selected-color', hex);
    $('#color-rgb').textContent = `${r}, ${g}, ${b}`;
    $('#color-hsl').textContent = `${h}, ${s}%, ${l}%`;
    return { hex, rgb: `rgb(${r}, ${g}, ${b})`, hsl: `hsl(${h}, ${s}%, ${l}%)` };
  } catch (error) { toast(error.message); return null; }
}
$('#color-picker').addEventListener('input', (event) => updateColorValues(event.target.value));
$('#color-hex').addEventListener('change', (event) => updateColorValues(event.target.value));
$('#copy-rgb').addEventListener('click', () => copyValue($('#color-rgb').textContent));
$('#copy-hsl').addEventListener('click', () => copyValue($('#color-hsl').textContent));

function updateTimestamp() {
  try {
    const result = timestampToDate($('#timestamp-input').value);
    $('#timestamp-iso').textContent = result.iso;
    $('#timestamp-local').textContent = result.local;
    $('#timestamp-seconds').textContent = result.seconds;
    $('#timestamp-ms').textContent = result.milliseconds;
  } catch { ['timestamp-iso','timestamp-local','timestamp-seconds','timestamp-ms'].forEach((id) => { document.getElementById(id).textContent = '—'; }); }
}
function updateDateTimestamp() {
  try {
    const result = dateToTimestamp($('#datetime-input').value);
    $('#date-seconds').textContent = result.seconds;
    $('#date-ms').textContent = result.milliseconds;
  } catch { $('#date-seconds').textContent = '—'; $('#date-ms').textContent = '—'; }
}
$('#timestamp-input').addEventListener('input', updateTimestamp);
$('#datetime-input').addEventListener('input', updateDateTimestamp);
$('#copy-timestamp-iso').addEventListener('click', () => copyValue($('#timestamp-iso').textContent === '—' ? '' : $('#timestamp-iso').textContent));
$('#copy-date-ms').addEventListener('click', () => copyValue($('#date-ms').textContent === '—' ? '' : $('#date-ms').textContent));

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/gu, (character) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[character]);
}
function inlineMarkdown(value) {
  let text = escapeHtml(value);
  text = text.replace(/\x60([^\x60]+)\x60/gu, '<code>$1</code>');
  text = text.replace(/\*\*(.+?)\*\*/gu, '<strong>$1</strong>');
  text = text.replace(/\*(.+?)\*/gu, '<em>$1</em>');
  text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/gu, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  return text;
}
function renderMarkdown(source) {
  const lines = String(source).replace(/\r\n?/gu, '\n').split('\n');
  const html = [];
  let paragraph = [];
  let list = false;
  let code = false;
  let codeLines = [];
  const flushParagraph = () => { if (paragraph.length) { html.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`); paragraph = []; } };
  const closeList = () => { if (list) { html.push('</ul>'); list = false; } };
  for (const line of lines) {
    if (line.startsWith('```')) {
      flushParagraph(); closeList();
      if (code) { html.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`); codeLines = []; code = false; }
      else code = true;
      continue;
    }
    if (code) { codeLines.push(line); continue; }
    if (!line.trim()) { flushParagraph(); closeList(); continue; }
    const heading = line.match(/^(#{1,3})\s+(.+)$/u);
    if (heading) { flushParagraph(); closeList(); const level = heading[1].length; html.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`); continue; }
    const item = line.match(/^\s*[-*]\s+(.+)$/u);
    if (item) { flushParagraph(); if (!list) { html.push('<ul>'); list = true; } html.push(`<li>${inlineMarkdown(item[1])}</li>`); continue; }
    const quote = line.match(/^>\s?(.+)$/u);
    if (quote) { flushParagraph(); closeList(); html.push(`<blockquote>${inlineMarkdown(quote[1])}</blockquote>`); continue; }
    closeList(); paragraph.push(line.trim());
  }
  flushParagraph(); closeList();
  if (code) html.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
  return html.join('');
}
function updateMarkdownPreview() { $('#markdown-preview').innerHTML = renderMarkdown($('#markdown-input').value); }
$('#markdown-input').addEventListener('input', updateMarkdownPreview);
updateMarkdownPreview();

const imageObjectUrls = new Map();
function clearImageResult(prefix) {
  const preview = $(`#${prefix}-preview`);
  const download = $(`#${prefix}-download`);
  const result = $(`#${prefix}-result`);
  const previous = imageObjectUrls.get(prefix);
  if (previous) URL.revokeObjectURL(previous);
  imageObjectUrls.delete(prefix);
  preview.removeAttribute('src');
  download.removeAttribute('href');
  result.hidden = true;
}
function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => typeof reader.result === 'string' ? resolve(reader.result) : reject(new Error('Could not read generated image.'));
    reader.onerror = () => reject(new Error('Could not read generated image.'));
    reader.readAsDataURL(blob);
  });
}
async function setImageResult(prefix, blob, filename, originalSize, width, height) {
  if (!(blob instanceof Blob) || blob.size === 0) throw new Error(language === 'id' ? 'Hasil gambar kosong. Coba format lain.' : 'The generated image is empty. Try another format.');
  const preview = $(`#${prefix}-preview`);
  const download = $(`#${prefix}-download`);
  const result = $(`#${prefix}-result`);
  const previous = imageObjectUrls.get(prefix);
  const downloadUrl = URL.createObjectURL(blob);
  try {
    // Use a data URL for preview: this avoids stale/blocked blob URLs in browser or PWA caches.
    const previewUrl = await blobToDataUrl(blob);
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error(language === 'id' ? 'Pratinjau gagal dimuat. Coba lagi atau gunakan format lain.' : 'The preview could not be loaded. Try again or choose another format.')), 10000);
      preview.onload = () => { clearTimeout(timeout); resolve(); };
      preview.onerror = () => { clearTimeout(timeout); reject(new Error(language === 'id' ? 'Browser tidak dapat menampilkan hasil gambar.' : 'The browser could not display the generated image.')); };
      preview.src = previewUrl;
      if (preview.complete && preview.naturalWidth > 0) { clearTimeout(timeout); resolve(); }
    });
    imageObjectUrls.set(prefix, downloadUrl);
    download.href = downloadUrl;
    download.download = filename;
    const change = originalSize > 0 ? ((1 - blob.size / originalSize) * 100) : 0;
    const sizeNote = prefix === 'compress'
      ? change >= 0 ? ` · ${change.toFixed(1)}% smaller` : ` · ${Math.abs(change).toFixed(1)}% larger`
      : '';
    $(`#${prefix}-stats`).textContent = `${width} × ${height}px · ${formatBytes(originalSize)} → ${formatBytes(blob.size)}${sizeNote}`;
    result.hidden = false;
    if (previous) URL.revokeObjectURL(previous);
  } catch (error) {
    URL.revokeObjectURL(downloadUrl);
    preview.removeAttribute('src');
    download.removeAttribute('href');
    result.hidden = true;
    throw error;
  } finally {
    preview.onload = null;
    preview.onerror = null;
  }
}
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
async function getImageBitmap(file) {
  if (!file) throw new Error(language === 'id' ? 'Pilih file gambar terlebih dahulu.' : 'Choose an image first.');
  if (!['image/jpeg','image/png','image/webp'].includes(file.type)) throw new Error(language === 'id' ? 'Format yang didukung: JPG, PNG, WebP.' : 'Supported formats: JPG, PNG, WebP.');
  if (file.size > 20 * 1024 * 1024) throw new Error(language === 'id' ? 'Ukuran file maksimal 20 MB.' : 'Maximum file size is 20 MB.');
  if (typeof createImageBitmap !== 'function') throw new Error('Image processing is not supported by this browser.');
  const bitmap = await createImageBitmap(file);
  if (bitmap.width > 12000 || bitmap.height > 12000 || bitmap.width * bitmap.height > 40000000) {
    bitmap.close();
    throw new Error(language === 'id' ? 'Resolusi gambar terlalu besar (maksimal 40 megapiksel).' : 'Image dimensions are too large (maximum 40 megapixels).');
  }
  return bitmap;
}
function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('The browser could not export this image format.')), type, quality));
}
async function renderImage(file, width, height, type, quality) {
  const bitmap = await getImageBitmap(file);
  try {
    if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1 || width > 8192 || height > 8192) throw new RangeError('Image dimensions must be between 1 and 8192 pixels.');
    const canvas = document.createElement('canvas');
    canvas.width = width; canvas.height = height;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas is unavailable.');
    if (type === 'image/jpeg') { context.fillStyle = '#ffffff'; context.fillRect(0, 0, width, height); }
    context.imageSmoothingEnabled = true; context.imageSmoothingQuality = 'high';
    context.drawImage(bitmap, 0, 0, width, height);
    const blob = await canvasToBlob(canvas, type, quality);
    return { blob, width, height, actualType: blob.type || type };
  } finally { bitmap.close(); }
}
function outputExtension(type) { return type === 'image/webp' ? 'webp' : type === 'image/png' ? 'png' : 'jpg'; }

$('#compress-quality').addEventListener('input', () => { $('#compress-quality-value').textContent = `${$('#compress-quality').value}%`; });
$('#run-compress').addEventListener('click', async () => {
  const status = $('#compress-status'); clearImageResult('compress'); status.textContent = language === 'id' ? 'Memproses gambar…' : 'Processing image…';
  try {
    const file = $('#compress-file').files[0];
    const bitmap = await getImageBitmap(file);
    const { width, height } = bitmap; bitmap.close();
    const type = $('#compress-format').value;
    const result = await renderImage(file, width, height, type, Number($('#compress-quality').value) / 100);
    await setImageResult('compress', result.blob, `sakutools-compressed.${outputExtension(result.actualType)}`, file.size, width, height);
    status.textContent = language === 'id' ? 'Gambar berhasil dikompres.' : 'Image compressed successfully.';
  } catch (error) { status.textContent = error.message; clearImageResult('compress'); }
});
let resizeOriginal = null;
$('#resize-file').addEventListener('change', async () => {
  try {
    const file = $('#resize-file').files[0];
    if (!file) { resizeOriginal = null; clearImageResult('resize'); return; }
    clearImageResult('resize');
    const bitmap = await getImageBitmap(file);
    resizeOriginal = { width: bitmap.width, height: bitmap.height };
    $('#resize-width').value = bitmap.width; $('#resize-height').value = bitmap.height;
    bitmap.close(); $('#resize-status').textContent = `${resizeOriginal.width} × ${resizeOriginal.height}px`;
  } catch (error) { resizeOriginal = null; $('#resize-status').textContent = error.message; }
});
$('#resize-width').addEventListener('input', () => {
  if ($('#resize-ratio').checked && resizeOriginal && Number($('#resize-width').value) > 0) $('#resize-height').value = Math.max(1, Math.round(Number($('#resize-width').value) * resizeOriginal.height / resizeOriginal.width));
});
$('#resize-height').addEventListener('input', () => {
  if ($('#resize-ratio').checked && resizeOriginal && Number($('#resize-height').value) > 0) $('#resize-width').value = Math.max(1, Math.round(Number($('#resize-height').value) * resizeOriginal.width / resizeOriginal.height));
});
$('#run-resize').addEventListener('click', async () => {
  const status = $('#resize-status'); clearImageResult('resize'); status.textContent = language === 'id' ? 'Mengubah ukuran gambar…' : 'Resizing image…';
  try {
    const file = $('#resize-file').files[0];
    const width = Number($('#resize-width').value); const height = Number($('#resize-height').value);
    const type = $('#resize-format').value;
    const result = await renderImage(file, width, height, type, Number($('#resize-quality').value) / 100);
    await setImageResult('resize', result.blob, `sakutools-resized.${outputExtension(result.actualType)}`, file.size, width, height);
    status.textContent = language === 'id' ? 'Gambar berhasil diubah ukurannya.' : 'Image resized successfully.';
  } catch (error) { status.textContent = error.message; clearImageResult('resize'); }
});

clearImageResult('compress'); clearImageResult('resize');
applyLanguage(); updateDiscount(); updateColorValues('#A6F06E');

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(() => {}));
}
