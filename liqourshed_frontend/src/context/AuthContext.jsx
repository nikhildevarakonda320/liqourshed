import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser as apiRegisterUser, getUserProfile } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const savedUser = localStorage.getItem('userInfo');
      if (savedUser) {
        try {
          // Instead of just setting the saved user, fetch the latest from MongoDB
          const data = await getUserProfile();
          // We need to keep the token from localStorage if the profile endpoint doesn't return it
          const userInfo = JSON.parse(savedUser);
          const updatedUser = { ...data, token: userInfo.token };
          setUser(updatedUser);
          localStorage.setItem('userInfo', JSON.stringify(updatedUser));
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          localStorage.removeItem('userInfo');
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await loginUser(email, password);
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return { success: true, user: data };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Invalid email or password' 
      };
    }
  };

  const register = async (email, password, additionalData = {}) => {
    try {
      const { firstName, lastName } = additionalData;
      const name = additionalData.name || `${firstName} ${lastName}`.trim();
      
      const data = await apiRegisterUser(name, email, password);
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return { 
        success: true, 
        message: 'Registration successful!',
        user: data
      };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('userInfo');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
