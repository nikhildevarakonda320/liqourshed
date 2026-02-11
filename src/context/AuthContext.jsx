import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for existing user session
    const savedUser = localStorage.getItem('liquorshed_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login logic
    const users = JSON.parse(localStorage.getItem('liquorshed_mock_users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('liquorshed_user', JSON.stringify(userWithoutPassword));
      return { success: true };
    } else {
      return { success: false, message: 'Invalid email or password' };
    }
  };

  const register = async (email, password, additionalData = {}) => {
    // Mock registration logic
    const users = JSON.parse(localStorage.getItem('liquorshed_mock_users') || '[]');
    
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Email is already in use' };
    }

    const newUser = {
      uid: Math.random().toString(36).substr(2, 9),
      email,
      password, // In a real app, never store plain text passwords!
      ...additionalData,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('liquorshed_mock_users', JSON.stringify(users));

    // Automatically log in after registration
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('liquorshed_user', JSON.stringify(userWithoutPassword));

    return { 
      success: true, 
      message: 'Registration successful!' 
    };
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('liquorshed_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};