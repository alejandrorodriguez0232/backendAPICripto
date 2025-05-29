const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
  },

  {
    // ... otras configuraciones
    define: {
      freezeTableName: true, // Aplica a todos los modelos
      underscored: true, // Usa snake_case para nombres de columnas
      timestamps: true // Asegúrate de que esto sea consistente
    },
    dialectOptions: {
      useUTC: false // Para evitar problemas con zonas horarias
    }
  }
);

// Verificar conexión
sequelize.authenticate()
  .then(() => console.log('Conexión a PostgreSQL establecida'))
  .catch(err => console.error('Error de conexión:', err));


module.exports = sequelize;