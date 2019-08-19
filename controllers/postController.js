import * as PostModel from '../models/PostModel';

const logger = require('../utils/logger')('logController');

const AddPost = async (req, res) => {
  logger.log('info', 'addPost: %j', req.body);
  const { title, message, image, categoryId, createdAt, updatedAt } = req.body;
  const post = await PostModel.save({
    title,
    message,
    image,
    categoryId,
    createdAt,
    updatedAt
  });
  res.status(200).send(post);
};

const getPosts = async (req, res) => {
  logger.log('info', 'getPosts: %j', req.body);
  const posts = await PostModel.getPosts();
  res.status(200).send(posts);
};

const getPostById = async (req, res) => {
  logger.log('info', 'getPostById: %j', req.body);
  const post = await PostModel.getPostById(req.params['postId']);
  res.status(200).send(post);
};

export { AddPost, getPostById, getPosts };
