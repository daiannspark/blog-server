import * as userController from '../controllers/userController';
import * as express from "express";
const router = express.Router();

router.get('', userController.getUsers);
router.get('/:userId', userController.getUserById);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

export default router;