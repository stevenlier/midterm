const { Tokocina } = require('../../../models')
/**
 * Get a list of Product or Transaction
 * @returns {Promise}
 */
async function getTokocinas() {
  return Tokocina.find({});
}


/**
 * Get Product or Transaction detail
 * @param {string} id - ID
 * @returns {Promise}
 */
async function getTokocina(id) {
  return User.findById(id);
}

/**
 * Create new product or transaction
 * @param {string} barang
 * @param {string} stock  
 * @param {string} deskripsi 
 * @param {string} harga
 * @param {string} asuransi
 * @returns {Promise}
 */
async function createTokocina(barang, stock, deskripsi, harga, asuransi) {
  return User.create({
    barang,
    stock,
    deskripsi,
    harga,
    asuransi,
  });
}

/**
 * Update existing product
 * @param {string} id
 * @param {string} barang
 * @param {string} stock  
 * @param {string} deskripsi 
 * @param {string} harga
 * @param {string} asuransi
 * @returns {Promise}
 */
async function updateTokocina(id, stock, deskripsi, harga, asuransi) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        stock,
        deskripsi,
        harga,
        asuransi,
      },
    }
  );
}

/**
 * Delete a product or transaction
 * @param {string} id
 * @returns {Promise}
 */
async function deleteTokocina(id) {
  return Tokocina.deleteOne({ _id: id });
}

module.exports = {
  getTokocinas,
  getTokocina,
  createTokocina,
  updateTokocina,
  deleteTokocina,
};
