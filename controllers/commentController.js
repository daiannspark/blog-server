import * as CommentModel from "../models/CommentModel";

const logger = require('../utils/logger')('logController');

const AddComment = async (req, res) => {
  logger.log('info', 'addComment: %j', req.body);
  const { userId, postId, message } = req.body;
  const comment = await CommentModel.save({
    userId,
    postId,
    message
  });
  res.status(200).send(comment);
};

const getComments = async (req, res) => {
  logger.log('info', 'getComments: %j', req.body);
  const comments = await CommentModel.getComments();
  res.status(200).send(comments);
};

const getCommentById = async (req, res) => {
  logger.log('info', 'getCommentById: %j', req.body);
  const comment = await CommentModel.getCommentById(req.params['commentId']);
  res.status(200).send(comment);
};

const updateComment = async (req, res) => {
  logger.log('info', 'updateComment: %j', req.body);
  const { message } = req.body;
  const updatedComment = await CommentModel.updateComment(req.params['commentId'], { message });
  res.status(200).send(updatedComment);
};

const deleteComment = async (req, res) => {
  logger.log('info', 'deleteComment: %j', req.body);
  const deletedComment = await CommentModel.deleteComment(req.params['commentId']);
  res.status(200).send(deletedComment);
};

export { AddComment, getCommentById, getComments, updateComment, deleteComment };
