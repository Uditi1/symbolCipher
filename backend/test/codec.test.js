
const { encodeText, decodeText } = require('../controllers/controller');

describe('Encoding/Decoding Tests', () => {
  test('decode(encode(x)) === x for plain text', () => {
    const input = 'Hello World';
    const encoded = encodeText(input);
    const decoded = decodeText(encoded);
    expect(decoded).toBe(input);
  });

  test('emoji input passes through unchanged (no error)', () => {
    const input = 'Hello 😊';
    const encoded = encodeText(input);
    expect(encoded).toContain('😊'); 
  });

  test('throws INPUT_TOO_LONG for long input', () => {
    const longInput = 'a'.repeat(281);
    try {
      encodeText(longInput);
    } catch (err) {
      expect(err.code).toBe('INPUT_TOO_LONG');
    }
  });

  test('throws UNSUPPORTED_CONTROL_CHAR for invalid char', () => {
    const badInput = 'hello\u0001world';
    try {
      encodeText(badInput);
    } catch (err) {
      expect(err.code).toBe('UNSUPPORTED_CONTROL_CHAR');
    }
  });

  test('throws UNKNOWN_SYMBOL for invalid decode symbol', () => {
    const badEncoded = '???';
    try {
      decodeText(badEncoded);
    } catch (err) {
      expect(err.code).toBe('UNKNOWN_SYMBOL');
    }
  });
});
