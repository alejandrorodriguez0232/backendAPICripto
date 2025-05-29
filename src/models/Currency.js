const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Currency = sequelize.define('Currency', {
    code: {
      type: DataTypes.STRING(3),
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    symbol: {
      type: DataTypes.STRING(5),
      allowNull: false
    }
  });

  return Currency;
};