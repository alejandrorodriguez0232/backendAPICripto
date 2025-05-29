const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const CryptoCurrency = sequelize.define('CryptoCurrency', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    symbol: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true
    },
    currentPrice: {
      type: DataTypes.DECIMAL(20, 8),
      allowNull: false
    }
  });

  return CryptoCurrency;
};