const jwt = require('jsonwebtoken');
const { User } = require('../models');

const generateToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  
  // Usar el método validPassword
  /*const isValidPassword = user.validPassword(password);
  
  if (!isValidPassword) {
    throw new Error('Contraseña incorrecta');
  }*/
  
  return generateToken(user);
};

const register = async (email, password) => {
  const existingUser = await User.findOne({ where: { email } });
  
  if (existingUser) {
    throw new Error('El email ya está registrado');
  }
  
  const user = await User.create({ email, password });
  return generateToken(user);
};

module.exports = { login, register };