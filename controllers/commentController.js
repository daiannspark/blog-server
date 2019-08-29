import * as CommentModel from "../models/CommentModel";

const logger = require('../utils/logger')('logController');

const AddComment = async (req, res) => {
  logger.log('info', 'addComment: %j', req.body);
  const { postId, message } = req.body;
  const userId = req.user.id;
  const comment = await CommentModel.save({
    userId,
    postId,
    message
  });
  res.status(201).send(comment);
};

const getComments = async (req, res) => {

  let filter = {};
  if(req.query.postId) {
    filter.postId = req.query.postId;
  }

  logger.log('info', 'getComments: %j', req.body);
  const comments = await CommentModel.getComments(filter);
  res.status(200).send(comments);
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

export { AddComment, getComments, updateComment, deleteComment };
