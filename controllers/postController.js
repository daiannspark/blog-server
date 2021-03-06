import * as PostModel from '../models/PostModel';

const logger = require('../utils/logger')('logController');

const AddPost = async (req, res) => {
  const { file: { filename } } = req;
  const image = `/images/${filename}`;
  const { title, message, categoryId, createdAt, updatedAt } = req.body;
  const userId = req.user.id;
  const post = await PostModel.save({
    title,
    message,
    image,
    categoryId,
    userId,
    createdAt,
    updatedAt
  });
  res.status(200).send(post);
};

const getPosts = async (req, res) => {
  logger.log('info', 'getPosts: %j', req.body);

  let filter = {};
  if(req.query.categoryId) {
    filter.categoryId = req.query.categoryId;
  }

  const posts = await PostModel.getPosts(filter);
  res.status(200).send(posts);
};

const getPostById = async (req, res) => {
  logger.log('info', 'getPostById: %j', req.body);
  const post = await PostModel.getPostById(req.params['postId']);
  res.status(200).send(post);
};

const updatePost = async (req, res) => {
  logger.log('info', 'updatePost: %j', req.body);
  const { title, message, image, categoryId } = req.body;
  const updatedPost = await PostModel.updatePost(req.params['postId'], { title, message, image, categoryId });
  res.status(200).send(updatedPost);
};

const deletePost = async (req, res) => {
  logger.log('info', 'deletePost: %j', req.body);
  const deletedPost = await PostModel.deletePost(req.params['postId']);
  res.status(200).send(deletedPost);
};

export { AddPost, getPostById, getPosts, updatePost, deletePost };
