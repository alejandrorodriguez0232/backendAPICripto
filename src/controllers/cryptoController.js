const cryptoService = require('../services/cryptoService');

const getAllCryptos = async (req, res) => {
  try {
    const { moneda } = req.query;
    const cryptos = moneda 
      ? await cryptoService.getCryptosByCurrency(moneda)
      : await cryptoService.getAllCryptos();
    res.send(cryptos);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const createCrypto = async (req, res) => {
  try {
    const crypto = await cryptoService.createCrypto(req.body);
    res.status(201).send(crypto);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const updateCrypto = async (req, res) => {
  try {
    const crypto = await cryptoService.updateCrypto(req.params.id, req.body);
    res.send(crypto);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  getAllCryptos,
  createCrypto,
  updateCrypto
};