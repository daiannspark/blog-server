import * as CategoryModel from '../models/CategoryModel';

const logger = require('../utils/logger')('logController');

const AddCategory = async (req, res) => {
  logger.log('info', 'addCategory: %j', req.body);
  const { title, description } = req.body;
  const category = await CategoryModel.save({
    title,
    description
  });
  res.status(200).send(category);
};

const getCategories = async (req, res) => {
  logger.log('info', 'getCategories: %j', req.body);
  const categories = await CategoryModel.getCategories();
  res.status(200).send(categories);
};

const getCategoryById = async (req, res) => {
  logger.log('info', 'getCategoryById: %j', req.body);
  const category = await CategoryModel.getCategoryById(req.params['categoryId']);
  res.status(200).send(category);
};

export { AddCategory, getCategoryById, getCategories };
