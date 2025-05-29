const { sequelize, Currency, CryptoCurrency } = require('../models');
const { DataTypes } = require('sequelize');

// Definir modelos históricos
const HistoricalCrypto = sequelize.define('HistoricalCrypto', {
  name: DataTypes.STRING,
  symbol: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true
  },
  currentPrice: DataTypes.DECIMAL(20, 8),
  validFrom: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  validTo: DataTypes.DATE
}, {
  timestamps: false
});

const HistoricalCurrency = sequelize.define('HistoricalCurrency', {
  code: DataTypes.STRING(3),
  name: DataTypes.STRING,
  symbol: DataTypes.STRING(5),
  validFrom: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  validTo: DataTypes.DATE
}, {
  timestamps: false
});

// Función de replicación
const replicateToHistory = async () => {
  const transaction = await sequelize.transaction();
  
  try {
    console.log('Iniciando replicación histórica...');
    
    // 1. Replicar monedas
    const currencies = await Currency.findAll({ transaction });
    for (const currency of currencies) {
      await HistoricalCurrency.create({
        code: currency.code,
        name: currency.name,
        symbol: currency.symbol,
        validFrom: new Date(),
        validTo: null
      }, { transaction });
      
      await currency.destroy({ transaction });
    }
    
    // 2. Replicar criptomonedas
    const cryptos = await CryptoCurrency.findAll({ transaction });
    for (const crypto of cryptos) {
      await HistoricalCrypto.create({
        name: crypto.name,
        symbol: crypto.symbol,
        currentPrice: crypto.currentPrice,
        validFrom: new Date(),
        validTo: null
      }, { transaction });
      
      await crypto.destroy({ transaction });
    }
    
    await transaction.commit();
    console.log('Replicación histórica completada con éxito');
  } catch (error) {
    await transaction.rollback();
    console.error('Error en replicación histórica:', error);
    throw error;
  }
};

// Programar ejecución periódica (cada 24 horas)
const setupReplication = () => {
  // Ejecutar inmediatamente para prueba
  replicateToHistory().catch(console.error);
  
  // Programar ejecución periódica
  setInterval(() => {
    replicateToHistory().catch(console.error);
  }, 24 * 60 * 60 * 1000); // 24 horas
};

module.exports = { setupReplication };