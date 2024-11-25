import express from 'express';
import { 
  createPermission, 
  getPermissions, 
  getPermissionById, 
  updatePermission, 
  deletePermission 
} from '../controllers/permissionController';

const router = express.Router();

router.post('/', (req, res, next) => createPermission(req, res, next));
router.get('/', (req, res, next) => getPermissions(req, res, next));
router.get('/:id', (req, res, next) => getPermissionById(req, res, next));
router.put('/:id', (req, res, next) => updatePermission(req, res, next));
router.delete('/:id', (req, res, next) => deletePermission(req, res, next));

export default router; 