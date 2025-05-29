const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

// Definir modelos
const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: DataTypes.STRING
});

const Currency = sequelize.define('Currency', {
  code: DataTypes.STRING(3),
  name: DataTypes.STRING,
  symbol: DataTypes.STRING(5)
});

const CryptoCurrency = sequelize.define('CryptoCurrency', {
  name: DataTypes.STRING,
  symbol: DataTypes.STRING(10),
  currentPrice: DataTypes.DECIMAL(20, 8)
});


// Modelos históricos
const HistoricalCurrency = require('./HistoricalCurrency')(sequelize);
const HistoricalCrypto = require('./HistoricalCrypto')(sequelize);


// Definir relaciones
Currency.belongsToMany(CryptoCurrency, { through: 'CurrencyCrypto' });
CryptoCurrency.belongsToMany(Currency, { through: 'CurrencyCrypto' });



// Modelos históricos
/*const HistoricalCurrency = sequelize.define('HistoricalCurrency', {
    originalId: DataTypes.INTEGER,  // FK al registro original
    code: DataTypes.STRING(3),
    name: DataTypes.STRING,
    symbol: DataTypes.STRING(5),
    validFrom: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    validTo: DataTypes.DATE
  }, { timestamps: false });
  
  const HistoricalCrypto = sequelize.define('HistoricalCrypto', {
    originalId: DataTypes.INTEGER,  // FK al registro original
    name: DataTypes.STRING,
    symbol: DataTypes.STRING(10),
    currentPrice: DataTypes.DECIMAL(20, 8),
    validFrom: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    validTo: DataTypes.DATE
  }, { timestamps: false });
*/
// Sincronizar modelos
sequelize.sync({ force: false })
  .then(() => console.log('🔄 Modelos sincronizados con la base de datos'))
  .catch(err => console.error('❌ Error al sincronizar modelos:', err));


// Función de sincronización separada
let isSynced = false;

  async function syncModels() {
    if (!isSynced) {
      try {
        await sequelize.sync({ force: false });
        console.log('🔄 Modelos sincronizados correctamente');
        isSynced = true;
      } catch (error) {
        console.error('❌ Error al sincronizar modelos:', error);
        throw error;
      }
    }
  }

  
module.exports = {
  sequelize,
  syncModels,
  User,
  Currency,
  CryptoCurrency,
  HistoricalCurrency,
  HistoricalCrypto
};