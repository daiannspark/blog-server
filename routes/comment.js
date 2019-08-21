import * as commentController from '../controllers/commentController';
import * as express from "express";
const router = express.Router();

router.get('', commentController.getComments);
router.post('', commentController.AddComment);
router.get('/:commentId', commentController.getCommentById);
router.put('/:commentId', commentController.updateComment);
router.delete('/:commentId', commentController.deleteComment);

export default router;