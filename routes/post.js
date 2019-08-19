import * as postController from '../controllers/postController';
import * as express from "express";
const router = express.Router();

router.get('', postController.getPosts);
router.post('', postController.AddPost);
router.get('/:postId', postController.getPostById);

export default router;