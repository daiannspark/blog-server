import * as UserModel from '../models/UserModel';

const logger = require('../utils/logger')('logController');

const AddUser = async (req, res) => {
  logger.log('info', 'addUser: %j', req.body);
  const { username, firstName, lastName, avatar, email, rehashedPassword } = req.body;
  const user = await UserModel.save({
    username,
    firstName,
    lastName,
    avatar,
    email,
    rehashedPassword
  });
  res.status(200).send(user);
};

const getUsers = async (req, res) => {
  logger.log('info', 'getUsers: %j', req.body);
  const users = await UserModel.getUsers();
  res.status(200).send(users);
};

const getUserById = async (req, res) => {
  logger.log('info', 'getUserById: %j', req.body);
  const user = await UserModel.getUserById(req.params['userId']);
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

export { AddUser, getUserById, getUsers, updateUser, deleteUser };
