const { 
  sequelize,
  Currency,
  CryptoCurrency,
  HistoricalCurrency,
  HistoricalCrypto
} = require('../models');
const { Op } = require('sequelize');

class HistoryService {
  constructor() {
    this.replicationInterval = 24 * 60 * 60 * 1000; // 24 horas
  }

  async replicateCurrencies() {
    const transaction = await sequelize.transaction();
    
    try {
      const currencies = await Currency.findAll({ transaction });
      
      for (const currency of currencies) {
        await HistoricalCurrency.create({
          originalId: currency.id,
          code: currency.code,
          name: currency.name,
          symbol: currency.symbol,
          validFrom: new Date(),
          validTo: null
        }, { transaction });

        await currency.destroy({ transaction });
      }

      await transaction.commit();
      console.log(`[${new Date().toISOString()}] Replicadas ${currencies.length} monedas`);
    } catch (error) {
      await transaction.rollback();
      console.error('Error replicando monedas:', error);
    }
  }

  /*async replicateCryptos() {
    const transaction = await sequelize.transaction();
    
    try {
      const cryptos = await CryptoCurrency.findAll({
        include: ['Currencies'],
        transaction
      });

      for (const crypto of cryptos) {
        await HistoricalCrypto.create({
          id: crypto.id,
          name: crypto.name,
          symbol: crypto.symbol,
          currentPrice: crypto.currentPrice,
          validFrom: new Date(),
          validTo: null
        }, { transaction });

        // Replicar relaciones many-to-many
        if (crypto.Currencies && crypto.Currencies.length > 0) {
          const currencyIds = crypto.Currencies.map(c => c.id);
          const historicalCrypto = await HistoricalCrypto.findOne({
            where: { id: crypto.id },
            transaction
          });
          
          await historicalCrypto.setCurrencies(currencyIds, { transaction });
        }

        await crypto.destroy({ transaction });
      }

      await transaction.commit();
      console.log(`[${new Date().toISOString()}] Replicadas ${cryptos.length} criptomonedas`);
    } catch (error) {
      await transaction.rollback();
      console.error('Error replicando criptomonedas:', error);
    }
  }*/

    async replicateCryptos() {
        const transaction = await sequelize.transaction();
        
        try {
          const cryptos = await CryptoCurrency.findAll({ 
            include: ['Currencies'],
            transaction
          });
      
          for (const crypto of cryptos) {
            // Verificar si ya existe un registro con el mismo original_id
            const exists = await HistoricalCrypto.findOne({
              where: { original_id: crypto.id },
              transaction
            });
      
            if (!exists) {
              await HistoricalCrypto.create({
                original_id: crypto.id,
                name: crypto.name,
                symbol: crypto.symbol,
                current_price: crypto.currentPrice,
                valid_from: new Date()
              }, { transaction });
            } else {
              // Actualizar el registro existente
              await exists.update({
                current_price: crypto.currentPrice,
                valid_to: null
              }, { transaction });
            }
      
            await crypto.destroy({ transaction });
          }
      
          await transaction.commit();
          console.log('✅ Criptomonedas replicadas exitosamente');
        } catch (error) {
          await transaction.rollback();
          //console.error('❌ Error replicando criptomonedas:', error);
          //throw error;
        }
      }


  async fullReplication() {
    
    console.log(`[${new Date().toISOString()}] Iniciando replicación histórica`);
    await this.replicateCurrencies();
    await this.replicateCryptos();

    const currencyCount = await Currency.count();
          const cryptoCount = await CryptoCurrency.count();
        if(currencyCount==0 && cryptoCount==1){
            console.log('✅ Proceso de limpieza completado: '+ currencyCount+" -- "+cryptoCount);
            await require('../scripts/seedTestDataDel')();
        }else {

          await require('../scripts/seedTestDataDel')();

        }
    
  }

  startScheduledReplication() {
    // Ejecución inmediata
    this.fullReplication();
    
    // Programar ejecución periódica
    setInterval(() => {
      this.fullReplication();
    }, this.replicationInterval);
  }

  
}

module.exports = new HistoryService();