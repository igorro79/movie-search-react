const { User } = require('../services/schemas/user');
const bcrypt = require('bcrypt');
const { Unauthorized, BadRequest } = require('http-errors');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const registerController = async (req, res) => {
  const { name, password, email, phone } = req.body;
  if (await User.findOne({ email })) {
    throw new Error('User already exist!');
  }
  const hashPassword = await bcrypt.hash(password, saltRounds);
  const user = await User.create({
    email,
    name,
    phone,
    password: hashPassword,
  });
  res.json({ user: { email, name } });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const existUser = await User.findOne({ email });

  if (!existUser) {
    throw new Unauthorized('Email or password incorrect');
  }
  const comparePassword = bcrypt.compare(password, existUser.password);
  if (!comparePassword) {
    throw new BadRequest('Email or password incorrect');
  }

  const { _id, name } = existUser;
  const payload = { id: _id };
  const token = jwt.sign(payload, process.env.SECRET_JWT);
  const updatedUser = await User.findByIdAndUpdate(_id, { token });

  res.json({ token, user: { email, name } });
};

const currentController = async (req, res) => {
  const { email } = req.user;
  const user = await User.findOne({ email }, '-password -token');
  res.json({ user });
};

const editUserController = async (req, res) => {
  //   const { email } = req.user;
  //   const user = await User.findOne({ email }, '-password -token');
  res.json({ user });
};

module.exports = {
  registerController,
  loginController,
  currentController,
};
