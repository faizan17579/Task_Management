import { useState } from 'react';
import axios from 'axios';

const TaskItem = ({ task, updateTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(task);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/tasks/${task._id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      updateTask(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = async () => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/tasks/${task._id}/toggle`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      updateTask(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/tasks/${task._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      deleteTask(task._id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 animate">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            rows="3"
          />
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex justify-between items-start">
          <div>
            <h3
              className={`text-lg font-semibold ${
                task.completed ? 'line-through text-gray-500' : 'text-gray-800'
              }`}
            >
              {task.title}
            </h3>
            <p className="text-gray-600">{task.description}</p>
            <p className="text-sm text-gray-500">
              Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
            </p>
            <p className="text-sm text-gray-500">Priority: {task.priority}</p>
            <p className="text-sm text-gray-500">
              Status: {task.completed ? 'Completed' : 'Pending'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              onClick={handleToggle}
              className={`px-3 py-1 rounded-lg text-white ${
                task.completed ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
              } transition`}
            >
              {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;