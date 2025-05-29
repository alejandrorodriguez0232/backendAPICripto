// src/models/HistoricalCurrency.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('HistoricalCurrencies', {
    originalId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'id', // Usar snake_case para PostgreSQL
      unique: true
    },
    code: DataTypes.STRING(3),
    name: DataTypes.STRING,
    symbol: DataTypes.STRING(5),
    validFrom: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    validTo: DataTypes.DATE
  }, {
    tableName: 'HistoricalCurrencies',
    freezeTableName: true,
    timestamps: false
  });
};