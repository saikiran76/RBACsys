import express from 'express';
import { createRole, getRoles, getRoleById, updateRole, deleteRole } from '../controllers/roleController';

const router = express.Router();

router.post('/', (req, res, next) => createRole(req, res, next));
router.get('/', (req, res, next) => getRoles(req, res, next));
router.get('/:id', (req, res, next) => getRoleById(req, res, next));
router.put('/:id', (req, res, next) => updateRole(req, res, next));
router.delete('/:id', (req, res, next) => deleteRole(req, res, next));

export default router; 