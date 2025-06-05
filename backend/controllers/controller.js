const { encode, decode } = require('./encodeDecode');


function encodeController(req, res) {
    try {
        const {text} = req.body();
          const encoded = encode(text);
    res.json({ encoded });

    } catch (error) {
        res.status(400).json({error: error.code})
    }
}

function decodeController(req, res) {
    try {
          const { encoded } = req.body;
    const text = decode(encoded);
    res.json({ text });

    } catch (error) {
        res.status(400).json({error: error.code})
    }
}

module.exports = {encodeController, decodeController}