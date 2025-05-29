const { Currency, CryptoCurrency } = require('../models');

module.exports = async () => {
  try {
    // Monedas fiduciarias
    await Currency.bulkCreate([
      { code: 'USD', name: 'Dólar Estadounidense', symbol: '$' },
      { code: 'EUR', name: 'Euro', symbol: '€' }
    ]);

    // Criptomonedas
    await CryptoCurrency.bulkCreate([
      { name: 'Bitcoin', symbol: 'BTC', currentPrice: 50000.00 },
      { name: 'Ethereum', symbol: 'ETH', currentPrice: 3000.00 }
    ]);

    // Establecer relaciones (ejemplo)
    const btc = await CryptoCurrency.findOne({ where: { symbol: 'BTC' } });
    const usd = await Currency.findOne({ where: { code: 'USD' } });
    await btc.addCurrency(usd);

    console.log('🌱 Datos de prueba creados exitosamente');
  } catch (error) {
    console.error('Error al crear datos de prueba:', error);
    throw error;
  }
};