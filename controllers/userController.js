import * as UserModel from '../models/UserModel';

const logger = require('../utils/logger')('logController');

const getUsers = async (req, res) => {
  logger.log('info', 'getUsers: %j', req.body);
  const users = await UserModel.getUsers();
  res.status(200).send(users);
};

const getUserSelf = async (req, res) => {
  logger.log('info', 'getUserById: %j', req.body);
  const user = await UserModel.getUserSelf(req.user.id);
  res.status(200).send(user);
};

const updateUser = async (req, res) => {
  logger.log('info', 'updateUser: %j', req.body);
  const { firstName, lastName, avatar } = req.body;
  const updatedUser = await UserModel.updateUser(req.params['userId'], { firstName, lastName, avatar });
  res.status(200).send(updatedUser);
};

const deleteUser = async (req, res) => {
  logger.log('info', 'deleteUser: %j', req.body);
  const deletedUser = await UserModel.deleteUser(req.params['userId']);
  res.status(200).send(deletedUser);
};

export { getUserSelf, getUsers, updateUser, deleteUser };
