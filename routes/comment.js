import * as commentController from '../controllers/commentController';
import * as express from "express";
import authMiddleware from "../middlewares/authMiddleware";
const router = express.Router();

router.get('', commentController.getComments);
router.post('', authMiddleware, commentController.AddComment);
router.put('/:commentId', authMiddleware, commentController.updateComment);
router.delete('/:commentId', authMiddleware, commentController.deleteComment);

export default router;