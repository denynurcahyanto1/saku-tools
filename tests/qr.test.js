import test from 'node:test';
import assert from 'node:assert/strict';
import { qrcode } from '../assets/js/vendor/qrcode.mjs';
import { stringToBytes } from '../assets/js/vendor/qrcode_UTF8.mjs';

test('QR generator builds a valid matrix and supports UTF-8', () => {
  qrcode.stringToBytes = stringToBytes;
  const qr = qrcode(0, 'M');
  qr.addData('SakuTools — Halo dunia 🌍', 'Byte');
  qr.make();
  const count = qr.getModuleCount();
  assert.ok(count >= 21 && count <= 177);
  assert.equal(count % 4, 1);
  assert.equal(typeof qr.isDark(0, 0), 'boolean');
});
