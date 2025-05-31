const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models'); // Importar sequelize desde models
const authRoutes = require('./routes/authRoutes');
const currencyRoutes = require('./routes/currencyRoutes');
const cryptoRoutes = require('./routes/cryptoRoutes');
const replicationRoutes = require('./routes/replicationRoutes'); // Nueva línea
const errorHandler = require('./middlewares/errorHandler');
const { setupReplication } = require('./services/historyReplicationService');

const historyService = require('./services/historyService');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Configurar rutas
app.use('/auth', authRoutes);
app.use('/moneda', currencyRoutes);
app.use('/criptomoneda', cryptoRoutes);
app.use('/replicacion', replicationRoutes); // Nueva línea

// Manejo de errores
app.use(errorHandler);


// Iniciar servicio de replicación histórica
historyService.startScheduledReplication();

// Iniciar servidor solo después de verificar la conexión
sequelize.authenticate()
  .then(() => {
    console.log(' Conexión a la base de datos verificada');
    
    // Iniciar replicación histórica
    setupReplication();
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(` Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error(' No se pudo conectar a la base de datos:', err);
    process.exit(1); // Salir si no hay conexión a la DB
  });