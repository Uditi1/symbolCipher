const map = {
  a: 'α', b: 'β', c: '¢', d: 'δ', e: 'ε', f: 'ϝ',
  g: 'ɡ', h: '♄', i: 'ι', j: 'ʆ', k: 'κ', l: 'λ',
  m: 'ɱ', n: 'η', o: '☺', p: 'ρ', q: 'φ', r: 'я',
  s: 'ѕ', t: 'τ', u: 'υ', v: 'ν', w: 'ω', x: 'х',
  y: 'γ', z: 'ζ'
};

const upperMap = Object.fromEntries(
  Object.entries(map).map(([k, v]) => [k.toUpperCase(), v.toUpperCase() || v])
);

const encodeMap = { ...map, ...upperMap };
const decodeMap = Object.fromEntries(Object.entries(encodeMap).map(([k, v]) => [v, k]));

module.exports = { encodeMap, decodeMap };