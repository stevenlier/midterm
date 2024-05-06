const tokocinasService = require('./tokocinas-service');
const { errorResponder, errorTmypes } = require('../../../core/errors');

/**
 * Handle get list of users request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getTokocinas(request, response, next) {
  try {
    const Tokocina = await tokocinasService.getTokocinas(pageNumber, size, filters, sort);
    return response.status(200).json(users);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle get user detail request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getTokocina(request, response, next) {
  try {
    const user = await tokocinasService.getTokocina(request.params.id);

    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown Product');
    }

    return response.status(200).json(user);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle create Product request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function createTokocina(request, response, next) {
  try {
    const barang = request.body.barang;
    const stock = request.body.stock;
    const deskripsi = request.body.deskripsi;
    const harga = request.body.harga;
    const asuransi = request.body.asuransi;

    const success = await tokocinasService.createTokocina(barang, stock, deskripsi, harga, asuransi);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create Product or Transaction'
      );
    }

    return response.status(200).json({ success: true });
  } catch (error) {
    return next(error);
  }
}



/**
 * Handle update user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function updateTokocina(request, response, next) {
  try {
    const id = request.params.id;
    const barang = request.body.barang;
    const stock = request.body.stock;
    const harga = request.body.harga;
    const asuransi = request.body.asuransi;

    const success = await tokocinasService.updateTokocina(id, barang, stock, deskripsi, harga, asuransi);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update Product or Transaction'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}
/**
 * Handle delete user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function deleteTokocina(request, response, next) {
  try {
    const id = request.params.id;

    const success = await tokocinasService.deleteTokocina(id);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete Product or transaction'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}


module.exports = {
  getTokocina,
  getTokocinas, 
  createTokocina,
  updateTokocina,
  deleteTokocina,
};
