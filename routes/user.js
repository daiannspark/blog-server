import * as userController from '../controllers/userController';
import * as express from "express";
import authMiddleware from "../middlewares/authMiddleware";
const router = express.Router();

router.get('', userController.getUsers);
router.get('/self', userController.getUserSelf);
router.put('/:userId', authMiddleware, userController.updateUser);
router.delete('/:userId', authMiddleware, userController.deleteUser);

export default router;