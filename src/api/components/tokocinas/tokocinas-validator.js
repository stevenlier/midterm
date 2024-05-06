const joi = require('joi');
const { createTokocina } = require ('./tokocinas-repository');

module.exports = {
  
  updateTokocina: {
    body: {
      barang: joi.string().min(1).max(100).required().label('Barang'),
      stock: joi.string().min(1).max(100).required().label('Stock'),
      deskripsi: joi.string().min(1).max(100).required().label('Deskripsi'),
      harga: joi.string().min(1).max(100).required().label('Harga'),
      asuransi: joi.string().min(1).max(100).required().label('Asuransi'),
    },
  },

  createTokocina: {
    body: {
      barang: joi.string().min(1).max(100).required().label('Barang'),
      stock: joi.string().min(1).max(100).required().label('Stock'),
      deskripsi: joi.string().min(1).max(100).required().label('Deskripsi'),
      harga: joi.string().min(1).max(100).required().label('Harga'),
      asuransi: joi.string().min(1).max(100).required().label('Asuransi'),
    },
  },
};
