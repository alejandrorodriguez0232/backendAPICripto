const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const replicationController = require('../controllers/replicationController');

// Endpoint protegido que requiere autenticación JWT
router.post('/replicar', auth, replicationController.replicateHistoricalData);

module.exports = router;