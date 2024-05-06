const express = require('express');
const route = express.Router();

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const tokocinasControllers = require('./tokocinas-controller');
const tokocinasValidator = require('./tokocinas-validator');

route.post(
  '/',
  authenticationMiddleware,
  celebrate(tokocinasValidator.createTokocina),
  tokocinasControllers.createTokocina
);

route.get('/', authenticationMiddleware, tokocinasControllers.getTokocinas);

route.get('/:id', authenticationMiddleware, tokocinasControllers.getTokocina);

route.put(
  '/:id',
  authenticationMiddleware,
  celebrate(tokocinasValidator.updateTokocina),
  tokocinasControllers.updateTokocina
);

route.delete('/:id', authenticationMiddleware, tokocinasControllers.deleteTokocina);

module.exports = route;
