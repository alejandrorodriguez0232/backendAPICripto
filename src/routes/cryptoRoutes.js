const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const cryptoController = require('../controllers/cryptoController');

router.get('/', auth, cryptoController.getAllCryptos);
router.post('/', auth, cryptoController.createCrypto);
router.put('/:id', auth, cryptoController.updateCrypto);

module.exports = router;