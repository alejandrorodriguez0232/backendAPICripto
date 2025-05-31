//const { replicateToHistory } = require('../services/historyReplicationService');
const historyService = require('../services/historyService');
const replicateHistoricalData = async (req, res) => {
  try {
    // Verificar autenticación y permisos (ejemplo básico)
    if (!req.user) {
      return res.status(401).json({ error: 'No autorizado' });
    }
    
    // Ejecutar replicación
    //const result = await replicateToHistory();
    await historyService.fullReplication();
    
    res.status(200).json({
      success: true,
      message: 'Réplica histórica completada',
      //data: result
    });
  } catch (error) {
    console.error('Error en replicación:', error);
    res.status(500).json({
      success: false,
      message: 'Error al ejecutar la réplica histórica',
      error: error.message
    });
  }
};

module.exports = {
  replicateHistoricalData
};