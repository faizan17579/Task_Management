const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { check } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');

// Get all tasks
router.get('/', authMiddleware, taskController.getAllTasks);

// Create a new task
router.post(
  '/',
  [
    authMiddleware,
    check('title', 'Title is required').notEmpty(),
  ],
  taskController.createTask
);

// Update task
router.put('/:id', authMiddleware, taskController.updateTask);

// Delete task
router.delete('/:id', authMiddleware, taskController.deleteTask);

// Toggle task completion
router.patch('/:id/toggle', authMiddleware, taskController.toggleComplete);

module.exports = router;