import {
  countText, transformText, formatJson, encodeBase64, decodeBase64,
  encodeUrl, decodeUrl, generatePassword, generateUuid,
  calculateDiscount, formatCurrency,
} from './core.js';

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
    whyLabel: 'WHY SAKUTOOLS', privacyTitle: 'Useful tools.<br><span>Private by default.</span>', privacyBody: 'SakuTools is designed to do its work inside your browser. Your text, JSON, and generated passwords are not uploaded to a SakuTools server. No account is needed, and the core app has no analytics or advertising scripts.', privacyCaveat: 'For sensitive work, review the source code and your browser extensions. Offline support becomes available after the app has loaded once.', viewSource: 'Explore the source code ↗', footerText: 'Made for useful little moments. Open source under the MIT License.',
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
    whyLabel: 'MENGAPA SAKUTOOLS', privacyTitle: 'Alat yang berguna.<br><span>Privat sejak awal.</span>', privacyBody: 'SakuTools dirancang untuk bekerja di dalam browser. Teks, JSON, dan kata sandi yang dibuat tidak diunggah ke server SakuTools. Tidak perlu akun, dan aplikasi inti tidak memakai skrip analitik atau iklan.', privacyCaveat: 'Untuk pekerjaan sensitif, tinjau kode sumber dan ekstensi browser yang kamu gunakan. Dukungan offline tersedia setelah aplikasi dimuat satu kali.', viewSource: 'Lihat kode sumber ↗', footerText: 'Dibuat untuk membantu hal-hal kecil. Sumber terbuka dengan lisensi MIT.',
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
applyLanguage(); updateDiscount();

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(() => {}));
}
