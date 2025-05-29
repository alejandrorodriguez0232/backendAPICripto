const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

router.post('/register', async (req, res) => {
  try {
    const token = await authService.register(req.body.email, req.body.password);
    res.status(201).send({ token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const token = await authService.login(req.body.email, req.body.password);
    res.send({ token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;