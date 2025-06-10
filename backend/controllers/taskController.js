const Task = require('../models/Task');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const { validationResult } = require('express-validator');

exports.createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { title, description, dueDate, priority, category } = req.body;
  try {
    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      category,
      user: req.user.id,
    });
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateTask = async (req, res) => {
  const { title, description, dueDate, priority, category } = req.body;
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.user.toString() !== req.user.id)
      return res.status(401).json({ message: 'Not authorized' });

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: { title, description, dueDate, priority, category } },
      { new: true }
    );
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.user.toString() !== req.user.id)
      return res.status(401).json({ message: 'Not authorized' });

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.toggleComplete = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.user.toString() !== req.user.id)
      return res.status(401).json({ message: 'Not authorized' });

    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};