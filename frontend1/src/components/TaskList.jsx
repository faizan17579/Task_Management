import { useState, useEffect } from 'react';

const TaskList = ({ task, updateTask, deleteTask, toggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  useEffect(() => {
    console.log('Edited Task on render:', editedTask);
  }, [editedTask]);

  const handleMarkComplete = async () => {
    try {
      await toggleComplete(task._id); // Call toggleComplete function
      console.log('Marked complete for task:', task._id);
    } catch (err) {
      console.error('Error marking complete:', err);
    }
  };

  const handleEdit = () => {
    setEditedTask({ ...task });
    setIsEditing(true);
  };

  const handleSave = () => {
    updateTask(editedTask);
    setIsEditing(false);
    console.log('Saving edited task:', editedTask);
  };

  const handleDelete = () => deleteTask(task._id);

  if (isEditing) {
    return (
      <div className="space-y-4 p-4 bg-white text-black rounded-lg shadow-md">
        <input
          value={editedTask.title || ''}
          onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          className="w-full p-2 border rounded mb-2"
          placeholder="Title"
        />
        <textarea
          value={editedTask.description || ''}
          onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
          className="w-full p-2 border rounded mb-2"
          placeholder="Enter description"
          rows="3"
        />
        <input
          type="date"
          value={editedTask.dueDate || ''}
          onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
          className="w-full p-2 border rounded mb-2"
        />
        <select
          value={editedTask.priority || 'medium'}
          onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
          className="w-full p-2 border rounded mb-2"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select
          value={editedTask.status || 'pending'}
          onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
          className="w-full p-2 border rounded mb-2"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <select
          value={editedTask.category || 'general'}
          onChange={(e) => setEditedTask({ ...editedTask, category: e.target.value })}
          className="w-full p-2 border rounded mb-2"
        >
          <option value="general">General</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="study">Study</option>
        </select>
        <div className="flex space-x-2">
          <button onClick={handleSave} className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2 text-gray-800">
      <h3 className="text-lg font-semibold">{task.title || 'Untitled'}</h3>
      <p>{task.description || 'No description'}</p>
      <p>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</p>
      <p>Priority: {task.priority || 'medium'}</p>
      <p>Status: {task.status || 'pending'}</p>
      <p>Category: {task.category || 'general'}</p>
      <div className="flex space-x-2">
        <button onClick={handleMarkComplete} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
          Mark Complete
        </button>
        <button onClick={handleEdit} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
          Edit
        </button>
        <button onClick={handleDelete} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskList;