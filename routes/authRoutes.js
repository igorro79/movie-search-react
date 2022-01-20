const { Router } = require('express');
const routes = Router();

const {
  registerController,
  loginController,
  currentController,
} = require('../controllers/authController');
const { asyncWrapper, authMiddleware } = require('../middleware');

routes.post('/register', asyncWrapper(registerController));
routes.post('/login', asyncWrapper(loginController));
routes.get('/current', authMiddleware, asyncWrapper(currentController));

module.exports = routes;
