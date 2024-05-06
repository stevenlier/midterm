const tokocinasRepositoryRepository = require('./tokocinas-repository');

/**
 * @param {string} id 
 * @returns {Object}
 */
async function getTokocina(id) {
  const tokocina = await tokocinasRepository.getTokocina(id);

  if (!tokocina) {
    return null;
  }

  return {
    barang: tokocina.barang,
    stock: tokocina.stock,
    deskripsi: tokocina.deskripsi,
    harga: tokocina.harga,
    asuransi: tokocina.asuransi,
  };
}

/**
 * create new product or transaction
 * @param {string} barang 
 * @param {string} stock
 * @param {string} deskripsi 
 * @param {string} harga 
 * @param {string} asuransi 
 * @returns {boolean}
 */
async function createTokocina(barang, stock, deskripsi, harga, asuransi) {

  try {
    await tokocinasRepository.createTokocina(barang, stock, deskripsi, harga, asuransi);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update
 * @param {string} barang 
 * @param {string} stock
 * @param {string} deskripsi 
 * @param {string} harga 
 * @param {string} asuransi 
 * @returns {boolean}
 */
async function updateTokocina(id, barang, stock, deskripsi, harga, asuransi) {
  const tokocina = await tokocinasRepository.getTokocina(id);

  if (!tokocina) {
    return null;
  }

  try {
    await tokocinasRepository.updateTokocina(id, barang, stock, deskripsi, harga, asuransi);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete product or transaction
 * @param {string} id - ID
 * @returns {boolean}
 */
async function deleteTokocina(id) {
  const tokocina = await tokocinasRepository.getTokocina(id);

  // User not found
  if (!tokocina) {
    return null;
  }

  try {
    await tokocinasRepository.deleteTokocina(id);
  } catch (err) {
    return null;
  }

  return true;
}



module.exports = {
  getTokocina,
  createTokocina,
  updateTokocina,
  deleteTokocina,
};
