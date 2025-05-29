const { Currency } = require('../models');

const getAllCurrencies = async () => {
  return await Currency.findAll();
};

const createCurrency = async (currencyData) => {
  return await Currency.create(currencyData);
};

module.exports = {
  getAllCurrencies,
  createCurrency
};