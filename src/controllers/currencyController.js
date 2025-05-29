const currencyService = require('../services/currencyService');

const getAllCurrencies = async (req, res) => {
  try {
    const currencies = await currencyService.getAllCurrencies();
    res.send(currencies);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const createCurrency = async (req, res) => {
  try {
    const currency = await currencyService.createCurrency(req.body);
    res.status(201).send(currency);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  getAllCurrencies,
  createCurrency
};