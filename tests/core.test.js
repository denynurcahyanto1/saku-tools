import test from 'node:test';
import assert from 'node:assert/strict';
import {
  countText, transformText, formatJson, encodeBase64, decodeBase64,
  encodeUrl, decodeUrl, generatePassword, generateUuid, calculateDiscount,
} from '../assets/js/core.js';

test('countText handles empty, whitespace, and multiline input', () => {
  assert.deepEqual(countText(''), { words: 0, characters: 0, charactersNoSpaces: 0, lines: 0, readingMinutes: 0 });
  assert.equal(countText('A 🌱 B').characters, 5, 'Unicode code points are counted, not UTF-16 code units');
  assert.deepEqual(countText('  one   two\nthree  '), { words: 3, characters: 19, charactersNoSpaces: 11, lines: 2, readingMinutes: 1 });
});

test('text transforms provide expected results', () => {
  assert.equal(transformText('hello world', 'upper'), 'HELLO WORLD');
  assert.equal(transformText('HELLO WORLD', 'lower'), 'hello world');
  assert.equal(transformText('hello world', 'title'), 'Hello World');
  assert.equal(transformText('hello. how are YOU?', 'sentence'), 'Hello. How are you?');
  assert.equal(transformText('  hello   world  \n  next   line ', 'clean'), 'hello world\nnext line');
  assert.equal(transformText('a\nb\na\n', 'dedupe'), 'a\nb\n');
});

test('JSON formatter validates and formats or minifies', () => {
  assert.equal(formatJson('{"a":1,"b":[true]}'), '{\n  "a": 1,\n  "b": [\n    true\n  ]\n}');
  assert.equal(formatJson('{"a":1}', true), '{"a":1}');
  assert.throws(() => formatJson('{oops}'), SyntaxError);
});

test('Base64 round-trips Unicode safely', () => {
  const original = 'Halo, 世界 🌱';
  assert.equal(decodeBase64(encodeBase64(original)), original);
  assert.throws(() => decodeBase64('not base64?'), /Invalid Base64/);
});

test('URL encoding round-trips reserved and Unicode characters', () => {
  const original = 'hello world /? & café';
  assert.equal(decodeUrl(encodeUrl(original)), original);
  assert.throws(() => decodeUrl('%E0%A4%A'), URIError);
});

test('password generator respects length and selected character sets', () => {
  const password = generatePassword({ length: 32, lowercase: true, uppercase: true, numbers: true, symbols: true });
  assert.equal(password.length, 32);
  assert.match(password, /[a-z]/);
  assert.match(password, /[A-Z]/);
  assert.match(password, /[0-9]/);
  assert.match(password, /[!@#$%^&*()\-_=+\[\]{}:,.?]/);
  assert.match(generatePassword({ length: 12, lowercase: true, uppercase: false, numbers: false, symbols: false }), /^[a-z]{12}$/);
  assert.throws(() => generatePassword({ length: 7 }), RangeError);
  assert.throws(() => generatePassword({ length: 12, lowercase: false, uppercase: false, numbers: false, symbols: false }), /Select at least/);
});

test('UUID generator returns RFC 4122 version 4 format', () => {
  const uuid = generateUuid();
  assert.match(uuid, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  const fallbackCrypto = { getRandomValues(bytes) { bytes.fill(0); return bytes; } };
  assert.match(generateUuid(fallbackCrypto), /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
});

test('discount calculator validates inputs and computes final price', () => {
  assert.deepEqual(calculateDiscount(250000, 20), { savings: 50000, finalPrice: 200000 });
  assert.deepEqual(calculateDiscount(0, 100), { savings: 0, finalPrice: 0 });
  assert.throws(() => calculateDiscount(-1, 10), RangeError);
  assert.throws(() => calculateDiscount(100, 101), RangeError);
});
