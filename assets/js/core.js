const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()-_=+[]{}:,.?';

export function countText(value) {
  const text = String(value ?? '');
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/u).length : 0;
  const lines = text.length ? text.split(/\r\n|\r|\n/u).length : 0;
  return {
    words,
    characters: Array.from(text).length,
    charactersNoSpaces: Array.from(text.replace(/\s/gu, '')).length,
    lines,
    readingMinutes: words === 0 ? 0 : Math.max(1, Math.ceil(words / 200)),
  };
}

export function transformText(value, operation) {
  const text = String(value ?? '');
  switch (operation) {
    case 'upper': return text.toLocaleUpperCase();
    case 'lower': return text.toLocaleLowerCase();
    case 'title':
      return text.toLocaleLowerCase().replace(/(^|[\s\-–—])([\p{L}\p{N}])/gu, (_match, prefix, letter) => prefix + letter.toLocaleUpperCase());
    case 'sentence':
      return text.toLocaleLowerCase().replace(/(^\s*[\p{L}\p{N}]|[.!?]\s+[\p{L}\p{N}])/gu, (match) => match.toLocaleUpperCase());
    case 'clean':
      return text.split(/\r\n|\r|\n/u).map((line) => line.replace(/[\t ]+/gu, ' ').trim()).join('\n').trim();
    case 'dedupe': {
      const seen = new Set();
      return text.split(/\r\n|\r|\n/u).filter((line) => {
        const key = line.trim();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      }).join('\n');
    }
    default: throw new Error('Unsupported text operation.');
  }
}

export function formatJson(value, minify = false) {
  const parsed = JSON.parse(String(value));
  return JSON.stringify(parsed, null, minify ? 0 : 2);
}

export function encodeBase64(value) {
  const bytes = new TextEncoder().encode(String(value));
  let binary = '';
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary);
}

export function decodeBase64(value) {
  const input = String(value).replace(/\s/gu, '');
  if (!input || !/^[A-Za-z0-9+/]*={0,2}$/u.test(input) || input.length % 4 === 1) {
    throw new Error('Invalid Base64 input.');
  }
  const normalized = input.padEnd(Math.ceil(input.length / 4) * 4, '=');
  let binary;
  try { binary = atob(normalized); } catch { throw new Error('Invalid Base64 input.'); }
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  try { return new TextDecoder('utf-8', { fatal: true }).decode(bytes); }
  catch { throw new Error('The decoded data is not valid UTF-8 text.'); }
}

export function encodeUrl(value) {
  return encodeURIComponent(String(value));
}

export function decodeUrl(value) {
  return decodeURIComponent(String(value));
}

function randomIndex(max, cryptoApi = globalThis.crypto) {
  if (!Number.isSafeInteger(max) || max < 1 || max > 0x100000000) {
    throw new RangeError('Random range must be between 1 and 2^32.');
  }
  if (!cryptoApi?.getRandomValues) throw new Error('Secure browser randomness is unavailable.');
  const range = 0x100000000;
  const limit = Math.floor(range / max) * max;
  const sample = new Uint32Array(1);
  do { cryptoApi.getRandomValues(sample); } while (sample[0] >= limit);
  return sample[0] % max;
}

export function generatePassword(options = {}, cryptoApi = globalThis.crypto) {
  const length = Number(options.length ?? 20);
  if (!Number.isInteger(length) || length < 8 || length > 64) {
    throw new RangeError('Password length must be between 8 and 64 characters.');
  }
  const sets = [];
  if (options.lowercase !== false) sets.push(LOWER);
  if (options.uppercase !== false) sets.push(UPPER);
  if (options.numbers !== false) sets.push(NUMBERS);
  if (options.symbols !== false) sets.push(SYMBOLS);
  if (sets.length === 0) throw new Error('Select at least one character set.');
  if (length < sets.length) throw new RangeError('Password length is too short for the selected character sets.');
  const alphabet = sets.join('');
  const password = sets.map((set) => set[randomIndex(set.length, cryptoApi)]);
  while (password.length < length) password.push(alphabet[randomIndex(alphabet.length, cryptoApi)]);
  for (let i = password.length - 1; i > 0; i -= 1) {
    const j = randomIndex(i + 1, cryptoApi);
    [password[i], password[j]] = [password[j], password[i]];
  }
  return password.join('');
}

export function generateUuid(cryptoApi = globalThis.crypto) {
  if (typeof cryptoApi?.randomUUID === 'function') return cryptoApi.randomUUID();
  if (!cryptoApi?.getRandomValues) throw new Error('Secure browser randomness is unavailable.');
  const bytes = new Uint8Array(16);
  cryptoApi.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = [...bytes].map((byte) => byte.toString(16).padStart(2, '0'));
  return `${hex.slice(0, 4).join('')}-${hex.slice(4, 6).join('')}-${hex.slice(6, 8).join('')}-${hex.slice(8, 10).join('')}-${hex.slice(10).join('')}`;
}

export function calculateDiscount(price, percent) {
  const amount = Number(price);
  const rate = Number(percent);
  if (!Number.isFinite(amount) || amount < 0) throw new RangeError('Price must be a non-negative number.');
  if (!Number.isFinite(rate) || rate < 0 || rate > 100) throw new RangeError('Discount must be between 0 and 100 percent.');
  const savings = amount * rate / 100;
  return { savings, finalPrice: amount - savings };
}

export function formatCurrency(value, locale = 'en-US', currency = 'USD') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
}
