const express = require('express');
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

const router = express.Router();

// Enforce platform JWT authentication and Admin role checks
router.use(authMiddleware, adminMiddleware);

router.get('/stats', adminController.getSystemStats);
router.get('/projects', adminController.getAllProjects);
router.patch('/projects/:id/status', adminController.updateProjectStatus);
router.get('/users', adminController.getAllUsers);

module.exports = router;