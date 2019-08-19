import * as categoryController from '../controllers/categoryController';
import * as express from "express";
const router = express.Router();

router.get('', categoryController.getCategories);
router.post('', categoryController.AddCategory);
router.get('/:categoryId', categoryController.getCategoryById);

export default router;