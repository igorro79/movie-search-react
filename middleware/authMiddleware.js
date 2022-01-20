const jwt = require('jsonwebtoken');
const { Unauthorized, BadRequest } = require('http-errors');

const { User } = require('../services/schemas/user');

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Unauthorized('User not authorized');
    }

    const [Bearer, token] = authorization.split(' ');
    if (!token) {
      throw new Unauthorized('User not authorized');
    }

    jwt.verify(token, process.env.SECRET_JWT);
    const user = await User.findOne({ token: token });
    if (!user) {
      throw new Unauthorized('Not authorized');
    }
    req.user = user;
    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
      error.message = 'Not authorized';
    }
    next(error);
  }
};
module.exports = {
  authMiddleware,
};
