// src/models/HistoricalCrypto.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const HistoricalCrypto = sequelize.define('HistoricalCrypto', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    originalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'id'
    },
    name: DataTypes.STRING,
    symbol: DataTypes.STRING(10), // Eliminamos unique: true
    currentPrice: {
      type: DataTypes.DECIMAL(20, 8),
      field: 'current_price'
    },
    validFrom: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'valid_from'
    },
    validTo: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'valid_to'
    }
  }, {
    tableName: 'historical_cryptos',
    freezeTableName: true,
    timestamps: false,
    indexes: [
      {
        fields: ['symbol'], // Índice no único
        unique: false
      },
      {
        fields: ['id'],
        unique: true // Original_id debe ser único
      }
    ]
  });

  return HistoricalCrypto;
};