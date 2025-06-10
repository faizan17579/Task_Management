import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from '../components/TaskForm.jsx';
import TaskList from '../components/TaskList.jsx';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setTasks(res.data.map(task => ({
          ...task,
          status: task.completed ? 'completed' : 'pending', // Map completed to status
          category: task.category || 'general'
        })));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const addTask = (task) => {
    setTasks([task, ...tasks]);
  };

  const updateTask = async (updatedTask) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/tasks/${updatedTask._id}`, {
        title: updatedTask.title,
        description: updatedTask.description,
        dueDate: updatedTask.dueDate,
        priority: updatedTask.priority,
        category: updatedTask.category,
        status: updatedTask.status
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTasks(tasks.map((task) => (task._id === res.data._id ? { ...res.data, status: res.data.completed ? 'completed' : 'pending' } : task)));
      return res.data;
    } catch (err) {
      console.error('Error updating task:', err);
      throw err;
    }
  };

  const toggleComplete = async (taskId) => {
    try {
      const res = await axios.patch(`${import.meta.env.VITE_API_URL}/api/tasks/${taskId}/toggle`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const updatedTask = { ...res.data, status: res.data.completed ? 'completed' : 'pending' };
      setTasks(tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
      console.log('Toggled complete:', updatedTask);
    } catch (err) {
      console.error('Error toggling complete:', err);
      throw err;
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const taskStatus = task.status ? task.status.toLowerCase() : 'pending';
    const taskPriority = task.priority ? task.priority.toLowerCase() : 'medium';
    const taskCategory = task.category ? task.category.toLowerCase() : 'general';
    const matchesStatus = filterStatus === 'All' || taskStatus === filterStatus.toLowerCase();
    const matchesPriority = filterPriority === 'All' || taskPriority === filterPriority.toLowerCase();
    const matchesCategory = filterCategory === 'All' || taskCategory === filterCategory.toLowerCase();
    const matchesSearch = searchTerm === '' || 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesPriority && matchesCategory && matchesSearch;
  });

  const exportToCSV = () => {
    const headers = ['Title,Description,Due Date,Priority,Status,Category\n'];
    const csv = headers + filteredTasks.map(task => 
      `${task.title || ''},${task.description || ''},${task.dueDate || ''},${task.priority || ''},${task.status || ''},${task.category || ''}`
    ).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="text-white text-2xl animate-pulse">Loading your tasks...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-blue-200 to-purple-300 bg-clip-text text-transparent animate-fade-in-down">
          Your Task Dashboard
        </h1>
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white bg-opacity-25 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white border-opacity-30 mb-6 hover:shadow-xl transition-shadow duration-300 animate-fade-in-up">
            <TaskForm addTask={addTask} />
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white border-opacity-20 mb-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <label className="mr-2 text-gray-600">Search:</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 rounded bg-white bg-opacity-50 text-gray-800 focus:outline-none w-full md:w-auto"
                placeholder="Search by title or description..."
              />
            </div>
            <div>
              <label className="mr-2 text-gray-600">Status:</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="p-2 rounded bg-white bg-opacity-50 text-gray-800 focus:outline-none"
              >
                <option value="All">All</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="mr-2 text-gray-600">Priority:</label>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="p-2 rounded bg-white bg-opacity-50 text-gray-800 focus:outline-none"
              >
                <option value="All">All</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="mr-2 text-gray-600">Category:</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="p-2 rounded bg-white bg-opacity-50 text-gray-800 focus:outline-none"
              >
                <option value="All">All</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="study">Study</option>
                <option value="general">General</option>
              </select>
            </div>
            <button
              onClick={exportToCSV}
              className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
            >
              Export CSV
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <div key={task._id} className="bg-white bg-opacity-25 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white border-opacity-30 hover:shadow-xl transition-shadow duration-300 animate-fade-in-up">
                <TaskList task={task} updateTask={updateTask} deleteTask={deleteTask} toggleComplete={toggleComplete} />
              </div>
            ))}
            {filteredTasks.length === 0 && (
              <div className="col-span-full text-center text-gray-300 animate-pulse">
                No tasks match the filter or search. Add or adjust to get started!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;