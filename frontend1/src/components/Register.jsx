import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const Register = () => {
  const { register, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    try {
      await register(formData.email, formData.password);
      setSuccess('Registration successful! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 1000); // Delay for user feedback
      console.log('Registration successful');
    } catch (err) {
      const errorMsg = err.response?.data.message || 'Registration failed';
      if (errorMsg.includes('email') || errorMsg.includes('exists')) {
        setError('Email already exists or is invalid');
      } else if (errorMsg.includes('password')) {
        setError('Password is too weak');
      } else {
        setError(errorMsg);
      }
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full animate-fade-in">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Register</h2>
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;