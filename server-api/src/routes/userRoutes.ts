import express from 'express';
import { createUser, getUsers, updateUser, deleteUser, getUserById, getUsersByRole } from '../controllers/userController'
import { authenticateToken, checkPermission } from '../middleware/authMiddleware'
import { login } from '../controllers/authController';

const router = express.Router();

router.post('/login', (req, res, next) => login(req, res, next));

router.use(authenticateToken);

router.post('/', checkPermission('create:user'), (req, res, next) => createUser(req, res, next));
router.get('/', checkPermission('access:data'), (req, res, next) => getUsers(req, res, next));
router.get('/:id', checkPermission('access:data'), (req, res, next) => getUserById(req, res, next));
router.put('/:id', checkPermission('assign:role'), (req, res, next) => updateUser(req, res, next));
router.delete('/:id', checkPermission('delete:user'), (req, res, next) => deleteUser(req, res, next));

export default router; 