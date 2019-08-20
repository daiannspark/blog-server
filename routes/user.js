import * as userController from '../controllers/userController';
import * as express from "express";
import * as categoryController from "../controllers/categoryController";
const router = express.Router();

router.get('', userController.getUsers);
router.post('', userController.AddUser);
router.get('/:userId', userController.getUserById);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

export default router;