import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
        try {
          const res = await axios.get('http://localhost:5000/api/auth/user');
          setUser(res.data);
        } catch (err) {
          console.error(err);
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const register = async (formData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['x-auth-token'] = res.data.token;
      const userRes = await axios.get('/api/auth/user');
      setUser(userRes.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const login = async (formData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['x-auth-token'] = res.data.token;
      const userRes = await axios.get('/api/auth/user');
      setUser(userRes.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['x-auth-token'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;