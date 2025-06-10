import { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ addTask }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    status: 'pending',
    category: 'general',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/tasks`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      addTask(res.data); // Add the task with the server-generated _id
      setFormData({ title: '', description: '', dueDate: '', priority: 'medium', status: 'pending', category: 'general' });
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-gray-800">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Enter description"
        className="w-full p-2 border rounded"
      />
      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <div className="flex flex-col">
        <label className="font-semibold mb-1">Priority</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="font-semibold mb-1">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="general">General</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="study">Study</option>
        </select>
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;