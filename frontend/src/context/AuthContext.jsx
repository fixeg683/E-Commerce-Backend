import { createContext, useContext, useState, useEffect } from 'react';
import apiClient, { endpoints } from '../api/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const username = localStorage.getItem('username');
    if (token) {
      setUser({ token, username });
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const { data } = await apiClient.post(endpoints.login, { username, password });
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      localStorage.setItem('username', username);
      setUser({ token: data.access, username });
      return true;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };

  // --- NEW REGISTER FUNCTION ---
  const register = async (username, email, password) => {
    try {
      // Adjust payload keys based on what your Django backend expects
      await apiClient.post(endpoints.register, { 
        username, 
        email, 
        password 
      });
      // Automatically log the user in after successful registration
      return await login(username, password);
    } catch (error) {
      console.error("Registration failed", error);
      // Return the error message from backend if available
      throw error.response?.data || "Registration failed";
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);