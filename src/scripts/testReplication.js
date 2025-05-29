require('dotenv').config();
const { sequelize, syncModels } = require('../models');
const historyService = require('../services/historyService');

(async () => {
  try {
    console.log('🟡 Iniciando prueba manual de replicación...');
    
    // 1. Conectar y sincronizar
    await sequelize.authenticate();
    console.log('✅ Conexión a DB establecida');
    await syncModels();

    // 2. Crear datos de prueba (opcional)
    //console.log('📝 Insertando datos de prueba...');
    //await require('./seedTestData')(); // Crea este archivo si necesitas datos iniciales

    // 3. Ejecutar replicación
    console.log('🔄 Ejecutando replicación histórica...');
    await historyService.fullReplication();
    
    console.log('✔️ Prueba completada con éxito');
  } catch (error) {
    console.error('❌ Error durante la prueba:', error);
  } finally {
    // 4. Cerrar conexión adecuadamente
    setTimeout(() => {
      sequelize.close()
        .then(() => console.log('🔌 Conexión cerrada'))
        .catch(console.error)
        .finally(() => process.exit());
    }, 1000); // Pequeño delay para evitar conflictos
  }
})();