import jwt from 'jsonwebtoken';
import AppError from '../errors/AppError';
import * as UserModel from '../models/UserModel';

const logger = require('../utils/logger')('logController');

const register = async (req, res) => {
    logger.log('info', 'addUser: %j', req.body);
    const { username, firstName, lastName, email, password } = req.body;
    const user = await UserModel.save({
      username,
      firstName,
      lastName,
      email,
      rehashedPassword: password
    });
    res.status(200).send(user);
  };

const login = async (req, res) => {
  logger.log('debug', 'login: %j', req.body);
  const user = await UserModel.getUserByEmail(req.body.email);
  if (user) {
    const isPasswordsEqual = await UserModel.comparePassword(
      req.body['password'],
      user.rehashedPassword,
    );

    if (isPasswordsEqual) {
      const token = jwt.sign(
          {
            data: { username: user.username },
          },
          process.env.JWT_SECRET,
          { expiresIn: '6h' },
      );
      logger.log('info', `Successfully logged in: ${user.username}`);
      res.status(200).send({ payload: { message: 'Successfully logged in', token } });
    }
  } else {
    logger.log('debug', 'Login failed');
    throw new AppError('Wrong user credentials!', 400);
  }
};

export { register, login };