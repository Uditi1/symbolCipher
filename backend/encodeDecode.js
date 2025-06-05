const { encodeMap, decodeMap } = require('./symbolMap');

function containsUnsupportedControlChar(text) {
  return [...text].some(char => {
    const code = char.charCodeAt(0);
    return (code < 0x20 && code !== 0x0A) || code === 0x7F;
  });
}


function encode(text) {
  if ([...text].length > 280) throw { code: 'INPUT_TOO_LONG' };
  if (containsUnsupportedControlChar(text)) throw { code: 'UNSUPPORTED_CONTROL_CHAR' };

  return [...text].map(char => {
    if (char >= 'a' && char <= 'z') {
      
      if (!(char in encodeMap)) throw { code: 'UNKNOWN_SYMBOL' };
      return encodeMap[char];
    } 
    
    return char;
  }).join('');
}

function isPossiblyEncodedSymbol(char) {
  
  return /[^\x00-\x7F]/.test(char) && !/[\p{Emoji}]/u.test(char);
}

function decode(encoded) {
  if ([...encoded].length > 280) throw { code: 'INPUT_TOO_LONG' };
  if (containsUnsupportedControlChar(encoded)) throw { code: 'UNSUPPORTED_CONTROL_CHAR' };

  return [...encoded].map(char => {
    if (char in decodeMap) return decodeMap[char];
    if (/[A-Za-z]/.test(char)) return char;
    if (/\s/.test(char)) return char; 
    if (!isPossiblyEncodedSymbol(char)) return char;

  
    throw { code: 'UNKNOWN_SYMBOL' };
  }).join('');
}






module.exports = { encode, decode };
