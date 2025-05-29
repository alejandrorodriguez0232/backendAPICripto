const { CryptoCurrency, Currency } = require('../models');

const getAllCryptos = async () => {
  return await CryptoCurrency.findAll({
    include: [{
      model: Currency,
      through: { attributes: [] }
    }]
  });
};

const getCryptosByCurrency = async (currencyCode) => {
  return await CryptoCurrency.findAll({
    include: [{
      model: Currency,
      through: { attributes: [] },
      where: { code: currencyCode }
    }]
  });
};

const createCrypto = async (cryptoData) => {
  const crypto = await CryptoCurrency.create(cryptoData);
  
  if (cryptoData.currencyIds) {
    await crypto.setCurrencies(cryptoData.currencyIds);
  }
  
  return crypto;
};

const updateCrypto = async (id, updateData) => {
  const crypto = await CryptoCurrency.findByPk(id);
  
  if (!crypto) {
    throw new Error('Crypto currency not found');
  }
  
  await crypto.update(updateData);
  
  if (updateData.currencyIds) {
    await crypto.setCurrencies(updateData.currencyIds);
  }
  
  return crypto;
};

module.exports = {
  getAllCryptos,
  getCryptosByCurrency,
  createCrypto,
  updateCrypto
};