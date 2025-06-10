import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data);
          console.log('Profile loaded, user:', res.data); // Debug
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem('token');
          console.log('Profile load failed, token removed'); // Debug
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { email, password });
    localStorage.setItem('token', res.data.token);
    console.log('Login response:', res.data); // Debug
    const profile = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${res.data.token}` },
    });
    setUser(profile.data);
    console.log('User set to:', profile.data); // Debug
  };

  const register = async (email, password) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, { email, password });
    localStorage.setItem('token', res.data.token);
    const profile = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${res.data.token}` },
    });
    setUser(profile.data);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};