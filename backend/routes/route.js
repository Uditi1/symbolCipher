const express = require('express');
const router = express.Router();
const {encodeController, decodeController} = require('../controllers/controller')

router.post('/encode', encodeController);
router.post('/decode', decodeController);

module.exports = router;