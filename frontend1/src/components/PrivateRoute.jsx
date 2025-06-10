import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  console.log('PrivateRoute user:', user); // Debug
  if (loading) return <div className="text-center py-10 text-gray-600">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;