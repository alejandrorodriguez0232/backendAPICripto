const { Currency, CryptoCurrency } = require('../models');

module.exports = async () => {
  try {
    // Verificar y eliminar criptomonedas si existen
    const cryptoCount = await CryptoCurrency.count();
    if (cryptoCount > 0) {
      await CryptoCurrency.destroy({
        where: {},
        truncate: true,
        cascade: true
      });
      console.log(`🗑️ Eliminadas ${cryptoCount} criptomonedas`);
    } else {
      console.log('ℹ️ No hay criptomonedas para eliminar');
    }

    // Verificar y eliminar monedas fiduciarias si existen
    const currencyCount = await Currency.count();
    if (currencyCount > 0) {
      await Currency.destroy({
        where: {},
        truncate: true,
        cascade: true
      });
      console.log(`🗑️ Eliminadas ${currencyCount} monedas fiduciarias`);
    } else {
      console.log('ℹ️ No hay monedas fiduciarias para eliminar');
    }

    console.log('✅ Proceso de limpieza completado');
  } catch (error) {
    console.error('❌ Error al limpiar los datos:', error);
    throw error;
  }
};