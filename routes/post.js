import * as postController from '../controllers/postController';
import * as express from "express";
const router = express.Router();

router.get('', postController.getPosts);
router.post('', postController.AddPost);
router.get('/:postId', postController.getPostById);
router.put('/:postId', postController.updatePost);
router.delete('/:postId', postController.deletePost);

export default router;