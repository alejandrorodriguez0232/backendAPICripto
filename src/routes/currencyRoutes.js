const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const currencyController = require('../controllers/currencyController');

router.get('/', auth, currencyController.getAllCurrencies);
router.post('/', auth, currencyController.createCurrency);

module.exports = router;