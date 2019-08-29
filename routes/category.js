import * as categoryController from '../controllers/categoryController';
import * as express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import {diskStorageSingle} from "../middlewares/diskStorage";
const router = express.Router();

router.get('', categoryController.getCategories);
router.post('', authMiddleware, categoryController.AddCategory);
router.get('/:categoryId', categoryController.getCategoryById);
router.put('/:categoryId', authMiddleware, categoryController.updateCategory);
router.delete('/:categoryId', authMiddleware, categoryController.deleteCategory);

export default router;